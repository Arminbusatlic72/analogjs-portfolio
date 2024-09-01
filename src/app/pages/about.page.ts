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
      <section class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col">
        <div class="py-8 px-6 md:px-16 grid md:grid-cols-2 gap-16">
          <div class="leading-loose">
            <h3 class="font-bold text-xl mb-2">Coding</h3>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">HTML/5</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">CSS/3 (+ SASS)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Tailwind 3.x</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Vue 2 / 3</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">PHP 8.1 (16 years)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">
                Laravel 9.x (8 years) + certified
              </dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">NodeJS / Express</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Typescript</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">MySQL (16 years)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Postgress</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">JSON / XML</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">
                Elasticsearch / Cloudsearch
              </dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">AWS / Google Cloud</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">GIT</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">CLI</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Docker</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">CI / CD</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
          </div>
          <div class="leading-loose">
            <h3 class="font-bold text-xl mb-2">Languages</h3>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Dutch (mother tongue)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">English (daily use)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">German (survivable)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">French (un petit peu)</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <h3 class="font-bold text-xl mb-2 mt-8">Tools / Others</h3>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Apple / MacOS</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Github / Gitlab</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Figma</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i
                ><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">PHPStorm</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Jira / Atlassian</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Scrum / Agile</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">SEO</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Insomnia / Postman</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">Gamification</dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><!----><i class="icon-star-empty text-gray-400"></i>
              </dd>
            </dl>
            <dl class="group flex block justify-between">
              <dt class="group-hover:font-semibold">
                Modern Browsers (default: Chrome)
              </dt>
              <dd class="flex-shrink-0">
                <i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!----><i class="icon-star group-hover:text-yellow-600"></i
                ><!---->
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class AboutPageComponent {}
