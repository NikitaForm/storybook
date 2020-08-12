import { Pipe, PipeTransform } from '@angular/core';
import * as models from '../domain/models';

@Pipe({name: 'contractType'})
export class ContractTypePipe implements PipeTransform {
  transform(value: models.ContractType): string {
    switch (value) {
      case models.ContractType.SHUTTLE:
        return 'Shared Flight';
      case models.ContractType.CHARTER:
        return 'Private Charter Flight';
      default:
        return `${value} - Not supported`;
    }
  }
}
