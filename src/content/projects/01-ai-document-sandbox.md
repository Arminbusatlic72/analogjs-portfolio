---
title: "AI Document Analysis Sandbox"
timePeriod: "April 2026 ‑ present"
date: "08-26-2026"
technology: "Next.js 16, React 19, TypeScript, Vercel AI SDK, Convex, Clerk, Anthropic, Google Gemini"
featuredImage: "/projects/miloshaisandbox/landing.png"
projectImage: "/projects/miloshaisandbox/workspace.png"
projectImageSec: "/projects/miloshaisandbox/admin-costs.png"
link: "https://milosh-ai-sandbox.vercel.app/"
linkLabel: "Open preview"
githublink: "https://github.com/Arminbusatlic72/milosh-ai-sandbox"
slug: "ai-document-sandbox"
order: 2
description: "Secure AI document-analysis workspace combining streamed multi-model conversations, project-based research, configurable agents, private reference documents, and granular usage controls."
tools: "Next.js, React, TypeScript, Vercel AI SDK, Convex, Clerk, Anthropic Claude, Google Gemini, Tailwind CSS, shadcn/ui"
company: "Private client"
projectType: "Ongoing client project"
status: "Final delivery phase"
nextProject: "kriz-winery-next-sanity"
---

# Challenge

The project required a secure, browser-based environment where invited users could upload documents, organize research into projects, and analyze private material through streamed AI conversations.

A simple chat interface was not enough. Administrators also needed control over user access, AI providers, models, system prompts, reference documents, usage limits, and operating costs. The application therefore had to coordinate authentication, reactive data, document processing, model routing, and cost enforcement without interrupting the conversational experience.

## Role and responsibilities

I designed and built the application interface and its supporting backend workflows using Next.js, React, TypeScript, and Convex. My responsibilities included:

- Building streamed AI conversations with the Vercel AI SDK.
- Integrating Anthropic Claude and Google Gemini through configurable AI agents.
- Creating project-based workspaces for grouping related conversations.
- Supporting PDF, DOCX, text, Markdown, and image attachments.
- Connecting agents to administrator-managed reference documents.
- Implementing Clerk authentication, user approval, suspension, and role-based access.
- Building administrative interfaces for users, API keys, system prompts, agents, documents, budgets, and application settings.
- Tracking token consumption and estimating the cost of each model request.
- Adding rate limits, spending limits, automated cleanup, and provider-cost reconciliation.
- Implementing chat routing, retrieval telemetry, and summarized memory for longer conversations.

## Technical decisions

### Vercel AI SDK for streamed multi-model conversations

The product needed incremental responses, file-aware prompts, model usage metadata, and a consistent interface across multiple AI providers.

The Vercel AI SDK provides the streaming transport and normalizes model interaction across Anthropic Claude and Google Gemini. This allowed the application to switch models through configurable agents while keeping the client-side conversation flow consistent.

### Convex for reactive application state

Chats, messages, projects, agents, documents, user access states, token usage, and administrative settings all needed to remain synchronized across the application.

Convex provides reactive queries and mutations for this state. New messages, project updates, access changes, and budget information can appear in the interface without building a separate polling or synchronization system.

### Configurable agents instead of hard-coded assistants

Different document-analysis workflows require different instructions, reference material, and model capabilities. Agents are therefore stored as configurable application data rather than being embedded directly in the interface.

Administrators can assign a model, system prompt, document behavior, and activation state to each agent. This makes it possible to introduce specialized analysis workflows without rebuilding the chat experience.

### Intent-based document retrieval

Sending every reference document with every request would increase latency, token consumption, and model cost. The application instead evaluates the user's request and determines whether document context is relevant.

For document or project-review requests, the system retrieves relevant document chunks and records the routing decision, retrieval mode, matched signals, and resulting context size. Agents can also be configured to always include or never include their documents.

### Summarized memory for long conversations

Long chat histories can eventually exceed practical context limits and become expensive to resend. The application compresses older messages into a stored conversation summary while preserving a configurable number of recent turns.

The summary and recent conversation history are combined when preparing later requests, maintaining useful context without repeatedly sending the entire conversation.

### Preflight spending controls

Recording costs after a model call would not prevent a request from exceeding a user's remaining allowance. Before contacting the provider, the application estimates the request cost from the assembled prompt, attachments, document context, expected output allowance, and a safety multiplier.

Requests are blocked when the estimate exceeds the user's remaining budget. Administrators can configure global limits, assign individual overrides, review spending, and reset accumulated usage.

### Provider-cost reconciliation

Internal token calculations can drift from the provider's final billing data, especially when caching and model-specific pricing are involved.

A scheduled Convex job compares internally estimated Anthropic usage with organization-level cost data. The admin dashboard displays the difference and flags reconciliation drift that may indicate outdated pricing settings.

### Secure DOCX processing

DOCX files are ZIP archives and can contain unexpectedly large or malicious payloads. Uploaded files are inspected before text extraction to enforce limits on compressed size, expanded size, archive entries, and extracted text length.

Processing results and rejection reasons are recorded in an upload audit trail, providing administrators with visibility into unsafe or unsupported files.

### Separation of authentication, application data, and model credentials

Clerk manages user identity and authenticated sessions. Convex stores application data, roles, approval states, conversations, and usage records. AI-provider credentials are encrypted before being stored and can only be managed through protected administrator workflows.

This separation keeps identity, application state, and provider access independently manageable.

## Current result

The application is in its final delivery phase and is waiting for the client's remaining content and review input before production release.

The working preview provides an authenticated AI document-analysis environment with streamed multi-model conversations, project organization, configurable agents, private reference documents, file attachments, and persistent conversation history.

Administrators can approve or suspend users, manage model credentials and prompts, configure application limits, monitor consumption, and compare estimated Anthropic costs with provider billing data. The platform also includes rate limiting, preflight budget enforcement, summarized chat memory, intent-based document retrieval, upload auditing, and automated cleanup of unused conversations.

No verified adoption, revenue, response-time, or cost-reduction figures are currently available, so no numerical impact claims are included.

## Screenshots

<picture>
  <source type="image/webp" srcset="/projects/miloshaisandbox/dashboard-400w.webp 400w, /projects/miloshaisandbox/dashboard-800w.webp 800w" sizes="(max-width: 640px) 100vw, 800px">
  <img src="/projects/miloshaisandbox/dashboard-800w.webp" alt="Signed-in AI Document Analysis Sandbox dashboard with available agents" loading="lazy" decoding="async" width="800" height="435">
</picture>

## Links

- [Open the non-production preview](https://milosh-ai-sandbox.vercel.app/)
- [Review the public GitHub repository](https://github.com/Arminbusatlic72/milosh-ai-sandbox)
