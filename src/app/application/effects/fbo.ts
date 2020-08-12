import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as actions from '../actions/fbo';
import * as marketplaceContracts from '../../domain/service-contracts/marketplace';
import * as sharedTypes from '../../../shared/types';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class FboEffects {
  @Effect()
  loadFboList$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadFboAction>(actions.LOAD_FBO),
      map(action => action.payload),
      mergeMap((payload: actions.LoadFboPayload) => {
        const request = new marketplaceContracts.GetAirportFboListRequest();
        request.code = payload.airportCode;

        return this.marketplaceService.getAirportFboList(request)
          .pipe(
            map(serviceResponse => {
              const res = new actions.LoadFboSuccessPayload();
              res.airportCode = payload.airportCode;
              res.fboList = serviceResponse.entities;
              res.target = payload.target;

              return new actions.LoadFboSuccessAction(res);
            }),
            catchError(() => {
              this.notificationService.show(
                `No FBO found for:\n${payload.airportCode}`,
                sharedTypes.NotificationStyle.Circle, sharedTypes.NotificationType.Warning,
                sharedTypes.NotificationPosition.BottomRight, 10000);

              return of(new actions.LoadFboFailureAction(
                new actions.LoadFboFailurePayload(payload.airportCode)
              ));
            }
            )
          );
      })
    );

  constructor(private actions$: Actions,
    @Inject(marketplaceContracts.SERVICE_TOKEN)
    private marketplaceService: marketplaceContracts.IMarketplaceService,
    @Inject(sharedTypes.NOTIFICATION_SERVICE_TOKEN) private notificationService: sharedTypes.INotificationService) {
  }
}
