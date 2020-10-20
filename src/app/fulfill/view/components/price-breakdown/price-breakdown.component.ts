import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import * as models from '../../../domain/models';
import * as sharedModels from '../../../../../shared/models';
import * as coreModels from '../../../../../core/models';

@Component({
  templateUrl: './price-breakdown.component.html',
  selector: 'price-breakdown'
})
export class PriceBreakdownComponent {
  @Input() purchaseOffer: models.OperatorPurchaseOffer;


  constructor(
    // private router: Router
  ) { }

  explainServiceClass(): void {
    // this.router.navigate(['./'], { queryParams: { 't': 's' } });
  }
}
