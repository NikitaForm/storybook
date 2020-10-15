import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { response as getAircraftListResponse } from './get-aircraft-list.response';
import * as contracts from '../../../domain/service-contracts/aircraft';
import * as mappers from '../mappers';

@Injectable()
export class AircraftMockService implements contracts.IAircraftService {
  getAircraftList(request: contracts.GetAircraftListRequest): Observable<contracts.GetAircraftListResponse> {
    const response = new contracts.GetAircraftListResponse();
    response.entities = getAircraftListResponse.content.map(item => mappers.AircraftMapper.Instance().aircraftDtoToAircraft(item));
    return of(response); // .pipe(delay(1000));
  }
}
