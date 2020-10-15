import { Observable } from 'rxjs';
import * as models from '../models';
import { InjectionToken } from '@angular/core';

export interface IAircraftService {
  getAircraftList(request: GetAircraftListRequest): Observable<GetAircraftListResponse>;
}

export const SERVICE_TOKEN = new InjectionToken('Offers.IAircraftService');

export class GetAircraftListRequest {
  operatorId: string;
}
export class GetAircraftListResponse {
  entities: Array<models.Aircraft> = new Array<models.Aircraft>();
}
