import { Pipe, PipeTransform } from '@angular/core';
import { EnvironmentEnum } from '../../environments/environment.interface';

@Pipe({name: 'environment'})
export class EnvironmentPipe implements PipeTransform {
  transform(environment: EnvironmentEnum): string {
    switch (environment) {
      case EnvironmentEnum.LOCAL:
        return 'LOCAL';
      case EnvironmentEnum.DEVELOPMENT:
        return 'DEV';
      case EnvironmentEnum.PRODUCTION:
        return 'PROD';
      case EnvironmentEnum.TEST:
        return 'TEST';
      default:
        return '';
    }
  }
}
