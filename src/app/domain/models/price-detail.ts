import { PriceType } from './price-type.enum';
import { CharterPermissionsEnum } from '../graphql-types';

export class PriceDetail {
  pricingStrategyId: number;
  price: number;
  creditCardFee: number;
  fetTax: number;
  segmentFee: number;
  operatorShare: number;
  jetsmarterShare: number;
  internal: boolean;
  seatsCount: number;
  percentageOfSalesPerSeat: number;
  basePrice: number;
  type: PriceType;
  permitted: CharterPermissionsEnum;
  flightRate?: number;
  densityFee?: number;
  landingFee?: number;
}
