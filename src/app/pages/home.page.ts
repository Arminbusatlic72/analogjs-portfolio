import { Component } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  template: `
    <div
      class="min-h-screen min-w-full text-black  bg-white flex flex-col items-center justify-center pt-20 dark:bg-gray-800"
    >
      <section class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col">
        <div class="hero-content container px-5 py-24 mx-auto>">
          <div
            class="text-gray-600 body-font max-w-md md:max-w-[80%] mx-auto text-black dark:text-white "
          >
            <h1
              class="before:bg-primary after:bg-primary relative mb-5 w-fit text-3xl font-bold
                     before:absolute before:left-[98%] before:top-[70%] before:-z-10 before:h-5
                     before:w-5 before:translate-y-0 before:transition-all before:duration-500 after:absolute
                     after:left-[-15px] after:top-[70%] after:-z-10 after:h-5 after:w-5 after:translate-y-0 after:transition-all
                     after:duration-500 hover:before:translate-y-[-20px] hover:after:translate-y-[-20px] md:text-5xl"
            >
              Hello my name is Armin.
            </h1>
            <p class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]">
              I'm a dedicated frontend developer with over a

              <span
                class="bg-secondary text-secondary-content inline-block skew-y-3 border-none font-extrabold"
                >7 years</span
              >
              of experience.
            </p>
            <p class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]">
              Originally from
              <span
                class="inline-block skew-y-3 p-1 border-none bg-gradient-to-r from-blue-600 via-white to-yellow-600 font-extrabold text-black"
                >Bosnia</span
              >, now residing in
              <span
                class="inline-block skew-y-3 p-1 border-none bg-gradient-to-b from-blue-600 via-white to-red-600 font-extrabold text-black"
                >Serbia,</span
              >
              I thrive on new technologies, particularly
              <span
                class="bg-secondary text-secondary-content inline-block skew-y-3 border-none font-extrabold"
              >
                Angular
              </span>
              and JavaScript.
            </p>
            <p class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]">
              My mission is to create efficient, scalable, and user-friendly web
              applications, transforming visions into reality.
            </p>
            <p class="mb-5 text-lg md:text-2xl md:leading-8 lg:leading-[3rem]">
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
      </section>
    </div>
  `,
})
export default class HomeComponent {
  title = 'portfolio';
}
