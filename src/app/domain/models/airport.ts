import { AirportGroup } from './airport-group';
import { Address } from './address';
import { Fbo } from './fbo';

export class Airport {
  address: Address;
  airportGroup: AirportGroup;
  code: string;
  name: string;
}
