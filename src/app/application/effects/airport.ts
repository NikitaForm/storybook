import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class AirportEffects {


  constructor(private store$: Store<any>,
    private actions$: Actions) {
  }
}
