// tslint:disable:radix
import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, EventEmitter, Input, Inject, OnDestroy, OnInit,
  Output, ViewChild, SimpleChanges, OnChanges, ViewEncapsulation
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import * as marketplaceServiceContracts from '../domain/service-contracts/marketplace';
import * as airportServiceContracts from '../domain/service-contracts/airport';
import * as models from '../domain/models';
import * as moment from 'moment';


import { combineLatest, Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, tap, map, switchMap, debounceTime, startWith } from 'rxjs/operators';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import * as _ from 'lodash';
import { FlightEstimate, Maybe } from '../domain/graphql-types';
import { Aircraft } from '../domain/models';

@Component({
  selector: 'app-order-form',
  templateUrl: `./order-form.component.html`,
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OrderFormComponent implements OnInit, OnDestroy, OnChanges {

  form: FormGroup;
  @Input() order: models.OrderRequest;
  @Input() destinationAirportFboList: Array<models.Fbo>;
  @Input() originAirportFboList: Array<models.Fbo>;
  @Input() aircraftList: Array<models.Aircraft>;
  @Input() validation$: Observable<any>;
  @Input() debug: boolean;
  @Input() originFboLoading: boolean;
  @Input() destinationFboLoading: boolean;
  @Input() validatingOriginAirport: boolean;
  @Input() validatingDestinationAirport: boolean;
  @Input() verifyOrder: any;
  @Input() contractType: models.ContractType;
  @Input() lowPriceConfirmed: boolean;
  @Input() highPriceConfirmed: boolean;

  @ViewChild('eftinput') eftinput: ElementRef;
  @ViewChild('priceinput') priceInput: ElementRef;
  @ViewChild('charterPriceInput') charterPriceInput: ElementRef;
  @ViewChild('datepicker') datepicker: any;

  @Output() onOriginAirportSelect = new EventEmitter<models.Airport>();
  @Output() onDestinationAirportSelect = new EventEmitter<models.Airport>();
  @Output() onAircraftSelect = new EventEmitter<models.Aircraft>();
  @Output() onSeatsSelect = new EventEmitter<number>();
  @Output() onStatusChange = new EventEmitter<boolean>();
  @Output() onNavigateBack = new EventEmitter();
  @Output() onLowPriceConfirmed = new EventEmitter();
  @Output() onHighPriceConfirmed = new EventEmitter();

  seats: Array<number>;
  @ViewChild('timepicker') timepicker: any;

  filteredAircraft: Array<models.Aircraft> = [];


  dateNow = new Date();
  startDate = new Date();
  endDate = new Date();

  validationMessages: any;
  datePickerOptions: any;
  icaoCodeMask: any;
  integerMask: any;
  numberMask: any;
  dateModel: Date;

  eftValidationIsLoading = false;
  priceValidationIsLoading = false;

  originFBOnotFound = false;
  destinationFBOnotFound = false;

  priceTypeEnum = models.PriceType;
  shuttleValue = models.ContractType.SHUTTLE;
  charterValue = models.ContractType.CHARTER;

  priceTypeExplanation = `Dynamic Pricing allows the company to increase the price of the seat in an attempt to
   increase revenue for both parties. Fixed Price is determined by the operator and is inclusive of all commissions
   and fees, except FET, segment and credit card fees, and will not be modified by XO.`;

  originAirportCodeDescription = 'Flight origin airport ICAO Code';
  originAirportFboDescription = 'Origin airport Fixed Base Operator';
  destinationAirportCodeDescription = 'Flight destination airport ICAO Code';
  destinationAirportFboDescription = 'Destination airport Fixed Base Operator';
  departureDateDescription = 'Departure date from origin airport (local time)';
  departureTimeDescription = 'Departure time from origin airport (local time)';
  aircraftDescription = 'Aircraft registration (tail) number';
  eftDescription = 'Estimated flight time (minutes)';
  seatsNumberDescription = 'Number of seats available for booking';
  seatMinPriceDescription = 'Minimum dynamic price / fixed price per each seat (USD)';
  charterPriceDescription = 'Fixed price per flight (USD)';
  internalIdDescription = 'Operator internal identifier for flight';
  flexibilityDescription = 'Repositioning Flexibility';
  repositioningRateDescription = 'Repositioning Rate / Hour';
  landingFeeDescription = 'Standard Landing Fee for Additional Stops';
  offerExpireDescription = 'Offer Expiry Offset (T-Xhours)';


  validationLock = new BehaviorSubject(false);
  private validationLockSubscription: Subscription;

  private VALIDATOR_REQUIRED_TXT = 'This field is required';
  private VALIDATOR_AIRPORT_NOT_EXIST_TXT = 'No such airport';
  private VALIDATOR_SAME_DATE_TXT = 'Departure cannot be in the past';
  private VALIDATOR_SAME_ROUTE_ERROR = 'Departure and Origin cannot be the same';
  private VALIDATOR_WRONG_TIME_TXT = `Departure time must be at least ${(60 * 3) / 60} hours from the current time`;
  private VALIDATOR_EFT_TOO_HIGH_TXT = 'Too high';
  private VALIDATOR_EFT_TOO_LOW_TXT = 'Too low';
  private VALIDATOR_PRICE_HIGH_ERROR = 'Too high';
  private VALIDATOR_PRICE_LOW_ERROR = 'Too low';

  private priceMax = 99995;
  private priceMin = 50;

  private eftValidationSubscription: Subscription;
  private originValidationSubscription: Subscription;
  private departureValidationSubscription: Subscription;
  private priceValidationSubscription: Subscription;

  private formValueChangeSubscription: Subscription;
  private formStatusChangeSubscription: Subscription;
  private eftSubscription: Subscription;
  private flexibilityChangeSubscription: Subscription;

  private formIsValid?: boolean;

  constructor(@Inject(airportServiceContracts.SERVICE_TOKEN)
  private airportValidator: airportServiceContracts.IAirportService,
    @Inject(marketplaceServiceContracts.SERVICE_TOKEN)
    private marketplaceService: marketplaceServiceContracts.IMarketplaceService,
    private datePipe: DatePipe) {

    this.numberMask = createNumberMask({
      allowDecimal: true,
      prefix: '$',
      suffix: ''
    });

    this.icaoCodeMask = rawValue => {
      return [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/];
    };

    this.integerMask = createNumberMask({
      allowDecimal: false,
      prefix: '',
      suffix: ''
    });
  }

  private eftMin = 1;
  private eftMax = 600;

  showConfirmation = false;
  confirmationMode: string;

  flexibilityValues = [0];

  offerExpiryValues = [
    {name: 'T-24 hours', value: 24},
    {name: 'T-48 hours', value: 48},
    {name: 'T-72 hours', value: 72}
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form === undefined) {
      return;
    }

    if (changes.originAirportFboList) {
      const originAirportCode = this.order.originAirport ? this.order.originAirport.code : null;
      if (originAirportCode !== null) {
        if (changes.originAirportFboList.currentValue.length === 0) {
          this.form.controls['originAirportFbo'].setValidators(null);
          this.originFBOnotFound = true;
        } else {
          this.form.controls['originAirportFbo'].setValidators(
            this.contractType === this.shuttleValue ? Validators.required : null);
          this.originFBOnotFound = false;
        }
        this.form.controls['originAirportFbo'].updateValueAndValidity({ emitEvent: false });

        // this.onStatusChange.emit(this.formIsValid = this.form.valid);
      }
    }
    if (changes.destinationAirportFboList) {
      const destinationAirportCode = this.order.destinationAirport ? this.order.destinationAirport.code : null;
      if (destinationAirportCode !== null) {
        if (changes.destinationAirportFboList.currentValue.length === 0) {
          this.form.controls['destinationAirportFbo'].setValidators(null);
          this.destinationFBOnotFound = true;
        } else {
          this.form.controls['destinationAirportFbo'].setValidators(
            this.contractType === this.shuttleValue ? Validators.required : null);
          this.destinationFBOnotFound = false;
        }
        this.form.controls['destinationAirportFbo'].updateValueAndValidity({ emitEvent: false });

        // this.onStatusChange.emit(this.formIsValid = this.form.valid);
      }
    }

    if (changes.destinationFboLoading || changes.validatingDestinationAirport) {
      const shouldDisable = _.get(changes, 'destinationFboLoading.currentValue', false)
        || _.get(changes, 'validatingDestinationAirport.currentValue', false);

      if (shouldDisable) {
        this.form.get('destinationAirportFbo').disable({ emitEvent: false });
      } else {
        this.form.get('destinationAirportFbo').enable({ emitEvent: false });
      }
    }

    if (changes.originFboLoading || changes.validatingOriginAirport) {
      const shouldDisable = _.get(changes, 'originFboLoading.currentValue', false)
        || _.get(changes, 'validatingOriginAirport.currentValue', false);

      if (shouldDisable) {
        this.form.get('originAirportFbo').disable({ emitEvent: false });
      } else {
        this.form.get('originAirportFbo').enable({ emitEvent: false });
      }
    }
    if (changes.contractType !== undefined) {
      this.updateForm(_.get(changes, 'contractType.currentValue'));
    }

    if (changes.lowPriceConfirmed || changes.highPriceConfirmed) {
      const seatMinPrice = this.form.controls['seatMinPrice'];
      const charterPrice = this.form.controls['charterPrice'];
      seatMinPrice.updateValueAndValidity({emitEvent: false});
      charterPrice.updateValueAndValidity({emitEvent: false});
    }
  }

  get expiredAircraftCount(): number {
    let expiredAircraftQty = 0;
    try {
      expiredAircraftQty = this.filteredAircraft.reduce(
        (count, a) => {
          if (!a.insuranceApproved || !this.isInsuranceValidAtDeparture(a.insuranceExpirationDate, this.order.departureDate)) {
            count += 1;
          }
          return count;
        }, 0);
    } catch (e) {
    }

    return expiredAircraftQty;
  }

  get selectedDepartureDate(): Date {
    if (this.form === undefined) {
      return new Date();
    }

    if (this.form.get('departureDate').value !== null) {
      return this.form.get('departureDate').value;
    }

    return new Date();
  }

  ngOnInit(): void {
    this.startDate = new Date(this.dateNow.getTime());
    this.startDate.setDate(this.startDate.getDate());

    this.endDate = new Date(this.dateNow.getTime());
    this.endDate.setFullYear(this.endDate.getFullYear() + 1);

    if (this.order.aircraft) {
      this.initializeSeats(this.order.aircraft, false);
    }

    this.dateModel = this.order.departureDate;
    this.filteredAircraft = this.filterAircraft(this.aircraftList);

    this.form = new FormGroup({
      aircraft: new FormControl(this.order.aircraft ? this.order.aircraft.aircraftId : null, Validators.required),
      departureDate: new FormControl(this.order.departureDate, [Validators.required, this.dateValidator()]), // this.dateValidator()
      departureTime: new FormControl(this.order.departureDate, [Validators.required, this.timeValidator()]), // this.timeValidator()
      destinationAirportCode: new FormControl(
        this.order.destinationAirport ? this.order.destinationAirport.code : null, [Validators.required, this.routeValidator()]),
      destinationAirportFbo: new FormControl({
          value: this.order.destinationFbo ? this.order.destinationFbo.id : null,
          disabled: this.destinationFboLoading || this.validatingDestinationAirport
        },
        Validators.required),
      eft: new FormControl(this.order.eft, [Validators.required, this.eftValidator()]),
      externalId: new FormControl(this.order.externalId),
      priceType: new FormControl(this.order.priceType, Validators.required),
      originAirportCode: new FormControl(
        this.order.originAirport ? this.order.originAirport.code : null, [Validators.required, this.routeValidator()]),
      originAirportFbo: new FormControl({
          value: this.order.originFbo ? this.order.originFbo.id : null,
          disabled: this.originFboLoading || this.validatingOriginAirport
        },
        Validators.required),
      seatMinPrice: new FormControl(this.order.seatMinPrice, [Validators.required, this.priceValidator()]),
      seatsNumber: new FormControl(this.order.seats, Validators.required),
      charterPrice: new FormControl(this.order.charterPrice),
      offerExpire: new FormControl(24)
    });

    this.updateForm(this.contractType);

    this.validation$.pipe(map(a => {
      Object.keys(this.form.controls).forEach(k => {
        // this.form.controls[k].markAsPristine();
        this.form.controls[k].markAsTouched();
      });

      return a;
    }));

    this.formIsValid = this.form.valid;

    this.validationMessages = {
      departureDate: {
        required: this.VALIDATOR_REQUIRED_TXT,
        minError: this.VALIDATOR_WRONG_TIME_TXT,
        sameDate: this.VALIDATOR_SAME_DATE_TXT
      },
      departureTime: {
        required: this.VALIDATOR_REQUIRED_TXT,
        minError: this.VALIDATOR_WRONG_TIME_TXT,
        wrongTime: this.VALIDATOR_WRONG_TIME_TXT
      },
      destinationAirportCode: {
        airportValidator: this.VALIDATOR_AIRPORT_NOT_EXIST_TXT,
        required: this.VALIDATOR_REQUIRED_TXT,
        routeError: this.VALIDATOR_SAME_ROUTE_ERROR
      },
      destinationAirportFbo: {
        required: this.VALIDATOR_REQUIRED_TXT
      },
      priceType: {
        required: this.VALIDATOR_REQUIRED_TXT
      },
      eft: {
        required: this.VALIDATOR_REQUIRED_TXT,
        lowEft: this.VALIDATOR_EFT_TOO_LOW_TXT,
        highEft: this.VALIDATOR_EFT_TOO_HIGH_TXT
      },
      seatMinPrice: {
        required: this.VALIDATOR_REQUIRED_TXT,
        priceIsHigh: this.VALIDATOR_PRICE_HIGH_ERROR,
        priceIsLow: this.VALIDATOR_PRICE_LOW_ERROR
      },
      charterPrice: {
        required: this.VALIDATOR_REQUIRED_TXT,
        priceIsHigh: this.VALIDATOR_PRICE_HIGH_ERROR,
        priceIsLow: this.VALIDATOR_PRICE_LOW_ERROR
      },
      originAirportCode: {
        airportValidator: this.VALIDATOR_AIRPORT_NOT_EXIST_TXT,
        required: this.VALIDATOR_REQUIRED_TXT,
        routeError: this.VALIDATOR_SAME_ROUTE_ERROR
      },
      originAirportFbo: {
        required: this.VALIDATOR_REQUIRED_TXT
      },
      seatsNumber: {
        required: this.VALIDATOR_REQUIRED_TXT
      },
      aircraft: {
        required: this.VALIDATOR_REQUIRED_TXT
      }
    };

    this.validationLockSubscription = this.validationLock
      .subscribe(lock => {
        if (lock) {
          this.form.get('originAirportFbo').disable({ emitEvent: false });
          this.form.get('destinationAirportFbo').disable({ emitEvent: false });
          this.form.get('aircraft').disable({ emitEvent: false });
          this.form.get('seatsNumber').disable({ emitEvent: false });
          this.form.get('priceType').disable({emitEvent: false});
        } else {
          this.form.get('originAirportFbo').enable({ emitEvent: false });
          this.form.get('destinationAirportFbo').enable({ emitEvent: false });
          this.form.get('aircraft').enable({ emitEvent: false });
          this.form.get('seatsNumber').enable({ emitEvent: false });
          this.form.get('priceType').enable({emitEvent: false});
        }
      });

    this.formValueChangeSubscription = this.form.valueChanges.subscribe(data => {
      if (data.externalId !== this.order.externalId) {
        this.order.externalId = data.externalId ? data.externalId.toString() : null;
      }
      if (data.seatMinPrice !== this.order.seatMinPrice) {
        this.order.seatMinPrice = data.seatMinPrice ? Number(data.seatMinPrice.toString().replace(/[^0-9.]/g, '')) : null;
      }

      if (data.charterPrice !== this.order.charterPrice) {
        this.order.charterPrice = data.charterPrice ? Number(data.charterPrice.toString().replace(/[^0-9.]/g, '')) : null;
      }

      if (data.eft !== this.order.eft) {
        this.order.eft = data.eft ? Number(data.eft.toString().replace(/[^0-9.]/g, '')) : null;
      }

      const depTime = new Date(data.departureTime);
      const depDate = new Date(data.departureDate);
      const datetime = new Date(
        depDate.getFullYear(),
        depDate.getMonth(),
        depDate.getDate(),
        depTime.getHours(),
        depTime.getMinutes(),
        depTime.getSeconds());
      if (!this.checkIfSameDate(datetime, this.order.departureDate)) {
        this.order.departureDate = datetime;

        this.filteredAircraft = this.filterAircraft(this.aircraftList);

        const selectedAircraft = this.form.controls['aircraft'].value !== null ? Number(this.form.controls['aircraft'].value) : null;
        if (selectedAircraft !== null && this.filteredAircraft.find(
          a => a.aircraftId === selectedAircraft && !this.getInvalidReason(a)
          ) === undefined) {
          this.form.controls['aircraft'].setValue(null, { emitEvent: false });
        }
      }
    });

    this.formStatusChangeSubscription = this.form
      .statusChanges
      // .startWith(this.form.valid)
      .subscribe(() => {
        if (this.formIsValid === this.form.valid) {
          return;
        }

        this.onStatusChange.emit(this.formIsValid = this.form.valid);
      });

    // EFT validation
    const origin$ = this.form.controls.originAirportCode.valueChanges;
    const destination$ = this.form.controls.destinationAirportCode.valueChanges;
    const aircraft$ = this.form.controls.aircraft.valueChanges;

    this.eftValidationSubscription = combineLatest(
      origin$.pipe(startWith(this.order.originAirport ? this.order.originAirport.code : null)),
      destination$.pipe(startWith(this.order.destinationAirport ? this.order.destinationAirport.code : null))
    )
      .pipe(
        debounceTime(500),
        filter(([origin, destination]) => {
          if (!origin || !destination) { return false; }
          if (origin.replace(/_/g, '').length < 4 || destination.replace(/_/g, '').length < 4) { return false; }
          return true;
        }),
        switchMap(([origin, destination]) => {
          this.eftValidationIsLoading = true;
          this.validationLock.next(true);

          const request = {
            departureAirportCode: origin.replace(/_/g, '').toUpperCase(),
            arrivalAirportCode: destination.replace(/_/g, '').toUpperCase(),
          };

          return this.marketplaceService.validateEft(request).pipe(
            catchError(() => {
              this.validationLock.next(false);
              return of(null);
            })
          );
        })
      )
      .subscribe((response: Maybe<Pick<FlightEstimate, 'minimumEft' | 'maximumEft'>>) => {
        if (response) {
          this.eftMin = response.minimumEft;
          this.eftMax = response.maximumEft;

          this.form.controls['eft'].updateValueAndValidity({emitEvent: false});
          this.eftValidationCallback();
        }

      });

    this.priceValidationSubscription = combineLatest(
      aircraft$.pipe(startWith(this.order.aircraft ? this.order.aircraft.aircraftId : null)),
      origin$.pipe(startWith(this.order.originAirport ? this.order.originAirport.code : null)),
      destination$.pipe(startWith(this.order.destinationAirport ? this.order.destinationAirport.code : null))
    )
      .pipe(
        debounceTime(500),
        filter(([aircraft, origin, destination]) => {

          if (!aircraft || !origin || !destination) { return false; }
          if (origin.replace(/_/g, '').length < 4 || destination.replace(/_/g, '').length < 4) { return false; }

          return true;
        }),
        switchMap(([aircraft, origin, destination]) => {
          this.priceValidationIsLoading = true;
          this.validationLock.next(true);
          const request = {
            aircraftId: aircraft,
            departureAirportCode: origin.replace(/_/g, '').toUpperCase(),
            arrivalAirportCode: destination.replace(/_/g, '').toUpperCase(),
            contractType: models.ContractType[this.contractType]
          };

          return this.marketplaceService.validatePrice(request).pipe(
            catchError((e: any) => {
              this.validationLock.next(false);

              return of(null);
            }));
        })
      )
      .subscribe((response: marketplaceServiceContracts.ValidatePriceResponse) => {
        if (response) {
          this.priceMin = response.min;
          this.priceMax = response.max;
          const seatMinPrice = this.form.controls['seatMinPrice'];
          const charterPrice = this.form.controls['charterPrice'];
          seatMinPrice.updateValueAndValidity({ emitEvent: false });
          charterPrice.updateValueAndValidity({ emitEvent: false });
          this.priceValidationIsLoading = false;
          this.validationLock.next(false);
          const activeElement = document.activeElement as HTMLElement;
          if (this.priceInput && seatMinPrice.value) {
            this.priceInput.nativeElement.focus();
            this.priceInput.nativeElement.blur();
          }
          if (this.charterPriceInput && charterPrice.value) {
            this.charterPriceInput.nativeElement.focus();
            this.charterPriceInput.nativeElement.blur();
          }
          activeElement.focus();
        }
      });

    this.originValidationSubscription = origin$
      .pipe(
        debounceTime(500),
        tap(([origin]) => {
          this.form.controls['originAirportCode'].clearAsyncValidators();
        }))
      .subscribe(([origin]) => {
        const originAirportValidatorFn = this.airportValidator.getValidator(this.originAirportValidatorCallback.bind(this), 'origin');
        this.form.controls['originAirportCode'].setAsyncValidators(originAirportValidatorFn.bind(this));
        this.form.controls['originAirportCode'].updateValueAndValidity({ emitEvent: false });
      });

    this.departureValidationSubscription = destination$
      .pipe(
        debounceTime(500),
        tap(([destination]) => {
          this.form.controls['destinationAirportCode'].clearAsyncValidators();
        }))
      .subscribe(([destination]) => {
        const destinationAirportValidatorFn = this.airportValidator
          .getValidator(this.destinationAirportValidatorCallback.bind(this), 'destination');
        this.form.controls['destinationAirportCode'].setAsyncValidators(destinationAirportValidatorFn.bind(this));
        this.form.controls['destinationAirportCode'].updateValueAndValidity({ emitEvent: false });
      });

    /** Eft subscription */

    this.eftSubscription = this.form.controls.eft.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        eft => {
          this.flexibilityValues = [0];
          if (eft < 30) {
            this.flexibilityValues.push(eft);
            return;
          }
          this.flexibilityValues.push(30);
          const hours = Math.trunc(eft / 60);
          if (hours) {
            for (let i = 1; i <= hours; i++) {
              this.flexibilityValues.push(i * 60);
            }
            if (hours * 60 < eft) {
              this.flexibilityValues.push(eft);
            }
          } else {
            if (eft !== 30) {
              this.flexibilityValues.push(eft);
            }
          }
        }
      );

    this.flexibilityChangeSubscription = this.form.controls.flexibility.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        value => {
          if (!parseInt(value)) {
            this.form.controls.repositioningRate.disable({ emitEvent: false });
            this.form.controls.landingFee.disable({ emitEvent: false });
          } else {
            this.form.controls.repositioningRate.enable({ emitEvent: false });
            this.form.controls.landingFee.enable({ emitEvent: false });
          }
        }
      );

    setTimeout(() => {
      // Check after lifecycle hooks
      // Should trigger ngOnChanges
      if (this.order.originAirport && this.order.originAirport.code) {
        this.onOriginAirportSelect.emit(this.order.originAirport);
      }

      if (this.order.destinationAirport && this.order.destinationAirport.code) {
        this.onDestinationAirportSelect.emit(this.order.destinationAirport);
      }
    }, 0);
  }

  filterAircraft(aircraftList: Array<models.Aircraft>): Array<models.Aircraft> {
    const compareAircraft = (a, b) => {
      const invalidReasonForA = this.getInvalidReason(a);
      if (!invalidReasonForA === !this.getInvalidReason(b)) {
        return a.tailNumber < b.tailNumber ? -1 : 1;
      } else {
        return invalidReasonForA ? 1 : -1;
      }
    };

    if (!aircraftList || !aircraftList.length) {
      return [];
    }
    return [...aircraftList].sort(compareAircraft);
  }

  checkIfSameDate(d1: Date, d2: Date): boolean {
    if (d1 === undefined || d2 === undefined) {
      return (d1 === undefined && d2 === undefined);
    }

    if (d1 === null || d2 === null) {
      return d1 === null && d2 === null;
    }

    if (d1 instanceof Date && d2 instanceof Date) {
      return d1.getUTCFullYear() === d2.getUTCFullYear() &&
        d1.getUTCMonth() === d2.getUTCMonth() &&
        d1.getUTCDate() === d2.getUTCDate() &&
        d1.getUTCHours() === d2.getUTCHours() &&
        d1.getUTCMinutes() === d2.getUTCMinutes() &&
        d1.getUTCSeconds() === d2.getUTCSeconds();
    }
  }

  isInsuranceValidAtDeparture(ins: Date, departure: Date): boolean {
    const serializesIns = ins;
    if (serializesIns === null) {
      return false;
    }
    if (!departure) {
      return true;
    }
    serializesIns.setHours(0, 0, 0, 0);
    const departureDatePlus = moment(departure).add(1, 'day').toDate();

    return departureDatePlus < serializesIns;
  }

  initializeSeats(aircraft: models.Aircraft, aircraftChanged: boolean): void {
    if (!aircraft || !(aircraft instanceof models.Aircraft)) {
      this.seats = [];
    }

    const a1 = [];
    for (let i = 1; i <= aircraft.marketableSeatsCount; i++) {
      a1.push(i);
    }

    this.seats = a1;
    if (this.form && _.get(this.form, 'controls.seatsNumber.value', false)) {

      if (aircraftChanged === true) {
        // Reset Seats
        this.form.controls['seatsNumber'].setValue(null, { emitEvent: false });
        this.order.seats = null;
      } else {
        // Implement seats from model
        this.form.controls['seatsNumber'].setValue(this.order.seats, { emitEvent: false });
      }
    }
  }

  originAirportValidatorCallback(airport: models.Airport): void {

    if (this.order.originAirport && airport && this.order.originAirport.code === airport.code) {
      return;
    }

    this.order.originAirport = airport;
    this.order.originFbo = null;

    this.onOriginAirportSelect.emit(airport);
  }

  destinationAirportValidatorCallback(airport: models.Airport): void {
    if (this.order.destinationAirport && airport && this.order.destinationAirport.code === airport.code) {
      return;
    }

    this.order.destinationAirport = airport;
    this.order.destinationFbo = null;

    this.onDestinationAirportSelect.emit(airport);
  }

  eftValidationCallback(): void {
    // Need to trigger the ngDoCheck in the popover directive class
    if (this.form.controls['eft'].value) {
      const activeElement = document.activeElement as HTMLElement;
      this.eftinput.nativeElement.focus();
      this.eftinput.nativeElement.blur();
      activeElement.focus();
    }
    this.eftValidationIsLoading = false;
    this.validationLock.next(false);
  }

  ngOnDestroy(): void {
    if (this.eftValidationSubscription) {
      this.eftValidationSubscription.unsubscribe();
    }
    if (this.originValidationSubscription) {
      this.originValidationSubscription.unsubscribe();
    }
    if (this.departureValidationSubscription) {
      this.departureValidationSubscription.unsubscribe();
    }
    if (this.priceValidationSubscription) {
      this.priceValidationSubscription.unsubscribe();
    }
    if (this.validationLockSubscription) {
      this.validationLockSubscription.unsubscribe();
    }
    if (this.formValueChangeSubscription) {
      this.formValueChangeSubscription.unsubscribe();
    }
    if (this.formStatusChangeSubscription) {
      this.formStatusChangeSubscription.unsubscribe();
    }
    if (this.eftSubscription) {
      this.eftSubscription.unsubscribe();
    }
    if (this.flexibilityChangeSubscription) {
      this.flexibilityChangeSubscription.unsubscribe();
    }
  }

  onAircraftValueChanged(aircraftIdStr: string): void {
    const aircraftId = Number(aircraftIdStr);
    const aircraft = this.aircraftList.find((i: models.Aircraft) => {
      return i.aircraftId === aircraftId;
    });

    if (aircraft !== undefined) {
      this.initializeSeats(aircraft, true);

      this.order.aircraft = aircraft;
      this.order.seats = null;

      this.onAircraftSelect.emit(aircraft);
    }
  }

  onOriginFboValueChanged(fboIdStr: string): void {
    if (!fboIdStr || fboIdStr === 'null') {
      this.order.originFbo = null;
      if (fboIdStr !== '') {
        this.form.patchValue({originAirportFbo: null}, {emitEvent: false});
      }

      return;
    }

    const fboId = Number(fboIdStr);

    const fbo: models.Fbo = this.originAirportFboList.filter((i: models.Fbo) => {
      return i.id === fboId;
    })[0];

    this.order.originFbo = fbo;
  }

  onDestinationFboValueChanged(fboIdStr: string): void {
    if (!fboIdStr || fboIdStr === 'null') {
      this.order.destinationFbo = null;
      if (fboIdStr !== '') {
        this.form.patchValue({destinationAirportFbo: null}, {emitEvent: false});
      }

      return;
    }

    const fboId = Number(fboIdStr);

    const fbo: models.Fbo = this.destinationAirportFboList.filter((i: models.Fbo) => {
      return i.id === fboId;
    })[0];

    this.order.destinationFbo = fbo;
  }

  onSeatValueChanged(seatStr: string): void {
    const seats = Number(seatStr);
    this.onSeatsSelect.emit(seats);
    if (seats !== this.order.seats) {
      this.order.seats = seats;
    }
  }

  onPriceTypeValueChanged(typeStr: string): void {
    const type = Number(typeStr);
    if (type !== this.order.priceType) {
      this.order.priceType = type;
    }
  }

  onFocus(): void {
    this.timepicker.toggle(true);
  }

  onClick(): void {
    if (!this.timepicker.isOpen) { this.timepicker.toggle(true); }
  }

  onDatePickerClick(): void {
    if (!this.datepicker.isOpen) { this.datepicker.toggle(true); }
  }

  submitForm(): void {
    this.order.contractType = this.contractType;
    this.onStatusChange.emit(this.formIsValid = this.form.valid);
    // Call the function that was passed by the parent
    this.verifyOrder.verifyOrder();
  }

  back(): void {
    this.onNavigateBack.emit();
  }

  // public onDateValueChanged() {
  //   const date = this.form.get('departureDate').value,
  //     time = this.form.get('departureTime').value;
  //
  //   if (date && time) {
  //     const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0, 0);
  //
  //     if (newDate !== this.order.departureDate) {
  //       this.onDepartureDateChange.emit(newDate);
  //     }
  //   }
  // }
  routeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) { return null; }
      if (!this.form) { return null; }
      const isValid = this.form.controls.originAirportCode.value !== this.form.controls.destinationAirportCode.value;

      return isValid ? null : { routeError: { value: control.value } };
    };
  }

  timeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) { return null; }
      if (!this.form) { return null; }
      // will be invalid if the selected "month/day/year" is today and the selected "hour:minute" is less than 3 hours from now
      const selectedDate = this.form.controls.departureDate.value;
      if (!selectedDate) { return null; }
      const todayDate = new Date();
      todayDate.setHours(selectedDate.getHours());
      todayDate.setMinutes(selectedDate.getMinutes());
      todayDate.setSeconds(selectedDate.getSeconds());
      const selectedTime = control.value.getHours() * 60 + control.value.getMinutes(); // in minutes
      const now = new Date();
      const nowPlus3Hours = now.getHours() * 60 + now.getMinutes() + 60 * 3; // now plus 3 hours (in minutes)
      const invalid = (selectedDate.toString() === todayDate.toString()) && (selectedTime < nowPlus3Hours);

      return invalid ? { wrongTime: { value: control.value } } : null;
    };
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) { return null; }
      if (!this.form) { return null; }
      this.form.controls.departureTime.updateValueAndValidity();
      // Dates in the past are greyed out already

      return null;
    };
  }

  priceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      if (!this.form) {
        return null;
      }
      const v1 = _.get(control, 'value', null);
      const value = v1 !== null ? v1.toString() : null;
      const price = parseInt(value.replace(/\$/g, '').replace(/,/g, ''));

      const isHigh = (price > this.priceMax) && !this.highPriceConfirmed;
      const isLow = (price < this.priceMin) && !this.lowPriceConfirmed;
      if (!isHigh && !isLow) {
        return null;
      }
      return isHigh ? { priceIsHigh: { value: control.value } } : { priceIsLow: { value: control.value } };
    };
  }

  eftValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      if (!this.form) {
        return null;
      }

      const eftNumber = parseInt(control.value.toString().replace(',', ''), 10);
      const isHigh = eftNumber > this.eftMax;
      const isLow = eftNumber < this.eftMin;
      if (!isHigh && !isLow) {
        return null;
      }
      return isHigh ? {highEft: {value: control.value}} : {lowEft: {value: control.value}};
    };
  }

  updateForm(contractType: models.ContractType): void {
    const priceTypeControl = this.form.get('priceType');
    const seatsNumberControl = this.form.get('seatsNumber');
    const seatMinPriceControl = this.form.get('seatMinPrice');
    const charterPriceControl = this.form.get('charterPrice');
    const originalAirportFbo = this.form.get('originAirportFbo');
    const destinationAirportFbo = this.form.get('destinationAirportFbo');
    const controls = [priceTypeControl, seatsNumberControl, seatMinPriceControl, charterPriceControl,
      originalAirportFbo, destinationAirportFbo];
    if (contractType === this.charterValue) {
      priceTypeControl.setValue(this.priceTypeEnum.FIXED);
      this.onPriceTypeValueChanged(priceTypeControl.value);
      seatsNumberControl.setValidators(null);
      seatMinPriceControl.setValidators(null);
      charterPriceControl.setValidators([Validators.required, this.priceValidator()]);
      originalAirportFbo.setValidators(null);
      destinationAirportFbo.setValidators(null);
      this.form.addControl('flexibility', new FormControl(0));
      this.form.addControl('repositioningRate', new FormControl({value: null, disabled: true}));
      this.form.addControl('landingFee', new FormControl({value: null, disabled: true}));
    } else {
      seatsNumberControl.setValidators(Validators.required);
      seatMinPriceControl.setValidators([Validators.required, this.priceValidator()]);
      charterPriceControl.setValidators(null);
      originalAirportFbo.setValidators(Validators.required);
      destinationAirportFbo.setValidators(Validators.required);
    }
    controls.map(control => control.updateValueAndValidity({emitEvent: false}));
  }

  getInvalidReason(a: Aircraft): string {
    if (a.deleted) {
      return '(Inactive)';
    }
    if (!a.completed || !a.marketableSeatsCount) {
      return '(Incomplete)';
    }
    if (!a.insuranceApproved || !this.isInsuranceValidAtDeparture(a.insuranceExpirationDate, this.order.departureDate)) {
      return '(Insurance Expired)';
    }
    return null;
  }

  onPriceDialogDismiss(): void {
    this.showConfirmation = false;
  }

  onPriceDialogConfirm(): void {
    this.showConfirmation = false;
    if (this.confirmationMode === 'high') {
      this.onHighPriceConfirmed.emit();
    } else if (this.confirmationMode === 'low') {
      this.onLowPriceConfirmed.emit();
    }
  }

  onPriceBlur(control: AbstractControl): void {
    if (control.hasError('priceIsHigh')) {
      this.showConfirmation = true;
      this.confirmationMode = 'high';
    }
    if (control.hasError('priceIsLow')) {
      this.showConfirmation = true;
      this.confirmationMode = 'low';
    }
  }
}
