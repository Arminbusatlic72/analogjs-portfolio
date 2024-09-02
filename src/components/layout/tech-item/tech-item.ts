import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dl class="group flex block justify-between">
      <dt class="group-hover:font-semibold">{{ name }}</dt>
      <dd class="flex">
        <svg
          *ngFor="let star of starsArray"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-yellow-500 group-hover:text-yellow-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      </dd>
    </dl>
  `,
})
export class TechnologyItemComponent implements OnInit {
  @Input() name: string = '';
  @Input() stars: number = 0;

  starsArray: number[] = [];

  ngOnInit(): void {
    this.starsArray = Array(this.stars).fill(0);
  }
}
