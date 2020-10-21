import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges, Inject
} from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as viewModels from '../../view-models';
import * as models from '../../../domain/models';
import * as coreModels from '../../../../../core/models';
import * as reducers from '../../../application/reducers';
import * as coreReducers from '../../../../../core/reducers';
import * as components from '../../components';
import { ServiceClassEnum } from '../../../../../shared/models/service-class-enum';
import * as actions from '../../../application/actions/offer-list';

import { Observable, combineLatest } from 'rxjs';
import { first, map, take, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';
import * as contracts from '../../../domain/service-contracts/pdf';
import * as sharedTypes from '../../../../../shared/types';

@Component({
  selector: 'operator-accept-offer-dialog-2',
  templateUrl: './accept-offer-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcceptOfferDialog2Component {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<models.Aircraft>();
  @Output() submitOffer = new EventEmitter<any>();
  blob: Blob = null;
  offerBid: number;

  @ViewChild(components.AcceptOfferForm2Component)
  private acceptOfferFormComponent: components.AcceptOfferForm2Component;


  mode = models.SidepanelModeEnum.form;

  purchaseOffer$: Observable<models.OperatorPurchaseOffer>;
  category$: Observable<models.AircraftCategory>;
  legs$: Observable<Array<models.LegRequest>>;
  aircraftList$: Observable<Array<models.Aircraft>>;
  serviceClass$: Observable<ServiceClassEnum>;
  dba$: Observable<coreModels.DBA>;
  orgLegalName$: Observable<string>;

  isDebug$: Observable<boolean>;

  selectedAircraft: models.Aircraft = new models.Aircraft();

  modeEnum = models.SidepanelModeEnum;

  onAircraftChange(aircraft: models.Aircraft): void {
    this.selectedAircraft = aircraft;
  }

  onOfferBidChange(offerBid: number): void {
    this.offerBid = offerBid;
  }

  closeDialog(): void {
    this.close.emit();
  }

  async setMode(mode: models.SidepanelModeEnum): Promise<void> {
    this.mode = mode;
    this.blob = null;
    try {
      switch (mode) {
        case this.modeEnum.safetyRequirements:
          await this.loadSafetyRequirements();
          break;
        case this.modeEnum.termsAndConditions:
          await this.loadTermsAndConditionsRequirements();
          break;
        default:
          break;
      }
      this.mode = mode;
    } catch (err) {
      this.notificationService.show(
        'Something went wrong',
        sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Danger,
        sharedTypes.NotificationPosition.Top, 10000);
    }
  }

  onCancelClick(): void {
    this.closeDialog();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.closeDialog();
  }

  constructor(private store$: Store<any>, @Inject(contracts.PDF_SERVICE_TOKEN)
  private pdfService: contracts.IPdfService, @Inject(sharedTypes.NOTIFICATION_SERVICE_TOKEN)
    private notificationService: sharedTypes.INotificationService) {
    this.purchaseOffer$ = this.store$.pipe(select(reducers.getOfferListSelectedPurchaseOffer));
    this.orgLegalName$ = this.store$.pipe(select(coreReducers.getUserOrgLegalName));

    this.serviceClass$ = this.purchaseOffer$.pipe(map(po => po !== null ? po.getServiceClass() : null));
    this.category$ = this.purchaseOffer$.pipe(map(po => po !== null ? po.getAircraftCategory() : null));
    this.dba$ = this.purchaseOffer$.pipe(map(po => _.get(po, 'dba', coreModels.DBA.JS)));

    this.legs$ = this.purchaseOffer$.pipe(map(po => po !== null ? po.getLegs() : []));

    this.isDebug$ = this.store$.pipe(select(coreReducers.getSystemIsDebug));

    this.aircraftList$ = combineLatest(
      this.store$.pipe(select(reducers.getAircraftList)),
      this.purchaseOffer$
    ).pipe(
      map(([list, po]) => {
        return list.filter(a => {
          return a !== undefined && a !== null && po !== null
            && a.getCategory() && po.getAircraftCategory()
            && (po.getServiceClass() !== undefined || po.getServiceClass() !== null)
            && a.getInsuranceApproved() === true
            && this.isInsuranceValidAtDeparture(a.getInsuranceExpiration(), po.getLegs())
            && a.getServiceClass() >= po.getServiceClass()
            && a.getCategory().getId() >= po.getAircraftCategory().getId();
        });
      })
    );
  }

  async loadSafetyRequirements() {
    const req = await this.getRequestPayload();
    try {
      this.blob = await this.pdfService.getSafetyAgreements(req).pipe(take(1)).toPromise();
    } catch (e) {
      this.notificationService.show(
        'Something went wrong',
        sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Danger,
        sharedTypes.NotificationPosition.Top, 10000);
      this.closeDialog();
    }
  }

  async loadTermsAndConditionsRequirements() {
    const req = await this.getRequestPayload();
    try {
      this.blob = await this.pdfService.getCharterAgreements(req).pipe(take(1)).toPromise();
    } catch (e) {
      this.notificationService.show(
        'Something went wrong',
        sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Danger,
        sharedTypes.NotificationPosition.Top, 10000);
      this.closeDialog();
    }
  }

  async getRequestPayload(): Promise<contracts.GetPdfLinkRequest> {
    const purchaseOffer = await this.store$.pipe(select(reducers.getOfferListSelectedPurchaseOffer), first()).toPromise();
    const req = new contracts.GetPdfLinkRequest();
    req.operatorOfferId = purchaseOffer.operatorPurchaseOfferId;
    return req;
  }

  isInsuranceValidAtDeparture(ins: Date, legs: models.LegRequest[]): boolean {
    const serializesIns = ins;
    if (serializesIns === null) {
      return false;
    }
    serializesIns.setHours(0, 0, 0, 0);

    const latestDeparture = legs.reduce((l1, l2) =>
      l1.getDepartureDate() > l2.getDepartureDate()
        ? l1 : l2).getDepartureDate();

    return latestDeparture < serializesIns;
  }

  async onSubmitClick(): Promise<void> {
    if (!this.acceptOfferFormComponent.validate()) { return; }
    const purchaseOffer = await this.purchaseOffer$.pipe(first()).toPromise();
    if (purchaseOffer.openOffer) {
      // this.selectedAircraft.setAircraftId(22);
      // this.offerBid = 222;
      this.submitOffer.emit({
        selectedAircraft: this.selectedAircraft || purchaseOffer.aircraft,
        offerBid: this.offerBid || purchaseOffer.offerBid
      });
    } else {
      this.submit.emit(this.selectedAircraft);
    }
  }
}
