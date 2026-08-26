---
title: "Making My AnalogJS Portfolio Leaner: Safer Updates, Working Tests, and Zoneless Angular"
slug: optimizing-analogjs-angular-zoneless
description: "A practical account of updating an AnalogJS portfolio, repairing its Angular test setup, moving to zoneless change detection, and cutting about 40 kB from the main bundle without fragile chunk tricks."
coverImage: "/blog/analog-zoneless-bundle-optimization.webp"
previousPost: upgrade-to-analog-content-pipeline
nextPost: optimizing-analogjs-after-zoneless
date: 25 August 2026
---

# Making My AnalogJS Portfolio Leaner: Safer Updates, Working Tests, and Zoneless Angular

This round of work started with a familiar-looking Vite warning:

```text
Some chunks are larger than 500 kB after minification.
```

The tempting response was to split the Angular packages into an arbitrary vendor chunk or simply raise the warning limit. Both would make the terminal quieter, but neither would answer the useful question: **why was the bundle that size, and could I remove anything real?**

Before touching the build configuration, I audited the dependency tree, fixed the test harness, updated AnalogJS, and measured every meaningful change. That made the optimization work slower at the beginning and much safer by the end.

This post walks through that process, including the parts that barely moved the bundle and the one change that did.

---

## The Starting Point

The portfolio was already in reasonably good shape. AnalogJS was splitting page routes and Markdown content into separate chunks, the production build completed successfully, and the application used signals for most local state.

The initial main client chunk was:

| Measurement | Size |
|---|---:|
| Minified | 556.99 kB |
| Gzip | 174.21 kB |

The application components themselves accounted for very little of that. Most of the shared chunk came from Angular core, Router, Common, Zone.js, and the AnalogJS runtime. In other words, rewriting a small header component was never going to save hundreds of kilobytes.

There were also two more urgent findings:

- The production dependency audit reported 12 vulnerabilities.
- Thirteen resolver tests failed before reaching their assertions because Angular's test environment was not initialized.

Bundle work had to wait until those foundations were trustworthy.

## Step 1: Patch Angular as One Version Family

The project had Angular packages spread across `21.2.3` and `21.2.5`. I updated the complete Angular runtime and toolchain to `21.2.21` instead of changing individual packages independently.

```diff
-"@angular/common": "^21.2.5"
-"@angular/core": "^21.2.5"
-"@angular/ssr": "^21.2.3"
+"@angular/common": "21.2.21"
+"@angular/core": "21.2.21"
+"@angular/ssr": "21.2.21"
```

The same alignment applied to the compiler, Router, forms, platform packages, CLI, build tooling, and DevKit. Vite, Vitest, PostCSS, PrismJS, and the Markdown plugins received compatible patch updates in the same phase.

Using exact Angular versions here was intentional. A framework family is easier to reproduce and debug when the lockfile and manifest agree on the same patch release.

After the update, the production audit dropped from 12 findings to one. The remaining advisory comes through `front-matter` and its old `js-yaml` dependency, so it needs a separate upstream or override decision rather than a forced install hidden inside an unrelated update.

## Step 2: Make the Tests Tell the Truth

The project already had a valid Angular test initializer in `src/test-setup.ts`, but the `npm test` command loaded `vitest.config.ts`, and that configuration never referenced the setup file.

The first fix was small:

```diff
test: {
  globals: true,
  environment: "jsdom",
+ setupFiles: ["src/test-setup.ts"],
  include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
}
```

Once TestBed initialized, the suite exposed a second problem. The resolver helper attempted to override `ContentService` *inside* `runInInjectionContext()`. By then, TestBed had already instantiated the test module.

Moving the override before the injection context fixed the lifecycle:

```diff
-return TestBed.runInInjectionContext(() => {
-  TestBed.overrideProvider(ContentService, { useValue: contentServiceMock });
-  return resolver(route, {} as any);
-});
+TestBed.overrideProvider(ContentService, { useValue: contentServiceMock });
+return TestBed.runInInjectionContext(() => resolver(route, {} as any));
```

The result was a much more useful baseline:

```text
Test Files  2 passed (2)
Tests       14 passed (14)
```

That step did not reduce the bundle, but it made every later refactor less speculative.

## Step 3: Upgrade AnalogJS as One Unit

Next, I moved all five AnalogJS packages from `2.3.1` to `2.7.0` together:

```diff
-"@analogjs/content": "^2.3.1"
-"@analogjs/router": "^2.3.1"
-"@analogjs/platform": "^2.3.1"
+"@analogjs/content": "2.7.0"
+"@analogjs/router": "2.7.0"
+"@analogjs/platform": "2.7.0"
```

The Vite and Vitest integrations were aligned to `2.7.0` as well. Tests, SSR, static prerendering, dynamic content routes, and sitemap generation continued to pass.

The bundle became slightly larger:

