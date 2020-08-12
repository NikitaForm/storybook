import {Action} from '@ngrx/store';
import * as models from '../../domain/models';

export const LOAD = '[Publish Flights Shuttle Collection] Load';
export const LOAD_SUCCESS = '[Publish Flights Shuttle Collection] Load Success';
export const LOAD_FAIL = '[Publish Flights Shuttle Collection] Load Fail';
export const TOGGLE_SHOW_PAST = '[Publish Flights Shuttle Collection] Toggle show past';
export const SET_FILTER_OPTIONS = '[Publish Flights Shuttle Collection] Set filter options';
export const SET_DATE_FILTER_OPTIONS = '[Publish Flights Shuttle Collection] Set Date filter options';
export const LOAD_AUTOCOMPLETE_OPTIONS = '[Publish Flights Shuttle Collection] Load autocomplete options';
export const LOAD_AUTOCOMPLETE_OPTIONS_SUCCESS = '[Publish Flights Shuttle Collection] Load autocomplete options success';
export const LOAD_AUTOCOMPLETE_OPTIONS_FAILURE = '[Publish Flights Shuttle Collection] Load autocomplete options failure';
export const CHANGE_PAGE_ACTION = '[Publish Flights Shuttle Collection] Change page action';
export const SET_FLIGHT_DETAILS_SIDEPANEL_STATUS = '[Publish Flights Shuttle Collection] Set Flight Details Sidepanel Status';

export class LoadActionPayload {
  page: number;
  itemsPerPage: number;
  filterOptions: models.FilterOptions = new models.FilterOptions();
}

export class LoadAutocompleteOptionsPayload {
  prefixString: string;
  searchField: string;
}

export class LoadAutocompleteOptionsSuccessPayload {
  options: Array<string> = [];
  searchField: string;
}

export class LoadAutocompleteOptionsFailurePayload {
  searchField: string;
}

export class LoadSuccessPayload {

  data: Array<models.Order>;
  count: number;
}

// =======================ACTIONS=========================

export class LoadAction implements Action {
  readonly type = LOAD;

  // constructor(public payload: any) {
  // }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: LoadSuccessPayload) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;
}

export class LoadAutocompleteOptionsAction implements Action {
  readonly type = LOAD_AUTOCOMPLETE_OPTIONS;

  constructor(public payload: LoadAutocompleteOptionsPayload) {
  }
}

export class LoadAutocompleteOptionsFailureAction implements Action {
  readonly type = LOAD_AUTOCOMPLETE_OPTIONS_FAILURE;
  constructor(public payload: any) {}
}

export class LoadAutocompleteOptionsSuccessAction implements Action {
  readonly type = LOAD_AUTOCOMPLETE_OPTIONS_SUCCESS;

  constructor(public payload: LoadAutocompleteOptionsSuccessPayload) {
  }
}

export class SetFilterOptionsAction implements Action {
  readonly type = SET_FILTER_OPTIONS;
  constructor(public payload: models.FilterOptions) {}
}

export class ChangePageAction implements Action {
  readonly type = CHANGE_PAGE_ACTION;
  constructor(public payload: any) {}
}

export class SetFlightDetailsSidepanelStatusAction implements Action {
  readonly type = SET_FLIGHT_DETAILS_SIDEPANEL_STATUS;
  constructor(public payload: boolean) {}
}

export type Actions = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | SetFilterOptionsAction
  | ChangePageAction
  | LoadAutocompleteOptionsAction
  | LoadAutocompleteOptionsSuccessAction
  | LoadAutocompleteOptionsFailureAction
  | SetFlightDetailsSidepanelStatusAction;
