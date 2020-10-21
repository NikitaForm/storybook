import * as _ from 'lodash';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as viewModels from '../../view-models';
import { Subscription } from 'rxjs';
import { StatusItem, statusList } from './status-list';

@Component({
  selector: 'operator-offer-list-lookup-form-2',
  templateUrl: './offer-list-lookup-form.component.html',
  styleUrls: ['./offer-list-lookup-form.component.scss']
})
export class OfferListLookupForm2Component implements OnInit, OnDestroy {
  @Input() criteria: viewModels.OffersLookupCriteria;
  @Output() filterChanged = new EventEmitter<viewModels.OffersLookupCriteria>();
  form: FormGroup;
  statusList: Array<StatusItem> = statusList;
  private formValueChangesSubscription: Subscription;

  ngOnInit(): void {
    this.form = new FormGroup({
        status: new FormControl(this.criteria.status)
      }
    );

    this.formValueChangesSubscription = this.form.valueChanges.subscribe(data => {
      let hasChanged = false;

      const newCriteria = _.cloneDeep(this.criteria);

      if (newCriteria.status !== data.status) {
        newCriteria.status = data.status;
        hasChanged = true;
      }

      if (hasChanged) {
        this.filterChanged.emit(newCriteria);
      }
    });
  }

  ngOnDestroy(): void {
    this.formValueChangesSubscription.unsubscribe();
  }

  clearCriteria(): void {
    this.form.patchValue({
      status: null
    });
  }

}
