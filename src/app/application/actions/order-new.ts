import {Action} from '@ngrx/store';
import * as models from '../../domain/models';

export const LOAD_ORIGIN_AIRPORT = '[Publish Flights Order New] Load Order Origin Airport';
export const LOAD_ORIGIN_AIRPORT_FAILURE = '[Publish Flights Order New] Load Order Origin Airport Failure';
export const LOAD_ORIGIN_AIRPORT_SUCCESS = '[Publish Flights Order New] Load Order Origin Airport Success';
export const LOAD_ORDER_PRICE_DETAILS = '[Publish Flights Order New] Load Order Order Price Details';
export const LOAD_ORDER_PRICE_DETAILS_FAILURE = '[Publish Flights Order New] Load Order Order Price Details Failure';
export const LOAD_ORDER_PRICE_DETAILS_SUCCESS = '[Publish Flights Order New] Load Order Order Price Details Success';
export const RESET = '[Publish Flights Order New] Reset';
export const SET_ORDER = '[Publish Flights Order New] Set Order';
export const SUBMIT_ORDER = '[Publish Flights Order New] Submit Order';
export const SUBMIT_ORDER_FAILURE = '[Publish Flights Order New] Submit Order Failure';
export const SUBMIT_ORDER_SUCCESS = '[Publish Flights Order New] Submit Order Success';
export const SET_CONTRACT_TYPE = '[Publish Flights Order New] Set Contract Type';
export const CONFIRM_LOW_PRICE = '[Publish Flights Order New] Confirm Low Price';
export const CONFIRM_HIGH_PRICE = '[Publish Flights Order New] Confirm High Price';

export class LoadOrderOriginAirportAction implements Action {
  readonly type = LOAD_ORIGIN_AIRPORT;

  constructor(public payload: string) {
  }
}

export class LoadOrderOriginAirportFailureAction implements Action {
  readonly type = LOAD_ORIGIN_AIRPORT_FAILURE;
}

export class LoadOrderOriginAirportSuccessAction implements Action {
  readonly type = LOAD_ORIGIN_AIRPORT_SUCCESS;

  constructor(public payload: models.Airport) {
  }
}

export class ResetAction implements Action {
  readonly type = RESET;
}

export class SetOrderAction implements Action {
  readonly type = SET_ORDER;

  constructor(public payload: models.OrderRequest) {
  }
}

export class SubmitOrderAction implements Action {
  readonly type = SUBMIT_ORDER;
}

export class SubmitOrderFailureAction implements Action {
  readonly type = SUBMIT_ORDER_FAILURE;
  constructor(public payload?: string) {}
}

export class SubmitOrderSuccessAction implements Action {
  readonly type = SUBMIT_ORDER_SUCCESS;
}

export class LoadOrderPriceDetailsAction implements Action {
  readonly type = LOAD_ORDER_PRICE_DETAILS;
}

export class LoadOrderPriceDetailsSuccessAction implements Action {
  readonly type = LOAD_ORDER_PRICE_DETAILS_SUCCESS;
  constructor(public payload: models.PriceDetail) {}
}

export class LoadOrderPriceDetailsFailAction implements Action {
  readonly type = LOAD_ORDER_PRICE_DETAILS_FAILURE;
}

export class SetContractTypeAction implements Action {
  readonly type = SET_CONTRACT_TYPE;
  constructor(public payload: models.ContractType) {
  }
}

export class ConfirmLowPrice implements Action {
  readonly type = CONFIRM_LOW_PRICE;
}

export class ConfirmHighPrice implements Action {
  readonly type = CONFIRM_HIGH_PRICE;
}

export type Actions =
  LoadOrderOriginAirportAction
  | LoadOrderOriginAirportFailureAction
  | LoadOrderOriginAirportSuccessAction
  | ResetAction
  | SetOrderAction
  | SubmitOrderAction
  | SubmitOrderFailureAction
  | SubmitOrderSuccessAction
  | LoadOrderPriceDetailsAction
  | LoadOrderPriceDetailsSuccessAction
  | LoadOrderPriceDetailsFailAction
  | SetContractTypeAction
  | ConfirmHighPrice
  | ConfirmLowPrice;
