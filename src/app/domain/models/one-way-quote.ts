import { Aircraft } from './aircraft';
import { Route } from './route';
import { User } from './user';

export class OneWayQuote {
  aircraft: Aircraft;
  departureDate: Date;
  departureEndDateTime: Date;
  departureStartDateTime: Date;
  lockDate: Date;
  lockExpirationDate: Date;
  lockUser: User;
  price: number;
  route: Route;
  quoteId: number;
  quoteUri: string;

  constructor() {
    // this.departureStartDateTime = new Date(1970, 1, 1, 7, 0, 0, 0);
    // this.departureEndDateTime = new Date(1970, 1, 1, 20, 0, 0, 0);

    this.route = new Route();
  }
}
