import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, ViewChild, NgZone } from '@angular/core';
import {
  Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router
} from '@angular/router';
import { Store, select } from '@ngrx/store';

import {
  INotificationService,
  NotificationStyle,
  NotificationType,
  NotificationPosition
} from '../../types';
import {
  MenuItem
} from '../sidebar/sidebar.component';
import * as layoutActions from '../../actions/layout';
import * as layoutReducers from '../../reducers/layout';
import * as systemActions from '../../actions/system';
import * as userActions from '../../../core/actions/user';
import * as reducers from '../../../core/reducers';
import * as coreModels from '../../../core/models';
import * as models from '../../models';

import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { first, map, skip } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { pagesToggleService } from '../../../assets/pages/services/toggler.service';
declare var pg: any;

@Component({
  selector: 'shared-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnDestroy, OnInit, AfterViewInit {

  //  New Pages
  @ViewChild('root') root;
  layoutState: string;
  extraLayoutClass: string;
  _boxed = false;
  _menuPin = false;
  _enableHorizontalContainer: boolean;
  _pageContainerClass = '';
  _contentClass = '';
  _footer = true;
  _menuDrawerOpen = false;
  //  Mobile
  _secondarySideBar = false;
  _mobileSidebar = false;
  //  END Mobile
  _mobileHorizontalMenu = false;
  _pageTitle: string;
  //  Sub layout - eg: email
  _layoutOption: string;
  _subscriptions: Array<Subscription> = [];
  _layout;

  @Input()
  public contentClass = '';

  @Input()
  public pageWrapperClass = '';

  @Input()
  public footer = true;
  //  END New Pages


  browserNowSupported$: Observable<boolean>;
  debugSubscription: Subscription;
  environment = environment.environment;
  errorIsVisible$: Observable<boolean>;
  errorText$: Observable<string>;
  isAppView$: Observable<boolean>;
  isDebug$: Observable<boolean>;
  isFullHeightView$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  menuItems$: Observable<Array<MenuItem>>;
  outletIsVisible$: Observable<boolean>;
  user$: Observable<coreModels.User>;
  version$: Observable<string>;
  activeRoute$: Observable<string>;

  LayoutType = models.LayoutType;
  layoutType = models.LayoutType.Default;

  private notificationService: INotificationService;
  private layoutStateSubscription: Subscription;

  constructor(
    public store$: Store<any>,
    private router: Router,
    public toggler: pagesToggleService) {

    this.browserNowSupported$ = this.store$.pipe(select(reducers.getBrowserSupported), map(supported => supported === false));
    this.isAppView$ = this.store$.pipe(select(reducers.getLayoutIsAppView));
    this.isDebug$ = this.store$.pipe(select(reducers.getSystemIsDebug));
    this.user$ = this.store$.pipe(select(reducers.getUserUser));
    this.version$ = this.store$.pipe(select(reducers.getSystemVersion));
    this.activeRoute$ = store$.pipe(select(reducers.getRouterPath));

    this.isFullHeightView$ = combineLatest(
      this.store$.pipe(select(reducers.getLayoutState)),
      this.store$.pipe(select(reducers.getSystemState)))
      .pipe(map(([layoutState, systemState]) => {
        return layoutState.isAppView
          || layoutState.isLoading
          || layoutState.isFullHeightView
          || layoutState.isError
          || systemState.browserSupported === false;
      }));

    this.isLoading$ = this.store$
      .pipe(
        select(reducers.getLayoutState),
        map((layoutState: layoutReducers.State) => layoutState.isLoading && layoutState.isError === false)
      );

    this.outletIsVisible$ = combineLatest(
      this.store$.pipe(select(reducers.getLayoutState)),
      this.store$.pipe(select(reducers.getSystemState)))
      .pipe(map(([layoutState, systemState]) => {
        return layoutState.isLoading === false && layoutState.isError === false && systemState.browserSupported;
      }));

    this.errorIsVisible$ = this.store$
      .pipe(
        select(reducers.getLayoutState),
        map((state: layoutReducers.State) => state.isError));

    this.errorText$ = this.store$
        .pipe(
            select(reducers.getLayoutState),
            map(({errorText}) => errorText));

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    //  this.layoutStateSubscription = this.store$
    //    .pipe(select(reducers.getLayoutState)
    //    .subscribe((layoutState: layoutReducers.State) => {
    //      this.layoutType = layoutState.layoutType;
    //    });


    //  New Pages
    if (this.layoutState) {
      pg.addClass(document.body, this.layoutState);
    }
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        let root = this.router.routerState.snapshot.root;
        while (root) {
          if (root.children && root.children.length) {
            root = root.children[0];
          } else if (root.data) {
            //  Custom Route Data here
            this._pageTitle = root.data['title'];
            this._layoutOption = root.data['layoutOption'];
            this._boxed = root.data['boxed'];
            break;
          } else {
            break;
          }
        }
        //  Reset Any Extra Layouts added from content pages
        pg.removeClass(document.body, this.extraLayoutClass);
        //  Close Sidebar and Horizonta Menu
        if (this._mobileSidebar) {
          this._mobileSidebar = false;
          pg.removeClass(document.body, 'sidebar-open');
          this.toggler.toggleMobileSideBar(this._mobileSidebar);
        }
        this._mobileHorizontalMenu = false;
        this.toggler.toggleMobileHorizontalMenu(this._mobileHorizontalMenu);
        //  Scoll Top
        this.scrollToTop();
      }

      //  Subscribition List
      this._subscriptions.push(this.toggler.pageContainerClass
        .subscribe(state => {
          this._pageContainerClass = state;
        }));

      this._subscriptions.push(this.toggler.contentClass
        .subscribe(state => {
          this._contentClass = state;
        }));

      this._subscriptions.push(this.toggler.bodyLayoutClass
        .subscribe(state => {
          if (state) {
            this.extraLayoutClass = state;
            pg.addClass(document.body, this.extraLayoutClass);
          }
        }));

      this._subscriptions.push(this.toggler.Applayout
        .subscribe(state => {
          this.changeLayout(state);
        }));

      this._subscriptions.push(this.toggler.Footer
        .subscribe(state => {
          this._footer = state;
        }));

      this._subscriptions.push(this.toggler.mobileHorizontaMenu
        .subscribe(state => {
          this._mobileHorizontalMenu = state;
        }));

    });
  }

  getMenuItems(): Array<MenuItem> {
    return [];
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.keyCode === 4) { //  Ctrl+D
      this.store$.pipe(
        select(reducers.getSystemIsDebug),
        first())
        .subscribe(isDebug => {
          this.store$.dispatch(new systemActions.SetDebugAction(!isDebug));
        });
    } else if (event.ctrlKey && event.keyCode === 6) { //  Ctrl+F
      this.store$.pipe(
        select(reducers.getLayoutIsAppView),
        first())
        .subscribe(appView => {
          if (appView === true) {
            this.store$.dispatch(new layoutActions.DeactivateAppViewAction());
          } else {
            this.store$.dispatch(new layoutActions.ActivateAppViewAction());
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.debugSubscription) {
      this.debugSubscription.unsubscribe();
    }

    if (this.layoutStateSubscription) {
      this.layoutStateSubscription.unsubscribe();
    }

    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.layoutStateSubscription = this.store$
      .pipe(select(reducers.getLayoutState))
      .subscribe((layoutState: layoutReducers.State) => {
        this.layoutType = layoutState.layoutType;
      });
  }

  ngAfterViewInit(): void {
    this.debugSubscription = this.store$
      .pipe(
        select(reducers.getSystemIsDebug),
        skip(1))
      .subscribe(isDebug => {
        const str = isDebug ? 'enabled' : 'disabled';
        this.notificationService.show(`Debug ${str}`, NotificationStyle.Bar, NotificationType.Info,
          NotificationPosition.Top);
      });
  }

  setNotificationService(notificationService: INotificationService): void {
    this.notificationService = notificationService;
  }

  signOut(): void {
    this.store$.dispatch(new userActions.SignOutAction());
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.store$.dispatch(new layoutActions.ShowSpinnerAction());
    }

    if (event instanceof NavigationEnd) {
      this.store$.dispatch(new layoutActions.HideSpinnerAction());
    }

    if (event instanceof NavigationCancel) {
      this.store$.dispatch(new layoutActions.HideSpinnerAction());
    }

    if (event instanceof NavigationError) {
      this.store$.dispatch(new layoutActions.HideSpinnerAction());
    }
  }



  //  New Pages

  /**
  *   @description Add Document Layout Class
  */
  changeLayout(type: string) {
    this.layoutState = type;
    if (type) {
      pg.addClass(document.body, type);
    }
  }

  /**
  *   @description Remove Document Layout Class
  */
  removeLayout(type: string) {
    pg.removeClass(document.body, type);
  }
  /**
  *   @description Force to scroll to top of page. Used on Route
  */
  scrollToTop() {
    const top = window.pageYOffset;
    if (top === 0) {
      const scroller = document.querySelector('.page-container');
      if (scroller) {
        scroller.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  /**
  *   @description Show Quick View Component / Right Sidebar - Service
  */
  openQuickView($e) {
    $e.preventDefault();
    this.toggler.toggleQuickView();
  }

  /**
  *   @description Show Quick Search Component - Service
  */
  openSearch($e) {
    $e.preventDefault();
    this.toggler.toggleSearch(true);
  }

  /**
  *   @description Permanently Open / Close Main Sidebar
  */
  toggleMenuPin() {
    if (pg.isVisibleSm()) {
      this._menuPin = false;
      return;
    }
    if (this._menuPin) {
      pg.removeClass(document.body, 'menu-pin');
      this._menuPin = false;
    } else {
      pg.addClass(document.body, 'menu-pin');
      this._menuPin = true;
    }
  }

  /**
  *   @description Open Main Sidebar Menu Drawer - Service
  */
  toggleMenuDrawer() {
    this._menuDrawerOpen = (this._menuDrawerOpen === true ? false : true);
    this.toggler.toggleMenuDrawer();
  }

  /**
  *   @description Open Main Sidebar on Mobile - Service
  */
  toggleMobileSidebar() {
    if (this._mobileSidebar) {
      this._mobileSidebar = false;
      pg.removeClass(document.body, 'sidebar-open');
      pg.removeClass(document.body, 'sidebar-visible');
    } else {
      this._mobileSidebar = true;
      pg.addClass(document.body, 'sidebar-open');
      pg.addClass(document.body, 'sidebar-visible');
    }
    this.toggler.toggleMobileSideBar(this._mobileSidebar);
  }

  /**
  *   @description Open Secondary Sidebar on Mobile - Service
  */
  toggleSecondarySideBar() {
    this._secondarySideBar = (this._secondarySideBar === true ? false : true);
    this.toggler.toggleSecondarySideBar(this._secondarySideBar);
  }

  /**
  *   @description Call Horizontal Menu Toggle Service for mobile
  */
  toggleHorizontalMenuMobile() {
    this._mobileHorizontalMenu = (this._mobileHorizontalMenu === true ? false : true);
    this.toggler.toggleMobileHorizontalMenu(this._mobileHorizontalMenu);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.autoHideMenuPin();
  }

  // Utils
  autoHideMenuPin() {
    if (window.innerWidth < 1025) {
      if (pg.hasClass(document.body, 'menu-pin')) {
        pg.addClass(document.body, 'menu-unpinned');
        pg.removeClass(document.body, 'menu-pin');
      }
    } else {
      if (pg.hasClass(document.body, 'menu-unpinned')) {
        pg.addClass(document.body, 'menu-pin');
      }
    }
  }
}
