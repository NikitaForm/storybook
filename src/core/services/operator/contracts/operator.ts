import { InjectionToken } from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface IOperatorService {
  acceptUserAgreement(request: AcceptUserAgreementRequest): Observable<AcceptUserAgreementResponse>;
  getUserAgreement(request: GetUserAgreementRequest): Observable<GetUserAgreementResponse>;
  getUserAgreementPdf(request: GetUserAgreementPdfRequest): Observable<Blob>;
  downloadUserAgreementPdf(request: DownloadUserAgreementPdfRequest): Observable<DownloadUserAgreementPdfResponse>;
  evaluateAccess(): Observable<GetUserAgreementResponse>;
}

export const SERVICE_TOKEN = new InjectionToken('Core.IOperatorService');

export class AcceptUserAgreementRequest {
  agreementAcceptUrl: string;
}

export class AcceptUserAgreementResponse {
  isAccepted: boolean;
}

export class GetUserAgreementPdfRequest {
  url: string;
}

export class GetUserAgreementPdfResponse {
}

export class DownloadUserAgreementPdfRequest {
  url: string;
}

export class DownloadUserAgreementPdfResponse {
}

export class GetUserAgreementRequest {
}

export class GetUserAgreementResponse {
  isAuthorized: boolean;
  remainingDocumentUrlToAccept: string;
  remainingDocumentUrlToDownload: string;
  userAccessDeniedReasonId: number;
  userAccessDeniedReasonMessage: string;
}
