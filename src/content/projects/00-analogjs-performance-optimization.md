---
title: "AnalogJS portfolio performance optimization"
timePeriod: "August 2026"
date: "08-26-2026"
technology: "AnalogJS 2.7, Angular 21, TypeScript, Vitest, Lighthouse, Netlify"
featuredImage: "/blog/analogjs-performance-after-zoneless.webp"
projectImage: "/blog/analogjs-performance-after-zoneless.webp"
link: "https://arminbusatlic.com/"
githublink: "https://github.com/Arminbusatlic72/analogjs-portfolio"
slug: "analogjs-performance-optimization"
order: 0
description: "A measured modernization of this portfolio that combined Angular 21 and zoneless rendering with responsive images, self-hosted fonts, and deferred third-party JavaScript—raising the blog mobile PageSpeed score from 82 to 98."
tools: "AnalogJS, Angular, TypeScript, RxJS, Vitest, Lighthouse, Sharp, Netlify"
company: "arminbusatlic.com"
projectType: "Independent engineering"
nextProject: "dna-sandbox"
---

# Challenge

The portfolio was already fast on desktop, but its production behavior told a less complete story. The shared client bundle exceeded Vite's 500 kB warning threshold, large source images were being delivered to small cards, Google Fonts added a render-blocking network chain, and Botpress loaded globally even when visitors never reached the chat interface.

The goal was not to chase a perfect audit by hiding warnings. It was to reduce what visitors actually download while preserving the site's design, content workflow, server rendering, and interactive behavior.

## Role and responsibilities

I treated my own portfolio as a production performance project. My work included:

- Updating the AnalogJS and Angular stack incrementally and verifying compatibility at each phase.
- Migrating Angular to zoneless change detection and removing obsolete framework dependencies.
- Establishing Lighthouse baselines across the home, blog, article, portfolio index, and portfolio detail routes.
- Auditing bundle composition before deciding which JavaScript findings were actionable.
- Building repeatable responsive-image generation with Sharp and wiring `srcset` and `sizes` into Angular templates.
- Deferring Botpress until the footer approaches the viewport.
- Replacing Google Fonts requests with self-hosted, subsetted WOFF2 files.
- Maintaining unit tests, production prerendering, route generation, and sitemap output throughout the work.

## Technical decisions

### Measure complete routes, not only the shared bundle

The initial bundle warning was useful, but it did not identify the largest user-facing costs. Production audits showed that oversized images, font chaining, and globally loaded chat scripts offered larger improvements than arbitrary manual chunking.

### Keep critical media eager and make everything else responsive

Primary images remain eager and high priority when they are likely LCP candidates. Blog cards, project thumbnails, and secondary screenshots use explicit responsive candidates, appropriate `sizes`, asynchronous decoding, and lazy loading below the fold.

The image pipeline generated 194 responsive WebP files from 71 referenced raster sources. The generated set totaled 2.51 MiB, compared with 37.83 MiB for the referenced originals.

### Load third-party chat at the point of intent

Botpress previously added roughly 1.75 MiB of scripts and UI assets to initial navigation. An SSR-safe `IntersectionObserver` loader now requests it only when the footer approaches the viewport, where the chat becomes relevant.

### Remove the font network chain

The required typefaces are now served locally as Latin and Latin Extended WOFF2 subsets. Only the primary Manrope file is preloaded; supporting typefaces use `font-display: swap` without competing for early bandwidth.

### Avoid cosmetic JavaScript splitting

Lighthouse continued to classify some Angular framework code as unused during its short trace. I left the shared framework chunk intact because route splitting already worked and there was no source-map evidence that a large route-only dependency had leaked into the entry chunk.

## Result and measurable impact

| Metric | Before | After |
|---|---:|---:|
| Blog mobile PageSpeed score | 82 | 98 |
| Desktop PageSpeed score | 100 | 100 |
| Main bundle, minified | 556.99 kB | 519.70 kB |
| Main bundle, gzip | 174.21 kB | 161.69 kB |
| Largest optimized blog cover | 2,487,312 B | 101,908 B |
| Initial Botpress payload | ~1.75 MiB | Deferred until footer intent |

The first cover conversion reduced that asset by 95.9%. Three additional blog assets dropped by 82.9%, Google Fonts disappeared from the critical request chain, and production prerendering continued to complete successfully.

## What this case study demonstrates

This work combines modern Angular architecture with practical delivery decisions: signals and zoneless change detection, SSR-safe browser integration, route-aware measurement, responsive media, third-party governance, automated testing, and evidence-based restraint.

The result is not merely a quieter build. It is a faster production experience backed by reproducible measurements.

## Read the technical series

- [Part 1: Safer updates, working tests, and zoneless Angular](/blog/optimizing-analogjs-angular-zoneless)
- [Part 2: Images, fonts, and deferred JavaScript](/blog/optimizing-analogjs-after-zoneless)

## Links

- [Open the live portfolio](https://arminbusatlic.com/)
- [Review the source code](https://github.com/Arminbusatlic72/analogjs-portfolio)
