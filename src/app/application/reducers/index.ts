/* tslint:disable:max-line-length */
import { createSelector } from 'reselect';
import { ActionReducer, ActionReducerMap, combineReducers } from '@ngrx/store';
// import { compose } from '@ngrx/core/compose';
// import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAircraft from './aircraft';
import * as fromAirport from './airport';
import * as fromFbo from './fbo';
import * as fromOrderNew from './order-new';
import * as fromOrderCollection from './order-collection';
import * as fromFlightDetails from './flight-details';
// import {environment} from '../../environments/environment';

export interface State {
  aircraft: fromAircraft.State;
  airport: fromAirport.State;
  fbo: fromFbo.State;
  orderNew: fromOrderNew.State;
  orderCollection: fromOrderCollection.State;
  flightDetails: fromFlightDetails.State;
}

const reducers: ActionReducerMap<State> = {
  aircraft: fromAircraft.reducer,
  airport: fromAirport.reducer,
  fbo: fromFbo.reducer,
  orderNew: fromOrderNew.reducer,
  orderCollection: fromOrderCollection.reducer,
  flightDetails: fromFlightDetails.reducer
};

const combinedReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any): any {
  return combinedReducer(state, action);
}

export const getAircraftState = (state: any) => state.publish.aircraft;
export const getAircraftAircraftList = createSelector(getAircraftState, fromAircraft.getAircraftList);
export const getAircraftIsLoading = createSelector(getAircraftState, fromAircraft.getIsLoading);
export const getAircraftIsLoaded = createSelector(getAircraftState, fromAircraft.getIsLoaded);

export const getFboState = (state: any) => state.publish.fbo;
export const getFboFboMap = createSelector(getFboState, fromFbo.getFboMap);
export const getFboLoadingOriginFbo = createSelector(getFboState, fromFbo.getLoadingOriginFbo);
export const getFboLoadingDestinationFbo = createSelector(getFboState, fromFbo.getLoadingDestinationFbo);
export const getFboValidatingOriginAirport = createSelector(getFboState, fromFbo.getValidatingOriginAirport);
export const getFboValidatingDestinationAirport = createSelector(getFboState, fromFbo.getValidatingDestinationAirport);

// export const getAirportState = (state: any) => state.publish.airport;
// export const getAirportOriginAirports = createSelector(getAirportState, fromAirport.getOriginAirports);
// export const getAirportDestinationAirports = createSelector(getAirportState, fromAirport.getDestinationAirports);

export const getOrderNewState = (state: any) => state.publish.orderNew;
export const getOrderNewOrder = createSelector(getOrderNewState, fromOrderNew.getOrder);
export const getOrderNewOrderIsSubmitted = createSelector(getOrderNewState, fromOrderNew.getOrderIsSubmitted);
export const getOrderNewOrderIsSubmitting = createSelector(getOrderNewState, fromOrderNew.getOrderIsSubmitting);
export const getOrderNewOrginAirport = createSelector(getOrderNewState, fromOrderNew.getOrderOriginAirport);
export const getOrderNewOriginAirportIsLoaded = createSelector(getOrderNewState, fromOrderNew.getOrderOriginAirportIsLoaded);
export const getOrderNewOriginAirportIsLoading = createSelector(getOrderNewState, fromOrderNew.getOrderOriginAirportIsLoading);
export const getOrderNewOrderPriceDetails = createSelector(getOrderNewState, fromOrderNew.getOrderPriceDetails);
export const getOrderNewOrderPriceDetailsIsLoaded = createSelector(getOrderNewState, fromOrderNew.getOrderPriceDetailsIsLoaded);
export const getOrderNewOrderPriceDetailsIsLoading = createSelector(getOrderNewState, fromOrderNew.getOrderPriceDetailsIsLoading);
export const getOrderNewContractType = createSelector(getOrderNewState, fromOrderNew.getContractType);
export const getOrderNewLowPriceConfirmed = createSelector(getOrderNewState, fromOrderNew.getLowPriceConfirmed);
export const getOrderNewHighPriceConfirmed = createSelector(getOrderNewState, fromOrderNew.getHighPriceConfirmed);

export const getOrderCollectionState = (state: any) => state.publish.orderCollection;
export const getOrderCollectionCurrentPage = createSelector(getOrderCollectionState, fromOrderCollection.getCurrentPage);
export const getOrderCollectionIsLoaded = createSelector(getOrderCollectionState, fromOrderCollection.getIsLoaded);
export const getOrderCollectionIsLoading = createSelector(getOrderCollectionState, fromOrderCollection.getIsLoading);
export const getOrderCollectionItems = createSelector(getOrderCollectionState, fromOrderCollection.getItems);
export const getOrderCollectionItemsPerPage = createSelector(getOrderCollectionState, fromOrderCollection.getItemsPerPage);
export const getOrderCollectionItemsTotalCount = createSelector(getOrderCollectionState, fromOrderCollection.getItemsTotalCount);
export const getFilterOptions = createSelector(getOrderCollectionState, fromOrderCollection.getFilterOptions);
export const getTailNumberAutocompleteOptions = createSelector(getOrderCollectionState, fromOrderCollection.getTailNumberAutocompleteOptions);
export const getIntIdAutocompleteOptions = createSelector(getOrderCollectionState, fromOrderCollection.getIntIdAutocompleteOptions);
export const getOrderCollectionFlightDetailsSidepanelVisible = createSelector(getOrderCollectionState, fromOrderCollection.getFlightDetailsSidepanelVisible);

export const getFlightDetailsState = (state: any) => state.publish.flightDetails;
export const getLegRequestDetails = createSelector(getFlightDetailsState, fromFlightDetails.getLegRequestDetails);
export const getLegDetails = createSelector(getFlightDetailsState, fromFlightDetails.getLegDetails);
export const getLegDetailsNewOrder = createSelector(getFlightDetailsState, fromFlightDetails.getLegDetailsNewOrder);
export const getPassengerDetails = createSelector(getFlightDetailsState, fromFlightDetails.getPassengerDetails);
export const getIsFlightDetailsLoading = createSelector(getFlightDetailsState, fromFlightDetails.getIsFlightDetailsLoading);
export const getIsPassengerDetailsLoading = createSelector(getFlightDetailsState, fromFlightDetails.getIsPassengerDetailsLoading);
export const getIsFlightDetailUpdateLoading = createSelector(getFlightDetailsState, fromFlightDetails.getIsFlightDetailUpdateLoading);
export const getIsFlightDetailPriceDetail = createSelector(getFlightDetailsState, fromFlightDetails.getPriceDetails);
export const getFlightDetailPriceHistoryIsLoaded = createSelector(getFlightDetailsState, fromFlightDetails.getPriceHistoryIsLoaded);
export const getFlightDetailPriceHistoryIsLoading = createSelector(getFlightDetailsState, fromFlightDetails.getPriceHistoryIsLoading);
export const getFlightDetailPriceHistoryItems = createSelector(getFlightDetailsState, fromFlightDetails.getPriceHistoryItems);
export const getRepositioningItinerary = createSelector(getFlightDetailsState, fromFlightDetails.getRepositioningItinerary);
