import { Component } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  template: `
    <div
      class="min-h-screen min-w-full text-black  bg-white flex flex-col items-center justify-center dark:bg-gray-800"
    >
      <section
        class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col relative main-section"
      >
        <div class="hero-content container">
          <div
            class="text-gray-600 body-font max-w-md md:max-w-[80%] mx-auto text-black dark:text-white "
          >
            <div class="container px-5 py-24 mx-auto">
              <h1
                class="main-heading text-4xl md:text-4xl lg:text-6xl font-bold relative"
              >
                Hello my name is Armin.
              </h1>
              <p
                class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
              >
                I'm a dedicated frontend developer with over a

                <span
                  class="bg-secondary text-secondary-content inline-block skew-y-3 border-none font-extrabold"
                  >7 years</span
                >
                of experience.
              </p>
              <p
                class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
              >
                Originally from I thrive on new technologies, particularly
                <span
                  class="bg-secondary text-secondary-content inline-block skew-y-3 border-none font-extrabold"
                >
                  Angular
                </span>
                and JavaScript.
              </p>
              <p
                class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
              >
                My mission is to create efficient, scalable, and user-friendly
                web applications, transforming visions into reality.
              </p>
              <p
                class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]"
              >
                When I'm not deep in code or keeping up with the latest tech
                trends, you might catch me in a heated
                <span
                  class="bg-secondary text-secondary-content inline-block skew-y-3 border-none font-extrabold"
                  >football match</span
                >
                or masterfully playing a
                <span
                  class="bg-secondary text-secondary-content inline-block skew-y-3 border-none font-extrabold"
                  >guitar</span
                >
                and making music with friends.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class HomeComponent {
  title = 'portfolio';
}
