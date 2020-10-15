import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { response as getAircraftListResponse } from '../aircraft-mock/get-aircraft-list.response';
import * as contracts from '../../../domain/service-contracts/aircraft';
import * as mappers from '../mappers';
import * as sharedTypes from '../../../../../shared/types';
import * as coreTypes from '../../../../../core/types';
import { map } from 'rxjs/operators';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class AircraftRestService implements contracts.IAircraftService {
  private readonly API_PATH: string;

  constructor(
    private http: sharedTypes.BaseHttp,
    @Inject(coreTypes.SERVICE_TOKEN) private configService: coreTypes.IConfigService) {
    this.API_PATH = this.configService.get('AircraftServiceEndpoint');
  }
  getAircraftList(request: contracts.GetAircraftListRequest): Observable<contracts.GetAircraftListResponse> {
    const requestUrl = `${this.API_PATH}/aircraft`;
    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    if (request.operatorId) {
      params.set('operatorId', request.operatorId);
    }

    options.params = params;
    // const response = new contracts.GetAircraftListResponse();
    // response.entities = getAircraftListResponse.data.map(item => mappers.AircraftMapper.Instance().aircraftDtoToAircraft(item));
    return this.http.get(requestUrl, options)
      .pipe(
        map(svcResp => {
          const svcJsonResp = svcResp.json();

          const response = new contracts.GetAircraftListResponse();

          if (svcJsonResp && svcJsonResp.content && svcJsonResp.content.length) {
            response.entities = svcJsonResp.content.map(item => mappers.AircraftMapper.Instance().aircraftDtoToAircraft(item));
          } else {
            throw new Error('Tail not found');
          }

          return response;
        })
      );
  }

}
