import * as fromOfferList from './offer-list';
import * as fromAircraft from './aircraft';
import { ActionReducerMap, combineReducers, ActionReducer } from '@ngrx/store';
import { createSelector } from 'reselect';

export interface State {
  offerList: fromOfferList.State;
  aircraftList: fromAircraft.State;
}

export const reducers: ActionReducerMap<State> = {
  offerList: fromOfferList.reducer,
  aircraftList: fromAircraft.reducer
};

const combinedReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any): State {
  return combinedReducer(state, action);
}

export const getAircraftState = (state: any) => state.fulfill.aircraftList;
export const getAircraftListLoaded = createSelector(getAircraftState, fromAircraft.getLoaded);
export const getAircraftListLoading = createSelector(getAircraftState, fromAircraft.getLoading);
export const getAircraftList = createSelector(getAircraftState, fromAircraft.getItems);


export const getOfferListState = (state: any) => state.fulfill.offerList;
export const getOfferListCurrentPage = createSelector(getOfferListState, fromOfferList.getCurrentPage);
export const getOfferListIsLoaded = createSelector(getOfferListState, fromOfferList.getIsLoaded);
export const getOfferListIsLoading = createSelector(getOfferListState, fromOfferList.getIsLoading);
export const getOfferListLookupCriteria = createSelector(getOfferListState,
  fromOfferList.getCriteria);
export const getOfferListItems = createSelector(getOfferListState, fromOfferList.getItems);
export const getOfferListItemsPerPage = createSelector(getOfferListState, fromOfferList.getItemsPerPage);
export const getOfferListItemsTotalCount = createSelector(getOfferListState,
  fromOfferList.getItemsTotalCount);
export const getOfferListSelectedPurchaseOffer = createSelector(getOfferListState, fromOfferList.getSelectedPurchaseOffer);
export const getSelectedOfferIsLoading = createSelector(getOfferListState, fromOfferList.getIsSelectedPurchaseOfferLoading);
export const getSelectedOfferIsLoaded = createSelector(getOfferListState, fromOfferList.getIsSelectedPurchaseOfferLoaded);
export const getAcceptOfferDialogIsVisible = createSelector(getOfferListState, fromOfferList.getAcceptOfferDialogVisible);
