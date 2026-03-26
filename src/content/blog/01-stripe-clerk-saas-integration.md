---
title: "Building a SaaS Subscription System with Stripe, Clerk, and Convex"
slug: building-a-saas-subscription-system
description: "A practical guide to wiring up Stripe subscriptions, Clerk authentication, and Convex as a real-time backend — covering webhooks, entitlement logic, and GPT package syncing in a Next.js SaaS app."
coverImage: "/blog/PaaS-For-Your-SaaS.png"
previousPost: "exploring-angular-signals"
nextPost: "enhancing-a-jamstack-application"
date: 10 March 2026
---

# Building a SaaS Subscription System with Stripe, Clerk, and Convex

There's a moment in every SaaS side project where the fun stops. You've built the core product, users are interested, and now you have to wire up payments. Subscriptions, webhooks, entitlement logic, edge cases — it gets complicated fast.

In this post, I'll walk through how I built a production-grade subscription system using **Stripe** for payments, **Clerk** for authentication, and **Convex** as the real-time backend. The stack handles everything from signup to GPT entitlement, and it's held up well under real traffic.

---

## The Stack and Why I Chose It

Before diving into code, here's the reasoning behind each tool:

- **Clerk** handles auth so I don't have to. JWTs, session management, OAuth — all taken care of. It also plays nicely with Next.js App Router out of the box.
- **Stripe** is the obvious choice for subscriptions. The API is well-documented, the webhook system is reliable, and the dashboard is genuinely useful for debugging.
- **Convex** replaces a traditional REST API + database setup with a real-time reactive backend. Mutations are transactional, queries are cached, and I can skip writing API endpoints for most CRUD operations.

The integration between the three is where most of the complexity lives, and that's what this post is really about.

---

## Step 1: Identity — Clerk Does the Heavy Lifting

When a user signs up, Clerk fires a webhook. I use this to sync the user into Convex so the rest of the system has a stable internal user record to work with.

```ts
// app/api/webhooks/clerk/route.ts
export async function POST(req: NextRequest) {
  const event = await req.json();

  await convex.mutation(api.users.upsertUser, {
    clerkUserId: event.data.id,
    email: event.data.email_addresses[0].email_address,
  });

  return NextResponse.json({ success: true });
}
```

Simple enough. The key design decision here is using Clerk's `userId` as the foreign key throughout the system. This makes it easy to look up a user's subscriptions and entitlements without a separate auth layer.

One thing worth noting: **always verify the Clerk webhook signature** before processing the payload. I'm skipping that here for brevity, but in production you should validate using `svix` — Clerk's docs cover this well.

---

## Step 2: Payments — Stripe Webhooks and Subscription Sync

When a user subscribes, Stripe handles the payment and fires a webhook. I listen for `customer.subscription.created`, `customer.subscription.updated`, and `customer.subscription.deleted`, then sync the state into Convex.

```ts
// app/api/webhooks/stripe/route.ts
export async function POST(req: NextRequest) {
  const event = await req.json();

  await convex.mutation(api.subscriptions.syncSubscriptionFromStripe, {
    clerkUserId: event.data.customer,
    stripeSubscriptionId: event.data.id,
    status: event.data.status,
    productId: event.data.items.data[0].price.product,
    priceId: event.data.items.data[0].price.id,
    currentPeriodStart: event.data.current_period_start,
    currentPeriodEnd: event.data.current_period_end,
  });

  return NextResponse.json({ success: true });
}
```

The mutation on the Convex side upserts the subscription record — if it exists, update it; if not, create it. This makes the webhook handler idempotent, which matters because Stripe will retry failed webhooks and you don't want duplicate records.

A few things I learned the hard way here:

- **Always return 200 quickly.** If your webhook handler takes too long, Stripe marks it as failed and retries. Move heavy logic to background tasks.
- **Verify the Stripe signature.** Use `stripe.webhooks.constructEvent()` with your webhook secret. Again, skipped here for readability, but non-negotiable in production.
- **Handle `customer.subscription.deleted` explicitly.** Don't assume an absence of events means an active subscription.

---

## Step 3: The Convex Schema — Keeping It Clean

The subscription table is the heart of the system. Here's the core shape:

