import { createSelector } from 'reselect';
import { Injectable } from '@angular/core';
import { ActionReducer, ActionReducerMap, combineReducers, compose, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
// import { storeFreeze } from 'ngrx-store-freeze';
import { Params, RouterStateSnapshot } from '@angular/router';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';

import * as fromCore from '../core/reducers';
import * as fromPublishFlights from '../app/application/reducers';
import * as fromFulfillFlights from '../app/fulfill/application/reducers';

import { EnvironmentEnum } from '../environments/environment.interface';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export interface State {
  core: fromCore.State;
  publish: fromPublishFlights.State;
  fulfill: fromFulfillFlights.State;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  publish: fromPublishFlights.reducer,
  fulfill: fromFulfillFlights.reducer
};

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

// export function reducer(state: any, action: any): State {
//   if (environment.environment === EnvironmentEnum.PRODUCTION) {
//     return productionReducer(state, action);
//   } else {
//     return developmentReducer(state, action);
//   }
// }

export const metaReducers: Array<MetaReducer<State>> = environment.environment !== EnvironmentEnum.PRODUCTION ? [] : [];

// export const getShuttleState = (state: State) => state.shuttle;

// export const getCollectionLoaded = createSelector(getCollectionState, fromCollection.getLoaded);
// export const getCollectionLoading = createSelector(getCollectionState, fromCollection.getLoading);
// export const getCollectionBookIds = createSelector(getCollectionState, fromCollection.getIds);
//
// export const getBookCollection = createSelector(getBookEntities, getCollectionBookIds, (entities, ids) => {
//   return ids.map(id => entities[id]);
// });
//
// export const isSelectedBookInCollection = createSelector(getCollectionBookIds, getSelectedBookId, (ids, selected) => {
//   return ids.indexOf(selected) > -1;
// });
