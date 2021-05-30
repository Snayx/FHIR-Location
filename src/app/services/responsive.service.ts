import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService{
  private isMobile = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobile.asObservable();

  constructor(public breakpointObserver: BreakpointObserver) {
    /**
     * Subscribe to breakpointObserver
     * under 900px we switch to Mobile view
     */
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile.next(false);
        } else {
          this.isMobile.next(true);
        }
      });
  }
}
