import { Component } from '@angular/core';
@Component({
  selector: 'about',
  standalone: true,
  template: `
    <div
      class="bg-white flex flex-col items-center justify-center dark:bg-gray-800 text-gray-100"
    >
      <section class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col">
        <div class="container px-5 py-24 mx-auto">
          <div class="hero-content text-primary-content dark:text-white">
            <h2
              class="text-4xl md:text-4xl text-violet-700 dark:text-yellow-500 lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-center md:text-left transition-all duration-500 ease-out transform"
            >
              About Me
            </h2>
            <h3 class="text-2xl font-bold mb-4">Introduction</h3>

            <p>
              Hello, my name is Armin. I'm a dedicated frontend developer with
              over 7 years of experience.
            </p>
            <h3 class="text-2xl font-bold mb-4">Background</h3>
            <p>
              Originally from Bosnia, now residing in Serbia, I thrive on new
              technologies, particularly Angular and JavaScript.
            </p>
            <h3 class="text-2xl font-bold mb-4">Mission</h3>
            <p>
              My mission is to create efficient, scalable, and user-friendly web
              applications, transforming visions into reality.
            </p>
            <h3 class="text-2xl font-bold mb-4">Hobbies and Interests</h3>
            <p>
              When I'm not deep in code or keeping up with the latest tech
              trends, you might catch me in a heated football match or
              masterfully playing a guitar and making music with friends.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class AboutPageComponent {}
