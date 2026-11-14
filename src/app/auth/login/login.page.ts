import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonNote,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline, alertCircleOutline, globeOutline } from 'ionicons/icons';
import { Auth } from '../../services/auth/auth';
import { ApiError } from '../../services/call/call-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonNote,
    IonSpinner,
  ],
})
export class LoginPage {

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    companySlug: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly submitting = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      alertCircleOutline,
      globeOutline
    });
  }

  togglePassword(): void {
    this.showPassword.update((visible) => !visible);
  }

  /** True once the field is both invalid and has been interacted with. */
  isInvalid(field: 'email' | 'password' | 'companySlug'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  submit(): void {
    if (this.submitting()) {
      return;
    }

    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.form.disable({ emitEvent: false });

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.form.enable({ emitEvent: false });
        const redirectTo = '/modules/home';
        this.router.navigateByUrl(redirectTo, { replaceUrl: true });
      },
      error: (error: ApiError) => {
        this.submitting.set(false);
        this.form.enable({ emitEvent: false });
        this.errorMessage.set(
          error.status === 401
            ? 'Incorrect email or password.'
            : error.message ?? 'Unable to sign in. Please try again.',
        );
      },
    });
  }

}
