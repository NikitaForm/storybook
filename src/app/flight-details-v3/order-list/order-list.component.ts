import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as models from '../../domain/models';

@Component({
  selector: `mc-order-list-v3`,
  templateUrl: `./order-list.component.html`,
  styleUrls: ['./order-list.component.scss']
})
export class OrderListV3Component {
  @Input() items: Array<models.Order>;
  @Output() onSelect = new EventEmitter();

  orderStatus = models.OrderStatusEnum;
  sharedSeats = models.ContractType.SHUTTLE;

  isDepartureDateOverridden(order): boolean {
    return order.departureTime.getTime() !== order.createdDepartureTime.getTime();
  }

}