```ts
// convex/schema.ts
export const subscriptions = defineTable({
  userId: v.id("users"),
  clerkUserId: v.string(),
  stripeSubscriptionId: v.string(),
  status: v.string(),
  productId: v.string(),
  priceId: v.string(),
  gptIds: v.array(v.string()),
  created: v.number(),
});
```

The `gptIds` array is where entitlement lives. Each subscription tracks which GPTs the user has access to, and this gets updated whenever a GPT is assigned to or removed from a package.

I also enforce a **maximum of 6 active subscriptions per user**. This keeps things manageable and prevents edge cases where a user accumulates stale subscriptions over years of churning and resubscribing:

```ts
async function syncUserSubscriptionCache(ctx, userId) {
  const subs = await ctx.db
    .query("subscriptions")
    .withIndex("by_user_id", (q) => q.eq("userId", userId))
    .collect();

  const activeSubs = subs.filter((sub) => isEntitled(sub)).sort((a, b) => (b.created ?? b._creationTime) - (a.created ?? a._creationTime));

  // Keep only the 6 most recent active subscriptions
  const subscriptionIds = activeSubs.slice(0, 6).map((sub) => sub._id);
}
```

Sorting by `created` descending and slicing at 6 means the most recent subscriptions always win.

---

## Step 4: GPT Entitlement — Keeping Subscriptions in Sync

This is the part that took the most iteration. When an admin assigns a GPT to a package, all existing subscribers to that package need their `gptIds` updated immediately.

```ts
// convex/gpts.ts
export const upsertGpt = mutation({
  args: {
    gptId: v.string(),
    packageId: v.optional(v.id("packages")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch("gpts", args.gptId, args);

    if (args.packageId) {
      const subs = await ctx.db
        .query("subscriptions")
        .withIndex("by_packageId", (q) => q.eq("packageId", args.packageId))
        .collect();

      for (const sub of subs) {
        await ctx.db.patch("subscriptions", sub._id, {
          gptIds: [args.gptId],
        });
      }
    }
  },
});
```

This is the backend-driven entitlement model: the source of truth lives in the database, not in the client. When a user opens the app, their access is computed from what's in Convex, not from what was true when they last logged in.

The tradeoff is that a GPT assignment triggers N database writes where N is the number of subscribers to that package. At small scale this is fine; at large scale you'd want to denormalize differently or batch the writes.

---

## The Full Flow

Putting it all together, here's what happens end to end:

1. User signs up via Clerk — `upsertUser` mutation creates their record in Convex
2. User subscribes via Stripe — webhook fires, `syncSubscriptionFromStripe` creates the subscription record
3. Admin assigns a GPT to a package — `upsertGpt` mutation updates all subscriber records
4. User opens the app — their `gptIds` are read from Convex and used to gate access
5. User cancels — `customer.subscription.deleted` webhook fires, status is updated to `canceled`, entitlement is revoked

---

## What I'd Do Differently

A few things I'd change if starting fresh:

**Use Stripe's `customer` object from the start.** I initially stored only `clerkUserId` as the Stripe customer reference, but Stripe's customer ID is the more stable identifier for payment operations. I ended up adding it later and doing a data migration.

**Add a `lastSyncedAt` timestamp.** Webhooks can arrive out of order. A timestamp lets you skip stale updates without creating race conditions.

**Write an entitlement helper early.** I ended up with entitlement logic scattered across three files. A single `isUserEntitled(userId, gptId)` function that everyone calls would have saved a lot of confusion.

---

## Integration Flow Diagram

Below is a diagram illustrating the Stripe & Clerk integration and entitlement logic in this project:

![Stripe & Clerk Integration Flow](/blog/mermaid-diagram.png)

This diagram shows the full flow from user authentication and subscription, through webhook handling, backend syncing, and enforcement of the 6-subscription-per-user limit, as implemented in your project.

---

## Wrapping Up

The Stripe + Clerk + Convex combination works well for subscription-gated SaaS. Each tool handles its lane cleanly, the integration points are well-defined, and Convex's real-time nature means entitlement updates propagate to the client without polling.

The code here is simplified for clarity — production versions need webhook signature verification, proper error handling, and logging. But the core patterns hold.

If you're building something similar and hit a wall, feel free to reach out.
