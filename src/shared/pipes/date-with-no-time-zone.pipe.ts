import { Pipe, PipeTransform } from '@angular/core';
import { EnvironmentEnum } from '../../environments/environment.interface';

@Pipe({name: 'dateWithNoTimeZone'})
export class DateWithNoTimeZonePipe implements PipeTransform {
  transform(dateValue: Date): any {
    if (!(dateValue instanceof Date)) {
      return dateValue;
    }

    const dateWithNoTimezone = new Date(
      dateValue.getUTCFullYear(),
      dateValue.getUTCMonth(),
      dateValue.getUTCDate(),
      dateValue.getUTCHours(),
      dateValue.getUTCMinutes(),
      dateValue.getUTCSeconds()
    );

    return dateWithNoTimezone;
  }
}
