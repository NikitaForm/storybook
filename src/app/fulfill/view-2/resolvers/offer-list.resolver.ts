import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as actions from '../../application/actions/offer-list';
import * as viewModels from '../view-models';
import * as reducers from '../../application/reducers';
import { filter, first } from 'rxjs/operators';

@Injectable()
export class OfferListResolver {
  constructor(private store$: Store<any>) {}

  async resolve(): Promise<boolean> {
    const isLoaded = await this.store$.pipe(
      select(reducers.getOfferListIsLoaded), first()).toPromise();

    if (isLoaded) {
      return true;
    }

    const itemsPerPage = await this.store$.pipe(select(reducers.getOfferListItemsPerPage), first()).toPromise();
    const criteria = new viewModels.OffersLookupCriteria();
    this.store$.dispatch(new actions.SearchAction(
      new actions.SearchPayload(criteria, 1, itemsPerPage))
    );

    await this.store$.pipe(select(reducers.getOfferListIsLoaded), filter(loaded => loaded === true), first()).toPromise();
    return true;
  }
}
