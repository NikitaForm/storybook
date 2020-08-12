import { Action } from '@ngrx/store';
import { FlightPassengerDetails, Order, PriceHistoryItem } from '../../domain/models';
import { FlightDetails } from '../reducers/flight-details';

export const LOAD_FLIGHT_DETAILS = '[Publish Flights Flight Details] Load Details';
export const LOAD_FLIGHT_DETAILS_SUCCESS = '[Publish Flights Flight Details] Load Details Success';
export const LOAD_FLIGHT_DETAILS_FAIL = '[Publish Flights Flight Details] Load Details Failure';

export const LOAD_PRICE_HISTORY = '[Publish Flights Flight Details] Load Price History';
export const LOAD_PRICE_HISTORY_SUCCESS = '[Publish Flights Flight Details] Load Price History Success';
export const LOAD_PRICE_HISTORY_FAIL = '[Publish Flights Flight Details] Load Price History Failure';

export const LOAD_FLIGHT_PASSENGER_DETAILS = '[Publish Flights Flight Details] Load Passenger Details';
export const LOAD_FLIGHT_PASSENGER_DETAILS_SUCCESS = '[Publish Flights Flight Details] Load Passenger Details Success';
export const LOAD_FLIGHT_PASSENGER_DETAILS_FAIL = '[Publish Flights Flight Details] Load Passenger Details Failure';

export const SET_FLIGHT_DETAILS_NEW_ORDER = '[Publish Flights Flight Details] Set Flight Details New Order';
export const UPDATE_FLIGHT_DETAILS = '[Publish Flights Flight Details] Update Details';
export const UPDATE_FLIGHT_DETAILS_SUCCESS = '[Publish Flights Flight Details] Update Details Success';
export const UPDATE_FLIGHT_DETAILS_FAIL = '[Publish Flights Flight Details] Update Details Failure';

export class LoadFlightDetailsAction implements Action {
  readonly type = LOAD_FLIGHT_DETAILS;
  constructor(public payload: number) { }
}

export class LoadFlightDetailsSuccessAction implements Action {
  readonly type = LOAD_FLIGHT_DETAILS_SUCCESS;
  constructor(public payload: FlightDetails) { }
}

export class LoadFlightDetailsFailAction implements Action {
  readonly type = LOAD_FLIGHT_DETAILS_FAIL;
}

export class LoadPriceHistoryAction implements Action {
  readonly type = LOAD_PRICE_HISTORY;
  constructor(public payload: number) { }
}

export class LoadPriceHistorySuccessPayload {
  constructor(public entities: Array<PriceHistoryItem>) { }
}
export class LoadPriceHistorySuccessAction implements Action {
  readonly type = LOAD_PRICE_HISTORY_SUCCESS;
  constructor(public payload: LoadPriceHistorySuccessPayload) { }
}

export class LoadPriceHistoryFailAction implements Action {
  readonly type = LOAD_PRICE_HISTORY_FAIL;
}

export class LoadFlightPassengerDetailsAction implements Action {
  readonly type = LOAD_FLIGHT_PASSENGER_DETAILS;
  constructor(public payload: number) { }
}

export class LoadFlightPassengerDetailsSuccessAction implements Action {
  readonly type = LOAD_FLIGHT_PASSENGER_DETAILS_SUCCESS;
  constructor(public payload: Array<FlightPassengerDetails>) { }
}

export class LoadFlightPassengerDetailsFailAction implements Action {
  readonly type = LOAD_FLIGHT_PASSENGER_DETAILS_FAIL;
}

export class SetFlightDetailsNewOrderPayload {
  constructor(public entity: Order) { }
}

export class SetFlightDetailsNewOrderAction implements Action {
  readonly type = SET_FLIGHT_DETAILS_NEW_ORDER;
  constructor(public payload: SetFlightDetailsNewOrderPayload) { }
}

export class UpdateFlightDetailsAction implements Action {
  readonly type = UPDATE_FLIGHT_DETAILS;
  constructor(public payload = { fullScreenLoad: false }) { }
}

export class UpdateFlightDetailsSuccessAction implements Action {
  readonly type = UPDATE_FLIGHT_DETAILS_SUCCESS;
}

export class UpdateFlightDetailsFailAction implements Action {
  readonly type = UPDATE_FLIGHT_DETAILS_FAIL;
}

export type Actions =
  LoadFlightDetailsAction
  | LoadFlightDetailsFailAction
  | LoadPriceHistoryAction
  | LoadPriceHistorySuccessAction
  | LoadPriceHistoryFailAction
  | LoadFlightDetailsSuccessAction
  | LoadFlightPassengerDetailsAction
  | LoadFlightPassengerDetailsSuccessAction
  | LoadFlightPassengerDetailsFailAction
  | SetFlightDetailsNewOrderAction
  | UpdateFlightDetailsAction
  | UpdateFlightDetailsSuccessAction
  | UpdateFlightDetailsFailAction;
