import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // Resposivity breakpoint, true if we switch to mobile page
  isMobile!: boolean;
  // Array for subscription handling
  private _subscriptions: Subscription[] = [];

  // Reference to links
  fhirURL = 'http://www.hl7.org/fhir/location.html';
  githubURL = 'https://github.com/Csaki95/fhir-location-vaccination';

  // Interface code
  interfaceCode = `
  export interface Location {
    id?: string,
    status?: Status,
    operationalStatus?: OperationalStatus,
    name: string,
    description?: string,
    type?: Type[],
    telekom?: ContactPoint,
    address: Address,
    physicalType?: PhysicalType,
    managingOrganization?: string,
    partOf?: string
  }
  `;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.screenSizeCheck();
  }

  ngOnDestroy(): void {
    // Unsub from everything
    this._subscriptions?.forEach((sub) => sub.unsubscribe());
  }

  reference() {
    window.open(this.fhirURL);
  }

  git() {
    window.open(this.githubURL);
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
