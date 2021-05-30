import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { AddressType } from 'src/app/shared/models/enums/_addressType.enum';
import { Location } from 'src/app/shared/models/location.model';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

/**
 * List Item component
 *  when listing on home page this component is one displayed item
 *  recieves a Location object as input which gets displayed
 *
 * to-do: create sub-component for individual fields
 */
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  // Input Location object
  @Input() locationItem!: Location;

  // Resposivity breakpoint, true if we switch to mobile page
  isMobile!: boolean;
  // Array for subscription handling
  private _subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: CrudService<Location>,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.screenSizeCheck();
  }

  ngOnDestroy(): void {
    // Unsubscribe every subscription
    this._subscriptions?.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Returns an appropriate text representation depending on address type
   * @param type AddressType of this Location object
   * @returns Text representation of the type
   */
  getAddressType(type: AddressType): string {
    switch (type) {
      case AddressType.physical:
        return 'Only physical address';
      case AddressType.postal:
        return 'Only postal address';
      case AddressType.both:
        return 'Both physical and postal address';
    }
  }

  /**
   * If the id of the location exists navigate to edit page location with id as parameter
   */
  edit() {
    if (this.locationItem.id)
      this.router.navigate(['edit'], {
        queryParams: { id: this.locationItem.id },
      });
  }

  /**
   * Open confirmation dialog if it's returns true delete the object with the id
   */
  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { title: 'Biztosan törölni akarod?' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && this.locationItem.id)
        this.service.delete('Locations', this.locationItem.id);
    });
  }

  /**
   * Open navigation using Google Maps URLs
   *  first   the site URL
   *  second  the required prefix for navigation without setting start location (defaults start location to current position)
   *  lastly  the name of the location and addressline normalized (remove accented characters and replace spaces with + character)
   */
  openNav() {
    const url = 'https://www.google.com';
    let prefix = '/maps/dir/?api=1&destination=';
    let targetLocation =
      this.locationItem.name + '+' + this.locationItem.address.line;
    window.open(
      url +
        prefix +
        targetLocation
          .split(' ')
          .join('+')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
    );
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
