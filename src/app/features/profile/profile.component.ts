import { Component, inject, signal, effect, linkedSignal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private readonly fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  profileForm!: FormGroup;
  isEditMode = signal(false);
  isLoading = signal(false);
  countries = ['India', 'USA', 'UK', 'Australia', 'Canada', 'Singapore'];
  genders = ['male', 'female', 'other'];

  // Source signal: the current user's country from the auth service
  userCountrySource = computed(() => this.authService.currentUser()?.country || 'India');

  // linkedSignal: writable signal that is linked to the source signal.
  // It starts as the source value, can be changed manually, but will reset
  // to the source value whenever the source changes.
  newsletterCountry = linkedSignal(() => this.userCountrySource());

  constructor() {
    // Effect to redirect if no user
    effect(() => {
      const user = this.authService.currentUser();
      if (!user) {
        this.router.navigate(['/login']);
      } else if (!this.profileForm) {
        this.initForm(user);
      }
    });

    // Optional: effect to log changes to the linked signal (demonstration)
    effect(() => {
      console.log(`Newsletter country preference changed to: ${this.newsletterCountry()}`);
    });
  }

  initForm(user: any): void {
    this.profileForm = this.fb.group({
      fullName: [user.fullName || '', [Validators.required]],
      email: [user.email],
      phoneNumber: [user.phoneNumber || '', [Validators.pattern('^[0-9]{10}$')]],
      alternatePhone: [user.alternatePhone || '', [Validators.pattern('^[0-9]{10}$')]],
      address: [user.address || ''],
      city: [user.city || ''],
      state: [user.state || ''],
      country: [user.country || ''],
      gender: [user.gender || ''],
      pincode: [user.pincode || '', [Validators.pattern('^[0-9]{6}$')]]
    });

    // Set initial disabled state based on isEditMode
    if (this.isEditMode()) {
      this.profileForm.enable();
      this.profileForm.get('email')?.disable();
    } else {
      this.profileForm.disable();
    }
  }

  toggleEditMode(): void {
    this.isEditMode.update(v => !v);
    if (this.isEditMode()) {
      this.profileForm.enable();
      this.profileForm.get('email')?.disable();
    } else {
      const user = this.authService.currentUser();
      if (user) {
        this.initForm(user);
      }
    }
  }

  onSave(): void {
    if (this.profileForm.invalid) return;

    this.isLoading.set(true);
    this.authService.updateProfile(this.profileForm.value).pipe(take(1)).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isEditMode.set(false);
        // No need to manually reset newsletterCountry – linkedSignal will react to the source change automatically
        this.snackBar.open('Profile updated successfully! ✨', 'Close', {
          duration: 3000,
          panelClass: ['bg-green-600', 'text-white']
        });
      },
      error: () => {
        this.isLoading.set(false);
        this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  // Called when the user changes the newsletter country dropdown
  updateNewsletterCountry(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.newsletterCountry.set(select.value);
  }
}