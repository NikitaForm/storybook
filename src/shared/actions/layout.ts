import { Action } from '@ngrx/store';

import * as models from '../models';

export const actionTypes = {
  OPEN_SIDE_NAV: '[Shared.Layout] Open Sidenav',
  CLOSE_SIDE_NAV: '[Shared.Layout] Close Sidenav',

  ACTIVATE_APP_VIEW: '[Shared.Layout] Activate AppView',
  DEACTIVATE_APP_VIEW: '[Shared.Layout] Deactivate AppView',

  ACTIVATE_FULL_HEIGHT_VIEW: '[Shared.Layout] Activate FullHeightView',
  DEACTIVATE_FULL_HEIGHT_VIEW: '[Shared.Layout] Deactivate FullHeightView',

  SHOW_ERROR: '[Shared.Layout] Show Error',

  SHOW_SPINNER: '[Shared.Layout] Show Spinner',
  HIDE_SPINNER: '[Shared.Layout] Hide Spinner',

  SET_LAYOUT: '[Shared.Layout] Set Layout',

  SET_MENU_PIN: '[Shared.Layout] Set Menu Pin',

  SET_SEVER_ENV: '[Shared.Layout] Set Server Environment',

  SET_IS_FULL_WIDTH: '[Shared.Layout] Set Is Full Width'
};

export class OpenSideNavAction implements Action {
  readonly type = actionTypes.OPEN_SIDE_NAV;
}

export class CloseSideNavAction implements Action {
  readonly type = actionTypes.CLOSE_SIDE_NAV;
}

export class ActivateAppViewAction implements Action {
  readonly type = actionTypes.ACTIVATE_APP_VIEW;
}

export class ActivateFullHeightViewAction implements Action {
  readonly type = actionTypes.ACTIVATE_FULL_HEIGHT_VIEW;
}

export class DeactivateFullHeightViewAction implements Action {
  readonly type = actionTypes.DEACTIVATE_FULL_HEIGHT_VIEW;
}

export class DeactivateAppViewAction implements Action {
  readonly type = actionTypes.DEACTIVATE_APP_VIEW;
}

export class ShowErrorAction implements Action {
  readonly type = actionTypes.SHOW_ERROR;
  constructor(public payload?: string) {}
}

export class ShowSpinnerAction implements Action {
  readonly type = actionTypes.SHOW_SPINNER;
}

export class HideSpinnerAction implements Action {
  readonly type = actionTypes.HIDE_SPINNER;
}

export class SetLayoutAction implements Action {
  readonly type = actionTypes.SET_LAYOUT;

  constructor(public payload: models.LayoutType) {
  }
}

export class SetMenuPinAction implements Action {
  readonly type = actionTypes.SET_MENU_PIN;

  constructor(public payload: models.MenuPin) {
  }
}

export class SetIsFullWidthAction implements Action {
  readonly type = actionTypes.SET_IS_FULL_WIDTH;

  constructor(public payload: boolean) {
  }
}

export class SetServerEnvironmentAction implements Action {
  readonly type = actionTypes.SET_SEVER_ENV;

  constructor(public payload: string) {
  }
}

export type Actions =
  OpenSideNavAction
  | CloseSideNavAction

  | ActivateAppViewAction
  | DeactivateAppViewAction

  | ActivateFullHeightViewAction
  | DeactivateFullHeightViewAction

  | ShowErrorAction

  | ShowSpinnerAction
  | HideSpinnerAction

  | SetLayoutAction
  | SetMenuPinAction

  | SetServerEnvironmentAction

  | SetIsFullWidthAction;
