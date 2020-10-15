import { Action } from '@ngrx/store';
import * as models from '../../domain/models';
import * as viewModels from '../../view/view-models';

export const RESET = '[Offers.OfferList] Reset';
export const RESET_OFFER = '[Offers.OfferList] Reset Offer';
export const SEARCH = '[Offers.OfferList] Search';
export const SEARCH_SUCCESS = '[Offers.OfferList] Load Success';
export const SEARCH_FAIL = '[Offers.OfferList] Load Fail';
export const SET_SELECTED_PURCHASE_OFFER = '[Offers.OfferList] Ser Selected Purchase Offer';
export const GET_PURCHASE_OFFER = '[Offers.OfferList] Get Purchase Offer By ID';
export const GET_PURCHASE_OFFER_SUCCESS = '[Offers.OfferList] Get Purchase Offer By ID Success';
export const GET_PURCHASE_OFFER_FAIL = '[Offers.OfferList] Get Purchase Offer By ID Fail';
export const SET_ACCEPT_OFFER_DIALOG_VISIBLE = '[Offers.OfferList] Set Accept Offer Dialog Visible';
export const SUBMIT_PURCHASE_OFFER = '[Offers.OfferList] Submit Purchase Offer';

export class ResetAction implements Action {
  readonly type = RESET;
}

export class ResetOfferAction implements Action {
  readonly type = RESET_OFFER;
}

export class SearchPayload {
  criteria: viewModels.OffersLookupCriteria;
  page: number;
  itemsPerPage: number;
  isLoading?: boolean;

  constructor(criteria: viewModels.OffersLookupCriteria, page: number, itemsPerPage: number) {
    this.criteria = new viewModels.OffersLookupCriteria();

    if (criteria) {
      this.criteria = criteria;
    }

    this.page = page;
    this.itemsPerPage = itemsPerPage;
  }
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: SearchPayload) {
  }
}

export class SearchSuccessPayload {
  page: number;
  data: Array<models.OperatorPurchaseOffer>;
  count: number;
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: SearchSuccessPayload) {
  }
}

export class SearchFailAction implements Action {
  readonly type = SEARCH_FAIL;
}

export class SetSelectedPurchaseOfferAction implements Action {
  readonly type = SET_SELECTED_PURCHASE_OFFER;

  constructor(public payload: models.OperatorPurchaseOffer) {
  }
}

export class GetPurchaseOfferAction implements Action {
  readonly type = GET_PURCHASE_OFFER;

  constructor(public payload: string) {
  }
}

export class GetPurchaseOfferSuccessAction implements Action {
  readonly type = GET_PURCHASE_OFFER_SUCCESS;

  constructor(public payload: models.OperatorPurchaseOffer) {
  }
}

export class GetPurchaseOfferFailAction implements Action {
  readonly type = GET_PURCHASE_OFFER_FAIL;
}

export class SetAcceptOfferDialogVisibleAction implements Action {
  readonly type = SET_ACCEPT_OFFER_DIALOG_VISIBLE;

  constructor(public payload: boolean) {
  }
}

export class SubmitPurchaseOffer implements Action {
  readonly type = SUBMIT_PURCHASE_OFFER;
  constructor(public payload: SubmitPurchaseOfferPayload) {}
}




export class SubmitPurchaseOfferPayload {
  constructor(public sourcingRequestId: string,
              public operatorPurchaseOfferId: string,
              public aircraft: models.Aircraft,
              public offerBid: number) {
  }
}


export type Actions =
  ResetAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailAction
  | SetSelectedPurchaseOfferAction
  | GetPurchaseOfferAction
  | GetPurchaseOfferSuccessAction
  | GetPurchaseOfferFailAction
  | SetAcceptOfferDialogVisibleAction
  | SubmitPurchaseOffer
  | ResetOfferAction;
