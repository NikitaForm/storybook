import { Injectable } from '@angular/core';

import * as contracts from '../../domain/service-contracts/pdf';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

@Injectable()
export class PdfServiceMock implements contracts.IPdfService {
  getCharterAgreements(request: contracts.GetPdfLinkRequest): Observable<Blob> {
    const response = new Blob();
    return of(response);
  }

  getSafetyAgreements(request: contracts.GetPdfLinkRequest): Observable<Blob> {
    const response = new Blob();
    return of(response);
  }
}
