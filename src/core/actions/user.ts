import {Action} from '@ngrx/store';
import * as models from '../models';

export const LOAD = '[Shared.User] Load';
export const LOAD_SUCCESS = '[Shared.User] Load Success';
export const SIGN_OUT = '[Shared.User] Sign Out';

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: models.User) {
  }
}

export class SignOutAction implements Action {
  readonly type = SIGN_OUT;
}

export type Actions =
  LoadAction
  | LoadSuccessAction
  | SignOutAction;
