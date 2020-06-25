import { Aircraft } from './aircraft';
import { Route } from './route';

export class OneWayRequestForQuote {
  aircraft: Aircraft;
  departureDate: Date;
  departureEndDateTime: Date;
  departureStartDateTime: Date;
  route: Route;

  constructor() {
    // this.aircraft = null;
    // this.departureDate = null;
    //
    // this.departureStartDateTime = new Date(1970, 1, 1, 7, 0, 0, 0);
    // this.departureEndDateTime = new Date(1970, 1, 1, 20, 0, 0, 0);

    this.route = new Route();
  }
}
