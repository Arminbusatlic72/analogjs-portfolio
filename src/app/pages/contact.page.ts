import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { ContactFormComponent } from '../../components/layout/contact-form/contact-form.component';

export const routeMeta: RouteMeta = { title: 'Contact | Armin Busatlic Portfolio' };

@Component({
  selector: 'contact',
  standalone: true,
  imports: [ContactFormComponent],
  host: { class: 'page-host' },
  template: `
    <main class="contact-page">
      <section class="contact-layout page-frame">
        <div class="contact-copy">
          <p class="eyebrow">Contact / Start a conversation</p>
          <h1>Building something that needs a <em>strong frontend?</em></h1>
          <p class="contact-lead">Tell me what your team is building, where the product is today, and what kind of engineering support would make the difference.</p>
          <div class="contact-availability"><i></i><span><strong>Available for frontend and full-stack roles</strong><small>Remote or Belgrade, Serbia</small></span></div>
          <address class="contact-details">
            <ul>
              <li><span class="contact-detail-label">Email</span><div class="contact-detail-value"><a href="mailto:dzarma.busatlic@gmail.com">dzarma.busatlic@gmail.com <span aria-hidden="true">↗</span></a></div></li>
              <li><span class="contact-detail-label">Phone</span><div class="contact-detail-value"><a href="tel:+381606551972">+381 60 655 1972</a></div></li>
              <li><span class="contact-detail-label">Profiles</span><div class="contact-detail-value contact-profile-links"><a href="https://www.linkedin.com/in/armin-busatlic/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href="https://github.com/Arminbusatlic72" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div></li>
            </ul>
          </address>
        </div>
        <div class="contact-form-panel">
          <div class="contact-form-heading"><span>01 / Your message</span><p>I usually respond within one business day.</p></div>
          <app-contact-form />
        </div>
      </section>
    </main>
  `,
})
export default class ContactPageComponent {}
