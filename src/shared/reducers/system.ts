import * as actions from '../actions/system';
import { Action } from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  browserSupported: boolean;
  isDebug: boolean;
  version: string;
}

const initialState: State = {
  browserSupported: false,
  isDebug: false,
  version: environment.version
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.actionTypes.SET_BROWSER_SUPPORT:
      return {...state, browserSupported: action.payload};

    case actions.actionTypes.SET_DEBUG:
      return {...state, isDebug: action.payload};

    default:
      return state;
  }
}

export const getBrowserSupported = (state: State) => state.browserSupported;
export const getIsDebug = (state: State) => state.isDebug;
export const getVersion = (state: State) => state.version;
