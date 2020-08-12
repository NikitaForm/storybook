import { Inject, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as contracts from '../../../domain/service-contracts/marketplace';
import * as models from '../../../domain/models';
import * as mapper from '../mappers/marketplace.mapper';

import { response as getAircraftListResponse } from './get-aircraft-list.response';
import { response as getAirportFboListResponse } from './get-airport-fbo-list.response';
import { response as getPriceDetailsResponse } from './get-price-details.response';
import { response as getFilteredLegsResponse } from './get-filtered-legs.response';
import { response as getLegDetailsResponse } from './get-leg-details.response';
import { response as getPriceHistoryResponse } from './/get-bookings-detail.response';
import { response as getAgreementResponse } from './get-agreement.response';

import { Observable, of, throwError } from 'rxjs';
import { catchError, first, map, switchMap, delay, withLatestFrom } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class MarketplaceMockService implements contracts.IMarketplaceService {
  private API_PATH: string;

  constructor(
    private datePipe: DatePipe) {
  }

  // getAircraftList(request: contracts.GetAircraftListRequest): Observable<contracts.GetAircraftListResponse> {
  //   const response = new contracts.GetAircraftListResponse();
  //   const entities = getAircraftListResponse.data.map(item => {
  //     const aircraft = new models.Aircraft();
  //     aircraft.aircraftId = item.aircraftId;
  //     aircraft.tailNumber = item.tailNumber;
  //     aircraft.marketableSeatsCount = item.marketableSeatsCount;

  //     const aircraftModel = new models.AircraftModel();
  //     aircraftModel.name = item.modelName;
  //     aircraft.aircraftModel = aircraftModel;

  //     return aircraft;
  //   });

  //   response.entities = entities;

  //   return of(response); // ;
  // }

  getAirport(request: contracts.GetAirportRequest): Observable<contracts.GetAirportResponse> {
    const item = {
      code: request.code.toUpperCase() === 'KFLL' ? 'KFLL' : 'KTEB',
      name: 'Hollywood Intl',
      address: {
        country: 'United States',
        state: 'Florida',
        city: 'Fort Lauderdale'
      }
    };

    const airport = new models.Airport();
    airport.name = item.name;
    airport.code = item.code;

    const response = new contracts.GetAirportResponse();
    response.entity = airport;

    return of(response); // .pipe(delay(1000));
  }

  getAirportFboList(request: contracts.GetAirportFboListRequest): Observable<contracts.GetAirportFboListResponse> {
    const svcJsonResp = getAirportFboListResponse;

    const entities = svcJsonResp.data.getAirport.fbos.map(item => {
      const fbo = new models.Fbo();
      fbo.name = item.name;
      fbo.id = Number(item.fboId);

      const address = new models.Address();
      address.city = item.address.city;
      address.state = item.address.state;
      address.country = item.address.country;
      fbo.address = address;

      return fbo;
    });

    const response = new contracts.GetAirportFboListResponse();
    response.entities = entities;

    return of(response); // .pipe(delay(1000));
  }
  submitOrder(request: contracts.SubmitOrderRequest):
    Observable<contracts.SubmitOrderResponse> {
    const response = new contracts.SubmitOrderResponse();

    return of(response); // .pipe(delay(1000));
  }

  updateOrder(request: contracts.UpdateOrderRequest): Observable<contracts.UpdateOrderResponse> {
    const response = new contracts.UpdateOrderResponse();

    return of(response); // .pipe(delay(3000));
  }

  getFlightDetails(id): Observable<contracts.GetFlightDetailsResponse> {
    const response = new contracts.GetFlightDetailsResponse();
    const mapperInstance = new mapper.MarketPlaceMapper();
    const mockResponse = getLegDetailsResponse.data.listAvailableFlights.availableFlights.filter(flight => flight.legacyLegId === id);

    response.legDetailsEntities = mockResponse
      .map(mapperInstance.parseLegDetailsInternal);

    response.legRequestDetailsEntities = mockResponse
      .map(mapperInstance.parseLegRequestDetailInternal);

    response.priceDetailsEntities = mockResponse
      .map(mapperInstance.parsePriceDetailsInternal.bind(mapperInstance));

    response.passengerDetailsEntities = mockResponse
      .map(mapperInstance.parseFlightPassengerDetailsInternal);

    response.priceHistoryEntities = mockResponse
      .map(mapperInstance.parsePriceHistoryInternal);

    response.repositioningItinerary = mockResponse
      .map(mapperInstance.parseRepositioningItineraries.bind(mapperInstance));
    return of(response);
  }

  getPriceHistory(id): Observable<contracts.GetPriceHistoryResponse> {
    const response = new contracts.GetPriceHistoryResponse();
    response.entities = getPriceHistoryResponse.data.map(d =>
      new mapper.MarketPlaceMapper().parseBookingDetailInternal(d));

    return of(response); // .pipe(delay(1000));
  }

  getFlightPassengerDetails(id): Observable<contracts.GetPassengerDetailsResponse> {
    const response = new contracts.GetPassengerDetailsResponse();

    return of(response); // .pipe(delay(1000));
  }

  validateEft(request): Observable<any> {
    const response = {
      minimumEft: 100,
      maximumEft: 500
    };

    return of(response); // .pipe(delay(200));
  }

  validatePrice(request): Observable<contracts.ValidatePriceResponse> {

    const response = new contracts.ValidatePriceResponse();

    response.min = 100;
    response.max = 20000;

    return of(response); // .pipe(delay(200));
  }

  getFilteredOrderList(request): Observable<contracts.GetFilteredOrderListResponse> {
    const response = new contracts.GetFilteredOrderListResponse();

    const svcJsonResp = getFilteredLegsResponse;
    const entities: Array<models.Order> = (svcJsonResp.data.listAvailableFlights as any)
      .map(new mapper.MarketPlaceMapper().parseFilteredLegsOrderInternal);

    //   item => {
    //   const order = new models.Order();
    //   const aircraft = new models.Aircraft();
    //   aircraft.tailNumber = item.aircraft.registrationNumber;

    //   const aircraftModel = new models.AircraftModel();
    //   aircraftModel.name = item.aircraft.modelName;

    //   aircraft.aircraftModel = aircraftModel;

    //   order.aircraft = aircraft;
    //   order.status = item.orderStatus ? Number(item.orderStatus) : 0;
    //   order.legacyLegId = item.legacyLegId;

    //   order.operatorPrice = new models.OrderPrice();
    //   if (_.get(item, 'priceDetails.base_price')) {
    //     order.operatorPrice.basePrice = item.priceDetails.base_price;
    //   }
    //   if (_.get(item, 'priceDetails.percentage_of_sales_per_seat')) {
    //     order.operatorPrice.percentageOfSale = item.priceDetails.percentage_of_sales_per_seat;
    //   }

    //   order.bookingsCount = Number(item.bookingsCount);
    //   order.seatsCount = Number(item.seatsCount);
    //   order.departureTime = new Date(item.departureTime);

    //   const originFbo = new models.Fbo();
    //   originFbo.id = item.originFbo.id;
    //   originFbo.name = item.originFbo.name;
    //   order.originFbo = originFbo;

    //   const destinationFbo = new models.Fbo();
    //   destinationFbo.id = item.destinationFbo.id;
    //   destinationFbo.name = item.destinationFbo.name;
    //   order.destinationFbo = destinationFbo;

    //   order.eft = Number(item.eft);
    //   order.externalId = item.externalId;
    //   order.legId = Number(item.legId);
    //   order.legStatusName = item.legStatusName;

    //   const originAirport = new models.Airport();
    //   originAirport.code = item.route.departureAirport.code;

    //   const destinationAirport = new models.Airport();
    //   destinationAirport.code = item.route.arrivalAirport.code;

    //   order.paxCount = Number(item.paxCount);

    //   const route = new models.Route();
    //   route.originAirport = originAirport;
    //   route.destinationAirport = destinationAirport;

    //   order.route = route;

    //   return order;
    // });

    response.entities = entities;
    response.total = entities.length;

    return of(response); // .pipe(delay(2000));
  }

  getAutoCompleteOptions(request): Observable<contracts.GetAutoCompleteOptionsResponse> {
    const requestUrl = `${this.API_PATH}/v1.0/marketplace/shared-charters/autocomplete-options`;

    const body = {
      data: {
        searchField: request.searchField,
        prefixString: request.prefixString
      }
    };

    // return this.http.post(requestUrl, body)
    //   .pipe(
    //     map(serviceResponse => {
    //       const response = new contracts.GetAutoCompleteOptionsResponse();
    //       if (serviceResponse.status === 204) {
    //         return response;
    //       }
    //       response.options = serviceResponse.json().data;
    //
    //       return response;
    //     })
    //   );
    return of(new contracts.GetAutoCompleteOptionsResponse());
  }

  getPriceDetails(request: contracts.GetPriceDetailsRequest): Observable<contracts.GetPriceDetailsResponse> {
    const response = new contracts.GetPriceDetailsResponse();

    const data = getPriceDetailsResponse.data;

    // response.entity = new mapper.MarketPlaceMapper().parsePriceDetailsInternal(data);

    return of(response); // .pipe(delay(1000));
  }

  getShuttlePriceDetails(request: contracts.GetPriceDetailsRequest): Observable<contracts.GetPriceDetailsResponse> {
    const response = new contracts.GetPriceDetailsResponse();

    const data = getPriceDetailsResponse.data;


    return of(response); // .pipe(delay(1000));
  }

  getCharterPriceDetails(request: any): Observable<contracts.GetPriceDetailsResponse> {
    const response = new contracts.GetPriceDetailsResponse();

    const data = getPriceDetailsResponse.data;


    return of(response); // .pipe(delay(1000));
  }

  // getDestinationAirportList(request: contracts.GetDestinationAirportListRequest):
  //   Observable<contracts.GetDestinationAirportListResponse> {
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/destination-airports/${request.originAirportCode}`;

  //   return this.http.get(requestUrl)
  //     .pipe(
  //       map(serviceResponse => {
  //         const svcJsonResp = serviceResponse.json();

  //         if (!svcJsonResp) { return null; }

  //         const entities = svcJsonResp.data.map(item => {
  //           const airport = new models.Airport();
  //           airport.name = item.name;
  //           airport.code = item.code;

  //           const airportGroup = new models.AirportGroup();
  //           airportGroup.name = item.airportGroup.name;
  //           airportGroup.shortName = item.airportGroup.shortName;
  //           airport.airportGroup = airportGroup;

  //           const address = new models.Address();
  //           address.city = item.address.city;
  //           address.stateProvince = item.address.stateProvince;
  //           address.country = item.address.country;
  //           airport.address = address;

  //           return airport;
  //         });

  //         const response = new contracts.GetOriginAirportListResponse();
  //         response.entities = entities;

  //         return response;
  //       })
  //     );
  // }

  // getOneWayActiveQuoteList(request: contracts.GetOneWayActiveQuoteListRequest):
  //   Observable<contracts.GetOneWayActiveQuoteListResponse> {
  //   const operatorServiceEndpoint = this.configService.get('OperatorServiceEndpoint');
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/active-locked-quotes`;

  //   return this.http.get(requestUrl)
  //     .pipe(
  //       map(svcResp => {
  //         const response = new contracts.GetOneWayActiveQuoteListResponse();

  //         if (svcResp.status === 204) {
  //           response.entities = new Array<models.OneWayQuote>();

  //           return response;
  //         }

  //         const svcJsonResp = svcResp.json();

  //         const entities = svcJsonResp.data.map(item => {

  //           const quote = new models.OneWayQuote();

  //           const lockUser = new models.User();
  //           lockUser.firstName = item.lockUser.firstName;
  //           lockUser.lastName = item.lockUser.lastName;

  //           quote.lockUser = lockUser;
  //           quote.lockDate = new Date(item.lockTime);
  //           quote.lockExpirationDate = new Date(item.lockExpirationTime);

  //           const aircraft = new models.Aircraft();
  //           aircraft.tailNumber = item.aircraft.tailNumber;

  //           const aircraftModel = new models.AircraftModel();
  //           aircraftModel.name = item.aircraft.modelName;

  //           aircraft.aircraftModel = aircraftModel;

  //           quote.aircraft = aircraft;
  //           quote.quoteId = Number(item.quoteId);
  //           quote.quoteUri = `${operatorServiceEndpoint}/v1.0/marketplace/one-way-quotes/${quote.quoteId}/not-signed-contract/download`;
  //           quote.departureEndDateTime = new Date(item.departureEndDatetime);
  //           quote.departureStartDateTime = new Date(item.departureStartDatetime);

  //           const originAirport = new models.Airport();
  //           originAirport.code = item.route.departureAirport.code;

  //           const destinationAirport = new models.Airport();
  //           destinationAirport.code = item.route.arrivalAirport.code;

  //           const route = new models.Route();
  //           route.originAirport = originAirport;
  //           route.destinationAirport = destinationAirport;

  //           quote.route = route;

  //           quote.price = Number(item.price);

  //           return quote;
  //         });

  //         response.entities = entities;

  //         return response;
  //       })
  //     );

  // }

  // getOneWayContractList(request: contracts.GetOneWayContractListRequest): Observable<contracts.GetOneWayContractListResponse> {
  //   const operatorServiceEndpoint = this.configService.get('OperatorServiceEndpoint');
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/accepted-one-way-quotes`;

  //   return this.http.get(requestUrl)
  //     .pipe(
  //       map(svcResp => {
  //         const svcJsonResp = svcResp.json();

  //         const entities = svcJsonResp.data.map(item => {

  //           const contract = new models.OneWayContract();

  //           const acceptUser = new models.User();
  //           acceptUser.firstName = item.acceptUser.firstName;
  //           acceptUser.lastName = item.acceptUser.lastName;

  //           contract.acceptUser = acceptUser;
  //           contract.acceptTime = new Date(item.acceptTime);

  //           const aircraft = new models.Aircraft();
  //           aircraft.tailNumber = item.aircraft.tailNumber;

  //           const aircraftModel = new models.AircraftModel();
  //           aircraftModel.name = item.aircraft.modelName;

  //           aircraft.aircraftModel = aircraftModel;

  //           contract.aircraft = aircraft;
  //           contract.contractId = Number(item.contractId);
  //           contract.quoteId = Number(item.quoteId);
  //           contract.contractUri
  //             = `${operatorServiceEndpoint}/v1.0/marketplace/one-way-quotes/${contract.quoteId}/signed-contract/download`;
  //           contract.departureEndDateTime = new Date(item.departureEndDatetime);
  //           contract.departureStartDateTime = new Date(item.departureStartDatetime);

  //           const originAirport = new models.Airport();
  //           originAirport.code = item.route.departureAirport.code;

  //           const destinationAirport = new models.Airport();
  //           destinationAirport.code = item.route.arrivalAirport.code;

  //           const route = new models.Route();
  //           route.originAirport = originAirport;
  //           route.destinationAirport = destinationAirport;

  //           contract.route = route;

  //           contract.price = Number(item.price);

  //           return contract;
  //         });

  //         const response = new contracts.GetOneWayContractListResponse();
  //         response.entities = entities;

  //         return response;
  //       })
  //     );
  // }

  // getOneWayQuoteList(query: contracts.GetOneWayQuoteListRequest): Observable<contracts.GetOneWayQuoteListResponse> {
  //   const operatorServiceEndpoint = this.configService.get('OperatorServiceEndpoint');
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/active-locked-quotes`;

  //   return this.http.get(requestUrl)
  //     .pipe(
  //       map(svcResp => {
  //         const svcJsonResp = svcResp.json();
  //         const entities = svcJsonResp.data.map(item => {
  //           const quote = new models.OneWayQuote();

  //           const aircraft = new models.Aircraft();
  //           aircraft.tailNumber = item.aircraft.tailNumber;

  //           const aircraftModel = new models.AircraftModel();
  //           aircraftModel.name = item.aircraft.modelName;

  //           aircraft.aircraftModel = aircraftModel;

  //           quote.aircraft = aircraft;

  //           quote.departureEndDateTime = new Date(item.departureEndDatetime);
  //           quote.departureStartDateTime = new Date(item.departureStartDatetime);

  //           quote.price = Number(item.price);

  //           const originAirport = new models.Airport();
  //           originAirport.code = item.route.departureAirport.code;

  //           const destinationAirport = new models.Airport();
  //           destinationAirport.code = item.route.arrivalAirport.code;

  //           quote.lockDate = new Date(item.lockTime);
  //           quote.lockExpirationDate = new Date(item.lockExpirationTime);

  //           if (item.lockUser) {
  //             const lockUser = new models.User();
  //             lockUser.firstName = item.lockUser.firstName;
  //             lockUser.lastName = item.lockUser.lastName;

  //             quote.lockUser = lockUser;
  //           }

  //           const route = new models.Route();
  //           route.originAirport = originAirport;
  //           route.destinationAirport = destinationAirport;

  //           quote.route = route;

  //           quote.quoteId = Number(item.quoteId);
  //           quote.quoteUri = `${operatorServiceEndpoint}/v1.0/marketplace/one-way-quotes/${quote.quoteId}/not-signed-contract/download`;

  //           return quote;
  //         });

  //         const response = new contracts.GetOneWayQuoteListResponse();
  //         response.entities = entities;

  //         return response;
  //       })
  //     );
  // }

  // getOriginAirportList(request: contracts.GetOriginAirportListRequest): Observable<contracts.GetOriginAirportListResponse> {
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/origin-airports`;

  //   return this.http.get(requestUrl)
  //     .pipe(
  //       map(svcResp => {
  //         const svcJsonResp = svcResp.json();

  //         const entities = svcJsonResp.data.map(item => {
  //           const airport = new models.Airport();
  //           airport.name = item.name;
  //           airport.code = item.code;

  //           const airportGroup = new models.AirportGroup();
  //           airportGroup.name = item.airportGroup.name;
  //           airportGroup.shortName = item.airportGroup.shortName;
  //           airport.airportGroup = airportGroup;

  //           const address = new models.Address();
  //           address.city = item.address.city;
  //           address.stateProvince = item.address.stateProvince;
  //           address.country = item.address.country;
  //           airport.address = address;

  //           return airport;
  //         });

  //         const response = new contracts.GetOriginAirportListResponse();
  //         response.entities = entities;

  //         return response;
  //       })
  //     );
  // }

  // getQuoteList(request: contracts.GetQuoteListRequest): Observable<contracts.GetQuoteListResponse> {
  //   const operatorServiceEndpoint = this.configService.get('OperatorServiceEndpoint');
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/one-way-quotes/create`;

  //   const body = {
  //     data: {
  //       aircraftId: request.aircraftId,
  //       arrivalAirportCode: request.destinationAirportCode,
  //       departureAirportCode: request.originAirportCode,
  //       departureStartDatetime: this.datePipe.transform(request.departureStartDateTime, 'yyyy-MM-ddTHH:mm:ss'),
  //       departureEndDatetime: this.datePipe.transform(request.departureEndDateTime, 'yyyy-MM-ddTHH:mm:ss')
  //     }
  //   };

  //   return this.http.post(requestUrl, body)
  //     .pipe(
  //       map(serviceResponse => {
  //         const response = new contracts.GetQuoteListResponse();

  //         if (serviceResponse.status === 204) {
  //           return response;
  //         }

  //         const svcJsonResp = serviceResponse.json();

  //         if (svcJsonResp.status === 400) {
  //           response.errorMessage = svcJsonResp.message;
  //         }

  //         const entities = svcJsonResp.data.map(item => {
  //           const quote = new models.OneWayQuote();

  //           const aircraft = new models.Aircraft();
  //           aircraft.tailNumber = item.aircraft.tailNumber;

  //           const aircraftModel = new models.AircraftModel();
  //           aircraftModel.name = item.aircraft.modelName;

  //           aircraft.aircraftModel = aircraftModel;

  //           quote.aircraft = aircraft;

  //           quote.departureEndDateTime = new Date(item.departureEndDatetime);
  //           quote.departureStartDateTime = new Date(item.departureStartDatetime);

  //           quote.price = Number(item.price);

  //           const originAirport = new models.Airport();
  //           originAirport.code = item.route.departureAirport.code;

  //           const destinationAirport = new models.Airport();
  //           destinationAirport.code = item.route.arrivalAirport.code;

  //           quote.lockDate = new Date(item.lockTime);
  //           quote.lockExpirationDate = new Date(item.lockExpirationTime);

  //           if (item.lockUser) {
  //             const lockUser = new models.User();
  //             lockUser.firstName = item.lockUser.firstName;
  //             lockUser.lastName = item.lockUser.lastName;

  //             quote.lockUser = lockUser;
  //           }

  //           const route = new models.Route();
  //           route.originAirport = originAirport;
  //           route.destinationAirport = destinationAirport;

  //           quote.route = route;

  //           quote.quoteId = Number(item.quoteId);
  //           quote.quoteUri = `${operatorServiceEndpoint}/v1.0/marketplace/one-way-quotes/${quote.quoteId}/not-signed-contract/download`;

  //           return quote;
  //         });

  //         response.entities = entities;

  //         return response;
  //       }),
  //       catchError((serviceResponse: Response) => {
  //         if (serviceResponse.status === 400) {
  //           const response = new contracts.GetQuoteListResponse();
  //           response.errorMessage = (serviceResponse.json() as any).message;

  //           return of(response); // ;
  //         }

  //         return throwError(serviceResponse);
  //       })
  //     );
  // }

  // getOrderList(request: contracts.GetOrderListRequest):
  //   Observable<contracts.GetOrderListResponse> {
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/shared-charters/legs`;

  //   return this.http.get(requestUrl)
  //     .pipe(
  //       map(serviceResponse => {
  //         const response = new contracts.GetOrderListResponse();

  //         if (serviceResponse.status === 204) {
  //           return response;
  //         }

  //         const svcJsonResp = serviceResponse.json();

  //         // destinationFbo: Fbo;
  //         // originFbo: Fbo;

  //         const entities = svcJsonResp.data.map(item => {
  //           const order = new models.Order();
  //           const aircraft = new models.Aircraft();
  //           aircraft.tailNumber = item.aircraft.registrationNumber;

  //           const aircraftModel = new models.AircraftModel();
  //           aircraftModel.name = item.aircraft.modelName;

  //           aircraft.aircraftModel = aircraftModel;

  //           order.aircraft = aircraft;
  //           order.legacyLegId = item.legacyLegId;

  //           order.bookingsCount = Number(item.bookingsCount);
  //           order.seatsCount = Number(item.seatsCount);
  //           order.departureTime = new Date(item.departureTime);

  //           const originFbo = new models.Fbo();
  //           originFbo.id = item.originFbo.id;
  //           originFbo.name = item.originFbo.name;
  //           order.originFbo = originFbo;

  //           const destinationFbo = new models.Fbo();
  //           destinationFbo.id = item.destinationFbo.id;
  //           destinationFbo.name = item.destinationFbo.name;
  //           order.destinationFbo = destinationFbo;

  //           order.eft = Number(item.eft);
  //           order.externalId = item.externalId;
  //           order.legId = Number(item.legId);
  //           order.legStatusName = item.legStatusName;

  //           const originAirport = new models.Airport();
  //           originAirport.code = item.route.departureAirport.code;

  //           const destinationAirport = new models.Airport();
  //           destinationAirport.code = item.route.arrivalAirport.code;

  //           order.paxCount = Number(item.paxCount);

  //           const route = new models.Route();
  //           route.originAirport = originAirport;
  //           route.destinationAirport = destinationAirport;

  //           order.route = route;

  //           return order;
  //         });

  //         response.entities = entities;

  //         return response;
  //       })
  //       // catchError((serviceResponse: Response) => {
  //       //   if (serviceResponse.status === 400) {
  //       //     const response = new contracts.GetOrderListResponse();
  //       //     response.entities = (serviceResponse.json() as any).message;

  //       //     return of(response); // ;
  //       //   }

  //       //   throw Observable.throw(serviceResponse);
  //       // })
  //     );
  // }

  // lockQuote(request: contracts.LockQuoteRequest): Observable<contracts.LockQuoteResponse> {
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/one-way-quotes/${request.quoteId}/lock`;

  //   return this.http.patch(requestUrl, null)
  //     .pipe(
  //       map(svcResp => {
  //         const response = new contracts.LockQuoteResponse();

  //         return response;
  //       })
  //     );
  // }


  getAgreement(id): Observable<models.Agreement> {
    const Agreement = new models.Agreement();
    Agreement.html = getAgreementResponse.data;

    return of(Agreement);
  }

  // acceptQuote(request: contracts.AcceptQuoteRequest): Observable<contracts.AcceptQuoteResponse> {
  //   const requestUrl = `${this.API_PATH}/v1.0/marketplace/one-way-quotes/${request.quoteId}/accept`;

  //   return this.http
  //     .patch(requestUrl, null)
  //     .pipe(
  //       map(svcResp => {
  //         const response = new contracts.AcceptQuoteResponse();

  //         return response;
  //       })
  //     );
  // }

}
