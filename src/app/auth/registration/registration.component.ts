import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

/**
 * Registers a new user by email and password
 *  if successful navigates to home page
 *  if not display the subscribed error message
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  // Error message
  authError: any;
  private errorSub?: Subscription;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(100),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    // Subscribe to the error message
    this.errorSub = this.auth.eventAuthError$.subscribe((data) => {
      this.authError = data;
    });
  }

  ngOnDestroy(): void {
    // Clear current error (so it doesn't persist in auth service), and unsubscribe
    this.auth.clearError();
    this.errorSub?.unsubscribe();
  }

  // On signup send email and password to auth service
  onSignUp() {
    this.auth.createUser(
      this.form.get('email')?.value,
      this.form.get('password')?.value
    );
    if (this.authError) this.form.reset();
  }
}
