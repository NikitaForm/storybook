import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as models from '../../domain/models';

@Component({
  selector: `mc-order-list`,
  templateUrl: `./order-list.component.html`,
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  @Input() items: Array<models.Order>;
  @Output() onSelect = new EventEmitter();

  orderStatus = models.OrderStatusEnum;
  sharedSeats = models.ContractType.SHUTTLE;

  isDepartureDateOverridden(order): boolean {
    return order.departureTime.toDateString() !== order.createdDepartureTime.toDateString();
  }

  isDepartureTimeOverridden(order: models.Order): boolean {
    return order.departureTime.toTimeString() !== order.createdDepartureTime.toTimeString();
  }
}
