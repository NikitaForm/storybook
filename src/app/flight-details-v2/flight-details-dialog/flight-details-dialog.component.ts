import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as models from '../../domain/models';
import * as actions from '../../application/actions/flight-details';
import * as reducers from '../../application/reducers';
import * as marketplaceContracts from '../../domain/service-contracts/marketplace';

import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { take, delay, map, catchError } from 'rxjs/operators';

// declare var moment: any;
import * as moment from 'moment';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'flight-details-dialog-v2',
  templateUrl: './flight-details-dialog.component.html',
  styleUrls: ['./flight-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlightDetailsDialogV2Component implements OnInit, OnDestroy {
  passengerDetails$: Observable<Array<models.FlightPassengerDetails>>;
  requestDetails$: Observable<Array<models.FlightRequestDetails>>;
  priceHistory$: Observable<Array<models.PriceHistoryItem>>;
  legDetails$: Observable<models.Order>;
  arrivalTime$: Observable<models.ArrivalTimeViewModel>;

  newOrder$: Observable<models.Order>;
  orderIsLoading$: Observable<boolean>;
  orderUpdateIsLoading$: Observable<boolean>;
  priceDetails$: Observable<models.PriceDetail>;
  repositioningItinerary$: Observable<any>;

  requestDetailsViewModels$: Observable<Array<models.FlightRequestDetailsViewModel>>;
  totalAmount$: Observable<models.FlightTotalAmountViewModel>;

  showReactivateBtn$: Observable<boolean>;
  showDeactivateBtn$: Observable<boolean>;
  showEditBtn$: Observable<boolean>;
  showStatusTag$: Observable<boolean>;

  editMode$: BehaviorSubject<boolean>;
  overriddenDepDate$: Observable<string>;
  showDeactivateConfirmation = false;
  showReactivateConfirmation = false;

  showProposedPriceDetailConfirmation = false;
  proposedPriceDetailIsLoading = false;
  proposedPriceDetail: models.PriceDetail = null;

  orderStatus = models.OrderStatusEnum;
  sharedSeats = models.ContractType.SHUTTLE;
  @Output() close = new EventEmitter<void>();

  constructor(private store: Store<any>,
    // private route: ActivatedRoute,
    @Inject(marketplaceContracts.SERVICE_TOKEN)
    private marketplaceService: marketplaceContracts.IMarketplaceService,
              private datePipe: DatePipe) {

    this.priceHistory$ = this.store.pipe(select(reducers.getFlightDetailPriceHistoryItems));
    this.requestDetails$ = this.store.pipe(select(reducers.getLegRequestDetails));
    this.legDetails$ = this.store.pipe(select(reducers.getLegDetails));
    this.newOrder$ = this.store.pipe(select(reducers.getLegDetailsNewOrder));
    this.orderUpdateIsLoading$ = this.store.pipe(select(reducers.getIsFlightDetailUpdateLoading));
    this.orderIsLoading$ = this.store.pipe(select(reducers.getIsFlightDetailsLoading));
    this.passengerDetails$ = this.store.pipe(select(reducers.getPassengerDetails));
    this.priceDetails$ = this.store.pipe(select(reducers.getIsFlightDetailPriceDetail));
    this.repositioningItinerary$ = this.store.pipe(select(reducers.getRepositioningItinerary));
    this.editMode$ = new BehaviorSubject<boolean>(false);

    this.showDeactivateBtn$ = combineLatest(
      this.legDetails$,
      this.orderUpdateIsLoading$,
      ((legDetail: models.Order, isLoading: boolean) => {
        return !this.isDateInPast(legDetail.departureTime) && legDetail.status !== models.OrderStatusEnum.CLOSED
          && legDetail.paxCount === 0 && isLoading === false;
      })
    );

    this.showReactivateBtn$ = combineLatest(
      this.legDetails$,
      this.orderUpdateIsLoading$,
      ((legDetail: models.Order, isLoading: boolean) => {
        return !this.isDateInPast(legDetail.departureTime) && legDetail.status === models.OrderStatusEnum.CLOSED
          && isLoading === false;
      })
    );

    this.showEditBtn$ = combineLatest(
      this.legDetails$,
      this.orderUpdateIsLoading$,
      this.editMode$,
      ((legDetail: models.Order, isLoading: boolean, editMode: boolean) => {
        return ((legDetail.status === models.OrderStatusEnum.OPEN)
          || (legDetail.contractType === this.sharedSeats && legDetail.status === models.OrderStatusEnum.BOOKED
            && legDetail.paxCount < legDetail.aircraft.marketableSeatsCount))
          && isLoading === false
          && editMode === false;
      })
    );

    this.showStatusTag$ = this.legDetails$.pipe(
      map((legDetail) => {
        return legDetail.status === models.OrderStatusEnum.CLOSED;
      })
    );

    this.overriddenDepDate$ = this.legDetails$.pipe(
      map(legDetail => {
        if (legDetail.departureTime.getTime() !== legDetail.createdDepartureTime.getTime()) {
          return `Previous ${this.datePipe.transform(legDetail.createdDepartureTime, 'fullDate')}
           ${this.datePipe.transform(legDetail.createdDepartureTime, 'hh:mm a')}`;
        } else {
          return null;
        }
      })
    );

    this.requestDetailsViewModels$ = this.requestDetails$.pipe(
      map(requestDetails => {
        if (!requestDetails) {

          return null;
        }
        const requestDetailsViewModels = requestDetails.map(r => {
          const requestDetailsViewModel = new models.FlightRequestDetailsViewModel();
          requestDetailsViewModel.amount = _.get(r, 'legDetails.customerPrice');
          requestDetailsViewModel.requestTime = r.requestTime;
          requestDetailsViewModel.passengerCount = r.passengerCount;

          return requestDetailsViewModel;
        });

        return requestDetailsViewModels;
      }));

    this.totalAmount$ = this.requestDetailsViewModels$.pipe(
      map(requestDetailsViewModels => {
        if (!requestDetailsViewModels) {
          return null;
        }
        const total = requestDetailsViewModels.reduce((prev, current) => prev + current.amount, 0);

        return new models.FlightTotalAmountViewModel(total);
      }));


    this.arrivalTime$ = this.legDetails$.pipe(
      map(legDetails => {
        if (!legDetails) {
          return null;
        }
        const departureTime = moment(legDetails.departureTime).add(legDetails.eft, 'm').toDate();

        return new models.ArrivalTimeViewModel(departureTime);
      }));
  }

  ngOnDestroy(): void {
    if (this.editMode$) {
      this.editMode$.complete();
    }
  }

  ngOnInit(): void {

    // this.requestDetailsViewModels$ = this.requestDetails$
    //   .map(requestDetails => {
    //     if (!requestDetails) {
    //
    //       return null;
    //     }
    //     const requestDetailsViewModels = requestDetails.map(r => {
    //       const requestDetailsViewModel = new models.FlightRequestDetailsViewModel();
    //       requestDetailsViewModel.amount = _.get(r, 'legDetails.customerPrice');
    //       requestDetailsViewModel.requestTime = r.requestTime;
    //       requestDetailsViewModel.passengerCount = r.passengerCount;
    //
    //       return requestDetailsViewModel;
    //     });
    //
    //     return requestDetailsViewModels;
    //   });
    //
    // this.totalAmount$ = this.requestDetailsViewModels$
    //   .map(requestDetailsViewModels => {
    //     if (!requestDetailsViewModels) {
    //       return null;
    //     }
    //     const total = requestDetailsViewModels.reduce((prev, current) => prev + current.amount, 0);
    //
    //     return new models.FlightTotalAmountViewModel(total);
    //   });
    //
    //
    // this.arrivalTime$ = this.legDetails$
    //   .map(legDetails => {
    //     if (!legDetails) {
    //       return null;
    //     }
    //     const departureTime = moment(legDetails.departureTime).add(legDetails.eft, 'm').toDate();
    //
    //     return new models.ArrivalTimeViewModel(departureTime);
    //   });
  }

  async edit(): Promise<void> {
    const order = _.cloneDeep(await this.store.pipe(select(reducers.getLegDetails), take(1)).toPromise()) as models.Order;

    this.store.dispatch(new actions.SetFlightDetailsNewOrderAction(
      new actions.SetFlightDetailsNewOrderPayload(order)
    ));
    this.editMode$.next(true);
  }

  orderChanged(newOrder: models.Order): void {
    if (newOrder.paxCount === 0) {
      newOrder.status = newOrder.seatsCount === 0 ? models.OrderStatusEnum.CLOSED : models.OrderStatusEnum.OPEN;
    }
    this.store.dispatch(new actions.SetFlightDetailsNewOrderAction(
      new actions.SetFlightDetailsNewOrderPayload(newOrder)
    ));
  }

  orderCanceled(): void {
    this.store.dispatch(new actions.SetFlightDetailsNewOrderAction(
      new actions.SetFlightDetailsNewOrderPayload(null)
    ));
    this.editMode$.next(false);
  }

  closeDialog(): void {
    this.close.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.closeDialog();
  }


  async orderSubmited(): Promise<void> {
    this.proposedPriceDetailIsLoading = true;

    const orderNew = _.cloneDeep(await this.newOrder$.pipe(take(1)).toPromise()) as models.Order;
    let service: Observable<marketplaceContracts.GetPriceDetailsResponse>;

    const request = new marketplaceContracts.GetPriceDetailsRequest();
      request.basePrice = _.get(orderNew, 'operatorPrice.basePrice', null);
      request.arrivalAirportCode = _.get(orderNew, 'route.destinationAirport.code', null);
      request.departureAirportCode = _.get(orderNew, 'route.originAirport.code', null);
      request.seatsCount = _.get(orderNew, 'seatsCount', null);
    if (orderNew.contractType === models.ContractType.SHUTTLE) {
      service = this.marketplaceService.getShuttlePriceDetails(request);
    } else {
      service = this.marketplaceService.getCharterPriceDetails(request);
    }

    service
      .pipe(take(1))
      .subscribe(serviceResponse => {
        if (serviceResponse.entity) {
          this.showProposedPriceDetailConfirmation = true;
          this.proposedPriceDetail = serviceResponse.entity;
        } else {
          this.proposedPriceDetailIsLoading = false;
          this.proposedPriceDetail = null;
        }
      }, () => {
        this.proposedPriceDetailIsLoading = false;
        this.proposedPriceDetail = null;
      });
  }

  deactivate(): void {
    this.showDeactivateConfirmation = true;
  }

  onDeactivateDismissed(): void {
    this.showDeactivateConfirmation = false;
  }

  async onDeactivateConfirmed(): Promise<void> {
    const order = _.cloneDeep(await this.store.pipe(select(reducers.getLegDetails), take(1)).toPromise()) as models.Order;

    order.status = models.OrderStatusEnum.CLOSED;

    this.store.dispatch(new actions.SetFlightDetailsNewOrderAction(
      new actions.SetFlightDetailsNewOrderPayload(order)
    ));
    this.store.dispatch(new actions.UpdateFlightDetailsAction({ fullScreenLoad: true }));

    this.showDeactivateConfirmation = false;
  }

  async reactivate(): Promise<void> {
    this.showReactivateConfirmation = true;
  }

  onReactivateDismissed(): void {
    this.showReactivateConfirmation = false;
  }

  async onReactivateConfirmed(): Promise<void> {

    const order = _.cloneDeep(await this.store.pipe(select(reducers.getLegDetails), take(1)).toPromise()) as models.Order;

    order.status = models.OrderStatusEnum.OPEN;

    this.store.dispatch(new actions.SetFlightDetailsNewOrderAction(
      new actions.SetFlightDetailsNewOrderPayload(order)
    ));
    this.store.dispatch(new actions.UpdateFlightDetailsAction({ fullScreenLoad: true }));

    this.showReactivateConfirmation = false;
  }

  proposedPriceDetailConfirmationDismiss(): void {
    this.showProposedPriceDetailConfirmation = false;
    this.proposedPriceDetailIsLoading = false;
    this.proposedPriceDetail = null;
  }

  proposedPriceDetailConfirmationConfirm(): void {
    this.showProposedPriceDetailConfirmation = false;
    this.proposedPriceDetailIsLoading = false;
    this.proposedPriceDetail = null;
    this.store.dispatch(new actions.UpdateFlightDetailsAction());
    this.editMode$.next(false);
  }

  private isDateInPast(date: Date): boolean {
    return date.valueOf() < Date.now();
  }
}
