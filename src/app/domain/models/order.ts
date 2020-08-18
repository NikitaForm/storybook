import { Aircraft } from './aircraft';
import { OrderStatusEnum } from './order-status-enum';
import { Fbo } from './fbo';
import { Route } from './route';
import { OrderPrice } from './order-price';
import { PriceType } from './price-type.enum';
import { ContractType } from './contract-type.enum';

export class Order {
  aircraft: Aircraft;
  status: OrderStatusEnum;
  bookingsCount: number;
  departureTime: Date;
  destinationFbo: Fbo;
  eft: number;
  externalId: string;
  legId: number;
  legStatusName: string;
  originFbo: Fbo;
  paxCount: number;
  legacyLegId: number;
  route: Route;
  seatsCount: number;
  operatorPrice: OrderPrice;
  currentPrice: OrderPrice;
  type: PriceType;
  contractType: ContractType;
  availableFlightId: string;
  createdDepartureTime: Date;
  repositioningItinerary: any;
  arrivalTime: Date;
  expirationOffset?: number;
}
