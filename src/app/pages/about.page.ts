import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { TechnologyItemComponent } from '../../components/layout/tech-item/tech-item';
@Component({
  selector: 'about',
  standalone: true,
  imports: [CommonModule, TechnologyItemComponent],
  template: `
    <div
      class="text-gray-600 bg-white flex flex-col items-center justify-center dark:bg-gray-800 text-gray-100"
    >
      <section class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col">
        <div class="container px-5 pt-24 mx-auto">
          <div class="hero-content text-primary-content dark:text-white">
            <h2
              class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12  text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">/</span> about
              me
            </h2>
            <!-- <h3
              class="text-2xl sm:text-4xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left dark:text-gray-300"
            >
              Introduction
            </h3> -->
            <div class="px-0 md:px-16">
              <p
                class="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-400 leading-loose"
              >
                I am Armin Bušatlić and I am a self-taught developer with
                extensive experience in front-end development, with a focus on
                Angular and JavaScript.<br />
                Over the past two years, he has honed his skills in designing
                and implementing frontend solutions for enterprise-scale
                projects based on SAP CX (Hybris B2C & B2B) and CRM platforms
                like Emarsys.
                <br />
                I am passionate about learning new technologies and continually
                expanding his expertise in the ever-evolving world of front-end
                development.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        class="dark:text-white body-font z-10 flex w-full flex-1 flex-col"
      >
        <div class="container px-5 pb-24 mx-auto">
          <h3
            class="text-3xl md:text-3xl text-violet-700 dark:text-yellow-500 lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 md:text-left transition-all duration-500 ease-out transform"
          >
            <span class="text-yellow-500 dark:text-violet-700">#</span> skills
          </h3>
          <div
            class="py-8 px-0 lg: px-8 px-0 md:px-16 grid md:grid-cols-2 gap-16"
          >
            <div class="leading-loose">
              <h3 class="font-bold text-xl mb-2">Coding</h3>

              <app-tech-item
                *ngFor="let tech of technologies"
                [name]="tech.name"
                [stars]="tech.stars"
              >
              </app-tech-item>
            </div>
            <div class="leading-loose">
              <h3 class="font-bold text-xl mb-2">Languages</h3>

              <app-tech-item
                *ngFor="let language of languages"
                [name]="language.name"
                [stars]="language.stars"
              >
              </app-tech-item>

              <h3 class="font-bold text-xl mb-2 mt-8">Tools / Others</h3>
              <app-tech-item
                *ngFor="let tool of tools"
                [name]="tool.name"
                [stars]="tool.stars"
              >
              </app-tech-item>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class AboutPageComponent {
  technologies = [
    { name: 'HTML/5', stars: 4 },
    { name: 'css/3', stars: 4 },
    // Add more technology items here
  ];
  languages = [
    { name: 'Bosnian (mother tounghe)', stars: 4 },
    { name: 'English (daily use)', stars: 4 },
    // Add more technology items here
  ];
  tools = [
    { name: 'Github', stars: 4 },
    { name: 'Figma', stars: 4 },
    { name: 'VSCode', stars: 4 },
    { name: 'Jira / Atlassian', stars: 5 },
    { name: 'Scrum / Agile', stars: 5 },
    { name: 'SEO', stars: 5 },

    // Add more technology items here
  ];
}
