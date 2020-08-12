import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import * as models from '../models';
import { FlightEstimate, Maybe } from '../graphql-types';

export interface IMarketplaceService {
  // getAircraftList(request: GetAircraftListRequest): Observable<GetAircraftListResponse>;
  getAirport(request: GetAirportRequest): Observable<GetAirportResponse>;
  getAirportFboList(request: GetAirportFboListRequest): Observable<GetAirportFboListResponse>;
  submitOrder(request: SubmitOrderRequest): Observable<SubmitOrderResponse>;
  updateOrder(request: UpdateOrderRequest): Observable<UpdateOrderResponse>;
  getFlightDetails(id): Observable<GetFlightDetailsResponse>;
  validateEft(request: any): Observable<Maybe<Pick<FlightEstimate, 'minimumEft' | 'maximumEft'>>>;
  validatePrice(request: any): Observable<ValidatePriceResponse>;
  getFilteredOrderList(request): Observable<GetFilteredOrderListResponse>;
  getAutoCompleteOptions(request): Observable<GetAutoCompleteOptionsResponse>;
  getCharterPriceDetails(request: any): Observable<GetPriceDetailsResponse>;
  getShuttlePriceDetails(request: any): Observable<GetPriceDetailsResponse>;

  // getDestinationAirportList(request: GetDestinationAirportListRequest): Observable<GetDestinationAirportListResponse>;
  // getOneWayActiveQuoteList(request: GetOneWayActiveQuoteListRequest): Observable<GetOneWayActiveQuoteListResponse>;
  // getOneWayContractList(request: GetOneWayContractListRequest): Observable<GetOneWayContractListResponse>;
  // getOneWayQuoteList(request: GetOneWayQuoteListRequest): Observable<GetOneWayQuoteListResponse>;
  // getOriginAirportList(request: GetOriginAirportListRequest): Observable<GetOriginAirportListResponse>;
  // // getQuote(request: GetQuoteRequest): Rx.Observable<GetQuoteResponse>;
  // getOrderList(request: GetOrderListRequest): Observable<GetOrderListResponse>;
  // getQuoteList(request: GetQuoteListRequest): Observable<GetQuoteListResponse>;
  // lockQuote(request: LockQuoteRequest): Observable<LockQuoteResponse>;
  getAgreement(id): Observable<models.Agreement>;
  // acceptQuote(request: AcceptQuoteRequest): Observable<AcceptQuoteResponse>;
}

export const SERVICE_TOKEN = new InjectionToken('Flights.IMarketplaceService');

export class ValidatePriceResponse {
  min: number;
  max: number;
}

export class GetPriceDetailsRequest {
  basePrice: number;
  seatsCount: number;
  departureAirportCode: string;
  arrivalAirportCode: string;
  departureTime: Date;
}

export class GetPriceDetailsResponse {
  entity: models.PriceDetail;
}

export class AcceptQuoteRequest {
  quoteId: number;
}

export class AcceptQuoteResponse {
}

export class GetAircraftListRequest {
}

export class GetAirportRequest {
  code: string;
}

export class GetAirportResponse {
  entity: models.Airport;
}

export class GetAirportFboListRequest {
  code: string;
}

export class GetAirportFboListResponse {
  entities: Array<models.Fbo> = new Array<models.Fbo>();
}

export class GetAircraftListResponse {
  entities: Array<models.Aircraft> = new Array<models.Aircraft>();
}

export class GetDestinationAirportListRequest {
  originAirportCode: string;
}

export class GetDestinationAirportListResponse {
  entities: Array<models.Airport>;
}

export class GetOneWayContractListRequest {
}

export class GetOneWayContractListResponse {
  entities: Array<models.OneWayContract> = new Array<models.OneWayContract>();
}

export class GetOneWayActiveQuoteListRequest {

}

export class GetOneWayActiveQuoteListResponse {
  entities: Array<models.OneWayQuote> = new Array<models.OneWayQuote>();
}

export class GetOneWayQuoteListRequest {
}

export class GetOneWayQuoteListResponse {
  entities: Array<models.OneWayQuote> = new Array<models.OneWayQuote>();
}

export class GetOriginAirportListRequest {
}

export class GetOriginAirportListResponse {
  entities: Array<models.Airport> = new Array<models.Airport>();
}

// export class GetQuoteRequest {
//   quoteId: number;
// }
//
// export class GetQuoteResponse {
//   quote: models.OneWayQuote;
// }

export class GetOrderListRequest {

}

export class GetOrderListResponse {
  entities: Array<models.Order> = new Array<models.Order>();
}

export class GetFilteredOrderListResponse {
  entities: Array<models.Order> = new Array<models.Order>();
  total = 0;
}

export class GetPassengerDetailsResponse {
  entities: Array<models.FlightPassengerDetails> = new Array<models.FlightPassengerDetails>();
}

export class GetFlightDetailsResponse {
  legRequestDetailsEntities: Array<Array<models.FlightRequestDetails>> = new Array<Array<models.FlightRequestDetails>>();
  legDetailsEntities: Array<models.Order> = new Array<models.Order>();
  priceDetailsEntities: Array<models.PriceDetail> = new Array<models.PriceDetail>();
  passengerDetailsEntities: Array<Array<models.FlightPassengerDetails>> = new Array<Array<models.FlightPassengerDetails>>();
  priceHistoryEntities: Array<Array<models.PriceHistoryItem>> = new Array<Array<models.PriceHistoryItem>>();
  repositioningItinerary: any = {};
}

export class GetPriceHistoryResponse {
  entities: Array<models.PriceHistoryItem>;
}

export class GetQuoteListRequest {
  aircraftId: number;
  destinationAirportCode: string;
  originAirportCode: string;
  departureStartDateTime: Date;
  departureEndDateTime: Date;
}

export class GetQuoteListResponse {
  entities: Array<models.OneWayQuote> = new Array<models.OneWayQuote>();
  errorMessage?: string;
}

export class LockQuoteRequest {
  quoteId: number;
}

export class LockQuoteResponse {
}

export class SubmitOrderRequest {
  aircraftId: number;
  departureTime: Date;
  destinationAirportCode: string;
  destinationFboId: number;
  eft: number;
  externalId: string;
  originAirportCode: string;
  originFboId: number;
  seatMinPrice: number;
  seatCount: number;
  priceType: string;
  contractType: string;
  charterPrice: number;
  flexibility: number;
  expirationOffset: number;
  flightRate: number;
  landingFee: number;
}

export class SubmitOrderResponse {
}

export class UpdateOrderRequest {
  seatsOffered: number;
  seatPrice: number;
  charterPrice: number;
  status: string;
  availableFlightId: string;
}

export class UpdateOrderResponse {
}

export class GetAutoCompleteOptionsResponse {
  options: Array<string>;
}
