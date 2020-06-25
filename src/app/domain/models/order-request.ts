import { Aircraft } from './aircraft';
import { Airport } from './airport';
import { Fbo } from './fbo';
import { PriceType } from './price-type.enum';
import { ContractType } from './contract-type.enum';

export class OrderRequest {
  aircraft: Aircraft;
  departureDate: Date;
  destinationAirport: Airport;
  destinationFbo: Fbo;
  eft: number;
  externalId: string;
  originAirport: Airport;
  originFbo: Fbo;
  seats: number = null;
  seatMinPrice: number;
  priceType: PriceType = PriceType.DYNAMIC;
  charterPrice: number;
  contractType: ContractType = ContractType.CHARTER;
}
