import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { AircraftFormComponent } from './aircraft-form/aircraft-form.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { DatePickerModule, DateTimePickerModule, TimePickerModule } from '@progress/kendo-angular-dateinputs';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { FileUploadInterceptor } from './file-upload.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextMaskModule } from 'angular2-text-mask';
import { AircraftFormV2Component } from './aircraft-form-v2/aircraft-form-v2.component';
import { OrderFormComponent } from './order-form/order-form.component';
import * as marketplaceServiceContracts from './domain/service-contracts/marketplace';
import * as moduleServices from './services';
import { SharedModule } from '../shared/shared.module';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { PriceTypePipe } from './pipes/price-type.pipe';
import * as aircraftServiceContracts from './domain/service-contracts/aircraft';
import * as airportServiceContracts from './domain/service-contracts/airport';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { OrderFormComponentDT } from './order-form-dt/order-form.component';
import { OrderFormV3Component } from './order-form-v3/order-form.component';
import { OrderFormV4Component } from './order-form-v4/order-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AircraftListComponent,
    MainScreenComponent,
    AircraftFormComponent,
    ImageUploadComponent,
    AircraftFormV2Component,
    OrderFormComponent,
    EnumToArrayPipe,
    PriceTypePipe,
    ConfirmationDialogComponent,
    OrderFormComponentDT,
    OrderFormV3Component,
    OrderFormV4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    DatePickerModule,
    ScrollViewModule,
    UploadModule,
    HttpClientModule,
    DropDownsModule,
    TextMaskModule,
    SharedModule,
    DialogModule,
    DateTimePickerModule,
    TimePickerModule
  ],
  providers: [
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
