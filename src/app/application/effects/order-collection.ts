import { Inject, Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as actions from '../actions/order-collection';
import * as marketplaceContracts from '../../domain/service-contracts/marketplace';
import * as reducers from '../reducers';
import * as models from '../../domain/models';

import { Observable, of } from 'rxjs';
import { withLatestFrom, map, switchMap, debounceTime, catchError } from 'rxjs/operators';

@Injectable()
export class OrderCollectionEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAction>(actions.LOAD),
      debounceTime(300),
      withLatestFrom(this.store$.pipe(select(reducers.getOrderCollectionState))),
      switchMap(([loadPayload, orderCollectionState]) => {

        const queryParams = {} as models.CollectionQueryParams;
        queryParams.filterOptions = orderCollectionState.filterOptions;
        queryParams.currentPage = orderCollectionState.currentPage;
        queryParams.itemsPerPage = orderCollectionState.itemsPerPage;

        const request = {
          externalId: queryParams.filterOptions.intId === '' ? null : queryParams.filterOptions.intId,
          tailNumber: queryParams.filterOptions.tailNumber === '' ? null : queryParams.filterOptions.tailNumber,
          departureDate: queryParams.filterOptions.departureDate,
          recordOffset: (queryParams.currentPage - 1) * queryParams.itemsPerPage,
          recordLimit: queryParams.itemsPerPage
        };

        return this.marketplaceService.getFilteredOrderList(request)
          .pipe(
            map(serviceResponse => {

              const loadSuccessPayload = new actions.LoadSuccessPayload();
              loadSuccessPayload.data = serviceResponse.entities;
              loadSuccessPayload.count = serviceResponse.total;

              return new actions.LoadSuccessAction(loadSuccessPayload);

            }),
            catchError(() => of(new actions.LoadFailAction()))
          );
      })
    );

  @Effect()
  autocompleteOptions$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAutocompleteOptionsAction>(actions.LOAD_AUTOCOMPLETE_OPTIONS),
      debounceTime(300),
      map(action => action.payload),
      switchMap((loadPayload: actions.LoadAutocompleteOptionsPayload) => {

        const request = {
          prefixString: loadPayload.prefixString,
          searchField: loadPayload.searchField
        };

        return this.marketplaceService.getAutoCompleteOptions(request)
          .pipe(
            map(serviceResponse => {
              const loadSuccessPayload = new actions.LoadAutocompleteOptionsSuccessPayload();
              loadSuccessPayload.searchField = loadPayload.searchField;
              loadSuccessPayload.options = serviceResponse.options ? serviceResponse.options : [];

              return new actions.LoadAutocompleteOptionsSuccessAction(loadSuccessPayload);
            }),
            catchError(() => {
              const payload = new actions.LoadAutocompleteOptionsFailurePayload();
              payload.searchField = loadPayload.searchField;

              return of(new actions.LoadAutocompleteOptionsFailureAction(payload));
            })
          );
      })
    );

  constructor(private actions$: Actions,
    @Inject(marketplaceContracts.SERVICE_TOKEN)
    private marketplaceService: marketplaceContracts.IMarketplaceService,
    private store$: Store<any>) {
  }
}
