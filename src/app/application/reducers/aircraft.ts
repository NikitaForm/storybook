import * as actions from '../actions/aircraft';
import * as models from '../../domain/models';

export interface State {
  aircraftList: Array<models.Aircraft>;
  isLoaded: boolean;
  isLoading: boolean;
}

const initialState: State = {
  aircraftList: Array<models.Aircraft>(),
  isLoaded: false,
  isLoading: false
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case actions.LOAD_AIRCRAFT: {
      return {
        ...state,
        isLoaded: false,
        isLoading: true
      };
    }

    case actions.LOAD_AIRCRAFT_FAIL: {
      return {
        ...state,
        isLoaded: true,
        isLoading: false
      };
    }
    case actions.LOAD_AIRCRAFT_SUCCESS: {

      return Object.assign({}, state, {
        aircraftList: action.payload,
        isLoaded: true,
        isLoading: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getAircraftList = (state: State) => state.aircraftList;
export const getIsLoading = (state: State) => state.isLoading;
export const getIsLoaded = (state: State) => state.isLoaded;
