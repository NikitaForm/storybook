import { Action } from '@ngrx/store';

export const ACCEPT_PURCHASE_OFFER = '[Offers.Offer] Accept Purchase Offer';
export const ACCEPT_PURCHASE_OFFER_SUCCESS = '[Offers.Offer] Accept Purchase Offer Success';
export const DECLINE_PURCHASE_OFFER = '[Offers.Offer] Decline Purchase Offer';
export const DECLINE_PURCHASE_OFFER_SUCCESS = '[Offers.Offer] Decline Purchase Offer Success';

export class AcceptPurchaseOfferPayload {
  constructor(public sourcingRequestId: string, public operatorPurchaseOfferId: string, public aircraftId: number ) {}
}

export class AcceptPurchaseOffer implements Action {
  readonly type = ACCEPT_PURCHASE_OFFER;
  constructor(public payload: AcceptPurchaseOfferPayload) {}
}



export class AcceptPurchaseOfferSuccess implements Action {
  readonly type = ACCEPT_PURCHASE_OFFER_SUCCESS;
}

export class DeclinePurchaseOfferPayload {
  constructor(public sourcingRequestId: string, public operatorPurchaseOfferId: string) {}
}

export class DeclinePurchaseOffer implements Action {
  readonly type = DECLINE_PURCHASE_OFFER;
  constructor(public payload: DeclinePurchaseOfferPayload) {}
}

export class DeclinePurchaseOfferSuccess implements Action {
  readonly type = DECLINE_PURCHASE_OFFER_SUCCESS;
}

export type Actions =
  AcceptPurchaseOffer |
  AcceptPurchaseOfferSuccess |
  DeclinePurchaseOffer |
  DeclinePurchaseOfferSuccess;
