
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as actions from '../../application/actions/order-collection';
import * as flightActions from '../../application/actions/flight-details';
import * as reducers from '../../application/reducers';
import * as sharedTypes from '../../../shared/types';
import * as models from '../../domain/models';
import * as layoutActions from '../../../shared/actions/layout';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { take, skip, filter } from 'rxjs/operators';
declare var moment: any;

@Component({
  selector: `order-list-page-v3`,
  templateUrl: `./order-list-page.component.html`,
  styleUrls: ['./order-list-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListPageV3Component implements OnInit, OnDestroy {

  currentPage$: Observable<number>;
  isLoading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  items$: Observable<Array<models.Order>>;
  itemsPerPage$: Observable<number>;
  itemsTotalCount$: Observable<number>;
  filterOptions$: Observable<models.FilterOptions>;
  datePickerOptions: any;
  filterValues$: Observable<models.FilterOptions>;
  flightDetailsDialogVisible$: Observable<boolean>;

  // Autocomplete data:
  intIdsData$: Observable<Array<string>>;
  tailNumbersData$: Observable<Array<string>>;

  private filterChangeSubscription$: Subscription;
  private loadingSubscription$: Subscription;

  constructor(
    // private route: ActivatedRoute,
    // private location: Location,
    private store: Store<any>,
    // private router: Router,
    private datePipe: DatePipe) {
    this.currentPage$ = this.store.pipe(select(reducers.getOrderCollectionCurrentPage));
    this.isLoading$ = this.store.pipe(select(reducers.getOrderCollectionIsLoading));
    this.loaded$ = this.store.pipe(select(reducers.getOrderCollectionIsLoaded));
    this.items$ = this.store.pipe(select(reducers.getOrderCollectionItems));
    this.itemsPerPage$ = this.store.pipe(select(reducers.getOrderCollectionItemsPerPage));
    this.filterOptions$ = this.store.pipe(select(reducers.getFilterOptions));
    this.itemsTotalCount$ = this.store.pipe(select(reducers.getOrderCollectionItemsTotalCount));
    this.flightDetailsDialogVisible$ = this.store.pipe(select(reducers.getOrderCollectionFlightDetailsSidepanelVisible));

    this.tailNumbersData$ = this.store.pipe(select(reducers.getTailNumberAutocompleteOptions));
    this.intIdsData$ = this.store.pipe(select(reducers.getIntIdAutocompleteOptions));
    this.filterValues$ = this.store.pipe(select(reducers.getFilterOptions));
  }

  ngOnInit(): void {
    this.filterChangeSubscription$ = combineLatest(this.filterOptions$, this.currentPage$)
      .pipe(skip(1))
      .subscribe(([filterOptions, currentPage]) => {
        this.store.dispatch(new actions.LoadAction());
      });

    this.loadingSubscription$ = combineLatest(this.isLoading$, this.flightDetailsDialogVisible$)
      .pipe(
        filter(([isLoading, isDialogVisible]) => !isDialogVisible)
      ).subscribe(
        ([isLoading, isDialogVisible]) => {
          this.store.dispatch(isLoading ? new layoutActions.ShowSpinnerAction() :
            new layoutActions.HideSpinnerAction()
          );
        }
      );
  }

  ngOnDestroy(): void {
    if (this.filterChangeSubscription$) {
      this.filterChangeSubscription$.unsubscribe();
    }
    if (this.loadingSubscription$) {
      this.loadingSubscription$.unsubscribe();
    }
  }

  loadAutocompleteOptions(event): void {
    if (!event.filterValue) { return null; }

    const loadPayload = new actions.LoadAutocompleteOptionsPayload();
    loadPayload.prefixString = event.filterValue;
    loadPayload.searchField = event.filterName;
    this.store.dispatch(new actions.LoadAutocompleteOptionsAction(loadPayload));
  }

  select(o: models.Order): void {
    this.store.dispatch(new flightActions.LoadFlightDetailsAction(o.legacyLegId));
    this.openFlightDetailsDialog();

    // const url = this
    //   .router
    //   .createUrlTree([`../${o.legacyLegId}`], { relativeTo: this.route })
    //   .toString();
    // this.location.replaceState(url);
  }

  filterValuesChanged(filterOptions: models.FilterOptions): void {
    this.store.dispatch(new actions.SetFilterOptionsAction(filterOptions));
    this.store.dispatch(new actions.ChangePageAction(1));
  }

  pageChanged(event: sharedTypes.PageChangedEvent): void {
    this.store.dispatch(new actions.ChangePageAction(event.page));
  }

  onCloseFlightDetailsDialog(): void {
    this.closeFlightDetailsDialog();
  }

  private openFlightDetailsDialog(): void {
    this.store.dispatch(new actions.SetFlightDetailsSidepanelStatusAction(true));
  }

  private closeFlightDetailsDialog(): void {
    this.store.dispatch(new actions.SetFlightDetailsSidepanelStatusAction(false));

    // const url = this
    //   .router
    //   .createUrlTree([`../bookings`], { relativeTo: this.route })
    //   .toString();
    // this.location.replaceState(url);
  }
}
