import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export const PDF_SERVICE_TOKEN = new InjectionToken('Core.IPdfService');

export interface IPdfService {
  getCharterAgreements(request: GetPdfLinkRequest): Observable<Blob>;
  getSafetyAgreements(request: GetPdfLinkRequest): Observable<Blob>;
}

export class GetPdfLinkRequest {
  operatorOfferId: string;
}
