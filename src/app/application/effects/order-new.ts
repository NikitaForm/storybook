import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import * as actions from '../actions/order-new';
import * as models from '../../domain/models';
import * as reducers from '../reducers';
import * as coreReducers from '../../../core/reducers';
import * as marketplaceContracts from '../../domain/service-contracts/marketplace';

import { Observable, of } from 'rxjs';
import { withLatestFrom, map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class OrderNewEffects {
  @Effect()
  submitOrder$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.SubmitOrderAction>(actions.SUBMIT_ORDER),
      debounceTime(700),
      withLatestFrom(this.store.pipe(select(reducers.getOrderNewOrder))),
      switchMap(([_v1, order]) => {
        const request = new marketplaceContracts.SubmitOrderRequest();
        request.aircraftId = order.aircraft.aircraftId;
        request.departureTime = order.departureDate;
        request.destinationAirportCode = order.destinationAirport.code;
        if (order.destinationFbo) {
          request.destinationFboId = order.destinationFbo.id;
        }
        request.eft = order.eft;
        switch (order.priceType) {
          case models.PriceType.DYNAMIC:
            request.priceType = 'dynamic';
            break;
          case models.PriceType.FIXED:
            request.priceType = 'fixed';
            break;
          default:
        }
        request.externalId = order.externalId;
        request.seatMinPrice = order.seatMinPrice;
        request.originAirportCode = order.originAirport.code;
        if (order.originFbo) {
          request.originFboId = order.originFbo.id;
        }
        switch (order.contractType) {
        case models.ContractType.SHUTTLE:
          request.contractType = 'shuttle';
          request.seatCount = order.seats;
          break;
        case models.ContractType.CHARTER:
          request.contractType = 'charter';
          request.charterPrice = order.charterPrice;
          request.seatCount = order.aircraft.marketableSeatsCount;
          if (order.flexibility) {
            request.flightRate = order.flightRate;
            request.landingFee = order.landingFee;
          }
          break;
        default:
        }
        request.flexibility = order.flexibility;
        request.expirationOffset = order.expirationOffset;

        return this.marketplaceService.submitOrder(request)
          .pipe(
            map((serviceResponse: marketplaceContracts.SubmitOrderResponse) => {
              return new actions.SubmitOrderSuccessAction();
            }),
            catchError(err => {
              let errMessage;
              if (err && err.message) { errMessage = err.message; }

              return of(new actions.SubmitOrderFailureAction(errMessage ? errMessage : ''));
            })
          );
      })
    );

  @Effect()
  loadOrderPriceDetails$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadOrderPriceDetailsAction>(actions.LOAD_ORDER_PRICE_DETAILS),
      withLatestFrom(
        this.store.pipe(select(reducers.getOrderNewOrder))
      ),
      switchMap(([action, order]) => {
        let service: Observable<marketplaceContracts.GetPriceDetailsResponse>;
        const request = new marketplaceContracts.GetPriceDetailsRequest();
        request.departureAirportCode = _.get(order, 'originAirport.code', null);
        request.arrivalAirportCode = _.get(order, 'destinationAirport.code', null);
        request.departureTime = _.get(order, 'departureDate', null);
        if (order.contractType === models.ContractType.SHUTTLE) {
          request.basePrice = _.get(order, 'seatMinPrice', null);
          request.seatsCount = _.get(order, 'seats', null);
          service = this.marketplaceService.getShuttlePriceDetails(request);
        } else {
          request.basePrice = _.get(order, 'charterPrice', null);
          request.seatsCount = _.get(order, 'aircraft.marketableSeatsCount');
          service = this.marketplaceService.getCharterPriceDetails(request);
        }

        if ((!_.get(order, 'seatMinPrice', false) && !_.get(order, 'charterPrice'))
          || (!_.get(order, 'seats', false) && _.get(order, 'contractType') !== models.ContractType.CHARTER)
          || !_.get(order, 'originAirport.code', false)
          || !_.get(order, 'destinationAirport.code', false)) {
          return of(new actions.LoadOrderPriceDetailsFailAction());
        }

        return service
          .pipe(
            map((serviceResponse: marketplaceContracts.GetPriceDetailsResponse) => {
              if (serviceResponse.entity) {
                return new actions.LoadOrderPriceDetailsSuccessAction(serviceResponse.entity);
              } else {
                return new actions.LoadOrderPriceDetailsFailAction();
              }
            }),
            catchError(e => {
              return of(new actions.LoadOrderPriceDetailsFailAction());
            })
          );
      }));

  constructor(private actions$: Actions,
    @Inject(marketplaceContracts.SERVICE_TOKEN)
    private marketplaceService: marketplaceContracts.IMarketplaceService,
    private store: Store<any>) {
  }
}
