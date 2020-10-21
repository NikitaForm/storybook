import { moduleMetadata } from '@storybook/angular';
import { GridModule } from '@progress/kendo-angular-grid';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextMaskModule } from 'angular2-text-mask';
import { ContractTypePipe, MinutesToTimePipe, OrderStatusPipe } from '../app/pipes';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../reducers';
import { SharedModule } from '../shared/shared.module';
import { pgTabsModule } from '../assets/pages/components/tabs/tabs.module';
import { CoreModule } from '../core/core.module';
import { DialogModule } from '@progress/kendo-angular-dialog';

import * as moduleServices from '../app/fulfill/services';
import * as pdfServiceContracts from '../app/fulfill/domain/service-contracts/pdf';
import * as sharedTypes from '../shared/types';
import * as aircraftContract from '../app/fulfill/domain/service-contracts/aircraft';
import { PagesModule } from '../assets/pages/components/pages.module';
import { MessageModule } from '../assets/pages/components/message/message.module';
import { OfferListPage2Component } from '../app/fulfill/view-2/containers/offer-list-page/offer-list-page.component';
import { OfferList2Component } from '../app/fulfill/view-2/components/offer-list/offer-list.component';
import { ExpireCountdown2Component } from '../app/fulfill/view-2/components/expire-countdown/expire-countdown.component';
import { OfferListLookupForm2Component } from '../app/fulfill/view-2/components/offer-list-lookup-form/offer-list-lookup-form.component';
import { AcceptOfferDialog2Component } from '../app/fulfill/view-2/containers/accept-offer-dialog/accept-offer-dialog.component';
import { AcceptOfferForm2Component } from '../app/fulfill/view-2/components/accept-offer-form/accept-offer-form.component';
import { RoutesDetails2Component } from '../app/fulfill/view-2/components/routes-details/routes-details.component';
import { PriceBreakdown2Component } from '../app/fulfill/view-2/components/price-breakdown/price-breakdown.component';

export default {
  title: 'Fulfill flights tiles v2',
  component: OfferListPage2Component,
  decorators: [
    moduleMetadata({
      declarations: [
        OfferListPage2Component,
        OfferList2Component,
        ExpireCountdown2Component,
        OfferListLookupForm2Component,
        AcceptOfferDialog2Component,
        AcceptOfferForm2Component,
        // PdfComponent,
        RoutesDetails2Component,
        OrderStatusPipe,
        ContractTypePipe,
        MinutesToTimePipe,
        PriceBreakdown2Component
        // ConfirmationDialogComponent
      ],
      imports: [CommonModule, GridModule, LayoutModule,
        FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), DatePickerModule,
        ScrollViewModule, BrowserModule, BrowserAnimationsModule, UploadModule, HttpClientModule,
        DropDownsModule, TextMaskModule, StoreModule.forRoot(reducers, {metaReducers}),
        SharedModule, pgTabsModule, DialogModule, PagesModule, CoreModule, MessageModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/iframe.html'},
        DatePipe,
        {
          provide: pdfServiceContracts.PDF_SERVICE_TOKEN,
          useClass: moduleServices.PdfServiceMock
        },
        {
          provide: sharedTypes.NOTIFICATION_SERVICE_TOKEN,
          useClass: sharedTypes.NotificationService
        },
        {
          provide: aircraftContract.SERVICE_TOKEN,
          useClass: moduleServices.AircraftMockService
        }
      ]
    }),
  ],
};

export const FulfillFlightTileStory2 = () => ({
  component: OfferListPage2Component
});

FulfillFlightTileStory2.story = {
  name: 'Fulfill Flights Tiles With Pills',
};


