import { Aircraft } from './aircraft';
import { Route } from './route';
import { User } from './user';

export class OneWayContract {
  acceptTime: Date;
  acceptUser: User;
  aircraft: Aircraft;
  contractId: number;
  createTime: Date;
  createUser: User;
  departureEndDateTime: Date;
  departureStartDateTime: Date;
  route: Route;
  price: number;
  contractUri: string;
  quoteId: number;

  constructor() {
    this.route = new Route();
  }
}
