import { Action } from '@ngrx/store';

export const actionTypes = {
  SET_BROWSER_SUPPORT: '[System] Set Browser Support',
  SET_DEBUG: '[System] Set Debug'
};

export class SetBrowserSupport implements Action {
  type = actionTypes.SET_BROWSER_SUPPORT;

  constructor(public payload: boolean) {
  }
}

export class SetDebugAction implements Action {
  type = actionTypes.SET_DEBUG;

  constructor(public payload: boolean) {
  }
}

export type Actions =
  SetBrowserSupport
  | SetDebugAction;
