import { moduleMetadata } from '@storybook/angular';
import { GridModule } from '@progress/kendo-angular-grid';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from '../app/app-routing.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { DatePickerModule, DateTimePickerModule, TimePickerModule } from '@progress/kendo-angular-dateinputs';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileUploadInterceptor } from '../app/file-upload.interceptor';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextMaskModule } from 'angular2-text-mask';
import { OrderFormComponent } from '../app/order-form/order-form.component';
import { AircraftListComponent } from '../app/aircraft-list/aircraft-list.component';
import { MainScreenComponent } from '../app/main-screen/main-screen.component';
import { AircraftFormComponent } from '../app/aircraft-form/aircraft-form.component';
import { ImageUploadComponent } from '../app/image-upload/image-upload.component';
import { AircraftFormV2Component } from '../app/aircraft-form-v2/aircraft-form-v2.component';
import { SharedModule } from '../shared/shared.module';
import { EnumToArrayPipe } from '../app/pipes/enum-to-array.pipe';
import { PriceTypePipe } from '../app/pipes/price-type.pipe';
import * as aircraftServiceContracts from '../app/domain/service-contracts/aircraft';
import * as moduleServices from '../app/services';
import * as airportServiceContracts from '../app/domain/service-contracts/airport';
import * as marketplaceServiceContracts from '../app/domain/service-contracts/marketplace';
import { aircrafts } from '../app/aircraft-list/aircrafts';
import { Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../app/confirmation-dialog/confirmation-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { EventEmitter, Input, Output } from '@angular/core';
import { OrderFormComponentDT } from '../app/order-form-dt/order-form.component';
import { OrderFormV3Component } from '../app/order-form-v3/order-form.component';
import { OrderFormV4Component } from '../app/order-form-v4/order-form.component';
import { MainLandingScreenComponent } from '../app/main-landing/main-screen.component';
import { LandingComponent } from '../app/landing/landing.component';

export default {
  title: 'Landing Page',
  component: MainLandingScreenComponent,
  decorators: [
    moduleMetadata({
      declarations: [OrderFormComponent, AircraftListComponent, MainScreenComponent, AircraftFormComponent, ImageUploadComponent,
        AircraftFormV2Component, EnumToArrayPipe, PriceTypePipe, ConfirmationDialogComponent, OrderFormComponentDT,
        MainLandingScreenComponent, LandingComponent],
      imports: [CommonModule, GridModule, AppRoutingModule, LayoutModule,
        FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), DatePickerModule,
        ScrollViewModule, BrowserModule, BrowserAnimationsModule, UploadModule, HttpClientModule,
        DropDownsModule, TextMaskModule, SharedModule, TimePickerModule, DialogModule, DateTimePickerModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/iframe.html'},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FileUploadInterceptor,
          multi: true
        },
        {
          provide: aircraftServiceContracts.SERVICE_TOKEN,
          useClass: moduleServices.AircraftMockService
        },
        {
          provide: airportServiceContracts.SERVICE_TOKEN,
          useClass: moduleServices.AirportValidationService
        },
        {
          provide: marketplaceServiceContracts.SERVICE_TOKEN,
          useClass: moduleServices.MarketplaceMockService
        },
      DatePipe]
    }),
  ],
};
const confirmation = {
  lowPriceConfirmed: false,
  highPriceConfirmed: false
};

const order = {
  charterPrice: null,
  contractType: 0,
  departureDate: null,
  eft: null,
  externalId: null,
  priceType: 1,
  seatMinPrice: null,
  seats: null,
};

export const LandingPage = () => ({
  component: MainLandingScreenComponent,
});

LandingPage.story = {
  name: 'New landing page'
};
