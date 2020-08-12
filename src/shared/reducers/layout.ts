import * as actions from '../actions/layout';
import * as models from '../models';

export interface State {
  isAppView: boolean;
  isError: boolean;
  errorText: string;
  isFullHeightView: boolean;
  isFullWidthView: boolean;
  isLoading: boolean;
  layoutType: models.LayoutType;
  serverEnvironment: string;
  menuPin: models.MenuPin;
}

const initialState: State = {
  isAppView: false,
  isError: false,
  errorText: null,
  isFullHeightView: false,
  isFullWidthView: false,
  isLoading: false,
  layoutType: models.LayoutType.Default,
  serverEnvironment: 'prod',
  menuPin: 0
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.actionTypes.CLOSE_SIDE_NAV:
      return {...state, isAppView: false};

    case actions.actionTypes.OPEN_SIDE_NAV:
      return {...state};

    case actions.actionTypes.ACTIVATE_APP_VIEW:
      return {...state, isAppView: true};

    case actions.actionTypes.ACTIVATE_FULL_HEIGHT_VIEW:
      return {...state, isFullHeightView: true};

    case actions.actionTypes.DEACTIVATE_APP_VIEW:
      return {...state, isAppView: false};

    case actions.actionTypes.DEACTIVATE_FULL_HEIGHT_VIEW:
      return {...state, isFullHeightView: false};

    case actions.actionTypes.SHOW_ERROR:
      const showErrorAction = action as actions.ShowErrorAction;
      return {...state, isError: true, errorText: showErrorAction.payload};

    case actions.actionTypes.SHOW_SPINNER:
      return {...state, isLoading: true};

    case actions.actionTypes.HIDE_SPINNER:
      return {...state, isLoading: false};

    case actions.actionTypes.SET_IS_FULL_WIDTH: {
      const p = (action as actions.SetIsFullWidthAction).payload;

      return {...state, isFullWidthView: p};
    }

    case actions.actionTypes.SET_LAYOUT: {
      const a1 = action as actions.SetLayoutAction;

      return {...state, layoutType: a1.payload};
    }

    case actions.actionTypes.SET_MENU_PIN: {
      const a1 = action as actions.SetMenuPinAction;

      return {...state, menuPin: a1.payload};
    }

    case actions.actionTypes.SET_SEVER_ENV: {
      const a1 = action as actions.SetServerEnvironmentAction;

      return {...state, serverEnvironment: a1.payload};
    }

    default:
      return state;
  }
}

export const getIsAppView = (state: State) => state.isAppView;
export const getIsFullHeightView = (state: State) => state.isFullHeightView;
export const getIsFullWidthView = (state: State) => state.isFullWidthView;
export const getIsLoading = (state: State) => state.isLoading;
export const getLayoutType = (state: State) => state.layoutType;
export const getServerEnvironment = (state: State) => state.serverEnvironment;
export const getMenuPin = (state: State) => state.menuPin;
