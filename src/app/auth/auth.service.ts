import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  /**
   * Clears errors when leaving the page 
   * This way you don't have persistent errors on multiple pages
   */
  clearError() {
    this.eventAuthError.next('');
  }

  /**
   * Creates user with email and password parameters
   *  if successful navigates to home page
   *  if not write and error to eventAuthError which shows on the page
   * @param email
   * @param password
   */
  createUser(email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  /**
   * Logs in user with email and password parameters
   *  if successful navigates to home page
   *  if not write and error to eventAuthError which shows on the page
   * @param email
   * @param password
   */
  signIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  /**
   * Navigate out to login page THEN
   * sign the user out
   */
  async logOut() {
    this.router.navigate(['/login'])
      .then(() => this.afAuth.signOut())
  }
}
