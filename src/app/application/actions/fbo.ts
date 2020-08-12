import {Action} from '@ngrx/store';
import * as models from '../../domain/models';

export const LOAD_FBO = '[Publish Flights Aircraft] Load Fbo';
export const LOAD_FBO_FAILURE = '[Publish Flights Aircraft] Load Fbo Failure';
export const LOAD_FBO_SUCCESS = '[Publish Flights Aircraft] Load Fbo Success';
// export const LOAD_ORIGIN_FBO = '[Publish Flights Aircraft] Load origin Fbo';
// export const LOAD_DESTINATION_FBO = '[Publish Flights Aircraft] Load destination Fbo';
export const VALIDATE_AIRPORT = '[Publish Flights Aircraft] Validate airport';
export const VALIDATE_AIRPORT_SUCCESS = '[Publish Flights Aircraft] Validate airport success';
export const VALIDATE_AIRPORT_FAIL = '[Publish Flights Aircraft] Validate airport fail';
export const INVALID_AIRPORT_INPUT = '[Publish Flights Aircraft] Invalid airport input';

export class InvalidAirportInputAction implements Action {
  readonly type = INVALID_AIRPORT_INPUT;
}

export class LoadFboPayload {
  airportCode: string;
  target: string;
}

export class LoadFboAction implements Action {
  readonly type = LOAD_FBO;

  constructor(public payload: LoadFboPayload) {
  }
}

export class LoadFboFailurePayload {
  constructor(public airportCode: string) {
  }
}

export class LoadFboFailureAction implements Action {
  readonly type = LOAD_FBO_FAILURE;
  constructor(public payload: LoadFboFailurePayload) {
  }
}

export class LoadFboSuccessPayload {
  airportCode: string;
  fboList: Array<models.Fbo>;
  target: string;
}

export class LoadFboSuccessAction implements Action {
  readonly type = LOAD_FBO_SUCCESS;

  constructor(public payload: LoadFboSuccessPayload) {
  }
}
// export class LoadOriginFboAction implements Action {
//   readonly type = LOAD_ORIGIN_FBO;
// }

// export class LoadDestinationFboAction implements Action {
//   readonly type = LOAD_DESTINATION_FBO;
// }

export class ValidateAirportAction implements Action {
  readonly type = VALIDATE_AIRPORT;
  constructor(public payload: String) {}
}

export class ValidateAirportSuccessAction implements Action {
  readonly type = VALIDATE_AIRPORT_SUCCESS;
  constructor(public payload: String) {}
}

export class ValidateAirportFailAction implements Action {
  readonly type = VALIDATE_AIRPORT_FAIL;
  constructor(public payload: String) {}
}

export type Actions =
  LoadFboAction
  | LoadFboFailureAction
  | LoadFboSuccessAction
  // | LoadDestinationFboAction
  // | LoadOriginFboAction
  | ValidateAirportAction
  | ValidateAirportSuccessAction
  | ValidateAirportFailAction
  | InvalidAirportInputAction;
