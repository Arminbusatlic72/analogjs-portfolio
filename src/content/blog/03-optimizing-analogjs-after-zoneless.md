---
title: "Making My AnalogJS Portfolio Leaner, Part 2: Images, Fonts, and Deferred JavaScript"
slug: optimizing-analogjs-after-zoneless
description: "What happened after the zoneless migration: Lighthouse baselines, responsive WebP images, deferred Botpress, self-hosted fonts, and a mobile performance score that moved from 82 to 98."
coverImage: "/blog/analogjs-performance-after-zoneless.webp"
previousPost: optimizing-analogjs-angular-zoneless
nextPost: ""
date: 26 August 2026
---

# Making My AnalogJS Portfolio Leaner, Part 2: Images, Fonts, and Deferred JavaScript

The first optimization pass ended with a clear result: moving the application to zoneless Angular removed about 40 kB from the main client bundle. It also ended with an equally clear warning. JavaScript was no longer the only useful number to watch.

One oversized image could cost more than the entire zoneless saving. A third-party chat widget could quietly add megabytes to every route. A font stylesheet weighing less than 2 kB could still delay rendering because it sat at the beginning of a longer network chain.

So the second pass started in the browser rather than in `package.json`.

This is the follow-up to [Making My AnalogJS Portfolio Leaner: Safer Updates, Working Tests, and Zoneless Angular](/blog/optimizing-analogjs-angular-zoneless). It covers what I measured after the framework work was finished, what I changed, and which Lighthouse suggestions I deliberately left alone.

---

## Start With a Production Baseline

I audited five production routes on desktop and mobile:

- the homepage;
- the blog index;
- a blog article;
- the portfolio index;
- a portfolio detail page.

For each page, I recorded LCP, CLS, blocking time, transferred JavaScript, and image payload. That route-by-route view was important. The shared Angular bundle was the same application concern everywhere, but the expensive resource on a portfolio detail page was not the same as the expensive resource on the blog index.

The audit quickly exposed three larger costs:

1. a 2.4 MiB local PNG used as a blog cover;
2. portfolio screenshots that reached almost 4.8 MiB each;
3. Botpress adding roughly 1.75 MiB of JavaScript and UI assets to every initial page load.

Those were better targets than shaving another small import from an Angular component.

## Compress the Largest Local Image First

I started with one file instead of launching a repository-wide conversion:

```text
public/blog/analog-angular-update.png
1536 × 1024
2,487,312 bytes
```

The cover is displayed at around 1000 px or less, has no transparency, and does not need lossless PNG encoding. I resized it to 1200 px wide and converted it to WebP at a measured quality setting.

```text
Before: 2,487,312 bytes
After:    101,908 bytes
Saved:          95.9%
```

The original stayed untouched during verification, while the content frontmatter moved to the optimized file:

```diff
-coverImage: "/blog/analog-angular-update.png"
+coverImage: "/blog/analog-angular-update.webp"
```

That first result established a safe conversion recipe before I applied it elsewhere.

## Finish the Blog Image Pass

The next three useful blog targets were an inline upgrade diagram, the NgRx Signal Store cover, and the zoneless article cover.

| Image group | Before | After | Reduction |
|---|---:|---:|---:|
| Three referenced assets | 1,421,834 B | 243,150 B | 82.9% |

I left the already-small 20–55 kB images alone. Re-encoding everything because a script can do it is not optimization; it is churn. The useful boundary was whether the result would materially reduce a real page transfer without damaging text or screenshot clarity.

## Generate Responsive Portfolio Images

The portfolio needed a different strategy. Its index uses compact thumbnails, while detail pages use a larger primary screenshot and smaller below-the-fold gallery images. Sending one source size to all three contexts wastes bandwidth.

I created a repeatable Sharp script that reads the project content metadata and generates these variants:

```text
Index thumbnails: 150w, 300w, 400w
Detail hero:      400w, 800w, 1200w
Gallery images:   400w, 800w
```

The templates now provide `srcset` and `sizes`, allowing the browser to select the appropriate file instead of always downloading the largest screenshot.

```html
<source
  type="image/webp"
  [attr.srcset]="responsiveImageSrcset(projectImage, heroWidths)"
  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
/>
```

The generator processed 71 referenced raster sources and created 194 responsive WebP files. The complete responsive set is 2.51 MiB, compared with 37.83 MiB for the referenced original sources.

The DNA Sandbox detail page shows what that means for one route:

| Selection | Local project images |
|---|---:|
| Original PNG files | 1,389,321 B |
| Desktop WebP selection | 67,844 B |
| Mobile WebP selection | 18,896 B |

