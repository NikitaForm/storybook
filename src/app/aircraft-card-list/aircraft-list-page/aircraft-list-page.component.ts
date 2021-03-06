import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as actions from '../../application/actions/order-collection';
import * as sharedTypes from '../../../shared/types';
import * as models from '../../domain/models';
import { Subscription } from 'rxjs';
import { aircrafts } from '../aircrafts-data';
declare var moment: any;

@Component({
  selector: `aircraft-list-card-page`,
  templateUrl: `./aircraft-list-page.component.html`,
  styleUrls: ['./aircraft-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AircraftListCardPageComponent implements OnInit, OnDestroy {

  currentPage$: number;
  isLoading$: boolean;
  loaded$: boolean;
  items$: Array<models.Order>;
  itemsPerPage$: number;
  itemsTotalCount$: number;
  filterOptions$: models.FilterOptions;
  datePickerOptions: any;
  filterValues$: models.FilterOptions;
  aircraftDetailsDialogVisible: boolean;
  selectedAircraft;

  // Autocomplete data:
  intIdsData$: Array<string>;
  tailNumbersData$: Array<string>;

  private filterChangeSubscription$: Subscription;
  private loadingSubscription$: Subscription;

  aircrafts = aircrafts;
  viewMode = 'cardView';

  checked;

  constructor(
    // private route: ActivatedRoute,
    // private location: Location,
    // private store: Store<any>,
    // private router: Router,
    // private datePipe: DatePipe
  ) {
    // this.currentPage$ = this.store.pipe(select(reducers.getOrderCollectionCurrentPage));
    // this.isLoading$ = this.store.pipe(select(reducers.getOrderCollectionIsLoading));
    // this.loaded$ = this.store.pipe(select(reducers.getOrderCollectionIsLoaded));
    // this.items$ = this.store.pipe(select(reducers.getOrderCollectionItems));
    // this.itemsPerPage$ = this.store.pipe(select(reducers.getOrderCollectionItemsPerPage));
    // this.filterOptions$ = this.store.pipe(select(reducers.getFilterOptions));
    // this.itemsTotalCount$ = this.store.pipe(select(reducers.getOrderCollectionItemsTotalCount));
    this.aircraftDetailsDialogVisible = false;
    //
    // this.tailNumbersData$ = this.store.pipe(select(reducers.getTailNumberAutocompleteOptions));
    // this.intIdsData$ = this.store.pipe(select(reducers.getIntIdAutocompleteOptions));
    // this.filterValues$ = this.store.pipe(select(reducers.getFilterOptions));

    this.currentPage$ = 1;
    this.isLoading$ = false;
    this.loaded$ = true;
    this.items$ = [];
    this.itemsPerPage$ = 25;
    this.filterOptions$ = {} as any;
    this.itemsTotalCount$ = 300;
    this.aircraftDetailsDialogVisible = false;

    this.tailNumbersData$ = {} as any;
    this.intIdsData$ = {} as any;
    this.filterValues$ = {} as any;
  }

  ngOnInit(): void {
    // this.filterChangeSubscription$ = combineLatest(this.filterOptions$, this.currentPage$)
    //   .pipe(skip(1))
    //   .subscribe(([filterOptions, currentPage]) => {
    //     this.store.dispatch(new actions.LoadAction());
    //   });
    //
    // this.loadingSubscription$ = combineLatest(this.isLoading$, this.flightDetailsDialogVisible$)
    //   .pipe(
    //     filter(([isLoading, isDialogVisible]) => !isDialogVisible)
    //   ).subscribe(
    //     ([isLoading, isDialogVisible]) => {
    //       this.store.dispatch(isLoading ? new layoutActions.ShowSpinnerAction() :
    //         new layoutActions.HideSpinnerAction()
    //       );
    //     }
    //   );
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
    // this.store.dispatch(new actions.LoadAutocompleteOptionsAction(loadPayload));
  }

  onSelectAircraft(aircraft): void {
    // this.store.dispatch(new flightActions.LoadFlightDetailsAction(o.legacyLegId));
    this.openAircraftDetailsDialog();
    this.selectedAircraft = aircraft;

    // const url = this
    //   .router
    //   .createUrlTree([`../${o.legacyLegId}`], { relativeTo: this.route })
    //   .toString();
    // this.location.replaceState(url);
  }

  filterValuesChanged(filterOptions: models.FilterOptions): void {
    // this.store.dispatch(new actions.SetFilterOptionsAction(filterOptions));
    // this.store.dispatch(new actions.ChangePageAction(1));
  }

  pageChanged(event: sharedTypes.PageChangedEvent): void {
    // this.store.dispatch(new actions.ChangePageAction(event.page));
  }

  onCloseAircraftDetailsDialog(): void {
    this.closeAircraftDetailsDialog();
    this.selectedAircraft = null;
  }

  private openAircraftDetailsDialog(): void {
    // this.store.dispatch(new actions.SetFlightDetailsSidepanelStatusAction(true));
    this.aircraftDetailsDialogVisible = true;
  }

  private closeAircraftDetailsDialog(): void {
    // this.store.dispatch(new actions.SetFlightDetailsSidepanelStatusAction(false));
    this.aircraftDetailsDialogVisible = false;

    // const url = this
    //   .router
    //   .createUrlTree([`../bookings`], { relativeTo: this.route })
    //   .toString();
    // this.location.replaceState(url);
  }

  setViewMode(viewMode) {
    this.viewMode = viewMode;
  }
}
