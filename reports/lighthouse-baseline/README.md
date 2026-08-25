# Production Lighthouse baseline

Captured on 25 August 2026 against `https://arminbusatlic.com` before image, CSS, or further JavaScript optimization.

## Method

- Lighthouse CLI 13.4.1
- Google Chrome 151.0.7922.174, headless
- Performance category only
- Mobile: Lighthouse default mobile preset and simulated throttling
- Desktop: Lighthouse desktop preset
- One cold run per route and device profile
- Portfolio detail baseline: `/portfolio/dna-sandbox`, the first project in the portfolio's explicit ordering

The JSON files in this directory are the source reports. A single run is useful as a starting point, but three-run medians should be used before accepting or rejecting a specific optimization.

## Results

Times are seconds. Payload values are transferred bytes reported by Lighthouse. Unused JavaScript is Lighthouse's estimated potential saving, not the total JavaScript payload.

| Page | Device | Score | FCP | LCP | CLS | TBT | Total payload | Image payload | JS payload | Est. unused JS |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | Desktop | 96 | 0.98 | 1.01 | 0.000 | 92 ms | 2.02 MiB | 1.23 MiB | 663 KiB | 401 KiB |
| Home | Mobile | 50 | 5.38 | 13.61 | 0.000 | 424 ms | 2.02 MiB | 1.23 MiB | 663 KiB | 401 KiB |
| Blog index | Desktop | 78 | 1.04 | 3.01 | 0.007 | 153 ms | 4.70 MiB | 3.91 MiB | 665 KiB | 397 KiB |
| Blog index | Mobile | 58 | 4.84 | 25.40 | 0.000 | 207 ms | 4.69 MiB | 3.91 MiB | 665 KiB | 397 KiB |
| Blog article | Desktop | 98 | 0.89 | 0.89 | 0.010 | 6 ms | 2.24 MiB | 1.44 MiB | 672 KiB | 389 KiB |
| Blog article | Mobile | 76 | 2.18 | 2.52 | 0.009 | 808 ms | 2.24 MiB | 1.44 MiB | 672 KiB | 389 KiB |
| Portfolio index | Desktop | 98 | 0.90 | 0.90 | 0.003 | 76 ms | 2.65 MiB | 1.84 MiB | 679 KiB | 395 KiB |
| Portfolio index | Mobile | 79 | 2.57 | 2.57 | 0.002 | 549 ms | 2.38 MiB | 1.58 MiB | 679 KiB | 395 KiB |
| Portfolio detail | Desktop | 88 | 0.94 | 2.08 | 0.003 | 82 ms | 3.35 MiB | 2.55 MiB | 686 KiB | 389 KiB |
| Portfolio detail | Mobile | 86 | 2.33 | 2.50 | 0.004 | 378 ms | 3.35 MiB | 2.55 MiB | 686 KiB | 389 KiB |

## LCP elements

| Page | Desktop | Mobile |
|---|---|---|
| Home | Hero heading: “I build the interface…” | Header wordmark: “Armin Busatlic” |
| Blog index | “Ideas tested in working software.” | “Ideas tested in working software.” |
| Blog article | Article title | Article title |
| Portfolio index | Introductory portfolio copy | Introductory portfolio copy |
| Portfolio detail | Project title | Project description |

The measured LCP elements are text, not the expected hero images. That indicates render-blocking work and main-thread availability matter alongside image delivery.

## Main findings

1. CLS is already excellent on every tested route (`0.000`–`0.010`).
2. Mobile home and blog-index paint timing is the largest problem in this single-run baseline.
3. The Botpress widget loads approximately 500 KiB of JavaScript on every page (`webchat.js` and `fab.js`). Lighthouse estimates roughly 389–401 KiB of unused JavaScript depending on the route.
4. The Botpress floating-action image is a 960×960 PNG transferred at approximately 1.25 MiB while displayed around 96×64 pixels. It appears on every audited route.
5. The blog index transfers approximately 3.91 MiB of images. Its largest local image is `/blog/analog-angular-update.png` at approximately 2.43 MiB.
6. The portfolio detail transfers approximately 2.55 MiB of images. Four DNA Sandbox screenshots account for roughly 1.36 MiB in addition to the Botpress image.
7. Lighthouse reports estimated image-delivery savings between 1.25 MiB and 3.93 MiB across the tested pages.
8. Render-blocking savings estimates range from approximately 420 ms on desktop to 2.09 s on mobile.

## INP limitation

INP is a field metric that requires real user interactions. A navigation-only Lighthouse lab run does not generate a defensible INP value, and these reports do not contain Chrome UX Report field data. TBT is included as the laboratory responsiveness proxy. Production INP should be collected through Vercel Speed Insights, another real-user monitoring integration, or the Chrome UX Report when the site has sufficient traffic.

## Recommended optimization order

1. Defer Botpress until user intent (for example, first interaction or opening the chat control) and replace its oversized floating-action PNG.
2. Convert and resize `/blog/analog-angular-update.png`; then provide responsive blog-card sources.
3. Create responsive variants for portfolio screenshots and avoid downloading detail-gallery images before they approach the viewport.
4. Re-run three Lighthouse audits per page/device and compare medians against this baseline.
5. Investigate render-blocking CSS and font delivery after the image and third-party script changes.

