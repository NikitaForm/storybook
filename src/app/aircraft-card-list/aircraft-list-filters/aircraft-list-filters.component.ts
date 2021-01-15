import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

// import * as models from '../../../domain/models';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
// import { AvailableFlightTab } from '../../../domain/graphql-types';

@Component({
  selector: 'aircraft-list-filters',
  templateUrl: 'aircraft-list-filters.component.html',
  styleUrls: ['aircraft-list-filters.component.scss']
})
export class AircraftListFiltersComponent implements OnInit, OnChanges, OnDestroy {

  @Input() intIdAutoCompleteOptions: Array<string>;
  @Input() tailNumberAutoCompleteOptions: Array<string>;
  @Input() filterValues = {} as any;
  //
  @Output() onUserInput = new EventEmitter<object>();
  @Output() onFilterValuesChanged = new EventEmitter<any>();

  form: FormGroup;
  datePickerOptions: any;

  startDate = new Date('2017/01/01');
  endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  // sortingModeValues = [AvailableFlightTab.Upcoming, AvailableFlightTab.Past, AvailableFlightTab.All];

  private formValueChangesSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      departureDateControl: new FormControl(this.filterValues.departureDate),
      intIdControl: new FormControl(this.filterValues.intId),
      tailNumberControl: new FormControl(this.filterValues.tailNumber),
      sortingModeControl: new FormControl(this.filterValues.sortingMode)
    });

    this.formValueChangesSubscription = this.form.valueChanges.subscribe(data => {
      const filter = _.cloneDeep(this.filterValues);
      let changed = false;

      if (data.departureDateControl !== filter.departureDate) {
        changed = true;
        filter.departureDate = data.departureDateControl;
      }

      if (data.intIdControl !== filter.intId) {
        changed = true;
        filter.intId = data.intIdControl;
      }

      if (data.tailNumberControl !== filter.tailNumber) {
        changed = true;
        filter.tailNumber = data.tailNumberControl;
      }

      if (data.sortingModeControl !== filter.sortingMode) {
        changed = true;
        filter.sortingMode = data.sortingModeControl;
      }

      // if (changed) {
      //   this.onFilterValuesChanged.emit(filter);
      // }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.form === undefined) {
      return;
    }

    if (changes.filterValues) {
      const filter = _.cloneDeep(changes.filterValues.currentValue);

      if (filter.departureDate !== this.form.get('departureDateControl').value) {
        this.form.get('departureDateControl').setValue(filter.departureDate, { emitEvent: false });
      }

      if (filter.intId !== this.form.get('intIdControl').value) {
        this.form.get('intIdControl').setValue(filter.intId, { emitEvent: false });
      }

      if (filter.tailNumber !== this.form.get('tailNumberControl').value) {
        this.form.get('tailNumberControl').setValue(filter.tailNumber, { emitEvent: false });
      }

      if (filter.sortingMode !== this.form.get('sortingModeControl').value) {
        this.form.get('sortingModeControl').setValue(filter.sortingMode, {emitEvent: false});
      }
    }
  }

  ngOnDestroy(): void {
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  loadAutocompleteOptions(filterValue, filterName): void {
    // if (!filterValue) { return null; }
    // this.onUserInput.emit({
    //   filterValue,
    //   filterName
    // });
  }

  clear(): void {
    // this.onFilterValuesChanged.emit(new models.FilterOptions());
  }
}
