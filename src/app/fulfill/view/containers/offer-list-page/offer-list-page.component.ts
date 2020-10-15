import { Component, OnDestroy, ViewChild } from '@angular/core';
import * as actions from '../../../application/actions/offer-list';
import * as offerActions from '../../../application/actions/offer';
import * as aircraftActions from '../../../application/actions/aircraft';
import * as models from '../../../domain/models';
import * as reducers from '../../../application/reducers';
import * as coreReducers from '../../../../../core/reducers';
import * as viewModels from '../../view-models';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { PageChangedEvent } from '../../../../../shared/components';
import * as _ from 'lodash';
import { State } from '../../../application/reducers/offer-list';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Location } from '@angular/common';

@Component({
  selector: 'operator-offer-list-page',
  templateUrl: './offer-list-page.component.html'
})
export class OfferListPageComponent implements OnDestroy {
  lookupCriteria: viewModels.OffersLookupCriteria;
  lookupCriteria$: Observable<viewModels.OffersLookupCriteria>;
  operatorPurchaseOffers$: Observable<models.OperatorPurchaseOffer[]>;
  currentPage$: Observable<number>;
  loading$: Observable<boolean>;
  itemsPerPage$: Observable<number>;
  itemsTotalCount$: Observable<number>;
  orgLegalName$: Observable<string>;
  lookupCriteriaSubscription$: Subscription;
  declineOfferDialogVisible = false;
  routesDetailsDialogVisible = false;
  selectedOffer: models.OperatorPurchaseOffer = null;
  private readonly loadDebounced: LoadDelegate;
  acceptOfferDialogVisible$: Observable<boolean>;

  constructor(
    private store$: Store<any>,
    // private router: Router,
    // private route: ActivatedRoute,
    // private location: Location
  ) {
    this.operatorPurchaseOffers$ = this.store$.pipe(select(reducers.getOfferListItems));
    this.currentPage$ = this.store$.pipe(select(reducers.getOfferListCurrentPage));
    this.loading$ = this.store$.pipe(select(reducers.getOfferListIsLoading));
    this.itemsPerPage$ = this.store$.pipe(select(reducers.getOfferListItemsPerPage));
    this.orgLegalName$ = this.store$.pipe(select(coreReducers.getUserOrgLegalName));
    this.itemsTotalCount$ = this.store$.pipe(select(reducers.getOfferListItemsTotalCount),
      filter(s => s !== null));
    this.lookupCriteria$ = this.store$.pipe(select(reducers.getOfferListLookupCriteria));

    this.lookupCriteriaSubscription$ = this.store$.pipe(select(reducers.getOfferListLookupCriteria))
      .subscribe((criteria: viewModels.OffersLookupCriteria) => {
        this.lookupCriteria = _.cloneDeep(criteria);
      });

    this.acceptOfferDialogVisible$ = this.store$.pipe(select(reducers.getAcceptOfferDialogIsVisible));

    this.loadDebounced = _.debounce(this.load, 700);
    this.store$.dispatch(new aircraftActions.LoadAction());
  }

  ngOnDestroy(): void {
    if (this.lookupCriteriaSubscription$) {
      this.lookupCriteriaSubscription$.unsubscribe();
    }
  }

  onLookupCriteriaChanged(lookupCriteria: viewModels.OffersLookupCriteria): void {
    this.store$.pipe(select(reducers.getOfferListState),
      first())
      .subscribe(state => {
        this.loadDebounced(lookupCriteria, 1, state.itemsPerPage);
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.store$.pipe(select(reducers.getOfferListState),
      first())
      .subscribe((state: State) => {
        if (event.page === state.currentPage) {
          return;
        }

        this.loadDebounced(this.lookupCriteria, event.page, state.itemsPerPage);
      });
  }

  onAcceptHandler(purchaseOffer: models.OperatorPurchaseOffer): void {
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(purchaseOffer));
    this.acceptOfferDialogOpen();
    // const url = this
    //   .router
    //   .createUrlTree([`./accept/${purchaseOffer.operatorPurchaseOfferId}`], { relativeTo: this.route })
    //   .toString();
    // this.location.replaceState(url);
  }

  onExpandRoute(selectedOffer: models.OperatorPurchaseOffer): void {
    this.selectedOffer = selectedOffer;
    this.routesDetailsDialogOpen();
  }

  onDeclineHandler(purchaseOffer: models.OperatorPurchaseOffer): void {
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(purchaseOffer));
    this.declineOfferDialogOpen();
  }

