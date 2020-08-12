import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as models from '../../../models';

export const USER_SERVICE_TOKEN = new InjectionToken('Core.IUserService');

export interface IUserService {
  getUser(request: GetUserRequest): Observable<GetUserResponse>;
  signOut(request: SignOutRequest): Observable<SignOutResponse>;
}

export class GetUserRequest {
}

export class GetUserResponse {
  entity: models.User;
}

export class SignOutRequest {
}

export class SignOutResponse {
}
