// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-social-icon-list',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="">
//       <a href="https://twitter.com/chrisjperko" target="_blank">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           data-name="Layer 1"
//           viewBox="0 0 24 24"
//           id="twitter"
//         >
//           <path
//             d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"
//           ></path>
//         </svg>
//       </a>
//       <a href="https://www.linkedin.com/in/chris-perko/" target="_blank">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           data-name="Layer 1"
//           viewBox="0 0 24 24"
//           id="linkedin"
//         >
//           <path
//             d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"
//           ></path>
//         </svg>
//       </a>
//     </div>
//   `,
//   styles: [
//     `
//       svg {
//         width: 40px;
//         fill: var(--color-secondary);
//         transition: fill 0.2s ease-in-out;
//       }

//       svg:hover {
//         fill: var(--color-accent);
//       }
//     `,
//   ],
// })
// export class SocialIconListComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-icon-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-4 justify-center">
      <a
        title="Visit my GitHub profile"
        href="https://github.com/Arminbusatlic72"
        target="_blank"
        class="hover:text-blue-700 dark:hover:text-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="github"
          class="text-black w-8 h-8 fill-current transition-colors duration-200 ease-in-out dark:text-gray-100"
        >
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.005-.404 1.022.005 2.048.138 3.006.404 2.291-1.552 3.299-1.23 3.299-1.23.653 1.653.241 2.873.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.624-5.479 5.921.43.37.823 1.096.823 2.21v3.284c0 .319.218.694.825.576 4.765-1.588 8.201-6.084 8.201-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
      </a>
      <a
        title="Visit my Linkedin profile"
        href="https://www.linkedin.com/in/armin-busatlic/"
        target="_blank"
        class="hover:text-blue-700 dark:hover:text-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="linkedin"
          class="text-black w-8 h-8 fill-current transition-colors duration-200 ease-in-out dark:text-gray-100"
        >
          <path
            d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"
          ></path>
        </svg>
      </a>
    </div>
  `,
  styles: [],
})
export class SocialIconListComponent {}
