import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'enumToArray'})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object): Array<number> {
    const keys = Object.keys(data).map(Number);

    return keys.slice(0, keys.length / 2);
  }
}
