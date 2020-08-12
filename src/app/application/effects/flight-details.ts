import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as actions from '../actions/flight-details';
import * as orderCollectionActions from '../actions/order-collection';
import * as reducers from '../reducers';
import * as coreReducers from '../../../core/reducers';
import * as marketplaceContracts from '../../domain/service-contracts/marketplace';
import * as models from '../../domain/models';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, debounceTime, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class FlightDetailsEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadFlightDetailsAction>(actions.LOAD_FLIGHT_DETAILS),
      map(action => action.payload),
      switchMap(loadPayload => {
        return this.marketplaceService.getFlightDetails(loadPayload)
          .pipe(
            withLatestFrom(
              this.store$.pipe(select(coreReducers.getUserUser))
            ),
            switchMap(([serviceResponse, user]) => {
              const legDetails = _.get(serviceResponse, 'legDetailsEntities[0]', null);

              const flightDetails = {
                legDetails: legDetails,
                legRequestDetails: _.get(serviceResponse, 'legRequestDetailsEntities[0]', null),
                newOrder: null,
                priceDetails: _.get(serviceResponse, 'priceDetailsEntities[0]', null),
                priceDetailsIsLoaded: false,
                priceDetailsIsLoading: false,
                repositioningItinerary: _.get(serviceResponse, 'repositioningItinerary[0]', null)
              };
              const r = new actions.LoadPriceHistorySuccessPayload(_.get(serviceResponse, 'priceHistoryEntities[0]', null));
              return [new actions.LoadFlightDetailsSuccessAction(flightDetails),
                new actions.LoadFlightPassengerDetailsSuccessAction(_.get(serviceResponse, 'passengerDetailsEntities[0]', null)),
                new actions.LoadPriceHistorySuccessAction(r)];

            }),
            catchError(() => of(new actions.LoadFlightDetailsFailAction()))
          );
      })
    );

  @Effect()
  updateFlightDetails$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.UpdateFlightDetailsAction>(actions.UPDATE_FLIGHT_DETAILS),
      withLatestFrom(this.store$.pipe(select(reducers.getLegDetailsNewOrder)),
        this.store$.pipe(select(reducers.getLegDetails))),
      switchMap(([action, payload, orderOrigin]) => {
        const request = new marketplaceContracts.UpdateOrderRequest();
        request.availableFlightId = payload.availableFlightId;
        if (payload.status !== orderOrigin.status) {
          request.status = models.OrderStatusEnum[payload.status];
        } else if (payload.contractType === models.ContractType.SHUTTLE) {
          request.seatPrice = payload.operatorPrice.basePrice;
          request.seatsOffered = payload.seatsCount;
        } else if (payload.contractType === models.ContractType.CHARTER) {
          request.charterPrice = payload.operatorPrice.basePrice;
        }

        return this.marketplaceService.updateOrder(request)
          .pipe(
            switchMap(() => {
              return [
                new actions.UpdateFlightDetailsSuccessAction(),
                new actions.LoadFlightDetailsAction(payload.legacyLegId),
                new orderCollectionActions.LoadAction()
              ];
            }),
            catchError(() => of(new actions.UpdateFlightDetailsFailAction()))
          );
      })
    );

  constructor(private actions$: Actions,
    private store$: Store<any>,
    @Inject(marketplaceContracts.SERVICE_TOKEN)
    private marketplaceService: marketplaceContracts.IMarketplaceService) {
  }
}
