import { Injectable } from '@angular/core';

import * as contracts from '../../../domain/service-contracts/aircraft';
import * as mapper from '../mappers/aircraft-mapper.servise';

// import * as viewModel from '../../../view/view-models';

import { response as getAircraftCollectionResponse } from './get-aircraft-collection.response';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

@Injectable()
export class AircraftMockService implements contracts.IAircraftService {
  getAircraftCollection(request: contracts.GetAircraftCollectionRequest): Observable<contracts.GetAircraftCollectionResponse> {
    const response = new contracts.GetAircraftCollectionResponse();

    response.items = getAircraftCollectionResponse.data.listAircrafts
      .map(mapper.AircraftMapperService.parseAircraftSearchItemInternal);

    return of(response); // .pipe(delay(3000));
  }
}
