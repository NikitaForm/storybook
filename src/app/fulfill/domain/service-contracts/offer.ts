import { Observable } from 'rxjs';
import * as models from '../models';
import { InjectionToken } from '@angular/core';

export interface IOfferService {
  topic$?: Observable<any>;
  searchOffers(request: SearchOffersRequest): Observable<SearchOffersResponse>;
  acceptPurchaseOffer(request: AcceptPurchaseOfferRequest): Observable<AcceptPurchaseOfferResponse>;
  declinePurchaseOffer(request: DeclinePurchaseOfferRequest): Observable<DeclinePurchaseOfferResponse>;
  getPurchaseOfferById(request: string): Observable<models.OperatorPurchaseOffer>;
}

export const SERVICE_TOKEN = new InjectionToken('Offers.IOfferService');

export class SearchOffersRequest {
  status: string;
  offset = 0;
  limit = 25;
}

export class SearchOffersResponse {
  entities: Array<models.OperatorPurchaseOffer> = [];
  count: number;
}

export class AcceptPurchaseOfferRequest {
  sourcingRequestId: string;
  operatorPurchaseOfferId: string;
  aircraftId: number;
}

export class AcceptPurchaseOfferResponse {}

export class DeclinePurchaseOfferRequest {
  sourcingRequestId: string;
  operatorPurchaseOfferId: string;
  aircraftId: string;
}

export class DeclinePurchaseOfferResponse {}

