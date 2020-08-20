import { Component, OnInit, Input } from '@angular/core';

import * as models from '../../domain/models';

@Component({
  selector: 'price-details-v3',
  templateUrl: './price-details.component.html'
})
export class PriceComponentV3Component implements OnInit {
  @Input() priceDetails: models.PriceDetail;
  @Input() price: number = null;
  @Input() fullWidth = false;
  @Input() short = false;
  @Input() total = false;

  constructor() { }

  ngOnInit(): void { }

  getInvertedPercentage(percentage: number): number {
    return 1 - percentage;
  }

  getPercentage(percentage: number): number {
    return percentage / 100;
  }
}