  onDeclineOfferDialogClose(): void {
    this.declineOfferDialogClose();
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(null));
  }

  onAcceptOfferDialogClose(): void {
    this.acceptOfferDialogClose();
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(null));
  }

  onRouteDialogClose(): void {
    this.routesDetailsDialogClose();
    this.selectedOffer = null;
  }

  async confirmAcceptOffer(selectedAircraft: models.Aircraft): Promise<void> {
    const selectedPurchaseOffer: models.OperatorPurchaseOffer = await this.store$.pipe(
      select(reducers.getOfferListSelectedPurchaseOffer),
      first()
    ).toPromise();
    const payload = new offerActions.AcceptPurchaseOfferPayload(
      selectedPurchaseOffer.getSourcingRequestId(),
      selectedPurchaseOffer.getOperatorPurchaseOfferId(),
      selectedAircraft.getAircraftId());
    const action = new offerActions.AcceptPurchaseOffer(payload);
    this.store$.dispatch(action);
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(null));
    this.onAcceptOfferDialogClose();
  }

  async confirmSubmitOffer(offerInfo: {selectedAircraft: models.Aircraft, offerBid: number}): Promise<void> {
    const selectedPurchaseOffer: models.OperatorPurchaseOffer = await this.store$.pipe(
      select(reducers.getOfferListSelectedPurchaseOffer),
      first()
    ).toPromise();
    const payload = new actions.SubmitPurchaseOfferPayload(
      selectedPurchaseOffer.getSourcingRequestId(),
      selectedPurchaseOffer.getOperatorPurchaseOfferId(),
      offerInfo.selectedAircraft,
      offerInfo.offerBid);
    const action = new actions.SubmitPurchaseOffer(payload);
    this.store$.dispatch(action);
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(null));
    this.onAcceptOfferDialogClose();
  }

  onToggleChange($event) {
    this.acceptOfferDialogClose();
  }

  async confirmDeclineOffer(): Promise<void> {
    const selectedPurchaseOffer: models.OperatorPurchaseOffer = await this.store$.pipe(
      select(reducers.getOfferListSelectedPurchaseOffer),
      first()
    ).toPromise();
    const payload = new offerActions.DeclinePurchaseOfferPayload(selectedPurchaseOffer.getSourcingRequestId(),
      selectedPurchaseOffer.getOperatorPurchaseOfferId());
    const action = new offerActions.DeclinePurchaseOffer(payload);
    this.store$.dispatch(action);
    this.store$.dispatch(new actions.ResetOfferAction());
    this.store$.dispatch(new actions.SetSelectedPurchaseOfferAction(null));
    this.onDeclineOfferDialogClose();
  }

  private load(criteria: viewModels.OffersLookupCriteria, page: number, itemsPerPage: number): void {
    const payload = new actions.SearchPayload(new viewModels.OffersLookupCriteria, page, itemsPerPage);
    payload.criteria = criteria;
    payload.itemsPerPage = itemsPerPage;
    payload.page = page;
    this.store$.dispatch(new actions.SearchAction(payload));
  }

  private declineOfferDialogClose(): void {
    this.declineOfferDialogVisible = false;
  }

  private declineOfferDialogOpen(): void {
    this.declineOfferDialogVisible = true;
  }

  private acceptOfferDialogClose(): void {
    // const url = this
    //   .router
    //   .createUrlTree([`../fulfill-flights`], { relativeTo: this.route })
    //   .toString();
    // this.location.replaceState(url);
    this.store$.dispatch(new actions.SetAcceptOfferDialogVisibleAction(false));
  }

  private acceptOfferDialogOpen(): void {
    this.store$.dispatch(new actions.SetAcceptOfferDialogVisibleAction(true));
  }

  private routesDetailsDialogOpen(): void {
    this.routesDetailsDialogVisible = true;
  }

  private routesDetailsDialogClose(): void {
    this.routesDetailsDialogVisible = false;
  }


}

type LoadDelegate = (query: viewModels.OffersLookupCriteria, page: number, itemsPerPage: number) => void;
