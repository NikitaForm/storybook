
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { IConfigService } from './contracts/config';

import { Observable, of } from 'rxjs';

@Injectable()
export class ConfigMockService implements IConfigService {
  private config: Object = {};

  get(key: string): string {
    return this.config[key];
  }

  load(): Promise<any> {
    this.config['AuthorizationToken'] = environment.bearerToken;
    this.config['AircraftServiceEndpoint'] = environment.aircraftServiceEndpoint;
    this.config['OperatorServiceEndpoint'] = environment.operatorServiceEndpoint;
    this.config['SourcingServiceEndpoint'] = environment.sourcingServiceEndpoint;
    this.config['GraphqlServiceEndpoint'] = environment.graphqlServiceEndpoint;
    this.config['TestMode'] = environment.testMode;

    return Promise.resolve();
  }
}
