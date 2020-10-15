import { Injectable } from '@angular/core';
import * as contracts from '../../../domain/service-contracts/offer';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { response as offerSearchResponse } from './offer-search-response';
import * as mappers from '../mappers';
import * as models from '../../../domain/models';
import { getPurchaseOfferMockResponse } from './get-purchase-offer-response';

@Injectable()
export class OfferMockService implements contracts.IOfferService {
  topic$: Observable<any> = new Observable();
  searchOffers(request: contracts.SearchOffersRequest): Observable<contracts.SearchOffersResponse> {
    const response = new contracts.SearchOffersResponse();
    response.entities = offerSearchResponse.content
      .map(item => mappers.OfferMapper.Instance().operatorPurchaseOfferDtoToOperatorPurchaseOffer(item));
    response.count = offerSearchResponse.total;
    return of(response); // .pipe(delay(10000));
  }

  acceptPurchaseOffer(request: contracts.AcceptPurchaseOfferRequest): Observable<contracts.AcceptPurchaseOfferResponse> {
    return of(new contracts.AcceptPurchaseOfferResponse()).pipe(delay(2000));
  }

  declinePurchaseOffer(request: contracts.DeclinePurchaseOfferRequest): Observable<contracts.DeclinePurchaseOfferResponse> {
    return of(new contracts.DeclinePurchaseOfferResponse()).pipe(delay(2000));
  }

  getPurchaseOfferById(request: string): Observable<models.OperatorPurchaseOffer> {
    return of(mappers.OfferMapper.Instance().operatorPurchaseOfferDtoToOperatorPurchaseOffer(getPurchaseOfferMockResponse))
      .pipe(delay(1000));
  }

}
