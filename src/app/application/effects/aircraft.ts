import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as actions from '../actions/aircraft';
import * as aircraftContracts from '../../domain/service-contracts/aircraft';
import * as sharedTypes from '../../../shared/types';

import { catchError, map, switchMap, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class AircraftEffects {
  @Effect()
  loadAircraftList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAircraftAction>(actions.LOAD_AIRCRAFT),
      switchMap(() => {
        const request = new aircraftContracts.GetAircraftCollectionRequest();

        return this.aircraftService.getAircraftCollection(request)
          .pipe(
            map(svcResp => {
              if (svcResp.items && svcResp.items.length) {
                return new actions.LoadAircraftSuccessAction(svcResp.items);
              } else {
                return new actions.LoadAircraftFailAction();
              }
            }),
            catchError(() => of(new actions.LoadAircraftFailAction()))
          );
      })
    );

  @Effect()
  loadAircraftListFail$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadAircraftFailAction>(actions.LOAD_AIRCRAFT_FAIL),
      map(() => {
        this.notificationService.show(
          `No Aircraft found for your account`,
          sharedTypes.NotificationStyle.Circle, sharedTypes.NotificationType.Warning,
          sharedTypes.NotificationPosition.BottomRight, 10000);

        return new actions.NoAction();
      })
    );

  constructor(private actions$: Actions,
    @Inject(aircraftContracts.SERVICE_TOKEN)
    private aircraftService: aircraftContracts.IAircraftService,
    @Inject(sharedTypes.NOTIFICATION_SERVICE_TOKEN) private notificationService: sharedTypes.INotificationService) {
  }
}
