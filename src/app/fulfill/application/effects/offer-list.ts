import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as contracts from '../../domain/service-contracts/offer';
import * as actions from '../actions/offer-list';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as models from '../../domain/models';

@Injectable()
export class OfferListEffects {

  @Effect()
  searchOffers$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.SearchAction>(actions.SEARCH),
      map(action => action.payload),
      switchMap(payload => {
        const request = new contracts.SearchOffersRequest();
        request.status = payload.criteria.status;
        request.limit = payload.itemsPerPage;
        request.offset = (payload.page - 1) * payload.itemsPerPage;

        return this.offerService.searchOffers(request)
          .pipe(
            switchMap((serviceResponse: contracts.SearchOffersResponse) => {
              const actionPayload = new actions.SearchSuccessPayload();
              actionPayload.data = serviceResponse.entities;
              actionPayload.count = serviceResponse.count;
              actionPayload.page = payload.page;

              return of(new actions.SearchSuccessAction(actionPayload));
            })
          );
      })
    );

  @Effect()
  getPurchaseOffer$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.GetPurchaseOfferAction>(actions.GET_PURCHASE_OFFER),
      map(action => action.payload),
      switchMap(payload => {
        return this.offerService.getPurchaseOfferById(payload)
          .pipe(
            switchMap((serviceResponse: models.OperatorPurchaseOffer) => {
              return [
                new actions.SetSelectedPurchaseOfferAction(serviceResponse),
                new actions.GetPurchaseOfferSuccessAction(serviceResponse)
              ];
            }),
            catchError(() => {
              return of(new actions.GetPurchaseOfferFailAction());
            })
          );
      })
    );

  constructor(
    private actions$: Actions,
    @Inject(contracts.SERVICE_TOKEN) private offerService: contracts.IOfferService) {
  }
}
