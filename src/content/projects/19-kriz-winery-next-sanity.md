---
title: "Križ Winery Website"
date: "03-02-2026"
timePeriod: "2025 ‑ 2026"

technology: "Next.js and Sanity CMS"
featuredImage: "/projects/krizwine.png"
projectImage: "/projects/kriz/kriz1.png"
projectImageSec: "/projects/kriz/kriz2.png"

link: "https://krizwine.com"
githublink: "https://github.com/Arminbusatlic72/kriz-winery-sanity-next-cms"
slug: "kriz-winery-next-sanity"
order: 2
description: "Built a multilingual winery website with Next.js App Router and Sanity as a headless CMS. Implemented localized routing and content for Croatian and English, dynamic pages for winery, accommodation, products, and blog, plus contact and search features. Focused on production readiness and performance through image optimization with next/image and Sanity metadata (LQIP, crop, hotspot), responsive loading strategies, and stable deployment behavior across development and production environments."
tools: "Visual Studio Code, Next.js, React, TypeScript, Sanity, GROQ, next-intl, Tailwind CSS, Vercel"
company: Grumpy dev
previousProject: dna-sandbox
nextProject: learningmakeover
---

# Challenge

Križ Winery needed a production-ready website that could present its winery, accommodation, products, and editorial content in both Croatian and English.

The content needed to remain manageable outside the codebase while supporting localized routes, image-rich pages, search, and reliable behavior across development and production deployments.

## Role and responsibilities

I built the multilingual website with Next.js App Router, React, TypeScript, and Sanity. My responsibilities included:

- Implementing Croatian and English routes and localized content.
- Building dynamic pages for the winery, accommodation, products, and blog.
- Integrating Sanity as the headless content-management system.
- Implementing contact and search functionality.
- Building responsive image-loading behavior.
- Preparing and stabilizing the application for production deployment.

## Technical decisions

### Sanity as a headless CMS

Winery, accommodation, product, and blog content needed to be editable independently of application deployments. Sanity supplied structured content while GROQ handled application queries.

### Localized routing with `next-intl`

Croatian and English content required language-aware routes rather than translated text inside one static page. `next-intl` provided routing and locale handling within the Next.js App Router structure.

### Sanity image metadata with `next/image`

Image-heavy hospitality pages needed responsive delivery without losing editorial control. Sanity crop and hotspot metadata retained intentional image framing, while LQIP data and `next/image` supported progressive, responsive loading.

### Consistent development and production behavior

The implementation used responsive loading strategies and deployment-aware image handling so Sanity-hosted media behaved consistently in local development and production.

## Result or measurable impact

A multilingual winery website shipped with localized winery, accommodation, product, blog, contact, and search experiences backed by an editable Sanity CMS.

The available project material does not include traffic, conversion, performance, or editorial-efficiency metrics, so none are claimed here.

## Screenshots

<picture>
  <source type="image/webp" srcset="/projects/kriz/kriz3-400w.webp 400w, /projects/kriz/kriz3-800w.webp 800w" sizes="(max-width: 640px) 100vw, 800px">
  <img src="/projects/kriz/kriz3-800w.webp" alt="Križ Winery responsive website interface" loading="lazy" decoding="async" width="800" height="476">
</picture>

## Links

- [Visit the live Križ Winery website](https://krizwine.com)
- [Review the public GitHub repository](https://github.com/Arminbusatlic72/kriz-winery-sanity-next-cms)
