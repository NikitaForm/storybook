import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as actions from '../actions/user';
import * as dataContracts from '../services/user/contracts/user';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUserService, USER_SERVICE_TOKEN } from '../services/user/contracts/user';

@Injectable()
export class UserEffects {
  @Effect()
  loadAircraftList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAction>(actions.LOAD),
      switchMap(() => {

        const request = new dataContracts.GetUserRequest();

        return this.userService.getUser(request)
          .pipe(
            map(svcResp => {
              return new actions.LoadSuccessAction(svcResp.entity);
            }),
            catchError(() => {
              return of(new actions.SignOutAction());
            })
          );
      })
    );

  @Effect()
  signOut$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.SignOutAction>(actions.SIGN_OUT),
      switchMap(() => {
        return this.userService.signOut(new dataContracts.SignOutRequest())
          .pipe(
            map(svcResp => {
              location.reload();
              return { type: 'NO_ACTION' };
            })
          );
      })
    );

  constructor(private actions$: Actions,
    @Inject(USER_SERVICE_TOKEN) private userService: IUserService) {
  }
}
