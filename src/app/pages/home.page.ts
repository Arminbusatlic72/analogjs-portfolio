import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = { title: 'Armin Busatlic | Frontend & AI Product Engineer' };

@Component({
  selector: 'home', standalone: true, imports: [RouterLink], host: { class: 'page-host' },
  template: `
    <main class="home-page">
      <section class="hero page-frame">
        <div class="hero-copy hero-reveal">
          <p class="eyebrow">Frontend systems / AI products / Belgrade</p>
          <h1>I build the interface between <em>ambitious ideas</em> and working software.</h1>
          <p class="hero-summary">Seven-plus years shipping product interfaces—from multi-model AI research tools to enterprise commerce and headless content platforms.</p>
          <div class="hero-actions">
            <a class="button button-primary" routerLink="/portfolio">View selected work <span>↗</span></a>
            <a class="text-link" href="/pdf/Armin%20CV%20Jun%202026.pdf">Download résumé <span>↓</span></a>
          </div>
          <p class="hero-availability"><i></i> Available for frontend and full-stack roles <span>Remote / Belgrade</span></p>
        </div>
        <div class="console-stage hero-reveal">
          <aside class="systems-console" aria-label="Shipped systems summary">
            <div class="console-head"><span>shipped.systems</span><span class="live-state"><i></i> online</span></div>
            <div class="console-intro"><span class="console-prompt">$</span><span>inspect --capabilities</span></div>
            <a routerLink="/portfolio/dna-sandbox" class="system-row"><span class="system-index">01</span><span><strong>AI product integration</strong><small>Vercel AI SDK · Claude · Gemini · RAG</small></span><b>LIVE</b></a>
            <a routerLink="/portfolio/basiqdental" class="system-row"><span class="system-index">02</span><span><strong>Enterprise commerce</strong><small>Angular · SAP Spartacus · Hybris</small></span><b>3 BUILDS</b></a>
            <a routerLink="/portfolio/kriz-winery-next-sanity" class="system-row"><span class="system-index">03</span><span><strong>Headless platforms</strong><small>Next.js · Sanity · WordPress · Contentful</small></span><b>SHIPPED</b></a>
            <a routerLink="/portfolio" class="system-row"><span class="system-index">04</span><span><strong>Frontend systems</strong><small>Angular · React · TypeScript · Design systems</small></span><b>7+ YRS</b></a>
            <div class="console-foot"><span>22 case studies indexed</span><span>2026.08</span></div>
          </aside>
        </div>
      </section>
      <section class="proof-strip" aria-label="Core experience">
        <div class="page-frame proof-grid">
          <p><strong>7+</strong><span>years building<br />for the web</span></p>
          <p><strong>22</strong><span>documented<br />client projects</span></p>
          <p><strong>3</strong><span>deep product lanes:<br />AI, commerce, content</span></p>
          <a routerLink="/about">How I work <span>→</span></a>
        </div>
      </section>
    </main>
  `,
})
export default class HomeComponent {}
