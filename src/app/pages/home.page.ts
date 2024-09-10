import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div
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
                  class="text-wrapper lg:w-1/2 w-full lg:pr-8 flex flex-col justify-center mobile-min-height"
                >
                  <p>Hello</p>
                  <h1
                    class="text-4xl md:text-4xl lg:text-6xl font-bold relative transition-all duration-500 ease-out transform"
                  >
                    I am
                    <span
                      class="main-heading text-violet-700 dark:text-yellow-500"
                    >
                      Armin<br />
                      Bušatlić
                    </span>
                  </h1>
                  <p
                    class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
                  >
                    I am a Frontend Developer
                  </p>
                  <div class="w-full flex justify-start gap-4">
                    <a
                      href="/pdf/ArminBusatlicCV.pdf"
                      class="animated text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg"
                    >
                      Download CV
                    </a>
                    <a
                      href="/portfolio"
                      class="animated text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-200 rounded text-lg"
                    >
                      Projects
                    </a>
                  </div>
                </div>
                <div
                  class="image-wrapper lg:w-1/2 w-full lg:pl-8 mb-8 lg:mb-0 hidden lg:block"
                >
                  <picture>
                    <source
                      srcset="/arminHeroPortfolio.webp"
                      type="image/webp"
                    />
                    <img
                      class="w-full h-auto"
                      ngSrc="/arminHeroPortfolio.png"
                      alt="Armin Image"
                      priority
                      width="400"
                      height="500"
                    />
                  </picture>
                </div>
              </div>

              <!-- <div class="flex flex-col-reverse lg:flex-row items-center">
                <div class="text-wrapper lg:w-1/2 w-full lg:pr-8">
                  <p>Hello</p>
                  <h1
                    class="text-4xl md:text-4xl lg:text-6xl font-bold relative transition-all duration-500 ease-out transform"
                  >
                    I am
                    <span
                      class="main-heading text-violet-700 dark:text-yellow-500"
                    >
                      Armin<br />
                      Busatlic
                    </span>
                  </h1>
                  <p
                    class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
                  >
                    I am a Frontend Developer
                  </p>
                  <div
                    class="w-full flex justify-center sm:justify-start gap-4"
                  >
                    <button
                      class="animated text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg"
                    >
                      Download my CV
                    </button>
                    <button
                      class="animated text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-200 rounded text-lg"
                    >
                      Projects
                    </button>
                  </div>
                </div>
                <div class="image-wrapper lg:w-1/2 w-full lg:pl-8 mb-8 lg:mb-0">
                  <img
                    class="w-full h-auto"
                    src="/arminHero.png"
                    alt="Armin Image"
                  />
                </div>
              </div> -->
            </div>

            <!-- <div class="container px-5 py-24 mx-auto">
              <div class="text-wrapper">
                <p>Hello</p>
                <h1
                  class="text-4xl md:text-4xl lg:text-6xl  font-bold relative transition-all duration-500 ease-out transform"
                >
                  I am
                  <span
                    class="main-heading text-violet-700 dark:text-yellow-500"
                    >Armin<br />
                    Busatlic</span
                  >
                </h1>
                <p
                  class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
                >
                  A am Frontend Developer
                </p>
              </div>
              <div class="image-wrapper">
                <img
                  class="w-full h-auto mb-8"
                  src="/arminHero.jpg"
                  alt="Armin Image"
                />
              </div>
              <div class="w-full flex justify-center sm:justify-start gap-4">
                <button
                  class="animated text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg"
                >
                  Download my CV
                </button>
                <button
                  class="animated text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-200 rounded text-lg"
                >
                  Projects
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class HomeComponent {
  title = 'portfolio';
}
