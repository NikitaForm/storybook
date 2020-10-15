import { Inject, Injectable } from '@angular/core';

import * as contracts from '../../domain/service-contracts/pdf';
import { Observable } from 'rxjs/Observable';
import * as sharedServices from '../../../../shared/services';
import * as configServices from '../../../../core/services/config/contracts';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PdfRestService implements contracts.IPdfService {
  private readonly API_PATH: string;
  constructor(
    private http: sharedServices.BaseHttp,
    @Inject(configServices.SERVICE_TOKEN) private configService: configServices.IConfigService) {
    this.API_PATH = this.configService.get('SourcingServiceEndpoint');
  }


  getCharterAgreements(request: contracts.GetPdfLinkRequest): Observable<Blob> {
    const requestUrl = `${this.API_PATH}/operator-purchase-offers/${request.operatorOfferId}/charter-agreement`;
    const options = new RequestOptions();
    options.headers = new Headers();
    options.responseType = ResponseContentType.Blob;
    options.headers.append('Accept', 'application/pdf');
    return this.http.get(requestUrl, options).pipe(map(res => res.blob()));
  }

  getSafetyAgreements(request: contracts.GetPdfLinkRequest): Observable<Blob> {
    const requestUrl = `${this.API_PATH}/operator-purchase-offers/${request.operatorOfferId}/safety-agreement`;
    const options = new RequestOptions();
    options.headers = new Headers();
    options.responseType = ResponseContentType.Blob;
    options.headers.append('Accept', 'application/pdf');
    return this.http.get(requestUrl, options).pipe(map(res => res.blob()));
  }
}
