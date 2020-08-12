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
import { OrderListPageComponent } from '../app/order-list-page/order-list-page.component';
import { OrderListComponent } from '../app/order-list/order-list.component';
import { ContractTypePipe, MinutesToTimePipe, OrderStatusPipe, PriceTypePipe } from '../app/pipes';
import { StoreModule } from '@ngrx/store';
import { CustomSerializer, metaReducers, reducers, State } from '../reducers';
import { SharedModule } from '../shared/shared.module';
import { FlightDetailsDialogComponent } from '../app/flight-details-dialog/flight-details-dialog.component';
import { PriceComponentComponent } from '../app/price-details/price-details.component';
import { pgTabsModule } from '../assets/pages/components/tabs/tabs.module';
import * as marketplaceServiceContracts from '../app/domain/service-contracts/marketplace';
import * as moduleServices from '../app/services';
import { EffectsModule } from '@ngrx/effects';
import * as moduleEffects from '../app/application/effects';

export default {
  title: 'Flight-details',
  component: OrderListPageComponent,
  decorators: [
    moduleMetadata({
      declarations: [OrderListPageComponent,
        OrderListComponent,
        OrderStatusPipe,
        ContractTypePipe,
        MinutesToTimePipe,
        FlightDetailsDialogComponent,
        PriceComponentComponent,
      PriceTypePipe],
      imports: [CommonModule, GridModule, LayoutModule,
        FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), DatePickerModule,
        ScrollViewModule, BrowserModule, BrowserAnimationsModule, UploadModule, HttpClientModule,
        DropDownsModule, TextMaskModule, StoreModule.forRoot(reducers, {metaReducers}),
        SharedModule, pgTabsModule,
        EffectsModule.forRoot([
          // moduleEffects.AircraftEffects,
          // moduleEffects.AirportEffects,
          // moduleEffects.FboEffects,
          // moduleEffects.OrderCollectionEffects,
          // moduleEffects.OrderNewEffects,
          moduleEffects.FlightDetailsEffects
        ])],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/iframe.html'},
        DatePipe,
        {
          provide: marketplaceServiceContracts.SERVICE_TOKEN,
          useClass: moduleServices.MarketplaceMockService
        },
      ]
    }),
  ],
};

export const FlightDetailsStory = () => ({
  component: OrderListPageComponent,
});

FlightDetailsStory.story = {
  name: 'Order list',
};


