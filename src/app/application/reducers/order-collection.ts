import * as actions from '../actions/order-collection';
import * as models from '../../domain/models';

export interface State {
  currentPage: number;
  isLoaded: boolean;
  isLoading: boolean;
  items: any;
  itemsPerPage: number;
  itemsTotalCount: number;
  filterOptions: models.FilterOptions;
  autocompleteOptions: models.AutocompleteOptions;
  flightDetailsSidepanelVisible: boolean;
}

const initialState: State = {
  currentPage: 1,
  isLoaded: false,
  isLoading: false,
  items: [
    // {
    //   aircraft: {
    //     insuranceExpirationDate: null,
    //     insuranceApproved: false,
    //     tailNumber: 'N173KR',
    //     aircraftModel: {
    //       name: 'Learjet 60'
    //     }
    //   },
    //   contractType: 0,
    //   status: 2,
    //   legacyLegId: 381610,
    //   operatorPrice: {
    //     percentageOfSale: 0,
    //     basePrice: 4444
    //   },
    //   seatsCount: 6,
    //   departureTime: new Date('2020-08-06T21:12:00.000Z'),
    //   createdDepartureTime: new Date('2020-08-05T21:00:00.000Z'),
    //   originFbo: {
    //     id: 12848,
    //     name: 'Customs Hangar 1'
    //   },
    //   destinationFbo: {
    //     id: 9827,
    //     name: 'JetScape Services'
    //   },
    //   eft: null,
    //   externalId: 'dd',
    //   paxCount: 0,
    //   route: {
    //     originAirport: {
    //       code: 'KTEB'
    //     },
    //     destinationAirport: {
    //       code: 'KFLL'
    //     },
    //     originCity: {
    //       name: null,
    //       state: null,
    //       country: null
    //     }
    //   }
    // },
    // {
    //   aircraft: {
    //     insuranceExpirationDate: null,
    //     insuranceApproved: false,
    //     tailNumber: 'N178BR',
    //     aircraftModel: {
    //       name: 'Citation Excel'
    //     }
    //   },
    //   contractType: 1,
    //   status: 1,
    //   legacyLegId: 381611,
    //   operatorPrice: {
    //     percentageOfSale: 0,
    //     basePrice: 555
    //   },
    //   seatsCount: 2,
    //   departureTime: new Date('2020-09-06T21:00:00.000Z'),
    //   createdDepartureTime: new Date('2020-08-06T21:00:00.000Z'),
    //   originFbo: {
    //     id: 9861,
    //     name: 'Signature Flight Support South'
    //   },
    //   destinationFbo: {
    //     id: 9827,
    //     name: 'JetScape Services'
    //   },
    //   eft: null,
    //   externalId: 'adf',
    //   paxCount: 0,
    //   route: {
    //     originAirport: {
    //       code: 'KTEB'
    //     },
    //     destinationAirport: {
    //       code: 'KFLL'
    //     },
    //     originCity: {
    //       name: null,
    //       state: null,
    //       country: null
    //     }
    //   }
    // },
    {
      aircraft: {
        insuranceExpirationDate: null,
        insuranceApproved: false,
        tailNumber: 'N233XL',
        aircraftModel: {
          name: 'Citation Excel'
        }
      },
      contractType: 0,
      status: 1,
      legacyLegId: 381613,
      operatorPrice: {
        percentageOfSale: 0,
        basePrice: 4444
      },
      seatsCount: 6,
      departureTime: new Date('2020-08-07T21:00:00.000Z'),
      createdDepartureTime: new Date('2020-08-07T21:00:00.000Z'),
      originFbo: {
        id: 12848,
        name: 'Customs Hangar 1'
      },
      destinationFbo: {},
      eft: null,
      externalId: '44',
      paxCount: 0,
      route: {
        originAirport: {
          code: 'KTEB'
        },
        destinationAirport: {
          code: 'KFLL'
        },
        originCity: {
          name: null,
          state: null,
          country: null
        }
      },
      repositioningItinerary: {
        flexibility: 60,
      }
    },
    {
      aircraft: {
        insuranceExpirationDate: null,
        insuranceApproved: false,
        tailNumber: 'N1122K',
        aircraftModel: {
          name: 'Citation Excel'
        }
      },
      contractType: 0,
      status: 3,
      legacyLegId: 382193,
      operatorPrice: {
        percentageOfSale: 0,
        basePrice: 1234
      },
      seatsCount: 6,
      departureTime: new Date('2020-08-24T21:00:00.000Z'),
      createdDepartureTime: new Date('2020-08-24T21:00:00.000Z'),
      originFbo: {
        id: 9830,
        name: 'Banyan Air Service'
      },
      destinationFbo: {
        id: 12848,
        name: 'Customs Hangar 1'
      },
      eft: null,
      externalId: 'repo',
      paxCount: 0,
      route: {
        originAirport: {
          code: 'KFXE'
        },
        destinationAirport: {
          code: 'KTEB'
        },
        originCity: {
          name: null,
          state: null,
          country: null
        }
      },
      repositioningItinerary: {
        flexibility: 200,
        itinerary: [1, 2]
      }
    }
  ],
  itemsPerPage: 15,
  itemsTotalCount: 3,
  filterOptions: new models.FilterOptions(),
  autocompleteOptions: new models.AutocompleteOptions(),
  flightDetailsSidepanelVisible: false
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return Object.assign({}, state, {
        isLoading: true
      });
    }

    case actions.LOAD_SUCCESS: {
      const payload: actions.LoadSuccessPayload = action.payload;

      return Object.assign({}, state, {
        itemsTotalCount: payload.count,
        items: payload.data,
        isLoaded: true,
        isLoading: false
      });
    }

    case actions.LOAD_FAIL: {

      return Object.assign({}, state, {
        itemsTotalCount: 0,
        items: [],
        isLoaded: true,
        isLoading: false
      });
    }

    case actions.CHANGE_PAGE_ACTION: {

      return Object.assign({}, state , {
        currentPage : action.payload
      });
    }

    case actions.SET_FILTER_OPTIONS: {
      const payload = action.payload;

      return Object.assign({}, state , {
        filterOptions : Object.assign( {}, state.filterOptions, payload )
      });
    }

    case actions.LOAD_AUTOCOMPLETE_OPTIONS_SUCCESS: {
      const payload = action.payload;
      const searchField = payload.searchField === 'extId' ? 'intId' : payload.searchField;

      return Object.assign({}, state , {
        autocompleteOptions: Object.assign({}, state.autocompleteOptions, {
          [searchField] : payload.options
        })
      });
    }

    case actions.LOAD_AUTOCOMPLETE_OPTIONS_FAILURE: {
      const payload = action.payload;
      const searchField = payload.searchField;

      return Object.assign({}, state , {
        autocompleteOptions: Object.assign({}, state.autocompleteOptions, {
          [searchField] : []
        })
      });
    }

    case actions.SET_FLIGHT_DETAILS_SIDEPANEL_STATUS: {
      return Object.assign({}, state, {
        flightDetailsSidepanelVisible: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getCurrentPage = (state: State) => state.currentPage;
export const getIsLoaded = (state: State) => state.isLoaded;
export const getIsLoading = (state: State) => state.isLoading;
export const getItems = (state: State) => state.items;
export const getItemsPerPage = (state: State) => state.itemsPerPage;
export const getItemsTotalCount = (state: State) => state.itemsTotalCount;
export const getFilterOptions = (state: State) => state.filterOptions;
export const getAutocompleteOptions = (state: State) => state.autocompleteOptions;
export const getTailNumberAutocompleteOptions = (state: State) => state.autocompleteOptions.tailNumber;
export const getIntIdAutocompleteOptions = (state: State) => state.autocompleteOptions.intId;
export const getFlightDetailsSidepanelVisible = (state: State) => state.flightDetailsSidepanelVisible;
