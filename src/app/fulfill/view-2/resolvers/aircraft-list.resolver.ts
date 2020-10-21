import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as actions from '../../application/actions/aircraft';
import * as reducers from '../../application/reducers';

import { filter, first, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AircraftListResolver implements Resolve<boolean> {
  constructor(private store: Store<any>) {
  }

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(reducers.getAircraftListLoaded),
      withLatestFrom(this.store.pipe(select(reducers.getAircraftListLoading))),
      switchMap(([loaded, loading]) => {
        if (loaded) {
          return of(true);
        }

        if (loading === false) {
          this.store.dispatch(new actions.LoadAction());
        }

        return this.store
          .pipe(
            select(reducers.getAircraftListLoaded),
            filter(l1 => l1 === true)
          );
      }),
      first()
    );
  }
}