The primary image stays eager and high priority. Secondary screenshots use native lazy loading, including images embedded in project Markdown.

## Stop Loading Chat Before Anyone Needs It

Botpress originally entered through two global script tags in `index.html`. That meant every visitor paid for the chat integration immediately, even if they never went near it.

I replaced those tags with a small Angular loader built around `IntersectionObserver`. It watches the footer and loads the two existing Botpress scripts sequentially when the footer approaches the viewport.

```ts
this.observer = new IntersectionObserver(
  (entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    void this.loadOnDemand();
  },
  { rootMargin: '100px', threshold: 0.1 },
);
```

The loader also guards SSR, prevents duplicate requests, disconnects the observer after use, and keeps failures retryable. Most importantly, the production prerendered HTML now contains zero Botpress requests.

The chat still appears when a visitor reaches the footer. It simply no longer competes with the page they came to see.

## Remove Google Fonts From the Critical Path

After Botpress moved out of the initial load, PageSpeed made the next chain easier to see:

```text
HTML → application CSS → Google Fonts CSS → six WOFF2 files
```

The site used Manrope, IBM Plex Mono, IBM Plex Serif, and Caveat. It also carried an older Space Grotesk request that no longer controlled the body typography.

I removed the unused request and self-hosted the required WOFF2 files with local `@font-face` declarations. Latin and Latin Extended subsets preserve names and content containing characters such as `ž`, `ć`, `č`, `š`, and `đ`.

Only the primary Manrope Latin file is preloaded:

```html
<link
  rel="preload"
  href="/fonts/manrope-latin.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

The other fonts still use `font-display: swap`, but they do not compete as preloads. This removed the third-party font stylesheet and its extra connection from the critical path without changing the visual system.

## Let Blog Cards Choose Their Own Image Width

The first WebP conversion made the main blog cover much smaller, but PageSpeed still caught a delivery mismatch: a 1200 px file was being displayed in a roughly 570–670 px container.

The blog index now offers 400w, 700w, and 900w versions of its three local covers:

```html
<source
  type="image/webp"
  srcset="cover-400w.webp 400w, cover-700w.webp 700w, cover-900w.webp 900w"
  sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1440px) 45vw, 650px"
/>
```

Mobile devices can choose the 400 px source, typical desktop cards can use 700 px, and larger or high-density displays still have a 900 px option. Full-size sources remain available on article detail pages.

That final targeted change moved the blog's mobile PageSpeed score from **82 to 98**. Desktop remained at **100**.

## What I Did Not Optimize

Lighthouse still reported unused JavaScript in the shared Angular chunk. I did not split Angular core into arbitrary vendor files just to improve the appearance of one report.

Coverage tools label code as unused when it is not executed during their short recording window. Router behavior, hydration, future interactions, and framework paths can all appear in that category even when the application needs them later.

The current shared JavaScript transfer is reasonable for an Angular and AnalogJS application. Any further change needs source-map evidence and a meaningful target—such as a route-only dependency leaking into the initial chunk—not a cosmetic `manualChunks` configuration.

I also left the small application stylesheet render-blocking. It defines the initial layout and is only about 13 kB gzip. Inlining or extracting route-specific critical CSS would add build complexity for a result that may not survive real-user measurement.

## The Verification Loop

Every image, script, and font change went through the same checks:

```bash
npm test
npm run build
```

I also verified:

- responsive image candidates in prerendered HTML;
- eager loading only for important primary images;
- lazy loading for below-the-fold galleries;
- zero Botpress URLs in initial HTML;
- zero Google Fonts URLs in production HTML and CSS;
- valid WOFF2, WebP, SSR, sitemap, and dynamic-route output;
- visual quality at the sizes users actually receive.

The test suite finished with 15 passing tests, and the production build continued to prerender the site successfully.

## The Result After Zoneless

Part 1 reduced framework overhead. Part 2 reduced everything competing around it.

The most useful results were not one combined bundle number, because images, fonts, and deferred scripts behave differently in the browser. They were these:

- a 2.4 MiB cover reduced to about 100 KiB;
- three more blog assets reduced by 82.9%;
- responsive portfolio output generated from 37.83 MiB of referenced sources;
- roughly 1.75 MiB of Botpress overhead removed from initial page loads;
- Google Fonts removed from the critical request chain;
- blog mobile performance improved from 82 to 98;
- desktop performance held at 100.

The broader lesson is the same one I found during the zoneless migration: optimize what users actually download, and verify the result at the layer where it matters.

A quieter build is useful. A smaller bundle is useful. But the best performance work follows the full delivery path—from server response, to CSS and fonts, to the image selected for one viewport, to the third-party script a visitor may never need.
