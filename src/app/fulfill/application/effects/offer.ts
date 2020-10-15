import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import * as contracts from '../../domain/service-contracts/offer';
import * as actions from '../actions/offer';
import * as listActions from '../actions/offer-list';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as sharedTypes from '../../../../shared/types';
import * as reducers from '../reducers';

enum StompCommand {
  OperatorPurchaseOfferDeclineFailedOfferNotActiveEvent = 'OperatorPurchaseOfferDeclineFailedOfferNotActiveEvent',
  OperatorPurchaseOfferDeclinedEvent = 'OperatorPurchaseOfferDeclinedEvent',
  OperatorPurchaseOfferAcceptedEvent = 'OperatorPurchaseOfferAcceptedEvent',
  OperatorPurchaseOfferCreatedEvent = 'OperatorPurchaseOfferCreatedEvent',
  OperatorPurchaseOfferCancelledEvent = 'OperatorPurchaseOfferCancelledEvent',
  OperatorPurchaseOfferExpiredEvent = 'OperatorPurchaseOfferExpiredEvent',
  OperatorPurchaseOfferAcceptFailedOfferNotActiveEvent = 'OperatorPurchaseOfferAcceptFailedOfferNotActiveEvent',
  OperatorPurchaseOfferAcceptFailedSourcingRequestCancelledEvent = 'OperatorPurchaseOfferAcceptFailedSourcingRequestCancelledEvent'
}

@Injectable()
export class OfferEffects {

  @Effect()
  acceptPurchaseOffer$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.AcceptPurchaseOffer>(actions.ACCEPT_PURCHASE_OFFER),
      map(action => action.payload),
      switchMap(payload => {
        const request = new contracts.AcceptPurchaseOfferRequest();

        request.sourcingRequestId = payload.sourcingRequestId;
        request.operatorPurchaseOfferId = payload.operatorPurchaseOfferId;
        request.aircraftId = payload.aircraftId;

        return this.offerService.acceptPurchaseOffer(request)
          .pipe(
            switchMap((serviceResponse: contracts.AcceptPurchaseOfferResponse) => {
              this.notificationService.show(
                `Thank you for Accepting this Offer`,
                sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Success,
                sharedTypes.NotificationPosition.TopRight, 0);
              return of(new actions.AcceptPurchaseOfferSuccess());
            })
          );
      })
    );

  @Effect()
  declinePurchaseOffer$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.DeclinePurchaseOffer>(actions.DECLINE_PURCHASE_OFFER),
      map(action => action.payload),
      switchMap(payload => {
        const request = new contracts.DeclinePurchaseOfferRequest();

        request.sourcingRequestId = payload.sourcingRequestId;
        request.operatorPurchaseOfferId = payload.operatorPurchaseOfferId;

        return this.offerService.declinePurchaseOffer(request)
          .pipe(
            switchMap((serviceResponse: contracts.DeclinePurchaseOfferResponse) => {
              return of(new actions.DeclinePurchaseOfferSuccess());
            })
          );
      })
    );

  @Effect()
  topic$: Observable<Action> =
    this.offerService.topic$
      .pipe(
        withLatestFrom(this.store$.pipe(select(reducers.getOfferListState))),
        switchMap(([body, state]) => {
          const type = body.messageType as string;
          const actionsArray = [];
          const payload = new listActions.SearchPayload(state.criteria, state.currentPage, state.itemsPerPage);
          payload.isLoading = false;
          switch (type) {
            case StompCommand.OperatorPurchaseOfferAcceptedEvent:
              actionsArray.push(new listActions.SearchAction(payload));
              break;
            case StompCommand.OperatorPurchaseOfferExpiredEvent:
              actionsArray.push(new listActions.SearchAction(payload));
              break;
            case StompCommand.OperatorPurchaseOfferAcceptFailedOfferNotActiveEvent:
              this.notificationService.show(
                `Can\'t accept non-active Purchase Offer`,
                sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Danger,
                sharedTypes.NotificationPosition.TopRight, 0);
              break;
            case StompCommand.OperatorPurchaseOfferAcceptFailedSourcingRequestCancelledEvent:
              this.notificationService.show(
                `Can\'t accept canceled Purchase Offer`,
                sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Danger,
                sharedTypes.NotificationPosition.TopRight, 0);
              break;
            case StompCommand.OperatorPurchaseOfferCreatedEvent:
              this.notificationService.show(
                `${body.actor.toString()} created new Purchase Offer`,
                sharedTypes.NotificationStyle.Circle, sharedTypes.NotificationType.Default,
                sharedTypes.NotificationPosition.TopRight, 0, 'assets/img/profiles/profile-picture-default.png');
              actionsArray.push(new listActions.SearchAction(payload));
              break;
            case StompCommand.OperatorPurchaseOfferCancelledEvent:
              this.notificationService.show(
                `${body.actor.toString()} canceled a Purchase Offer`,
                sharedTypes.NotificationStyle.Circle, sharedTypes.NotificationType.Info,
                sharedTypes.NotificationPosition.TopRight, 0, 'assets/img/profiles/profile-picture-default.png');
              actionsArray.push(new listActions.SearchAction(payload));
              break;
            case StompCommand.OperatorPurchaseOfferDeclinedEvent:
              this.notificationService.show(
                `Purchase Offer was declined`,
                sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Default,
                sharedTypes.NotificationPosition.TopRight, 0);
              actionsArray.push(new listActions.SearchAction(payload));
              break;
            case StompCommand.OperatorPurchaseOfferDeclineFailedOfferNotActiveEvent:
              this.notificationService.show(
                `Can\'t decline non-active Purchase Offer`,
                sharedTypes.NotificationStyle.Bar, sharedTypes.NotificationType.Danger,
                sharedTypes.NotificationPosition.TopRight, 0);
              break;
          }
          return [...actionsArray];
        })
      );

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    @Inject(sharedTypes.NOTIFICATION_SERVICE_TOKEN) private notificationService: sharedTypes.INotificationService,
    @Inject(contracts.SERVICE_TOKEN) private offerService: contracts.IOfferService) {
  }
}
