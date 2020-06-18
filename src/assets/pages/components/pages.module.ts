import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  BsDropdownModule,
  AccordionModule,
  AlertModule,
  ButtonsModule,
  CollapseModule,
  ModalModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
  TypeaheadModule,
} from 'ngx-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ParallaxDirective } from './parallax/parallax.directive';
import { pgRetinaDirective } from './retina/retina.directive';
import { ViewDirective } from './view/view.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormGroupDefaultDirective } from './forms/form-group-default.directive';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { ListItemComponent } from './list-view/list-item/list-item.component';
import { ListViewContainerComponent } from './list-view/list-view-container/list-view-container.component';
import { QuickviewComponent } from './quickview/quickview.component';
import { SearchOverlayComponent } from './search-overlay/search-overlay.component';
import { SecondarySidebarComponent } from './secondary-sidebar/secondary-sidebar.component';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MenuAltComponent } from './menu/menu-alt.component';
import { MenuIconComponent } from './menu/menu-icon.component';
import { ContainerComponent } from './container/container.component';
import { PageContainer } from './container/page-container.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { pagesToggleService } from '../services/toggler.service';
import { MessageModule } from '../components/message/message.module';
import { MessageService } from '../components/message/message.service';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    MessageModule,
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    CommonModule,
    FormsModule,
    PerfectScrollbarModule,
    RouterModule
  ],
  declarations: [
    ParallaxDirective,
    pgRetinaDirective,
    ViewDirective,
    BreadcrumbComponent,
    FormGroupDefaultDirective,
    HorizontalMenuComponent,
    ListItemComponent,
    ListViewContainerComponent,
    QuickviewComponent,
    SearchOverlayComponent,
    SecondarySidebarComponent,
    ContainerComponent,
    HeaderComponent,
    MenuAltComponent,
    MenuComponent,
    MenuIconComponent,
    PageContainer,
    SidebarComponent
  ],
  exports: [
    ParallaxDirective,
    pgRetinaDirective,
    ViewDirective,
    BreadcrumbComponent,
    FormGroupDefaultDirective,
    HorizontalMenuComponent,
    ListItemComponent,
    ListViewContainerComponent,
    QuickviewComponent,
    SearchOverlayComponent,
    SecondarySidebarComponent,
    ContainerComponent,
    HeaderComponent,
    MenuAltComponent,
    MenuComponent,
    MenuIconComponent,
    PageContainer,
    SidebarComponent
  ],
  providers: [
    pagesToggleService,
    MessageService
  ]
})
export class PagesModule { }
