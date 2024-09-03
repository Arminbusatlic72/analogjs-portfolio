import { Component } from '@angular/core';

import { ContactFormComponent } from '../../components/layout/contact-form/contact-form.component';
@Component({
  selector: 'contact',
  standalone: true,
  imports: [ContactFormComponent],

  template: `
    <div
      class="text-black bg-white flex flex-col items-center justify-center dark:bg-gray-800 text-gray-100"
    >
      <section class="text-gray-600 body-font">
        <div class="container px-5 pb-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h2
              class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">/</span>
              contact
            </h2>
            <p class="lg:w-2/3 leading-relaxed text-left dark:text-gray-300">
              Thanks for taking the time to reach out. How can I help you today?
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto relative z-[1000]">
            <app-contact-form />
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class ContactPageComponent {}
