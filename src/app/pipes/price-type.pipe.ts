import { Pipe, PipeTransform } from '@angular/core';
import * as models from '../domain/models';

@Pipe({ name: 'priceType' })
export class PriceTypePipe implements PipeTransform {
  transform(value: models.PriceType): string {
    switch (value) {
      case models.PriceType.FIXED:
        return 'Fixed';
      case models.PriceType.DYNAMIC:
        return 'Dynamic';
      default:
        return (`${value} - Not Supported`);
    }
  }
}
