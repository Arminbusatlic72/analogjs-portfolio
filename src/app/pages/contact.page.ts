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
            <!-- <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600"
                    >Name</label
                  >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600"
                    >Message</label
                  >
                  <textarea
                    id="message"
                    name="message"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  class="animated flex mx-auto text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Button
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class ContactPageComponent {}
