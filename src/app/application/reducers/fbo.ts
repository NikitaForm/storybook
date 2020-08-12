import * as actions from '../actions/fbo';
import * as models from '../../domain/models';
import * as _ from 'lodash';

export interface State {
  fboMap: Map<string, Array<models.Fbo>>;
  loadingOriginFbo: boolean;
  loadingDestinationFbo: boolean;
  validatingOriginAirport: boolean;
  validatingDestinationAirport: boolean;
  // isLoaded: boolean;
  // isLoading: boolean;
}

const initialState: State = {
  fboMap: new Map<string, Array<models.Fbo>>(),
  loadingOriginFbo: false,
  loadingDestinationFbo: false,
  validatingOriginAirport: false,
  validatingDestinationAirport: false
  // isLoaded: false,
  // isLoading: false,
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    // case actions.LOAD_FBO: {
    //   return Object.assign({}, state, {
    //     loading: true
    //   });
    // }

    case actions.INVALID_AIRPORT_INPUT: {
      return Object.assign({}, state, {
        fboMap: _.cloneDeep(state.fboMap)
      });
    }

    case actions.VALIDATE_AIRPORT: {
      const controlName = action.payload;

      if (controlName === 'origin') { return Object.assign({}, state, { validatingOriginAirport: true }); }
      if (controlName === 'destination') { return Object.assign({}, state, { validatingDestinationAirport: true }); }

      return state;
    }

    case actions.VALIDATE_AIRPORT_FAIL:
    case actions.VALIDATE_AIRPORT_SUCCESS: {
      const controlName = action.payload;

      if (controlName === 'origin') { return Object.assign({}, state, { validatingOriginAirport: false }); }
      if (controlName === 'destination') { return Object.assign({}, state, { validatingDestinationAirport: false }); }

      return state;
    }

    case actions.LOAD_FBO: {
      const payload: actions.LoadFboPayload = action.payload;

      if (payload.target === 'origin') {
        return Object.assign({}, state, {
          loadingOriginFbo: true
        });
      } else {
        return Object.assign({}, state, {
          loadingDestinationFbo: true
        });
      }
    }

    case actions.LOAD_FBO_FAILURE: {
      const payload: actions.LoadFboFailurePayload = action.payload;

      const map = _.cloneDeep(state.fboMap);
      if (map.get(payload.airportCode) !== undefined) {
        map.delete(payload.airportCode);
      }

      return Object.assign({}, state, {
        fboMap: map,
        loadingOriginFbo : false,
        loadingDestinationFbo : false
      });
    }

    case actions.LOAD_FBO_SUCCESS: {
      const payload: actions.LoadFboSuccessPayload = action.payload;

      const map = _.cloneDeep(state.fboMap);
      map.set(payload.airportCode, payload.fboList);

      return Object.assign({}, state, {
        fboMap: map,
        loadingOriginFbo : false,
        loadingDestinationFbo : false
      });
    }

    default: {
      return state;
    }
  }
}

export const getFboMap = (state: State) => state.fboMap;
export const getLoadingOriginFbo = (state: State) => state.loadingOriginFbo;
export const getLoadingDestinationFbo = (state: State) => state.loadingDestinationFbo;
export const getValidatingOriginAirport = (state: State) => state.validatingOriginAirport;
export const getValidatingDestinationAirport = (state: State) => state.validatingDestinationAirport;
