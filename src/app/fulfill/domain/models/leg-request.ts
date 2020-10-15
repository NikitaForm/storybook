import { Route } from './route';

export class LegRequest {
  route: Route;
  departureDate: Date;
  departureTimeTbd = false;
  pax: number;

  constructor() {
    this.route = new Route();

    return this;
  }

  getDepartureDate(): Date {
    return this.departureDate;
  }

  setDepartureDate(date: Date): LegRequest {
    if (this.departureDate) {
      const d1 = new Date(this.departureDate.getTime());
      const d2 = new Date(date.getTime());
      d2.setHours(d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());
      this.departureDate = d2;
    } else {
      this.departureDate = new Date(date);
    }

    return this;
  }

  getDepartureTime(): Date {
    return this.departureDate;
  }

  setDepartureTime(date: Date): LegRequest {
    this.departureDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

    this.departureTimeTbd = false;

    return this;
  }

  getDepartureTimeTbd(): boolean {
    return this.departureTimeTbd;
  }

  setDepartureTimeTbd(value: boolean): LegRequest {
    this.departureTimeTbd = value;

    if (this.departureTimeTbd && this.departureDate) {
      this.departureDate.setHours(0, 0, 0, 0);
    }

    return this;
  }

  getRoute(): Route {
    return this.route;
  }

  setRoute(route: Route): LegRequest {
    this.route = route;

    return this;
  }

  getPax(): number {
    return this.pax;
  }

  setPax(pax: number): LegRequest {
    this.pax = pax;

    return this;
  }

  isValidForSubmit(): boolean {
    return this.getDepartureDate()
      && this.getRoute()
      && this.getRoute().getOriginAirport() && this.getRoute().getOriginAirport().code !== null
      && this.getRoute().getOriginAirport().code.length === 4
      && this.getRoute().getDestinationAirport() && this.getRoute().getDestinationAirport().code !== null
      && this.getRoute().getDestinationAirport().code.length === 4
      && this.getPax() > 0;
  }
}
