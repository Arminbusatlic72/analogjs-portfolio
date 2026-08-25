---
title: "DNA Sandbox research platform"
timePeriod: "January 2026 ‑ March 2026"
date: "03-25-2026"
technology: "Next.js 16, React 19, TypeScript, Vercel AI SDK, Convex, Clerk, Stripe"
featuredImage: "/projects/dna-sandbox.svg"
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

# Challenge

Scenario DNA needed a browser-based research environment where data scientists could explore hypothetical sequences, review curated genomic sources, and record decisions without moving between disconnected tools.

The platform also needed streamed AI conversations, configurable research personas, private knowledge sources, subscription-controlled access, and reliable synchronization between billing and application entitlements.

## Role and responsibilities

I built the product interface and supporting application flows with Next.js, React, and TypeScript. My responsibilities included:

- Implementing streamed, multi-model research conversations with the Vercel AI SDK.
- Connecting AI responses to curated sequence data, annotation metadata, and private research notes.
- Building reactive experiment, subscription, and access states with Convex.
- Integrating Clerk authentication and Stripe subscription controls.
- Building administrative interfaces for prompts, research personas, subscriptions, and dataset health.
- Handling upload, webhook, and entitlement states across the frontend and application routes.

## Technical decisions

### Vercel AI SDK for streamed model interaction

The application needed conversations to render incrementally while supporting configurable research personas and optional tools. The Vercel AI SDK provided the streaming and tool-invocation layer without requiring a custom chat transport.

### Convex for reactive application state

Experiment state, subscription status, dataset metadata, and billing events needed to update the interface as they changed. Convex queries and mutations allowed badges, calls to action, and access states to react to those updates without a separate synchronization layer.

### Separate authentication, application data, and billing responsibilities

Clerk manages authenticated sessions, Convex stores structured research and subscription state, and Stripe controls checkout and subscription events. This kept access concerns separated instead of concentrating them in one custom backend.

### Idempotent webhook processing

Stripe and upstream services can retry events. Each processed webhook is recorded in a dedicated table so repeated delivery does not apply the same subscription or entitlement change more than once.

## Result or measurable impact

A working research platform shipped with streamed, knowledge-backed AI conversations; configurable research personas and prompts; authenticated, subscription-controlled access; dataset ingestion and experiment-health tracking; and administrative controls for research and billing state.

The subscription flow handles trials, plan changes, cancellations, payment failures, grace periods, and recovery. No numerical adoption, performance, revenue, or research-outcome metrics are currently available, so none are claimed here.

## Screenshots

<picture>
  <source type="image/webp" srcset="/projects/dna-sandbox/scenariodna3-400w.webp 400w, /projects/dna-sandbox/scenariodna3-800w.webp 800w" sizes="(max-width: 640px) 100vw, 800px">
  <img src="/projects/dna-sandbox/scenariodna3-800w.webp" alt="DNA Sandbox research workspace" loading="lazy" decoding="async" width="800" height="478">
</picture>

<picture>
  <source type="image/webp" srcset="/projects/dna-sandbox/scenariodna4-400w.webp 400w, /projects/dna-sandbox/scenariodna4-800w.webp 800w" sizes="(max-width: 640px) 100vw, 800px">
  <img src="/projects/dna-sandbox/scenariodna4-800w.webp" alt="DNA Sandbox research and configuration interface" loading="lazy" decoding="async" width="800" height="478">
</picture>

## Links

- [Open the live DNA Sandbox product](https://storyengine.scenariodna.com/)
- [Review the public GitHub repository](https://github.com/Arminbusatlic72/vercel-ai-sdke-ai-elements-convex-clerk)
