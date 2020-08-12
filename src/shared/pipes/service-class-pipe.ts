import { Pipe, PipeTransform } from '@angular/core';
import { ServiceClassEnum } from '../models/service-class-enum';

@Pipe({name: 'serviceClass'})
export class ServiceClassPipe implements PipeTransform {
  transform(serviceClass: ServiceClassEnum): string {
    switch (serviceClass) {
      case null:
      case ServiceClassEnum.UNDEFINED:
        return 'Not Defined';
      case ServiceClassEnum.CLASSIC:
        return 'Classic';
      case ServiceClassEnum.PREMIUM:
        return 'Premium';
      case ServiceClassEnum.LUXE:
        return 'Luxe';
      default:
        return (`${serviceClass} - Not Supported`);
    }
  }
}
