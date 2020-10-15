import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minutesToTime'})
export class MinutesToTimePipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '0h 0m';
    } else {
      const hours = Math.trunc(value / 60);
      const minutes = value % 60;
      return `${hours}h ${minutes}m`;
    }
  }
}
