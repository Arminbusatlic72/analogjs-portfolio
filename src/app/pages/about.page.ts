import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = { title: 'About | Armin Busatlic Portfolio' };

@Component({
  selector: 'about',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'page-host' },
  template: `
    <main class="about-page">
      <section class="about-hero page-frame">
        <p class="eyebrow">About / Product engineering</p>
        <h1>Frontend depth.<br /><em>Product perspective.</em></h1>
        <div class="about-intro">
          <p class="about-lead">I turn product requirements and design systems into reliable interfaces—across AI tools, enterprise commerce, and headless content platforms.</p>
          <p>I'm Armin Bušatlić, a frontend developer with more than seven years of experience. I work across React, Next.js, Angular, and TypeScript, with a practical focus on maintainability, performance, and clear collaboration.</p>
        </div>
      </section>

      <section class="about-stats" aria-label="Experience summary">
        <div class="page-frame about-stats-grid">
          <p><strong>7+</strong><span>Years building<br />for the web</span></p>
          <p><strong>22</strong><span>Documented<br />client projects</span></p>
          <p><strong>6</strong><span>Commerce markets<br />delivered</span></p>
          <p><strong>3</strong><span>Core lanes: AI,<br />commerce, content</span></p>
        </div>
      </section>

      <section class="about-section-block page-frame">
        <div class="about-section-heading"><p>01 / Practice</p><h2>How I work</h2></div>
        <div class="process-grid">
          @for (item of process; track item.number) {
            <article><span>{{ item.number }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></article>
          }
        </div>
      </section>

      <section class="about-section-block page-frame">
        <div class="about-section-heading"><p>02 / Evidence</p><h2>Selected impact</h2></div>
        <div class="evidence-grid">
          @for (impact of impacts; track impact.project) {
            <article>
              <div><span>{{ impact.project }}</span><b>{{ impact.date }}</b></div>
              <strong>{{ impact.metric }}</strong>
              <p>{{ impact.description }}</p>
              <a [routerLink]="['/portfolio', impact.slug]">Read case study <span>↗</span></a>
            </article>
          }
        </div>
      </section>

      <section class="about-section-block toolkit-section page-frame">
        <div class="about-section-heading"><p>03 / Capabilities</p><h2>Working toolkit</h2></div>
        <p class="toolkit-intro">Grouped by how I use each technology—not by subjective star ratings.</p>
        <div class="toolkit-grid">
          @for (group of skillGroups; track group.title; let i = $index) {
            <article><span>0{{ i + 1 }}</span><h3>{{ group.title }}</h3><ul>@for (skill of group.skills; track skill) { <li>{{ skill }}</li> }</ul></article>
          }
        </div>
        <div class="language-row"><span>Languages</span><p>Bosnian — native</p><p>English — daily professional use</p></div>
      </section>

      <section class="about-cta page-frame">
        <div><p class="eyebrow">Next step</p><h2>See the systems behind the résumé.</h2></div>
        <div><a class="button button-primary" routerLink="/portfolio">View selected work <span>↗</span></a><a class="text-link" href="/pdf/Armin%20CV%20Jun%202026.pdf">Download résumé <span>↓</span></a></div>
      </section>
    </main>
  `,
})
export default class AboutPageComponent {
  readonly process = [
    { number: '01', title: 'Understand the system', description: 'Start with users, constraints, existing architecture, and the business outcome—not an isolated interface.' },
    { number: '02', title: 'Build incrementally', description: 'Turn large changes into reviewable steps, keeping working software available throughout delivery.' },
    { number: '03', title: 'Validate in production', description: 'Test real states, integrations, accessibility, and responsive behavior before calling a feature complete.' },
  ];

  readonly impacts = [
    { project: 'Basiqdental', date: '2022–2024', metric: '6 markets', description: 'Delivered country-specific SAP Spartacus storefront themes and led the move to Composable Storefront 2211.', slug: 'basiqdental' },
    { project: 'Kabinet Brewery', date: '2022–present', metric: '150+ SKUs', description: 'Migrated a multilingual regional brewery store to WooCommerce while preserving SEO routes and payment flows.', slug: 'kabinet' },
    { project: 'DNA Sandbox', date: '2026', metric: 'AI research platform', description: 'Shipped streaming, knowledge-backed research workflows with authentication, subscriptions, and reactive data.', slug: 'dna-sandbox' },
  ];

  readonly skillGroups = [
    { title: 'Use regularly', skills: ['TypeScript', 'React', 'Next.js', 'Angular', 'HTML & CSS', 'SCSS', 'Tailwind CSS', 'Git & GitHub', 'Figma'] },
    { title: 'Production experience', skills: ['Vercel AI SDK', 'Convex', 'Clerk', 'Stripe', 'SAP Spartacus', 'Hybris CMS', 'Sanity & GROQ', 'WordPress & WooCommerce', 'Gatsby', 'GraphQL', 'Cypress'] },
    { title: 'Currently exploring', skills: ['RAG pipelines', 'Multi-model AI workflows', 'AI tool calling', 'Advanced Angular signals', 'Agent-oriented product patterns'] },
  ];
}
