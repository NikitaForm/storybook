import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as models from '../../../domain/models';
import * as sharedModels from '../../../../../shared/models';
import * as coreModels from '../../../../../core/models';

@Component({
  templateUrl: './routes-details.component.html',
  selector: 'operator-routes-details'
})
export class RoutesDetailsComponent {
  @Input() legs: Array<models.LegRequest> = [];
  @Input() serviceClass: sharedModels.ServiceClassEnum;
  @Input() category: models.AircraftCategory;
  @Input() isMain = true;
  @Input() dba: coreModels.DBA;
  @Input() orgLegalName: string;
  @Input() purchaseOffer: models.OperatorPurchaseOffer;

  dbaEnums = coreModels.DBA;
  serviceClassEnum = sharedModels.ServiceClassEnum;

  constructor(
    // private router: Router
  ) { }

  explainServiceClass(): void {
    // this.router.navigate(['./'], { queryParams: { 't': 's' } });
  }
}
