import { AfterViewInit, Component, HostListener, Inject, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router
} from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as layoutActions from '../../../shared/actions/layout';
import * as systemActions from '../../../shared/actions/system';
import * as reducers from '../../reducers';
import * as models from '../../models';

import { merge, Observable, Subscription, of } from 'rxjs';
import * as  userServiceDataContracts from '../../services/user/contracts/user';
import { filter, map, take, first } from 'rxjs/operators';
import * as userServiceContracts from '../../services/user/contracts/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {
  userName$: Observable<string>;
  isAppView$: Observable<boolean>;
  isFullHeightView$: Observable<boolean>;
  isFullWidthView$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isAppView: boolean;
  isFullHeightView: boolean;
  isLoading: boolean;
  user$: Observable<models.User>;
  title$: Observable<string>;
  viewPermissions$: Observable<models.ViewPermissions>;
  menuTabIsOpen = false;
  isSidebarToggled = false;

  isDebug$: Observable<boolean>;
  version$: Observable<string>;
  environment = environment.environment;

  get isNarrowDevices(): boolean {
    return window.innerWidth < 1025;
  }

  get isIEBrowser(): boolean {
    return /msie\s|trident/i.test(window.navigator.userAgent);
  }

  private storeSubscriptions: Subscription = new Subscription();

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    @Inject(userServiceContracts.USER_SERVICE_TOKEN) private userService: userServiceContracts.IUserService) {

    this.version$ = this.store.pipe(select(reducers.getSystemVersion));
    this.isDebug$ = this.store.pipe(select(reducers.getSystemIsDebug));

    this.isAppView$ = this.store.pipe(select(reducers.getLayoutIsAppView));
    this.isFullHeightView$ = this.store.pipe(select(reducers.getLayoutIsFullHeightView));
    this.isFullWidthView$ = this.store.pipe(select(reducers.getLayoutIsFullWidthView));
    this.isLoading$ = this.store.pipe(select(reducers.getLayoutIsLoading));
    this.user$ = this.store.pipe(select(reducers.getUserUser));
    this.viewPermissions$ = this.store.pipe(select(reducers.getUserUserPermissions));

    this.userName$ = this.store.pipe(
      select(reducers.getUserUser),
      map((user: models.User) => {
        if (user === null) {
          return '';
        }

        return `${user.firstName} ${user.lastName}`;
      })
    );

    const subscriptionRE = router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    this.storeSubscriptions.add(subscriptionRE);
  }

  ngAfterViewInit() {
    const { events } = this.router;
    const parentRouteStream$ = events.pipe(
      filter(event =>
        event instanceof NavigationEnd && !!this.activatedRoute.snapshot.firstChild.data),
      map(() => this.activatedRoute.snapshot.firstChild.data),
      map(({ title }) => title));

    const childRouteStream$ = events
      .pipe(
        filter(event => event instanceof NavigationEnd && !!this.activatedRoute.snapshot.firstChild),
        map(() => this.activatedRoute.snapshot.firstChild),
        filter(({ firstChild }) => !!firstChild),
        map(({ firstChild }) => firstChild.data),
        map(({ title }) => title)
      );
    this.title$ = merge(parentRouteStream$, childRouteStream$);
  }

  onSidebarToggle(event: boolean): void {
    this.isSidebarToggled = event;
  }

  closeSidebar(event: MouseEvent): void {
    const menuToggleElement: HTMLElement = document.querySelector('.btn-link');
    if (!menuToggleElement.contains(<Node>event.target)) {
      this.onSidebarToggle(false);
    }
  }

  menuTabOpen(event: boolean): void {
    this.menuTabIsOpen = event;
  }

  signOut(): void {
    this.userService.signOut(new userServiceDataContracts.SignOutRequest())
      .pipe(take(1))
      .subscribe(() => {
        location.reload();
      });
  }

  ngOnDestroy(): void {
    this.storeSubscriptions.unsubscribe();
  }

  private navigationInterceptor(event: RouterEvent): void {

    if (event['url'] && event['url'] === '/') { return null; }

    if (event instanceof NavigationStart) {
      this.store.dispatch(new layoutActions.ShowSpinnerAction());
    }

    if (event instanceof NavigationEnd) {
      this.store.dispatch(new layoutActions.HideSpinnerAction());
    }

    if (event instanceof NavigationCancel) {
      this.store.dispatch(new layoutActions.HideSpinnerAction());
    }

    if (event instanceof NavigationError) {
      this.store.dispatch(new layoutActions.HideSpinnerAction());
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.keyCode === 4) { //  Ctrl+D
      this.store.pipe(
        select(reducers.getSystemIsDebug),
        first())
        .subscribe(isDebug => {
          this.store.dispatch(new systemActions.SetDebugAction(!isDebug));
        });
    }
  }

}
