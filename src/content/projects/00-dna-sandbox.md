---
title: "DNA Sandbox research platform"
timePeriod: "January 2026 ‑ March 2026"
date: "03-25-2026"
technology: "Next.js 16, React 19, TypeScript, Vercel AI SDK, Convex, Clerk, Stripe"
featuredImage: "/projects/dna-sandbox/featured.svg"
projectImage: "/projects/dna-sandbox/scenariodna1.png"
projectImageSec: "/projects/dna-sandbox/scenariodna2.png"
link: "https://storyengine.scenariodna.com/"
githublink: https://github.com/Arminbusatlic72/vercel-ai-sdke-ai-elements-convex-clerk
slug: "dna-sandbox"
order: 1
description: "Guided AI research studio that pairs streaming multi-model chat with curated DNA knowledge sources, premium access controls, and real-time instrumentation."
tools: "Figma, Next.js, React, TypeScript, Vercel AI SDK, Convex, Clerk, Stripe"
company: Scenario DNA
nextProject: kriz-winery-next-sanity
---

# DNA Sandbox — Project Overview

DNA Sandbox is a guided AI research environment that pairs streaming multi-model conversations with curated genomic knowledge sources and premium gating so that data scientists can explore hypothetical sequences, validate outcomes, and log decisions without leaving the browser.

## Key Functionalities

- **Streaming AI chat** with configurable GPT personas and dataset connectors that let researchers ask questions about FASTA samples, variant calls, and clinical annotations as if they were discussing with an expert partner.
- **Knowledge-backed responses** created by ingesting curated sequence data, annotation metadata, and private lab notes so the model can reference the exact context, lineage, and instrument settings behind each answer.
- **Optional research tools** that spin up live dataset queries or visualizations, ship AI-generated imagery of structures, and compare in-flight simulations to previously validated experiments when enabled.
- **Admin-managed GPTs and prompts** that allow domain leads to expose specific personas (e.g., diagnostic reviewer, simulation coach, policy guardrail) without redeploying the application.
- **Stripe + Clerk access gating** that enforces tiered compute limits, free trials, and grace periods while surfacing project health via a reactive `useSubscriptionStatus` hook in the dashboard.
- **Robust webhook tracking** to keep ingestion, billing, and entitlement state synchronized even when upstream services retry the same event.

## Research Control Highlights

- Handles every standard subscription scenario (new access, plan changes, cancellations, trial expiration, payment failures, and recoveries) so labs always know who can spin up compute budgets.
- Tracks extra state such as `trialEndDate`, `paymentFailureGracePeriodEnd`, `lastPaymentFailedAt`, and `canceledAt` on Convex documents so the UI can show precise messaging (grace period, trial, cancel countdown, etc.).
- Stores each webhook event in a dedicated `webhookEvents` table to prevent duplicate processing, guaranteeing that datasets keep advancing even when partners resend the same payload.
- Frontend components react instantly to Convex queries so every badge, CTA, and card reflects the project state (experiment active, trialing, paused, past due, suspended, or unlocked).

## Architecture Overview

1. **Secure ingestion path** — Vercel API routes such as `/api/research/ingest/route.ts` verify signatures, confirm tokens, and delegate uploads to handlers dedicated to FASTA, metadata, or simulation payloads.
2. **Convex mutations** such as `syncDatasetFromUpload` ensure documents exist for every lab, create users automatically if needed, and mirror billing metadata alongside experiment threads.
3. **Reactive health queries** like `getExperimentHealth` feed `useSubscriptionStatus` and other hooks so the dashboard refreshes instantly when Convex data changes.
4. **Separation of concerns** — Clerk controls authentication, Convex stores structured genomic and billing data, and Stripe enforces subscription entitlements so the platform scales reliably.

## Tech Stack

- **Frameworks & Languages:** Next.js 16, React 19, TypeScript
- **AI Middleware:** Vercel AI SDK for orchestrating multi-model chat, streaming responses, and instrumentation hooks
- **Backend & Database:** Convex for realtime documents, distributed queries, and webhook-driven mutations
- **Auth & Billing:** Clerk handles sessions, Stripe manages subscriptions, checkout sessions, and webhook events
- **Testing & Tooling:** Vitest for unit/UI tests, ESLint/Prettier via shared configs, and Convex Dev for local schema synchronization
- **Deployment:** Optimized for Vercel, with scripts for dev, build, lint, and test baked into `package.json`

## Developer Experience

- `npm run dev` launches the Next.js client alongside Convex Dev so schema changes stay synced and mutations stay safe.
- Documentation covers deployment (`docs/DEPLOYMENT_CHECKLIST.md`), research-pipeline implementation, and webhook wiring for ingesting new datasets.
- Admin consoles live inside `app/` so operators can inspect GPTs, subscriptions, and dataset health from a single cohesive UI.
