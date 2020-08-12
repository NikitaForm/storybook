import * as actions from '../actions/flight-details';
import * as models from '../../domain/models';

import * as _ from 'lodash';

export interface FlightDetails {
  legRequestDetails: Array<models.FlightRequestDetails>;
  legDetails: models.Order;
  newOrder: models.Order;
  priceDetails: models.PriceDetail;
  repositioningItinerary: any;
}

export interface State {
  isFlightDetailsLoaded: boolean;
  isFlightDetailsLoading: boolean;
  isPriceHistoryLoaded: boolean;
  isPriceHistoryLoading: boolean;
  isPassengerDetailsLoaded: boolean;
  isPassengerDetailsLoading: boolean;
  isFlightDetailUpdateLoading: boolean;
  flightDetails: FlightDetails;
  passengerDetails: Array<models.FlightPassengerDetails>;
  priceHistory: Array<models.PriceHistoryItem>;
}

const initialState: State = {
  isFlightDetailsLoaded: false,
  isFlightDetailsLoading: false,
  isPriceHistoryLoaded: false,
  isPriceHistoryLoading: false,
  isPassengerDetailsLoaded: false,
  isPassengerDetailsLoading: false,
  isFlightDetailUpdateLoading: false,
  flightDetails: {
    legRequestDetails: null,
    legDetails: null,
    newOrder: null,
    priceDetails: null,
    repositioningItinerary: null
  },
  passengerDetails: [],
  priceHistory: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case actions.SET_FLIGHT_DETAILS_NEW_ORDER: {
      const flightDetails = _.cloneDeep(state.flightDetails);
      flightDetails.newOrder = action.payload.entity;
      return {
        ...state,
        flightDetails
      };
    }

    case actions.UPDATE_FLIGHT_DETAILS: {
      const isFlightDetailsLoading = _.cloneDeep(state.isFlightDetailsLoading);
      return {
        ...state,
        isFlightDetailUpdateLoading: true,
        isFlightDetailsLoading: action.payload.fullScreenLoad === false ? isFlightDetailsLoading : true
      };
    }

    case actions.UPDATE_FLIGHT_DETAILS_FAIL:
    case actions.UPDATE_FLIGHT_DETAILS_SUCCESS: {
      return {
        ...state,
        isFlightDetailUpdateLoading: false,
        isFlightDetailsLoading: false
      };
    }

    // case actions.LOAD_PRICE_DETAILS: {
    //   const flightDetails = _.cloneDeep(state.flightDetails);
    //   flightDetails.priceDetailsIsLoaded = false;
    //   flightDetails.priceDetailsIsLoading = true;
    //   return {
    //     ...state,
    //     flightDetails
    //   };
    // }

    // case actions.LOAD_PRICE_DETAILS_SUCCESS: {
    //   const flightDetails = _.cloneDeep(state.flightDetails);
    //   flightDetails.priceDetailsIsLoaded = true;
    //   flightDetails.priceDetailsIsLoading = false;
    //   flightDetails.priceDetails = _.cloneDeep(action.payload);
    //   return {
    //     ...state,
    //     flightDetails
    //   };
    // }

    // case actions.LOAD_PRICE_DETAILS_FAIL: {
    //   const flightDetails = _.cloneDeep(state.flightDetails);
    //   flightDetails.priceDetailsIsLoaded = true;
    //   flightDetails.priceDetailsIsLoading = false;
    //   flightDetails.priceDetails = null;
    //   return {
    //     ...state,
    //     flightDetails
    //   };
    // }

    case actions.LOAD_PRICE_HISTORY: {
      return {
        ...state,
        isPriceHistoryLoaded: false,
        isPriceHistoryLoading: true,
        priceHistory: []
      };
    }

    case actions.LOAD_PRICE_HISTORY_SUCCESS: {
      return {
        ...state,
        isPriceHistoryLoaded: true,
        isPriceHistoryLoading: false,
        priceHistory: _.cloneDeep(action.payload.entities)
      };
    }

    case actions.LOAD_PRICE_HISTORY_FAIL: {
      return {
        ...state,
        isPriceHistoryLoaded: true,
        isPriceHistoryLoading: false
      };
    }

    case actions.LOAD_FLIGHT_DETAILS: {
      return Object.assign({}, state, {
        isFlightDetailsLoading: true
      });
    }

    case actions.LOAD_FLIGHT_DETAILS_SUCCESS: {
      const payload = action.payload;

      return Object.assign({}, state, {
        isFlightDetailsLoaded: true,
        isFlightDetailsLoading: false,
        flightDetails: payload
      });
    }

    case actions.LOAD_FLIGHT_DETAILS_FAIL: {

      return Object.assign({}, state, {
        isFlightDetailsLoaded: false,
        isFlightDetailsLoading: false,
        flightDetails: {
          legRequestDetails: null,
          legDetails: null,
          newOrder: null,
          priceDetails: null
        }
      });
    }

    case actions.LOAD_FLIGHT_PASSENGER_DETAILS: {
      return Object.assign({}, state, {
        isPassengerDetailsLoading: true
      });
    }

    case actions.LOAD_FLIGHT_PASSENGER_DETAILS_SUCCESS: {
      const payload = action.payload;

      return Object.assign({}, state, {
        isPassengerDetailsLoaded: true,
        isPassengerDetailsLoading: false,
        passengerDetails: payload
      });
    }

    case actions.LOAD_FLIGHT_PASSENGER_DETAILS_FAIL: {

      return Object.assign({}, state, {
        isPassengerDetailsLoaded: false,
        isPassengerDetailsLoading: false,
        passengerDetails: []
      });
    }

    default: {
      return state;
    }
  }
}

export const getLegRequestDetails = (state: State) => state.flightDetails.legRequestDetails;
export const getLegDetails = (state: State) => state.flightDetails.legDetails;
export const getLegDetailsNewOrder = (state: State) => state.flightDetails.newOrder;
export const getPassengerDetails = (state: State) => state.passengerDetails;
export const getIsFlightDetailsLoading = (state: State) => state.isFlightDetailsLoading;
export const getIsPassengerDetailsLoading = (state: State) => state.isPassengerDetailsLoading;
export const getIsFlightDetailUpdateLoading = (state: State) => state.isFlightDetailUpdateLoading;
export const getPriceDetails = (state: State) => state.flightDetails.priceDetails;
export const getRepositioningItinerary = (state: State) => state.flightDetails.repositioningItinerary;
export const getPriceHistoryIsLoading = (state: State) => state.isPriceHistoryLoading;
export const getPriceHistoryIsLoaded = (state: State) => state.isPriceHistoryLoaded;
export const getPriceHistoryItems = (state: State) => state.priceHistory;
