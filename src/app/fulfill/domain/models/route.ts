import { Airport } from './airport';

export class Route {
  originAirport: Airport;
  destinationAirport: Airport;

  constructor() {
    this.originAirport = null;
    this.destinationAirport = null;
  }

  getDestinationAirport(): Airport {
    return this.destinationAirport;
  }

  setDestinationAirport(airport: Airport): Route {
    this.destinationAirport = airport;

    return this;
  }

  getOriginAirport(): Airport {
    return this.originAirport;
  }

  setOriginAirport(airport: Airport): Route {
    this.originAirport = airport;

    return this;
  }
}
