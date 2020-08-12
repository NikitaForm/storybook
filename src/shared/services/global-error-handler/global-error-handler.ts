import { ErrorHandler, Injector } from '@angular/core';
import { ILogger } from './contracts';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import * as actions from '../../actions/layout';

export class GlobalErrorHandler extends ErrorHandler {
  constructor(
    private store$: Store<any>,
    private loggers: Array<ILogger>) {
    super();
  }

  handleError(error, dispatched = false): void {
    try {
      const originalError = this._findOriginalError(error);
      const context = this._findContext(error);

      if (dispatched === false) {
        this.store$.dispatch(new actions.ShowErrorAction());
      }

      for (const logger of this.loggers) {
        logger.error(error);
      }

      // super.handleError(error);
    } catch (err1) {
      // suppress all errors in logger
    }
  }

  _findContext(error: any): any {
    if (error) {
      return getDebugContext(error) ? getDebugContext(error) :
        this._findContext(getOriginalError(error));
    }

    return null;
  }

  _findOriginalError(error: Error): any {
    let e = getOriginalError(error);
    while (e && getOriginalError(e)) {
      e = getOriginalError(e);
    }

    return e;
  }
}

const ERROR_TYPE = 'ngType';
const ERROR_DEBUG_CONTEXT = 'ngDebugContext';
const ERROR_ORIGINAL_ERROR = 'ngOriginalError';

// const ERROR_LOGGER = 'ngErrorLogger';

function getDebugContext(error: Error): any {
  return (error as any)[ERROR_DEBUG_CONTEXT];
}

function getOriginalError(error: Error): Error {
  return (error as any)[ERROR_ORIGINAL_ERROR];
}
