import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import * as moduleComponents from './components';
import * as moduleDirectives from './directives';
import * as modulePipes from './pipes';

import * as moduleServices from './services';

import { PagesModule } from '../assets/pages/components/pages.module';
import { pgTabsModule } from '../assets/pages/components/tabs/tabs.module';

import { NotificationService } from '@progress/kendo-angular-notification';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    moduleComponents.BrowserNotSupportedComponent,
    moduleComponents.DefaultLayoutComponent,
    moduleComponents.HeaderComponent,
    moduleComponents.InternalErrorComponent,
    moduleComponents.PageSummaryComponent,
    moduleComponents.PaginationComponent,
    moduleComponents.SidebarComponent,
    moduleComponents.SpinnerComponent,
    moduleComponents.SystemComponent,
    moduleComponents.VersionHistoryComponent,
    moduleComponents.WaitProgressComponent,
    moduleComponents.SidepanelComponent,
    moduleDirectives.PopoverContentComponent,
    moduleDirectives.ValidationTooltipDirective,
    moduleDirectives.InfiniteScrollDirective,
    modulePipes.EnumKeyValuePipe,
    modulePipes.EnvironmentPipe,
    modulePipes.SafeHtmlPipe,
    modulePipes.DateWithNoTimeZonePipe,
    modulePipes.ServiceClassPipe,
    modulePipes.EnumToArrayPipe
  ],
  exports: [
    moduleComponents.BrowserNotSupportedComponent,
    moduleComponents.DefaultLayoutComponent,
    moduleComponents.HeaderComponent,
    moduleComponents.InternalErrorComponent,
    moduleComponents.PageSummaryComponent,
    moduleComponents.PaginationComponent,
    moduleComponents.VersionHistoryComponent,
    moduleComponents.SidebarComponent,
    moduleComponents.SpinnerComponent,
    moduleComponents.SystemComponent,
    moduleComponents.WaitProgressComponent,
    moduleComponents.SidepanelComponent,
    moduleDirectives.PopoverContentComponent,
    moduleDirectives.ValidationTooltipDirective,
    moduleDirectives.InfiniteScrollDirective,
    modulePipes.EnumKeyValuePipe,
    modulePipes.EnvironmentPipe,
    modulePipes.SafeHtmlPipe,
    modulePipes.DateWithNoTimeZonePipe,
    modulePipes.ServiceClassPipe,
    modulePipes.EnumToArrayPipe
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    PagesModule,
    pgTabsModule,
    RouterModule
  ],
  providers: [
    modulePipes.EnumKeyValuePipe,
    modulePipes.SafeHtmlPipe,
    modulePipes.DateWithNoTimeZonePipe,
    modulePipes.ServiceClassPipe,
    moduleServices.ErrorWebServiceLoggerBridge,
    moduleServices.NotificationService,
    moduleServices.ClipboardService
  ],
  entryComponents: [moduleDirectives.PopoverContentComponent]
})
export class SharedModule {
}
