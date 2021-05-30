import { Component } from '@angular/core';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import {
  faPlus,
  faSignOutAlt,
  faBars,
  faInfo,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

/**
 * Responsive Navbar component
 *  when desktop full top navbar
 *  when mobile bottom navbar that expands upwards
 *
 * On "add new" navigate to the add form
 * On "logout" open confirmation dialog, if accepted log out with authservice
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // Fontawesome icons used in the page
  angularIcon = faAngular;
  homeIcon = faHome;
  addIcon = faPlus;
  infoIcon = faInfo;
  signOutIcon = faSignOutAlt;
  menuIcon = faBars;

  // Stores if menu is open or not
  isOpen: boolean = false;
  // Resposivity breakpoint, true if we switch to mobile page
  isMobile!: boolean;
  // If current route is home
  isHome!: boolean;
  // Array for subscription handling
  private _subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private responsiveService: ResponsiveService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isHome = (this.router.url === '/home') ? true : false;
    this.screenSizeCheck();
  }

  ngOnDestroy(): void {
    // Unsubscribe every subscription
    this._subscriptions?.forEach((sub) => sub.unsubscribe());
  }

  openMenu() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Open confirmation dialog if it's returns true logout from the application
   */
  logOut() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: 'Biztosan?' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.auth.logOut();
    });
  }

  /**
   * Navigate to home page
   */
  home() {
    this.router.navigate(['/home']);
  }

  /**
   * Navigate to the add page
   */
  addNew() {
    this.router.navigate(['/add']);
  }

  /**
   * Navigate to about page
   */
  about() {
    this.router.navigate(['/about']);
  }

  /**
   * Subscribe to resposivity breakpoint
   */
  screenSizeCheck() {
    this._subscriptions.push(
      this.responsiveService.isMobile$.subscribe((data) => {
        this.isMobile = data;
      })
    );
  }
}
