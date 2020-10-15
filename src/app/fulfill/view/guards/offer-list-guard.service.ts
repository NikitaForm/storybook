import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as coreModels from '../../../../core/models';
import * as coreReducers from '../../../../core/reducers';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OfferListGuard implements CanActivate {

  constructor(public router: Router, private store: Store<any>) { }

  canActivate(): Observable<boolean> {
    return this.store.select(coreReducers.getUserUserPermissions)
      .pipe(map((permissions) => {
        if (permissions as coreModels.ViewPermissions) {
          if (permissions.fulfillFlights === true) {
            return true;
          }
          if (permissions.publishedFlights === true) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/dashboard']);
          }

          return false;
        }
      }));
  }
}
