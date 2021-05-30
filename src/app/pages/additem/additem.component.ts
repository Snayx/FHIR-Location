import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CrudService } from 'src/app/services/crud.service';
import { AddressType } from 'src/app/shared/models/enums/_addressType.enum';
import { AddressUse } from 'src/app/shared/models/enums/_addressUse.enum';
import { ContactSystem } from 'src/app/shared/models/enums/_contactSystem.enum';
import { ContactUse } from 'src/app/shared/models/enums/_contactUse.enum';
import { OperationalStatus } from 'src/app/shared/models/enums/_operational-status.enum';
import { PhysicalType } from 'src/app/shared/models/enums/_physical-type.enum';
import { Status } from 'src/app/shared/models/enums/_status.enum';
import { Type } from 'src/app/shared/models/enums/_type.enum';
import { Location } from 'src/app/shared/models/location.model';

/**
 * Add form component
 *  depending on how its called "add", or "edit" it will load the recieved data to the form
 */
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AdditemComponent implements OnInit {
  // Fortawesome icon reference
  angularIcon = faAngular;

  // Form declarations
  addForm: FormGroup;
  searchFilterControl: FormControl;

  // If the current page is used as "Add new", or "Update"
  isUpdate!: boolean;

  // Typedefs
  Status = Status;
  OperationalStatus = OperationalStatus;
  Type = Type;
  PhysicalType = PhysicalType;
  ContactSystem = ContactSystem;
  ContactUse = ContactUse;
  addressUse = AddressUse;
  addressType = AddressType;

  // Filtered list
  public filteredEnum: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public enumArray: string[] = [];

  // Ondesttroy for unsubscribing from search input
  private _onDestroy = new Subject();

  constructor(
    private fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private service: CrudService<Location>,
    private activeRoute: ActivatedRoute
  ) {
    // Main form
    this.addForm = this.fb.group({
      status: [null],
      operationalStatus: [null],
      name: [null, Validators.required],
      description: [null],
      type: [null],
      telekom: this.fb.group({
        contactSystem: [null],
        contactValue: [null],
        contactUse: [null],
      }),
      address: this.fb.group({
        use: [null],
        type: [null],
        line: [null, Validators.required],
        city: [null, Validators.required],
        postalCode: [
          null,
          Validators.compose([
            Validators.required,
            Validators.min(1000),
            Validators.max(9999),
            Validators.pattern('[0-9]{4}'),
          ]),
        ],
        country: [null, Validators.required],
      }),
      physicalType: [null],
      managingOrganization: [null],
      partOf: [null],
    });

    // Selectsearch field
    this.searchFilterControl = this.fb.control(null);
  }

  ngOnInit(): void {
    this.editCheck();
    this.enumToArray();

    // On value changes in search call filter
    this.searchFilterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEnum();
      });
  }

  ngOnDestroy(): void {
    // Unsub from searchFilterControl
    this._onDestroy.unsubscribe();
  }

  /**
   * Check if Component was opened as add, or edit
   *  if it's opened as edit:
   *    - set isUpdate for UI changes
   *    - get the Location Object by the id
   *    - load the object into the form
   */
  editCheck() {
    if (this.activeRoute.snapshot.queryParams['id']) {
      this.isUpdate = true;
      this.service
        .getById('Locations', this.activeRoute.snapshot.queryParams['id'])
        .subscribe((locationItem) => {
          this.addForm.patchValue(locationItem as Location);
        });
    } else {
      this.isUpdate = false;
    }
  }

  /**
   * Returns values of the Object type passed as parameter
   * @param obj passed Object typedef
   * @returns the values as an array
   */
  getKeys(obj: any) {
    return Object.values(obj);
  }

  /**
   * Creates an array from the Enum
   * Then loads the array into the filtered Array (as initialization)
   */
  enumToArray() {
    this.enumArray = Object.values(this.Type).filter(
      (x) => typeof x === 'string'
    );
    this.filteredEnum.next(this.enumArray);
  }

  /**
   * Filters the array values based on the input search term
   *  For each valuechange in search input filter the starting array into a filtered one
   *  In the UI only the filtered options will be visible
   */
  filterEnum() {
    // Get the search keyword
    let search = this.searchFilterControl.value;

    // Filter the list by the search
    this.filteredEnum.next(
      this.enumArray.filter(
        (enumArray) => enumArray.toLowerCase().indexOf(search) > -1
      )
    );
  }

  /**
   * If
   *  Update  - update the value of object that has the id recieved as parameter
   *  Add     - add a new object to the collection
   */
  submitForm(): void {
    let locationItem = this.addForm.value as Location;
    if (this.isUpdate) {
      this.service.update(
        'Locations',
        this.activeRoute.snapshot.queryParams['id'],
        locationItem
      );
    } else {
      this.service.add('Locations', locationItem);
    }
  }
}
