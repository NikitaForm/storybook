import {Action} from '@ngrx/store';
import * as models from '../../domain/models';

export const LOAD_AIRPORT = '[Publish Flights Airport] Load Airport';
export const LOAD_AIRPORT_SUCCESS = '[Publish Flights Airport] Load Airport Success';
export const LOAD_AIRPORT_FAILURE = '[Publish Flights Airport] Load Airport Failure';

export class LoadAirportAction implements Action {
  readonly type = LOAD_AIRPORT;

  constructor(public payload: string) {
  }
}

export class LoadAirportFailureAction implements Action {
  readonly type = LOAD_AIRPORT_FAILURE;
}

export class LoadAirportSuccessAction implements Action {
  readonly type = LOAD_AIRPORT_SUCCESS;

  constructor(public payload: models.Airport) {
  }
}

export type Actions =
  | LoadAirportAction
  | LoadAirportFailureAction
  | LoadAirportSuccessAction;
