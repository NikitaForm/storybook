import * as actions from '../actions/airport';
import * as models from '../../domain/models';

export interface State {
  airports: Map<string, models.Airport>;
  isLoaded: boolean;
  isLoading: boolean;
}

const initialState: State = {
  airports: new Map<string, models.Airport>(),
  isLoaded: false,
  isLoading: false
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD_AIRPORT: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case actions.LOAD_AIRPORT_FAILURE: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false
      });
    }

    case actions.LOAD_AIRPORT_SUCCESS: {
      const payload: models.Airport = action.payload;

      return {
        airports: Object.assign({}, state.airports, {
          [payload.code]: payload
        }),
        isLoaded: true,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}

export const getAirports = (state: State) => state.airports;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsLoaded = (state: State) => state.isLoaded;
