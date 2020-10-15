import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import * as actions from '../actions/aircraft';
import * as aircraftServiceContracts from '../../domain/service-contracts/aircraft';

import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as coreReducers from '../../../../core/reducers';

@Injectable()
export class AircraftEffects {
  @Effect()
  loadAircraftList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAction>(actions.LOAD),
      withLatestFrom(this.store$.pipe(select(coreReducers.getUserUser))),
      switchMap(([action, user]) => {
        const request = new aircraftServiceContracts.GetAircraftListRequest();
        request.operatorId = user.organization.organizationUuid;
        return this.aircraftService.getAircraftList(request)
          .pipe(
            map(serviceResponse => {
              return new actions.LoadSuccessAction(serviceResponse.entities);
            })
          );
      })
    );

  constructor(
    private store$: Store<any>,
    private actions$: Actions,
    @Inject(aircraftServiceContracts.SERVICE_TOKEN)
    private aircraftService: aircraftServiceContracts.IAircraftService) {
  }
}
