import { Pipe, PipeTransform } from '@angular/core';
import * as models from '../domain/models';

@Pipe({name: 'expirationOffset'})
export class ExpirationOffsetPipe implements PipeTransform {
  transform(value: models.ExpirationOffsetEnum): string {
    switch (value) {
      case models.ExpirationOffsetEnum.T3:
        return 'T-3 hours';
      case models.ExpirationOffsetEnum.T6:
        return 'T-6 hours';
      case models.ExpirationOffsetEnum.T12:
        return 'T-12 hours';
      case models.ExpirationOffsetEnum.T24:
        return 'T-24 hours';
      case models.ExpirationOffsetEnum.T48:
        return 'T-48 hours';
      case models.ExpirationOffsetEnum.T72:
        return 'T-72 hours';
      default:
        return (`${value} - Not Supported`);
    }
  }
}
