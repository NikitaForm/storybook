import { Injectable, Inject } from '@angular/core';

import * as contracts from './contracts/operator';

import * as configServices from '../config/contracts';
import * as sharedServices from '../../../shared/services';
import { response as getUserAgreementResponse } from './mock-data/get-user-agreement.response';

import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class OperatorMockService implements contracts.IOperatorService {
  private operatorServiceEndpoint: string;

  constructor(private http: sharedServices.BaseHttp,
    @Inject(configServices.SERVICE_TOKEN) private configService: configServices.IConfigService) {
    this.operatorServiceEndpoint = this.configService.get('OperatorServiceEndpoint');
  }

  acceptUserAgreement(request: contracts.AcceptUserAgreementRequest): Observable<contracts.AcceptUserAgreementResponse> {
    const requestUrl = request.agreementAcceptUrl;

    return this.http.put(requestUrl, null)
      .pipe(
        map(svcResp => {
          const svcJsonResp = svcResp.json();

          const response = new contracts.AcceptUserAgreementResponse();

          if (svcJsonResp.status === 202) {
            response.isAccepted = true;
          }

          return response;
        })
      );
  }

  getUserAgreement(request: contracts.GetUserAgreementRequest): Observable<contracts.GetUserAgreementResponse> {
    const response = new contracts.GetUserAgreementResponse();
    response.isAuthorized = getUserAgreementResponse.data.isAccessGranted;

    if (getUserAgreementResponse.data.isAccessGranted) {
      response.isAuthorized = true;
    }

    return of(response);
  }

  getUserAgreementPdf(request: contracts.GetUserAgreementPdfRequest): Observable<Blob> {
    const response = new Blob();

    return of(response);
  }

  downloadUserAgreementPdf(request: contracts.DownloadUserAgreementPdfRequest): Observable<contracts.DownloadUserAgreementPdfResponse> {
    const response = new contracts.DownloadUserAgreementPdfResponse();

    return of(response);
  }

  evaluateAccess(): Observable<contracts.GetUserAgreementResponse> {
    const response = new contracts.GetUserAgreementResponse();
    response.isAuthorized = getUserAgreementResponse.data.isAccessGranted;

    if (getUserAgreementResponse.data.isAccessGranted) {
      response.isAuthorized = true;
    }

    return of(response);
  }

}
