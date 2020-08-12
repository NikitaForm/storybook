import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import * as reducers from '../../reducers';
import * as layoutActions from '../../../shared/actions/layout';

import { take } from 'rxjs/operators';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnDestroy, AfterViewInit {
  constructor(
    private store$: Store<any>,
    private route: ActivatedRoute) {
    this.store$.dispatch(new layoutActions.SetIsFullWidthAction(true));
  }

  ngAfterViewInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['t']) {
        switch (params['t']) {
          case 'p':
            this.moveTo('publishFlight');
            break;
          case 'f':
            this.moveTo('fulfillFlight');
            break;
          case 's':
            this.moveTo('serviceClasses');
            break;
          default:
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.store$.dispatch(new layoutActions.SetIsFullWidthAction(false));
  }

  moveTo(id: string): void {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
