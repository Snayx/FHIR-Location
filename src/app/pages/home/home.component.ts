import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { Location } from 'src/app/shared/models/location.model';

/**
 * Home page lists current locations with listItem module
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Form declaration
  search: FormGroup;

  // Resposivity breakpoint, true if we switch to mobile page
  isMobile!: boolean;
  // Array for subscription handling
  private _subscriptions: Subscription[] = [];
  // Managing the location subsciption
  private _locationSubscription: Subscription | null = null;
  // List of location objects
  Locations: Location[] | null = null;

  constructor(
    private responsiveService: ResponsiveService,
    private service: CrudService<Location>,
    private fb: FormBuilder
  ) {
    this.search = this.fb.group({
      searchInput: [null],
      type: ['name'],
    });
  }

  ngOnInit(): void {
    // Get observable location changes
    this._locationSubscription = this.service
      .get('Locations', 'name')
      .subscribe((data) => {
        this.Locations = data;
      });

    this.screenSizeCheck();
  }

  ngAfterViewInit(): void {
    // Only start search when the list of children is already loaded
    this.searchSubscription();
  }

  ngOnDestroy(): void {
    // Unsub from everything
    this._subscriptions?.forEach((sub) => sub.unsubscribe());
    this._locationSubscription?.unsubscribe();
  }

  /**
   * Subscribe to the list of Locations
   *  - if searchbar has value query for the objects that have matching value
   *  - if searchbar is empty get the full Location list
   */
  searchSubscription() {
    this._subscriptions.push(
      this.search.get('searchInput')!.valueChanges.subscribe((val) => {
        if (val) {
          this._locationSubscription?.unsubscribe();
          this._locationSubscription = this.service
            .get(
              'Locations',
              this.search.get('type')?.value,
              this.search.get('type')?.value,
              this.search.get('searchInput')?.value
            )
            .subscribe((data) => {
              this.Locations = data;
            });
        } else {
          this._locationSubscription?.unsubscribe();
          this._locationSubscription = this.service
            .get('Locations', 'name')
            .subscribe((data) => {
              this.Locations = data;
            });
        }
      })
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
