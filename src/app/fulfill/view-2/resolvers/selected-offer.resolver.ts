import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as actions from '../../application/actions/offer-list';
import * as reducers from '../../application/reducers';
import { filter, first, skip, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class SelectedOfferResolver implements Resolve<boolean> {
  constructor(private store: Store<any>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new actions.GetPurchaseOfferAction(route.params.id));
    return this.store.pipe(
      select(reducers.getSelectedOfferIsLoading),
      skip(1),
      filter(isLoading => {
        return isLoading === false;
      }),
      tap(async () => {
        if (await this.store.pipe(select(reducers.getSelectedOfferIsLoaded), first()).toPromise()) {
          this.store.dispatch(new actions.SetAcceptOfferDialogVisibleAction(true));
        }
      }),
      take(1)
    );
  }
}
