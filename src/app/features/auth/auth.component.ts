import { Component, inject, signal } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' })),
      ]),
    ]),
  ],
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isSignIn = signal(true);
  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, CustomValidators.eMailCom()]],
    password: ['', [Validators.required]]
  });

  signUpForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, , CustomValidators.eMailCom()]],
    password: ['', [Validators.required, CustomValidators.passwordStrength()]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: [CustomValidators.match('password', 'confirmPassword')]
  });

  toggleForm(): void {
    this.isSignIn.update((v) => !v);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.signInForm.reset();
    this.signUpForm.reset();
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onSignIn(): void {
    if (this.signInForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    const { email, password } = this.signInForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.successMessage.set(`Welcome back, ${user.username}!`);
        setTimeout(() => this.router.navigate(['/home']), 1500);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message || 'Login failed. Please try again.');
      },
    });
  }

  onSignUp(): void {
    if (this.signUpForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    if (!this.authService.isEmailAvailable(this.signUpForm.value.email)) {
      this.isLoading.set(false);
      this.errorMessage.set('Email already exists. Please use a different one.');
      return;
    }

    this.authService.register(this.signUpForm.value).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.successMessage.set('Registration successful! You can now sign in.');
        setTimeout(() => {
          this.toggleForm();
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message || 'Registration failed. Please try again.');
      },
    });
  }

  getControl(formName: 'signIn' | 'signUp', controlName: string) {
    return formName === 'signIn'
      ? this.signInForm.get(controlName)
      : this.signUpForm.get(controlName);
  }

  isInvalid(formName: 'signIn' | 'signUp', controlName: string): boolean {
    const control = this.getControl(formName, controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
