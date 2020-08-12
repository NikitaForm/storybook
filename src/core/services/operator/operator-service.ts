import { Injectable, Inject } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import * as contracts from './contracts/operator';
import * as configServices from '../config/contracts';
import * as sharedServices from '../../../shared/services';
import { Observable } from 'rxjs/Observable';
import { catchError, first, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class OperatorService implements contracts.IOperatorService {
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
    const requestUrl = `${this.operatorServiceEndpoint}/v1.0/operator/access/evaluate`;
    /** TODO uncomment this bypassing!!! */
    // return this.http.get(requestUrl)
    return of({
      json: () => {
        return {
          'message': 'OK',
          'code': 200,
          'data': {
            'isAccessGranted': true,
            user_access_denied_reason_id: null,
            user_access_denied_reason_message: null,
            remainingDocumentUrlToAccept: null,
            remainingDocumentUrlToDownload: null
          }
        };
      }
    })
      .pipe(
        map(svcResp => {
          const svcJsonResp = svcResp.json();
          const response = new contracts.GetUserAgreementResponse();
          response.isAuthorized = svcJsonResp.data.isAccessGranted;
          if (svcJsonResp.data.isAccessGranted) {
            response.isAuthorized = true;
          } else {
            response.isAuthorized = false;
            response.remainingDocumentUrlToAccept = this.operatorServiceEndpoint + svcJsonResp.data.remainingDocumentUrlToAccept;
            response.remainingDocumentUrlToDownload = this.operatorServiceEndpoint + svcJsonResp.data.remainingDocumentUrlToDownload;
            response.userAccessDeniedReasonId = svcJsonResp.data.user_access_denied_reason_id;
            response.userAccessDeniedReasonMessage = svcJsonResp.data.user_access_denied_reason_message;
          }
          return response;
        })
      );
  }
  evaluateAccess(): Observable<contracts.GetUserAgreementResponse> {
    const requestUrl = `${this.operatorServiceEndpoint}/v1.0/operator/access/evaluate`;
    /** TODO uncomment this bypassing!!! */
    // return this.http.get(requestUrl)
    return of({
      json: () => {
        return {
          'message': 'OK',
          'code': 200,
          'data': {
            'isAccessGranted': true,
            user_access_denied_reason_id: null,
            user_access_denied_reason_message: null,
            remainingDocumentUrlToAccept: null,
            remainingDocumentUrlToDownload: null
          }
        };
      }
    })
      .pipe(
        map(res => {
          const svcJsonResp = res.json();
          const response = new contracts.GetUserAgreementResponse();
          if (svcJsonResp.data.isAccessGranted) {
            response.isAuthorized = true;
          } else {
            response.isAuthorized = false;
            response.remainingDocumentUrlToAccept = this.operatorServiceEndpoint + svcJsonResp.data.remainingDocumentUrlToAccept;
            response.remainingDocumentUrlToDownload = this.operatorServiceEndpoint + svcJsonResp.data.remainingDocumentUrlToDownload;
            response.userAccessDeniedReasonId = svcJsonResp.data.user_access_denied_reason_id;
            response.userAccessDeniedReasonMessage = svcJsonResp.data.user_access_denied_reason_message;
          }
          return response;
        })
      );
  }
  getUserAgreementPdf(request: contracts.GetUserAgreementPdfRequest): Observable<Blob> {
    const requestUrl = `${request.url}`;
    return this.http
      .get(requestUrl, { responseType: ResponseContentType.Blob })
      .pipe(map(res => res.blob()));
  }
  downloadUserAgreementPdf(request: contracts.DownloadUserAgreementPdfRequest): Observable<contracts.DownloadUserAgreementPdfResponse> {
    const requestUrl = `${request.url}`;
    return this.http
      .get(requestUrl, { responseType: ResponseContentType.Blob })
      .pipe(
        map(res => {
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          const url = window.URL.createObjectURL(res.blob());
          a.href = url;
          a.download = `XO-Operator-Portal-Agreement.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
          const resp = new contracts.DownloadUserAgreementPdfResponse();
          return resp;
        })
      );
  }
}
