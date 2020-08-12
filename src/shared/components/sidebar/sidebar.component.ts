// import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit, OnDestroy {
  @Input() menuLinks: Array<MenuItem>;
  @Input() activeRoute: Observable<string>;
  @Input() menuPinThreeWay = 0; // 0 - dynamic , 1 - always open, 2 - always closed
  @Input() userName: string;
  @Output() toggleMenuDrawer = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<boolean>();
  reOrder = true;

  MenuItemThumbnailType = MenuItemThumbnailType;

  private userSubscription: Subscription;
  private activeRouteSubscription: Subscription;

  ngOnInit(): void {
    // this.activeRouteSubscription = this.activeRoute.subscribe(link => {
    //   // Get route path from parent and only reorder the first time
    //   if (link && this.reOrder) {
    //     this.highlightActiveRoute(null, link.split('?')[0]);
    //     this.reOrder = false;
    //   }
    // });

    // const $sidebar = $(this.el.nativeElement).find('nav');
    // $sidebar.sidebar($sidebar.data());
  }

  ngOnDestroy(): void {
    // if (this.activeRouteSubscription) {
    //   this.activeRouteSubscription.unsubscribe();
    // }
    // if (this.userSubscription) {
    //   this.userSubscription.unsubscribe();
    // }
  }

  highlightActiveRoute(node: MenuItem, link?: string): void {
    // Go through each node and apply recursive function
    // this.menuItems.forEach((item: MenuItem) => {
    //   this.routeCrawler(item, node, (link ? link : ''));
    // });
  }

  // routeCrawler(itterateNode: MenuItem, compareNode?: MenuItem, link?: string): boolean {
  // 1. Node has Children and any one of the children is active
  // 2. It is the first time (reOrder) and link matches the router path
  // 3. name matches path paramter which is passed from clicking a side menu item
  // Explicitly set the value to false to prevent undefined
  // (itterateNode.children
  //   && itterateNode.children.map(
  //     c => this.routeCrawler(c, compareNode, link)).includes(true)
  // )
  //   || (itterateNode === compareNode)
  //   || (itterateNode.link === link) ?
  //   itterateNode.isActive = true
  //   :
  //   itterateNode.isActive = false;

  // return itterateNode.isActive;
  // }
}

export interface MenuItem {
  label: string;
  routerLink?: string | null;
  iconType: string; // letter, pg
  iconName: string;
  thumbNailClass?: string; // color
  // If has children
  toggle?: string; // default to close
  submenu?: Array<MenuItem>;
  debugOnly?: boolean;
  viewPermission?: string; // value
}

// export interface MenuItem {
//   name: string;
//   link: string | null;
//   thumbnail: MenuItemThumbnail;
//   isActive: boolean;
//   children?: Array<MenuItem>;
// }

export interface MenuItemThumbnail {
  thumbnailType: MenuItemThumbnailType;
  content: string;
}

export enum MenuItemThumbnailType {
  Simple,
  Icon
}
