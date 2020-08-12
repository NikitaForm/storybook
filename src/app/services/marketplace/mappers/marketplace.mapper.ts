import * as models from '../../../domain/models';

import * as _ from 'lodash';
import * as moment from 'moment';
import { AvailableFlight, CharterPricing, ShuttlePricing } from '../../../domain/graphql-types';
import { response as getLegDetailsResponse } from '../marketplace-mock/get-leg-details.response';

export class MarketPlaceMapper {
  parseLegDetailsInternal(item: AvailableFlight): models.Order {
    const order = new models.Order();
    const aircraft = new models.Aircraft();
    aircraft.tailNumber = item.aircraft.tailNumber;
    aircraft.marketableSeatsCount = item.aircraft.maxPax;

    const aircraftModel = new models.AircraftModel();
    aircraftModel.name = item.aircraft.modelName;
    aircraft.aircraftModel = aircraftModel;

    order.aircraft = aircraft;
    order.availableFlightId = item.availableFlightId;
    order.contractType = models.ContractType[item.contractType];
    order.type = models.PriceType[item.priceType];

    if (item.status) {
      order.status = models.OrderStatusEnum[item.status];
    } else {
      order.status = 0;
    }

    order.legacyLegId = item.legacyLegId;

    order.operatorPrice = new models.OrderPrice();
    if (order.contractType === models.ContractType.CHARTER) {
      order.operatorPrice.basePrice = item.charterPricing.flightPrice;
    } else {
      order.operatorPrice.basePrice = item.shuttlePricing.seatPrice;
    }

    order.seatsCount = item.seatsOffered;
    order.departureTime = moment(item.departureTime).toDate();
    order.arrivalTime = item.arrivalTime ? moment(item.arrivalTime).toDate() : undefined;
    order.createdDepartureTime = moment(item.createdDepartureTime).toDate();

    const originAirport = new models.Airport();
    originAirport.code = item.departureAirport.code;
    originAirport.address = item.departureAirport.address;

    const destinationAirport = new models.Airport();
    destinationAirport.code = item.arrivalAirport.code;
    destinationAirport.address = item.arrivalAirport.address;

    const originCity = new models.City();
    const destinationCity = new models.City();

    const originFbo = new models.Fbo();

    if (item.departureFbo) {
      originFbo.id = Number(item.departureFbo.fboId);
      originFbo.name = item.departureFbo.name;
      originFbo.address = item.departureFbo.address;
      originFbo.phoneNumber = item.departureFbo.phoneNumber;
      originCity.name = originFbo.address.city;
      originCity.state = originFbo.address.state;
      originCity.country = originFbo.address.country;
    } else {
      originCity.name = originAirport.address.city;
      originCity.state = originAirport.address.state;
      originCity.country = originAirport.address.country;
    }

    order.originFbo = originFbo;

    const destinationFbo = new models.Fbo();
    if (item.arrivalFbo) {
      destinationFbo.id = Number(item.arrivalFbo.fboId);
      destinationFbo.name = item.arrivalFbo.name;
      destinationFbo.address = item.arrivalFbo.address;
      destinationFbo.phoneNumber = item.arrivalFbo.phoneNumber;
      destinationCity.name = destinationFbo.address.city;
      destinationCity.state = destinationFbo.address.state;
      destinationCity.country = destinationFbo.address.country;
    } else {
      destinationCity.name = destinationAirport.address.city;
      destinationCity.state = destinationAirport.address.state;
      destinationCity.country = destinationAirport.address.country;
    }

    order.destinationFbo = destinationFbo;

    const route = new models.Route();
    route.originAirport = originAirport;
    route.destinationAirport = destinationAirport;

    route.originCity = originCity;
    route.destinationCity = destinationCity;

    order.route = route;

    order.eft = Number(item.eft);
    order.externalId = item.externalId;
    order.paxCount = item.passengers ? item.passengers.length : 0;

    return order;
  }

