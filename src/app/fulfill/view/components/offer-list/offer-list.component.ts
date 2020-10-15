import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as models from '../../../domain/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'operator-offer-list',
  styleUrls: ['./offer-list.component.scss'],
  templateUrl: './offer-list.component.html'
})
export class OfferListComponent {
  @Input() operatorPurchaseOffers: Array<models.OperatorPurchaseOffer>;
  @Output() accept: EventEmitter<models.OperatorPurchaseOffer> = new EventEmitter<models.OperatorPurchaseOffer>();
  @Output() decline: EventEmitter<models.OperatorPurchaseOffer> = new EventEmitter<models.OperatorPurchaseOffer>();
  @Output() expandRoute: EventEmitter<models.OperatorPurchaseOffer> = new EventEmitter<models.OperatorPurchaseOffer>();
  onAcceptClick($event): void {
    this.accept.next($event);
  }

  onDeclineClick($event): void {
    this.decline.next($event);
  }

  onExpandRoutesClick(offer: models.OperatorPurchaseOffer): void {
    this.expandRoute.emit(offer);
  }
}