| AnalogJS version | Minified | Gzip |
|---|---:|---:|
| 2.3.1 | 557.03 kB | 174.18 kB |
| 2.7.0 | 559.46 kB | 175.08 kB |

That is worth showing because upgrades do not automatically mean smaller output. The newer release gave the project a current compatibility baseline and reduced audit noise, but its value was not a bundle-size win.

## Step 4: Remove Unnecessary `CommonModule` Imports

The application shell imported `CommonModule` only to apply a dark-mode class with `ngClass`. I replaced it with direct class bindings:

```diff
-<div [ngClass]="darkModeService.darkModeSignal()" class="site-shell">
+<div
+  class="site-shell"
+  [class.dark]="darkModeService.darkModeSignal() === 'dark'"
+  [class.light]="darkModeService.darkModeSignal() === 'light'"
+>
```

The header also imported `CommonModule` without using any of its directives or pipes, so that import was removed.

This was a good standalone-component cleanup, but the measured bundle difference was effectively zero. Angular Common was still needed by Router, HTTP, AnalogJS, and other lazy components. Removing one import does not remove a library when the shared dependency graph still needs it.

That small disappointment helped narrow the next move: I needed to remove a runtime dependency that was actually present in the initial chunk.

## Step 5: Move the Application to Zoneless Angular

The application already used signals, reactive resources, and Angular event bindings, which made it a reasonable candidate for zoneless change detection.

The client configuration changed from:

```ts
provideZoneChangeDetection({ eventCoalescing: true })
```

to:

```ts
provideZonelessChangeDetection()
```

I then removed the production Zone.js imports:

```diff
-import "zone.js";
```

```diff
-import "zone.js/node";
```

The server bootstrap no longer needed to inject a second zone-based provider either, so it became a straightforward bootstrap with the merged server configuration:

```ts
export function bootstrap(context?: BootstrapContext) {
  return bootstrapApplication(AppComponent, config, context);
}
```

`zone.js` remains installed for now because the AnalogJS Vitest adapter imports its testing plugins. The important distinction is that it no longer ships in the production browser or server entry point.

This was the first change that produced a meaningful reduction:

| Configuration | Minified | Gzip |
|---|---:|---:|
| Zone-based Angular | 559.46 kB | 175.08 kB |
| Zoneless Angular | 519.70 kB | 161.69 kB |
| Reduction | **39.76 kB** | **13.39 kB** |

The client build also transformed three fewer modules, and the SSR bundle fell by roughly 92 kB.

## Step 6: Treat the Warning as a Budget

After the real optimization, the main chunk was still 19.70 kB above Vite's default 500 kB warning. At that point, increasing the limit was no longer a way to avoid the work—it was a way to document the project's actual budget.

```ts
build: {
  target: ["es2020"],
  chunkSizeWarningLimit: 550,
}
```

The 550 kB limit gives the current bundle about 30 kB of headroom while still warning if the shared chunk grows meaningfully.

I deliberately did not add `manualChunks` just to make the message disappear. Moving Angular core and Router into a separate file would change the number printed beside `index.js`, but users would still download roughly the same JavaScript. Manual chunking can help long-term caching, but it should be introduced for that reason and measured as a loading strategy—not used as cosmetic accounting.

## What I Tested

Every phase kept the same verification loop:

```bash
npm test
npm run build
npm audit --omit=dev
```

For the zoneless change, the manual checklist also included:

- switching between dark and light themes;
- refreshing with the saved theme;
- opening and closing the mobile navigation;
- navigating with Router links and browser history;
- validating the reactive contact form;
- using the blog and portfolio load-more controls;
- refreshing dynamic content URLs directly;
- checking the browser console for hydration errors.

The production build continued to render static pages and generate the sitemap successfully.

## What Actually Mattered

The final numbers tell a useful story:

| Stage | Minified | Gzip |
|---|---:|---:|
| Initial measured build | 556.99 kB | 174.21 kB |
| AnalogJS 2.7 baseline | 559.46 kB | 175.08 kB |
| Zoneless final build | 519.70 kB | 161.69 kB |

The cleanup work improved maintainability, the patch upgrades improved security, and the test repairs improved confidence. Only the zoneless migration substantially changed the amount of JavaScript delivered to the browser.

That distinction matters. Not every worthwhile refactor needs to win a bundle benchmark, and not every smaller chunk represents less code sent to users.

## Next Steps

The next performance pass will focus on images and Largest Contentful Paint. A portfolio can easily spend more network time on one oversized hero image than it saves through days of JavaScript micro-optimization.

I also want to resolve the remaining `front-matter` security advisory without forcing an incompatible dependency, add repeatable bundle measurements to CI, and use Lighthouse results to set budgets for LCP, CLS, CSS, and transferred JavaScript.

For now, the application is current, the tests are honest, the production build is zoneless, and the bundle budget reflects the architecture instead of hiding it. That is a much better result than simply making one warning disappear.
