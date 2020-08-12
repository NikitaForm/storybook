import { Injectable } from '@angular/core';

import * as contracts from './contracts/user';
import * as sharedServices from '../../../shared/services';
import * as models from '../../models';

import { Observable } from 'rxjs/Observable';
import { map, take, catchError } from 'rxjs/operators';

@Injectable()
export class UserService implements contracts.IUserService {
  constructor(private http: sharedServices.BaseHttp) {}

  getUser(request: contracts.GetUserRequest): Observable<contracts.GetUserResponse> {
    const requestUrl = '/user';

    return this.http.get(requestUrl, null)
      .pipe(
        map(svcResp => {
          const svcJsonResp = svcResp.json();

          const user = new models.User();
          user.firstName = svcJsonResp.firstName;
          user.lastName = svcJsonResp.lastName;
          user.organizationLegalName = svcJsonResp.organizationLegalName;

          const organization = new models.Organization();
          organization.id = Number(svcJsonResp.organizationId);
          organization.percentageOfSale = Number(svcJsonResp.percentageOfSale);
          organization.organizationUuid = svcJsonResp.organizationUuid;
          user.organization = organization;
          user.viewPermissions = new models.ViewPermissions();
          user.viewPermissions.fulfillFlights = svcJsonResp.viewPermissions.fulfillFlights;
          user.viewPermissions.publishedFlights = svcJsonResp.viewPermissions.publishedFlights;

          const response = new contracts.GetUserResponse();
          response.entity = user;

          return response;
        })
      );
  }

  getViewPermissions(): Observable<models.ViewPermissions> {
    const requestUrl = '/user';
    return this.http.get(requestUrl, null)
      .pipe(
        map(svcResp => {
          const svcJsonResp = svcResp.json();
          const viewPermissions = new models.ViewPermissions();
          viewPermissions.fulfillFlights = svcJsonResp.viewPermissions.fulfillFlights;
          viewPermissions.publishedFlights = svcJsonResp.viewPermissions.publishedFlights;

          return viewPermissions;
        })
      );
  }

  signOut(request: contracts.SignOutRequest): Observable<contracts.SignOutResponse> {
    const requestUrl = '/sp/ssout';

    return this.http.get(requestUrl)
      .pipe(
        map(svcResp => {
          const response = new contracts.SignOutResponse();

          return response;
        })
      );
  }
}
