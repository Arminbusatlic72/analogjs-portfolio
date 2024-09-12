import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],

  template: `
    <form
      [formGroup]="contactForm"
      (ngSubmit)="onSubmit($event)"
      name="contact-form"
      method="POST"
      data-netlify="true"
      data-netlify-recaptcha="true"
      class="flex flex-wrap -m-2"
    >
      <input type="hidden" name="form-name" value="contact-form" />
      <div class="p-2 w-1/2">
        <div class="relative">
          <label
            for="name"
            class="leading-7 text-sm text-gray-600 dark:text-gray-400"
            >Name</label
          >
          <input
            type="text"
            id="name"
            name="name"
            formControlName="name"
            [ngClass]="applyValidationStyles('name')"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <div
            *ngIf="shouldShowError('name')"
            class="text-red-700 text-sm mt-1"
          >
            <p *ngIf="contactForm.get('name')?.hasError?.('required')">
              Name is required.
            </p>
          </div>
        </div>
      </div>
      <div class="p-2 w-1/2">
        <div class="relative">
          <label
            for="email"
            class="leading-7 text-sm text-gray-600 dark:text-gray-400"
            >Email</label
          >
          <input
            type="email"
            id="email"
            name="email"
            formControlName="email"
            [ngClass]="applyValidationStyles('email')"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out invalid:border-red-700"
          />
          <div
            *ngIf="shouldShowError('email')"
            class="text-red-700 text-sm mt-1"
          >
            <p *ngIf="contactForm.get('email')?.hasError('required')">
              Email is required.
            </p>
            <p
              *ngIf="
                contactForm.get('email')?.hasError('email') &&
                !contactForm.get('email')?.hasError('required')
              "
            >
              Please enter a valid email address.
            </p>
          </div>
        </div>
      </div>
      <div class="p-2 w-full">
        <div class="relative">
          <label
            for="message"
            class="leading-7 text-sm text-gray-600 dark:text-gray-400"
            >Message</label
          >
          <textarea
            id="message"
            name="message"
            formControlName="message"
            [ngClass]="applyValidationStyles('message')"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
          <div
            *ngIf="shouldShowError('message')"
            class="text-red-700 text-sm mt-1"
          >
            <p *ngIf="contactForm.get('message')?.hasError?.('required')">
              Message is required.
            </p>
          </div>
        </div>
      </div>
      <div class="p-2 w-full">
        <button
          type="submit"
          class="animated flex mx-auto mb-2 md:mx-0 text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Submit message
        </button>
        <div data-netlify-recaptcha="true"></div>
      </div>
    </form>
    <!-- Hidden Netlify form -->
    <form
      #hiddenForm
      name="contact-form1"
      method="POST"
      data-netlify="true"
      style="display:none"
    >
      <input type="hidden" name="form-name" value="contact-form1" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
      <button type="submit">Submit</button>
    </form>
  `,
})
export class ContactFormComponent {
  constructor(private fb: FormBuilder) {}
  @ViewChild('hiddenForm', { static: true })
  hiddenForm!: ElementRef<HTMLFormElement>;

  isSubmitted = false;
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.contactForm.valid) {
      this.isSubmitted = true;

      const formValues = this.contactForm.value;

      const hiddenForm = this.hiddenForm.nativeElement;
      const formElements = hiddenForm.elements as any;

      formElements['name'].value = formValues.name;
      formElements['email'].value = formValues.email;
      formElements['message'].value = formValues.message;

      hiddenForm.submit();
    }
  }

  applyValidationStyles(inputName: string) {
    const control = this.contactForm.get(inputName);
    return {
      'border-red-700':
        control?.invalid &&
        (control?.touched || control?.dirty || this.isSubmitted),
    };
  }
  shouldShowError(controlName: string) {
    const control = this.contactForm.get(controlName);
    return (
      control?.invalid &&
      (control?.touched || control?.dirty || this.isSubmitted)
    );
  }
}
