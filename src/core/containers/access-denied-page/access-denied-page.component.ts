import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

import * as layoutActions from '../../../shared/actions/layout';

@Component({
  selector: 'access-denied-page',
  templateUrl: './access-denied-page.component.html'
})
export class AccessDeniedPageComponent implements OnDestroy {
  constructor(private store: Store<any>) {
    this.store.dispatch(new layoutActions.ActivateFullHeightViewAction());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new layoutActions.DeactivateFullHeightViewAction());
  }
}
