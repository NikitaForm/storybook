import {Action} from '@ngrx/store';
import * as models from '../../domain/models';

export const LOAD_AIRCRAFT = '[Publish Flights Aircraft] Load Aircraft';
export const LOAD_AIRCRAFT_SUCCESS = '[Publish Flights Aircraft] Load Aircraft Success';
export const LOAD_AIRCRAFT_FAIL = '[Publish Flights Aircraft] Load Aircraft Fail';
export const NO_ACTION = '[Publish Flights Aircraft] No Action';

export class NoAction implements Action {
  readonly type = NO_ACTION;
}

export class LoadAircraftAction implements Action {
  readonly type = LOAD_AIRCRAFT;
}

export class LoadAircraftSuccessAction implements Action {
  readonly type = LOAD_AIRCRAFT_SUCCESS;

  constructor(public payload: Array<models.Aircraft>) {
  }
}

export class LoadAircraftFailAction implements Action {
  readonly type = LOAD_AIRCRAFT_FAIL;
}

export type Actions =
  LoadAircraftAction
  | LoadAircraftSuccessAction
  | LoadAircraftFailAction
  | NoAction;
