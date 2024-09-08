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
        <div class="container px-5 pb-24 mx-auto flex flex-wrap">
          <div
            class="flex flex-col w-full mb-12 text-primary-content dark:text-white lg:w-1/2"
          >
            <h2
              class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">/</span>
              contact
            </h2>
            <p class="lg:w-2/3 leading-relaxed text-left dark:text-gray-300">
              Thanks for taking the time to reach out. How can I help you today?
            </p>
            <div class="flex items-center lg:justify-start mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-5 mr-4 text-violet-700 dark:text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clip-rule="evenodd"
                />
              </svg>

              <p class="text-lg">
                I am developer based in
                <span
                  class="text-lg font-semibold text-violet-700 dark:text-yellow-500"
                >
                  Belgrade, Serbia</span
                >
              </p>
            </div>
            <div class="flex items-center lg:justify-start mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5 mr-4 text-violet-700 dark:text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <p class="text-lg">
                If you want to hear my voice, call
                <a
                  href="tel:+381606551972"
                  class="font-semibold hover:underline text-violet-700 dark:text-yellow-500"
                  >+381 60 655 1972</a
                >
              </p>
            </div>
            <div class="flex items-center lg:justify-start mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5 mr-4 text-violet-700 dark:text-yellow-500"
              >
                <path
                  d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
                />
                <path
                  d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
                />
              </svg>

              <p class="text-lg">
                You can email me on
                <a
                  href="mailto:dzarma.busatlic&#64;gmail.com"
                  class="font-semibold hover:underline text-violet-700 dark:text-yellow-500"
                  >dzarma.busatlic&#64;gmail.com</a
                >
              </p>
            </div>
          </div>

          <div
            class="lg:w-1/2 md:w-2/3 relative z-[1000] text-primary-content dark:text-white w-full lg:w-1/2"
          >
            <div class="px-5 md:px-10 mt-18 md:pt-32">
              <app-contact-form></app-contact-form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class ContactPageComponent {}