  parseLegRequestDetailInternal(data: AvailableFlight): Array<models.FlightRequestDetails> {
    let legRequestDetailsArray = new Array<models.FlightRequestDetails>();

    const bookings = _.get(data, 'bookings', null);
    if (bookings) {
      legRequestDetailsArray = bookings.map(booking => {
        const legRequestDetails = new models.FlightRequestDetails();
        legRequestDetails.requestTime = _.get(booking, 'lastUpdated', null);
        legRequestDetails.legDetails = _.get(booking, 'price', null);
        legRequestDetails.passengerCount = _.get(booking, 'passengerCount', null);
        return legRequestDetails;
      });
    }

    return legRequestDetailsArray;
  }

  parseFilteredLegsOrderInternal(item: AvailableFlight): models.Order {
    const order = new models.Order();
    const aircraft = new models.Aircraft();
    aircraft.tailNumber = item.aircraft.tailNumber;

    const aircraftModel = new models.AircraftModel();
    aircraftModel.name = item.aircraft.modelName;

    aircraft.aircraftModel = aircraftModel;

    order.aircraft = aircraft;
    order.contractType = models.ContractType[item.contractType];

    if (item.status) {
      order.status = models.OrderStatusEnum[item.status];
    } else {
      order.status = 0;
    }

    order.legacyLegId = item.legacyLegId;

    order.operatorPrice = new models.OrderPrice();
    if (order.contractType === models.ContractType.CHARTER) {
      order.operatorPrice.basePrice = item.charterPricing.flightPrice;
    } else {
      order.operatorPrice.basePrice = item.shuttlePricing.seatPrice;
    }

    order.seatsCount = item.seatsOffered;
    order.departureTime = moment(item.departureTime).toDate();
    order.createdDepartureTime = moment(item.createdDepartureTime).toDate();

    const originFbo = new models.Fbo();
    if (item.departureFbo) {
      originFbo.id = Number(item.departureFbo.fboId);
      originFbo.name = item.departureFbo.name;
    }

    order.originFbo = originFbo;

    const destinationFbo = new models.Fbo();
    if (item.arrivalFbo) {
      destinationFbo.id = Number(item.arrivalFbo.fboId);
      destinationFbo.name = item.arrivalFbo.name;
    }
    order.destinationFbo = destinationFbo;

    order.eft = Number(item.eft);
    order.externalId = item.externalId;

    const originAirport = new models.Airport();
    originAirport.code = item.departureAirport.code;

    const destinationAirport = new models.Airport();
    destinationAirport.code = item.arrivalAirport.code;

    order.paxCount = item.passengers ? item.passengers.length : 0;

    const route = new models.Route();
    route.originAirport = originAirport;
    route.destinationAirport = destinationAirport;

    order.route = route;

    return order;
  }

  parsePriceDetailsInternal(data: AvailableFlight): models.PriceDetail {
    const response = new models.PriceDetail();

    if (data.shuttlePricing) {
      return this.parseShuttlePriceDetails(data.shuttlePricing);
    } else if (data.charterPricing) {
      return this.parseCharterPriceDetails(data.charterPricing);
    }
    return response;
  }

  parseShuttlePriceDetails(data: ShuttlePricing): models.PriceDetail {
    const response = new models.PriceDetail();
    response.price = _.get(data, 'customerPrice', null);
    response.creditCardFee = _.get(data, 'creditCardCost', null);
    response.fetTax = _.get(data, 'federalTaxCost', null);
    response.segmentFee = _.get(data, 'segmentFeeCost', null);
    response.operatorShare = _.get(data, 'operatorShare', null);
    response.jetsmarterShare = _.get(data, 'brokerShare', null);
    response.seatsCount = _.get(data, 'seatsOffered', null);
    response.percentageOfSalesPerSeat = _.get(data, 'brokerRate', null);
    response.basePrice = _.get(data, 'seatPrice', null);
    response.permitted = _.get(data, 'permitted', null);
    return response;
  }

