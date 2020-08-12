import {createSelector} from 'reselect';
import { ActionReducer, ActionReducerMap, combineReducers, compose } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromLayout from '../../shared/reducers/layout';
import * as fromSystem from '../../shared/reducers/system';
import * as fromUser from './user';

export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState;
  system: fromSystem.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
  system: fromSystem.reducer,
  user: fromUser.reducer
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any): State {
  return productionReducer(state, action);
}

/**
 * Layout Reducers
 */
export const getLayoutState = (state: any) => state.core.layout;
export const getLayoutIsAppView = createSelector(getLayoutState, fromLayout.getIsAppView);
export const getLayoutIsFullHeightView = createSelector(getLayoutState, fromLayout.getIsFullHeightView);
export const getLayoutIsFullWidthView = createSelector(getLayoutState, fromLayout.getIsFullWidthView);
export const getLayoutIsLoading = createSelector(getLayoutState, fromLayout.getIsLoading);
export const getLayoutType = createSelector(getLayoutState, fromLayout.getLayoutType);

/**
 * System Reducers
 */
export const getSystemState = (state: any) => state.core.system;
export const getBrowserSupported = createSelector(getSystemState, fromSystem.getBrowserSupported);
export const getSystemIsDebug = createSelector(getSystemState, fromSystem.getIsDebug);
export const getSystemVersion = createSelector(getSystemState, fromSystem.getVersion);

/**
 * User Reducers
 */
export const getUserState = (state: any) => state.core.user;
export const getUserUser = createSelector(getUserState, fromUser.getUser);
export const getUserOrgLegalName = createSelector(getUserState, fromUser.getUserOrgLegalName);
export const getUserUserPermissions = createSelector(getUserState, fromUser.getUserPermissions);
export const getUserUserPermissionsFulfillFlights = createSelector(getUserState, fromUser.getUserPermissionsFulfillFlights);
export const getUserUserPermissionsPublishedFlights = createSelector(getUserState, fromUser.getUserPermissionsPublishedFlights);

/**
 * Route Reducers
 */
export const getRouterState = (state: any) => state.core.router;
export const getRouterPath = createSelector(getRouterState, (state: fromRouter.RouterReducerState) => state.state && state.state.url);
