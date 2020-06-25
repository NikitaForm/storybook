import { InjectionToken } from '@angular/core';
import * as models from '../../domain/models';
// import * as viewModels from '../../view/view-models';
import { Observable } from 'rxjs/Observable';

export interface IAircraftService {
  getAircraftCollection(request: GetAircraftCollectionRequest): Observable<GetAircraftCollectionResponse>;

  // getAircraft(request: GetAircraftRequest): Observable<GetAircraftResponse>;
}

export const SERVICE_TOKEN = new InjectionToken('Flights.IAircraftService');

export class GetAircraftCollectionRequest {
  operatorId: string;
}

export class GetAircraftCollectionResponse {
  items: Array<models.Aircraft>;
}

// export class GetAircraftRequest {
//   id: string;
// }

// export class GetAircraftResponse {
//   item: models.Aircraft;
// }
