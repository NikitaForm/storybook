import { Airport } from './airport';
import { City } from './city';

export class Route {
  originAirport: Airport;
  destinationAirport: Airport;
  originCity: City;
  destinationCity: City;

  constructor() {
    this.originAirport = null;
    this.destinationAirport = null;
    this.originCity = new City();
  }
}
