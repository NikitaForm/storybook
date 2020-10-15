import { AirportGroup } from './airport-group';
import { Address } from './address';

export class Airport {
  address: Address;
  airportGroup?: AirportGroup;
  code: string;
  name: string;

  constructor() {
    this.address = new Address();
  }

  getAddress(): Address {
    return this.address;
  }

  setAddress(address: Address): Airport {
    this.address = address;
    return this;
  }

  getAirportGroup(): AirportGroup {
    return this.airportGroup;
  }

  setAirportGroup(airportGroup: AirportGroup): Airport {
    this.airportGroup = airportGroup;
    return this;
  }

  getCode(): string {
    return this.code;
  }

  setCode(code): Airport {
    this.code = code;
    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): Airport {
    this.name = name;
    return this;
  }

}
