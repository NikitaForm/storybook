import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IConfigService } from './contracts/config';

import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';
import { catchError, map, first, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ConfigService implements IConfigService {
  private config: Object = {};

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  get(key: string): string {
    return this.config[key];
  }

  load(): Promise<boolean> {
    this.config['AuthorizationToken'] = this.cookieService.get('token');

    return new Promise((resolve, reject) => {
      return this.http.get('/config')
        .map(configResponse => {
          const response: any = configResponse;
          this.config['AircraftServiceEndpoint'] = response.aircraftServiceEndpoint;
          this.config['OperatorServiceEndpoint'] = response.operatorServiceEndpoint;
          this.config['SourcingServiceEndpoint'] = response.sourcingServiceEndpoint;
          this.config['GraphqlServiceEndpoint'] = response.graphqlServiceEndpoint;
          this.config['TestMode'] = response.testMode;
          resolve(true);
        })
        .catch((error: any): any => {
          return _throw(error.json().error || 'Server error');
        })
        .toPromise();
    });
  }
}
