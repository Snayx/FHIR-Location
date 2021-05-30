import { Component, OnInit } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

/**
 * Logs in the user
 *  if succesfull redirects to home
 *  if not display the subscribed error message
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  // Reference to the angular icon, and error message
  angularIcon = faAngular;
  authError!: string;
  private errorSub?: Subscription;

  constructor(private auth: AuthService, private fb: FormBuilder) {
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

  // Display the built in email validation error messages
  getError() {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  // Call sign in auth service
  onSignIn() {
    this.auth.signIn(
      this.form.get('email')?.value,
      this.form.get('password')?.value
    );
  }
}
