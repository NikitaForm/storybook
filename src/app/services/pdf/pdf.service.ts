import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as sharedServices from '../../../shared/services';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PdfRestService {
  constructor(
    private http: HttpClient) {
  }


  getPdfBlob(requestUrl: string): Observable<Blob> {
    const options = new RequestOptions();
    options.headers = new Headers();
    options.responseType = ResponseContentType.Blob;
    options.headers.append('Accept', 'application/pdf');
    return this.http.get(requestUrl, {headers: {Accept: 'application/pdf'}, responseType: 'blob'})
      .pipe(
        map(
          res => {
            return res;
          }
        ));
  }
}