  parseCharterPriceDetails(data: CharterPricing): models.PriceDetail {
    const response = new models.PriceDetail();
    response.price = _.get(data, 'customerPrice', null);
    response.fetTax = _.get(data, 'federalTaxCost', null);
    response.operatorShare = _.get(data, 'operatorShare', null);
    response.jetsmarterShare = _.get(data, 'brokerShare', null);
    response.creditCardFee = null;
    response.segmentFee = _.get(data, 'segmentFeeCost', null);
    response.percentageOfSalesPerSeat = _.get(data, 'brokerRate', null);
    response.basePrice = _.get(data, 'flightPrice', null);
    response.permitted = null;
    response.landingFee = _.get(data, 'landingFee', 0);
    response.flightRate = _.get(data, 'flightRate', 0);
    response.densityFee = _.get(data, 'densityFee', 0);
    return response;
  }

  parseBookingDetailInternal(data: any): models.PriceHistoryItem {
    const response = new models.PriceHistoryItem();

    const d: string = _.get(data, 'create_time', null);
    response.createTime = d !== null ? moment(d).toDate() : null;
    response.basePrice = _.get(data, 'base_price', null);
    response.name = _.get(data, 'user_name', null);
    response.seatsCount = _.get(data, 'seats_count', null);

    return response;
  }

  parseFlightPassengerDetailsInternal(data: AvailableFlight): Array<models.FlightPassengerDetails> {
    let response = new Array<models.FlightPassengerDetails>();

    const passengers = _.get(data, 'passengers', null);
    if (passengers) {
      response = passengers.map(passengerItem => {
        const passenger = new models.FlightPassengerDetails();
        passenger.legalName = _.get(passengerItem, 'legalName', null);
        passenger.weight = _.get(passengerItem, 'weight', null);
        const dob: string = _.get(passengerItem, 'dateOfBirth', null);
        passenger.dateOfBirth = dob !== null ? moment(dob).format('YYYY-MM-DD') : null;
        return passenger;
      });
    }

    return response;
  }

  parsePriceHistoryInternal(data: AvailableFlight): Array<models.PriceHistoryItem> {
    let response = new Array<models.PriceHistoryItem>();
    let updatedPriceHistory;

    if (data.shuttlePriceHistory) {
      updatedPriceHistory = [...data.shuttlePriceHistory, data.shuttlePricing];
    } else if (data.charterPriceHistory) {
      updatedPriceHistory = [...data.charterPriceHistory, data.charterPricing];
    }
    if (updatedPriceHistory) {
      response = updatedPriceHistory.reverse().map(priceItem => {
        const priceHistoryItem = new models.PriceHistoryItem();
        const d: string = _.get(priceItem, 'effective', null);
        priceHistoryItem.createTime = d !== null ? moment(d).toDate() : null;
        priceHistoryItem.basePrice = _.get(priceItem, data.shuttlePriceHistory ? 'seatPrice' : 'flightPrice', null);
        const adjusterName = ((_.get(priceItem, 'user.firstName', '') || '') + ' ' +
          (_.get(priceItem, 'user.lastName', '') || '')).trim();
        priceHistoryItem.name = adjusterName || null;
        priceHistoryItem.seatsCount = _.get(priceItem, 'seatsOffered', null);
        return priceHistoryItem;
      });
    }
    return response;
  }

  parseRepositioningItineraries(data: AvailableFlight): any {
    let response: any;

    if (models.ContractType[data.contractType] === models.ContractType.CHARTER) {
      response = {};
    } else {
      return null;
    }

    response.flexibility = _.get(data, 'repositioningItinerary.flexibility', null);
    response.flightRate = _.get(data, 'repositioningItinerary.flightRate', null);
    response.landingFee = _.get(data, 'repositioningItinerary.landingFee', null);

    const flights = _.get(data, 'repositioningItinerary.itinerary', null);
    if (flights) {
      response.flights = flights.map(
        flight => {
          const parsedFlight: any = {};
          parsedFlight.legDetails = this.parseLegDetailsInternal(flight.flight);

          parsedFlight.priceDetails = this.parsePriceDetailsInternal(flight.flight);
          return parsedFlight;
        }
      );
    } else {
      response.flights = null;
    }

    return response;
  }
}
