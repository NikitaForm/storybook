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
import { AcceptOfferDialogComponent, OfferListPageComponent } from '../app/fulfill/view/containers';
import {
  AcceptOfferFormComponent,
  ExpireCountdownComponent,
  OfferListComponent,
  OfferListLookupFormComponent, RoutesDetailsComponent
} from '../app/fulfill/view/components';
import { CoreModule } from '../core/core.module';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ConfirmationDialogComponent } from '../app/confirmation-dialog/confirmation-dialog.component';
import { PdfComponent } from '../core/components';
import * as moduleServices from '../app/fulfill/services';
import * as pdfServiceContracts from '../app/fulfill/domain/service-contracts/pdf';
import * as sharedTypes from '../shared/types';
import * as aircraftContract from '../app/fulfill/domain/service-contracts/aircraft';

export default {
  title: 'Fulfill flights tiles',
  component: OfferListPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        OfferListPageComponent,
        OfferListComponent,
        ExpireCountdownComponent,
        OfferListLookupFormComponent,
        AcceptOfferDialogComponent,
        AcceptOfferFormComponent,
        PdfComponent,
        RoutesDetailsComponent,
        OrderStatusPipe,
        ContractTypePipe,
        MinutesToTimePipe, ConfirmationDialogComponent],
      imports: [CommonModule, GridModule, LayoutModule,
        FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), DatePickerModule,
        ScrollViewModule, BrowserModule, BrowserAnimationsModule, UploadModule, HttpClientModule,
        DropDownsModule, TextMaskModule, StoreModule.forRoot(reducers, {metaReducers}),
        SharedModule, pgTabsModule, DialogModule],
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

export const FulfillFlightTileStory = () => ({
  component: OfferListPageComponent
});

FulfillFlightTileStory.story = {
  name: 'Fulfill Flights Tiles',
};


