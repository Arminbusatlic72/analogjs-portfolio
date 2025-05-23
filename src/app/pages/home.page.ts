import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
export const routeMeta: RouteMeta = {
  title: 'Home | Armin Busatlic Portfolio',
};

@Component({
  selector: 'home',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <main
      class="min-w-full text-black  bg-white flex flex-col items-center justify-center dark:bg-gray-800"
    >
      <section
        class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col relative main-section"
      >
        <div class="hero-content container">
          <div
            class="text-gray-600 body-font max-w-md md:max-w-[80%] mx-auto text-black dark:text-white "
          >
            <div class="container px-5 pb-10 mx-auto">
              <div class="flex flex-col-reverse lg:flex-row lg:items-center">
                <div
                  class="max-w-[100%] lg:max-w-[70%] w-full lg:pr-8 flex flex-col justify-center mobile-min-height"
                >
                  <p class="text-violet-700 dark:text-yellow-500">Hello!</p>
                  <h1
                    class="animated-heading text-4xl md:text-4xl lg:text-8xl font-bold relative transition-all duration-500 ease-out transform"
                  >
                    I am
                    <span
                      class="main-heading text-violet-700 dark:text-yellow-500"
                    >
                      Armin Bušatlić
                    </span>
                  </h1>
                  <p
                    class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
                  >
                    a Frontend Developer
                  </p>
                  <div class="w-full flex justify-start gap-4">
                    <a
                      title="Download my CV"
                      href="/pdf/ArminBusatlicCV.pdf"
                      class="animated text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg"
                    >
                      Download CV
                    </a>
                    <a
                      title="See my projects"
                      href="/portfolio"
                      class="animated text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-200 rounded text-lg"
                    >
                      Projects
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
})
export default class HomeComponent {}
