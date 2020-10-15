import { Action } from '@ngrx/store';
import * as models from '../../domain/models';

export const LOAD = '[Offers.Aircraft] Load';
export const LOAD_SUCCESS = '[Offers.Aircraft] Load Success';
export const LOAD_FAIL = '[Offers.Aircraft] Load Fail';

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Array<models.Aircraft>) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;
}

export type Actions = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
