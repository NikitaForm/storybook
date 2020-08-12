import { Injectable } from '@angular/core';

import * as contracts from './contracts/user';

import * as sharedServices from '../../../shared/services';
import * as models from '../../models';

import { of, throwError, Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Injectable()
export class UserServiceMock implements contracts.IUserService {

  getUser(request: contracts.GetUserRequest): Observable<contracts.GetUserResponse> {

    const user = new models.User();
    user.firstName = 'Test';
    user.lastName = 'Delta';

    const organization = new models.Organization();
    organization.id = 9;
    organization.organizationUuid = 'bf112259-d7ef-48f4-aed5-ab2c579bb5e1';
    organization.percentageOfSale = 25;
    user.organization = organization;
    user.viewPermissions = new models.ViewPermissions();
    user.viewPermissions.fulfillFlights = true;
    user.viewPermissions.publishedFlights = true;
    user.organizationLegalName = 'Delta Private Jets, Inc.';

    const response = new contracts.GetUserResponse();
    response.entity = user;

    return of(response);
  }

  signOut(request: contracts.SignOutRequest): Observable<contracts.SignOutResponse> {

    const response = new contracts.SignOutResponse();

    return of(response);
    // const requestUrl = '/sp/ssout';

    // return this.http.get(requestUrl)
    //   .pipe(
    //     map(svcResp => {
    //       const response = new contracts.SignOutResponse();

    //       return response;
    //     })
    //   );
  }
}
