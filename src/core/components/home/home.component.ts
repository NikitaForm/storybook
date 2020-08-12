import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { getUserUser } from '../../reducers/index';
import { Router } from '@angular/router';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  fulfillFlightsPermission = false;
  publishedFlightsPermission = false;
  private userSubscription: Subscription;

  constructor(private store: Store<any>, private router: Router) {
    this.userSubscription = this.store.pipe(select(getUserUser), take(1)).subscribe(user => {
      this.fulfillFlightsPermission = user.viewPermissions.fulfillFlights;
      this.publishedFlightsPermission = user.viewPermissions.publishedFlights;
    });
  }

  // onfulfillFlightsClick(): void {
  //   this.router.navigate(['/one-way/quotes/new']);
  // }

  onPublishedFlightsFlightsClick(): void {
    this.router.navigate(['/flights/publish']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
