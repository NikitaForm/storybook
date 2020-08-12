import * as actions from '../actions/order-new';
import * as models from '../../domain/models';

import { environment } from '../../../environments/environment';
import { EnvironmentEnum } from '../../../environments/environment.interface';

import * as _ from 'lodash';

export interface State {
  order: models.OrderRequest;
  orderIsSubmitting: boolean;
  orderIsSubmitted?: boolean;
  orderFailReason: string;
  orderOriginAirport: models.Airport;
  orderOriginAirportIsLoaded?: boolean;
  orderOriginAirportIsLoading: boolean;
  orderPriceDetails: models.PriceDetail;
  orderPriceDetailsIsLoaded: boolean;
  orderPriceDetailsIsLoading: boolean;
  orderIsSet: boolean;
  contractType: models.ContractType;
  lowPriceIsConfirmed: boolean;
  highPriceIsConfirmed: boolean;
}

const depDate = new Date();
depDate.setDate(new Date().getDate() + 1);

const insExpDate = new Date();
insExpDate.setDate(new Date().getDate() + 3);

const arrivalDate = new Date();
arrivalDate.setDate(new Date().getDate() + 2);

const initialState: State = environment.environment === EnvironmentEnum.LOCAL ?
  {
    order: {
      seats: 6,
      priceType: 1,
      seatMinPrice: 1000,
      eft: 151,
      originAirport: {
        address: null,
        airportGroup: null,
        name: 'Hollywood Intl',
        code: 'KFLL'
      },
      originFbo: {
        name: 'SunJet Fueling Services',
        id: 9829,
        phoneNumber: null,
        address: {
          city: 'Fort Lauderdale',
          state: 'FLORIDA',
          country: 'UNITED STATES'
        }
      },
      destinationAirport: {
        address: null,
        airportGroup: null,
        name: 'Hollywood Intl',
        code: 'KTEB'
      },
      destinationFbo: {
        name: 'NATIONAL JETS INC.',
        id: 570,
        phoneNumber: null,
        address: {
          country: 'UNITED STATES',
          state: 'FLORIDA',
          city: 'FORT LAUDERDALE'
        }
      },
      departureDate: depDate,
      aircraft: {
        aircraftId: 74,
        aircraftModel: {
          name: 'Citation X'
        },
        marketableSeatsCount: 8,
        tailNumber: 'N125TH',
        insuranceExpirationDate: insExpDate,
        insuranceApproved: true,
        deleted: false,
        completed: false
      },
      externalId: null,
      charterPrice: 1000,
      contractType: models.ContractType.CHARTER,
      flexibility: 0,
      expirationOffset: models.ExpirationOffsetEnum.T3,
      arrivalDate: arrivalDate,
      flightRate: null,
      landingFee: null
    },
    orderIsSubmitting: false,
    orderIsSubmitted: null,
    orderFailReason: '',
    orderOriginAirport: null,
    orderOriginAirportIsLoaded: null,
    orderOriginAirportIsLoading: false,
    orderPriceDetails: {
      pricingStrategyId: 3,
      price: 1130,
      creditCardFee: 50,
      fetTax: 75,
      segmentFee: 4.2,
      operatorShare: 750,
      jetsmarterShare: 250,
      internal: true,
      seatsCount: 8,
      percentageOfSalesPerSeat: 25,
      basePrice: 1000,
      type: 1,
      permitted: null,
    },
    orderPriceDetailsIsLoaded: true,
    orderPriceDetailsIsLoading: false,
    orderIsSet: true,
    contractType: models.ContractType.CHARTER,
    highPriceIsConfirmed: false,
    lowPriceIsConfirmed: false
  }
  : {
    order: null,
    orderIsSubmitting: false,
    orderIsSubmitted: null,
    orderFailReason: '',
    orderOriginAirport: null,
    orderOriginAirportIsLoaded: null,
    orderOriginAirportIsLoading: false,
    orderPriceDetails: null,
    orderPriceDetailsIsLoaded: false,
    orderPriceDetailsIsLoading: false,
    orderIsSet: false,
    contractType: null,
    highPriceIsConfirmed: false,
    lowPriceIsConfirmed: false
  };

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.RESET: {
      return initialState;
    }

    case actions.SET_ORDER: {
      return Object.assign({}, state, {
        order: action.payload,
        orderIsSet: true
      });
    }

    case actions.SUBMIT_ORDER: {
      return Object.assign({}, state, {
        orderIsSubmitting: true,
        orderIsSubmitted: null
      });
    }

    case actions.SUBMIT_ORDER_FAILURE: {
      let payload;
      if (action.payload) { payload = action.payload; }

      return Object.assign({}, state, {
        order: null,
        orderIsSubmitting: false,
        orderIsSubmitted: false,
        orderFailReason: payload ? payload : '',
        lowPriceIsConfirmed: false,
        highPriceIsConfirmed: false
      });
    }

    case actions.SUBMIT_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        order: null,
        orderIsSubmitting: false,
        orderIsSubmitted: true,
        lowPriceIsConfirmed: false,
        highPriceIsConfirmed: false
      });
    }

    case actions.LOAD_ORDER_PRICE_DETAILS: {
      return {
        ...state,
        orderPriceDetailsIsLoaded: false,
        orderPriceDetailsIsLoading: true
      };
    }

    case actions.LOAD_ORDER_PRICE_DETAILS_SUCCESS: {
      return {
        ...state,
        orderPriceDetails: _.cloneDeep(action.payload),
        orderPriceDetailsIsLoaded: true,
        orderPriceDetailsIsLoading: false
      };
    }

    case actions.LOAD_ORDER_PRICE_DETAILS_FAILURE: {
      return {
        ...state,
        orderPriceDetails: new models.PriceDetail(),
        orderPriceDetailsIsLoaded: true,
        orderPriceDetailsIsLoading: false
      };
    }

    case actions.SET_CONTRACT_TYPE: {
      return {
        ...state,
        contractType: action.payload
      };
    }

    case actions.CONFIRM_HIGH_PRICE: {
      return {
        ...state,
        highPriceIsConfirmed: true
      };
    }

    case actions.CONFIRM_LOW_PRICE: {
      return {
        ...state,
        lowPriceIsConfirmed: true
      };
    }

    default: {
      return state;
    }
  }
}

export const getOrder = (state: State) => state.order;
export const getOrderOriginAirport = (state: State) => state.orderOriginAirport;
export const getOrderOriginAirportIsLoaded = (state: State) => state.orderOriginAirportIsLoaded;
export const getOrderOriginAirportIsLoading = (state: State) => state.orderOriginAirportIsLoading;
export const getOrderIsSubmitting = (state: State) => state.orderIsSubmitting;
export const getOrderIsSubmitted = (state: State) => state.orderIsSubmitted;
export const getOrderPriceDetails = (state: State) => state.orderPriceDetails;
export const getOrderPriceDetailsIsLoaded = (state: State) => state.orderPriceDetailsIsLoaded;
export const getOrderPriceDetailsIsLoading = (state: State) => state.orderPriceDetailsIsLoading;
export const getContractType = (state: State) => state.contractType;
export const getLowPriceConfirmed = (state: State) => state.lowPriceIsConfirmed;
export const getHighPriceConfirmed = (state: State) => state.highPriceIsConfirmed;
