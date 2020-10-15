import { Inject, Injectable } from '@angular/core';
import * as sharedTypes from '../../../../../shared/types';
import * as coreTypes from '../../../../../core/types';
import * as contracts from '../../../domain/service-contracts/offer';
import * as mappers from '../mappers';
import { Observable } from 'rxjs';
import { RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { OperatorPurchaseOffer } from '../../../domain/models';

@Injectable()
export class OfferRestService implements contracts.IOfferService {
  private readonly API_PATH: string;
  topic$: Observable<any>;
  constructor(
    private http: sharedTypes.BaseHttp,
    @Inject(coreTypes.SERVICE_TOKEN) private configService: coreTypes.IConfigService,
    // @Inject(sharedTypes.STOMP_SERVICE_TOKEN) private stompService: sharedTypes.IStompService
  ) {
    this.API_PATH = this.configService.get('SourcingServiceEndpoint');
    // this.stompService.connect(`${this.API_PATH}/stomp`);
    // this.topic$ = this.stompService.subscribe('/user/queue/reply');
  }

  searchOffers(request: contracts.SearchOffersRequest): Observable<contracts.SearchOffersResponse> {
    const requestUrl = `${this.API_PATH}/operator-purchase-offers`;
    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('limit', request.limit.toString());
    params.set('offset', request.offset.toString());
    params.set('status', request.status);
    options.params = params;
    return this.http.get(requestUrl, options)
      .pipe(
        map(svcResp => {
          const svcJsonResp = svcResp.json();
          const response = new contracts.SearchOffersResponse();
          response.entities =
            svcJsonResp.content.map(item => mappers.OfferMapper.Instance().operatorPurchaseOfferDtoToOperatorPurchaseOffer(item));
          response.count = svcJsonResp.total;
          return response;
        })
      );
  }

  getPurchaseOfferById(id: string): Observable<OperatorPurchaseOffer> {
    const requestUrl = `${this.API_PATH}/operator-purchase-offers/${id}`;
    return this.http.get(requestUrl)
      .pipe(
        map(svcResp => {
          const offer = svcResp.json();
          return mappers.OfferMapper.Instance().operatorPurchaseOfferDtoToOperatorPurchaseOffer(offer);
        })
      );
  }

  acceptPurchaseOffer(request: contracts.AcceptPurchaseOfferRequest): Observable<contracts.AcceptPurchaseOfferResponse> {
    const requestUrl = `${this.API_PATH}/sourcing-requests`;
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('domain-model', 'OperatorPurchaseOfferAcceptCommand');
    return this.http.post(requestUrl, request, options)
      .pipe(map(svcResp => {
        const item = svcResp.json();
        return new contracts.AcceptPurchaseOfferResponse();
      }));
  }

  declinePurchaseOffer(request: contracts.DeclinePurchaseOfferRequest): Observable<contracts.DeclinePurchaseOfferResponse> {
    const requestUrl = `${this.API_PATH}/sourcing-requests`;
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('domain-model', 'OperatorPurchaseOfferDeclineCommand');
    return this.http.post(requestUrl, request, options)
      .pipe(map(svcResp => {
        const item = svcResp.json();
        return new contracts.DeclinePurchaseOfferResponse();
      }));
  }
}
