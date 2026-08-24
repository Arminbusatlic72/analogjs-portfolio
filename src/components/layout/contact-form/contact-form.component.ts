import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit($event)" name="contact-form" method="POST" data-netlify="true" class="contact-form" novalidate>
      <input type="hidden" name="form-name" value="contact-form" />
      <div class="contact-field contact-field-half">
        <label for="name">Your name <span>Required</span></label>
        <input type="text" id="name" name="name" formControlName="name" autocomplete="name" [class.field-invalid]="shouldShowError('name')" placeholder="How should I address you?" />
        @if (shouldShowError('name')) { <p class="field-error">Please enter your name.</p> }
      </div>
      <div class="contact-field contact-field-half">
        <label for="email">Email address <span>Required</span></label>
        <input type="email" id="email" name="email" formControlName="email" autocomplete="email" [class.field-invalid]="shouldShowError('email')" placeholder="you@company.com" />
        @if (shouldShowError('email')) {
          <p class="field-error">{{ contactForm.get('email')?.hasError('required') ? 'Please enter your email.' : 'Please enter a valid email address.' }}</p>
        }
      </div>
      <div class="contact-field contact-field-full">
        <label for="message">What are you building? <span>Required</span></label>
        <textarea id="message" name="message" formControlName="message" [class.field-invalid]="shouldShowError('message')" placeholder="A short description of the product, role, or problem is enough."></textarea>
        @if (shouldShowError('message')) { <p class="field-error">Please include a short message.</p> }
      </div>
      <div class="contact-submit">
        <button type="submit" class="button button-primary">Send message <span>↗</span></button>
        <p>Your details are used only to reply to this message.</p>
      </div>
    </form>

    <form #hiddenForm name="contact-form1" method="POST" data-netlify="true" hidden>
      <input type="hidden" name="form-name" value="contact-form1" />
      <input type="text" name="name" /><input type="email" name="email" /><textarea name="message"></textarea>
    </form>
  `,
})
export class ContactFormComponent {
  @ViewChild('hiddenForm', { static: true }) hiddenForm!: ElementRef<HTMLFormElement>;
  isSubmitted = false;
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitted = true;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const values = this.contactForm.value;
    const elements = this.hiddenForm.nativeElement.elements as any;
    elements['name'].value = values.name;
    elements['email'].value = values.email;
    elements['message'].value = values.message;
    this.hiddenForm.nativeElement.submit();
  }

  shouldShowError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control?.invalid && (control.touched || control.dirty || this.isSubmitted));
  }
}
