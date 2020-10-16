import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as sharedComponents from '../../../../../shared/components';
import * as sharedModels from '../../../../../shared/models';
import * as coreModels from '../../../../../core/models';
import * as models from '../../../domain/models';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'operator-accept-offer-form',
  templateUrl: './accept-offer-form.component.html',
  styleUrls: ['./accept-offer-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AcceptOfferFormComponent extends sharedComponents.ValidatableFormComponent implements OnChanges, OnInit, OnDestroy {
  @Input() selectedAircraft: models.Aircraft;
  @Input() offerBid: number;
  @Input() legs: Array<models.LegRequest>;
  @Input() serviceClass: sharedModels.ServiceClassEnum;
  @Input() category: models.AircraftCategory;
  @Input() dba: coreModels.DBA;
  @Input() orgLegalName: string;
  @Input() aircraftList: Array<models.Aircraft>;
  @Input() purchaseOffer: models.OperatorPurchaseOffer;
  @Output() aircraftChange = new EventEmitter<models.Aircraft>();
  @Output() offerBidChange = new EventEmitter<number>();
  @Output() changeMode = new EventEmitter<models.SidepanelModeEnum>();

  aircraftListFilter: string = null;
  aircraftListFiltered: Array<models.Aircraft>;
  numberMask: any;

  private formValueChangesSubscription: Subscription;
  public defaultItem: { modelName: string, aircraftId: number } = { modelName: 'Select aircraft', aircraftId: null };
  validationMessages: any;
  constructor() {
    super();
    this.validationMessages = {
      aircraftId: {
        required: 'Aircraft is required',
      },
      offerBid: {
        required: 'Offer Price is required'
      }
    };

    this.numberMask = createNumberMask({
      allowDecimal: true,
      prefix: '$',
      suffix: ''
    });
  }

  ngOnDestroy(): void {
    this.formValueChangesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.aircraftListFiltered = this.aircraftList;
    this.form = new FormGroup({
      aircraftId: new FormControl(_.get(this.selectedAircraft, 'aircraftId', null), [Validators.required, this.validateAircraft()]),
      offerBid: new FormControl(this.offerBid, this.purchaseOffer.openOffer ? Validators.required : null),
      terms: new FormControl(this.purchaseOffer.offerSubmitted, Validators.requiredTrue),
      operatorCharterAgreement: new FormControl(this.purchaseOffer.offerSubmitted, Validators.requiredTrue)
    });

    this.formValueChangesSubscription = this.form.valueChanges.subscribe(data => {
      const aircraftId = _.get(this.selectedAircraft, 'aircraftId', null);
      if (_.isEqual(aircraftId, data.aircraftId) === false) {
        const ra = this.aircraftList.find(a => a.aircraftId === data.aircraftId);
        this.aircraftChange.emit(ra !== undefined ? ra : null);
      }

      const offerBid = Number(data.offerBid.toString().replace(/[^0-9.]/g, ''));
      if (_.isEqual(this.offerBid, offerBid) === false) {
        this.offerBidChange.emit(offerBid);
      }
    });
  }

  validateAircraft(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const { value } = c;
      if (value) {
        return null;
      }
      return {
        required: true
      };
    };
  }

  isInvalidCheckboxes(): boolean {
    const { terms, operatorCharterAgreement } = this.form.controls;
    return (terms.touched && !terms.valid) || (operatorCharterAgreement.touched && !operatorCharterAgreement.valid);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form) {
      return;
    }
    if (changes.aircraftList) {
      this.filterAircraftModels(this.aircraftListFilter);
    }
    if (changes.selectedAircraft) {
      const aircraft = changes.selectedAircraft.currentValue as models.Aircraft;
      const id = _.get(aircraft, 'aircraftId', null);
      if (id !== this.form.controls['aircraftId'].value) {
        Object.keys(this.form.controls).forEach(k => this.form.controls[k].markAsUntouched());
        this.form.controls['aircraftId'].setValue(id, { emitEvent: false });
      }
    }
  }

  filterAircraftModels(value: string): void {
    this.aircraftListFilter = value;
    if (_.isEmpty(this.aircraftListFilter) === false) {
      this.aircraftListFiltered = this.aircraftList.filter(
        i => {
         return i.getModelName().toLowerCase().indexOf(this.aircraftListFilter.toLowerCase()) !== -1
         || i.getTailNumber().toLowerCase().indexOf(this.aircraftListFilter.toLowerCase()) !== -1
         || i.getCategory().getName().toLowerCase().indexOf(this.aircraftListFilter.toLowerCase()) !== -1;
        }
      );
    } else {
      this.aircraftListFiltered = this.aircraftList;
    }
  }

  getLatestDepartureD(legs: Array<models.LegRequest>): Date {
    if (legs.length) {
      return _.cloneDeep(legs).reduce((l1, l2) =>
        l1.getDepartureDate() > l2.getDepartureDate()
          ? l1 : l2).getDepartureDate();
    }
  }
}
