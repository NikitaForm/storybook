import { Pipe, PipeTransform } from '@angular/core';
import * as models from '../domain/models';

@Pipe({name: 'orderStatus'})
export class OrderStatusPipe implements PipeTransform {
  transform(value: models.OrderStatusEnum): string {
    switch (value) {
      case models.OrderStatusEnum.CLOSED:
        return 'Inactive';
      case models.OrderStatusEnum.OPEN:
        return 'Active';
      case models.OrderStatusEnum.EXPIRED:
        return 'Expired';
      case models.OrderStatusEnum.BOOKED:
        return 'Booked';
      case models.OrderStatusEnum.COMPLETED:
        return 'Departed';
      default:
        return (`${value} - Not Supported`);
    }
  }
}
