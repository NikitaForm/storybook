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

export default {
  title: 'Order Form',
  component: OrderFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [OrderFormComponent, AircraftListComponent, MainScreenComponent, AircraftFormComponent, ImageUploadComponent,
        AircraftFormV2Component, EnumToArrayPipe, PriceTypePipe, ConfirmationDialogComponent, OrderFormComponentDT],
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

const aircraftList = [{
  'insuranceExpirationDate': '2020-08-30T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 1616,
  'aircraftModel': {'name': 'Citation CJ2'},
  'marketableSeatsCount': 8,
  'tailNumber': 'JACKT1',
  'deleted': true,
  'completed': true
}, {
  'insuranceExpirationDate': null,
  'insuranceApproved': false,
  'aircraftId': 301,
  'aircraftModel': {'name': 'Gulfstream G200'},
  'marketableSeatsCount': 8,
  'tailNumber': 'N100EK',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2021-06-28T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 73,
  'aircraftModel': {'name': 'Citation Excel'},
  'marketableSeatsCount': 6,
  'tailNumber': 'N1122K',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2020-07-12T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 74,
  'aircraftModel': {'name': 'Citation X'},
  'marketableSeatsCount': 8,
  'tailNumber': 'N125TH',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': null,
  'insuranceApproved': false,
  'aircraftId': 75,
  'aircraftModel': {'name': 'Beechjet 400'},
  'marketableSeatsCount': 6,
  'tailNumber': 'N127SJ',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2020-07-13T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 1598,
  'aircraftModel': {'name': 'Learjet 45'},
  'marketableSeatsCount': 8,
  'tailNumber': 'N157PB',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2021-11-03T22:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 302,
  'aircraftModel': {'name': 'Learjet 60'},
  'marketableSeatsCount': 6,
  'tailNumber': 'N173KR',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2020-07-12T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 76,
  'aircraftModel': {'name': 'Learjet 75'},
  'marketableSeatsCount': 8,
  'tailNumber': 'N175MX',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2021-06-28T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 77,
  'aircraftModel': {'name': 'Citation Excel'},
  'marketableSeatsCount': 6,
  'tailNumber': 'N178BR',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': null,
  'insuranceApproved': false,
  'aircraftId': 78,
  'aircraftModel': {'name': 'Citation CJ2'},
  'marketableSeatsCount': 4,
  'tailNumber': 'N180YA',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2021-06-28T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 79,
  'aircraftModel': {'name': 'Citation Excel'},
  'marketableSeatsCount': 6,
  'tailNumber': 'N188WS',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2020-07-13T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 80,
  'aircraftModel': {'name': 'Gulfstream IV-SP'},
  'marketableSeatsCount': 12,
  'tailNumber': 'N1AZ',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': null,
  'insuranceApproved': false,
  'aircraftId': 81,
  'aircraftModel': {'name': 'Falcon 2000'},
  'marketableSeatsCount': 8,
  'tailNumber': 'N218PH',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2020-07-13T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 275,
  'aircraftModel': {'name': 'Challenger 604'},
  'marketableSeatsCount': 8,
  'tailNumber': 'N226MY',
  'deleted': false,
  'completed': true
}, {
  'insuranceExpirationDate': '2020-07-13T21:00:00.000Z',
  'insuranceApproved': true,
  'aircraftId': 82,
  'aircraftModel': {'name': 'Nextant 400XTi'},
  'marketableSeatsCount': 6,
  'tailNumber': 'N226WC',
  'deleted': false,
  'completed': true
}].map((a: any) => {
  if (a.insuranceExpirationDate) {
    a.insuranceExpirationDate = new Date(a.insuranceExpirationDate);
  }
  return a;
});

const originAirportFboList = [{
  'name': 'Customs Hangar 1',
  'id': 12848,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}, {
  'name': 'Signature Flight Support South',
  'id': 9861,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}, {
  'name': 'Signature Flight Support West',
  'id': 9862,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}, {
  'name': 'Atlantic Aviation Services',
  'id': 9863,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}, {
  'name': 'Meridian',
  'id': 9865,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}, {
  'name': 'Jet Aviation',
  'id': 9864,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}, {
  'name': 'Signature Flight Support East',
  'id': 9958,
  'address': {'city': 'Teterboro', 'state': 'NEW JERSEY', 'country': 'UNITED STATES'}
}];

const destinationAirportFboList = [{
  'name': 'Sheltair Aviation',
  'id': 9826,
  'address': {'city': 'Fort Lauderdale', 'state': 'FLORIDA', 'country': 'UNITED STATES'}
}, {
  'name': 'JetScape Services',
  'id': 9827,
  'address': {'city': 'Fort Lauderdale', 'state': 'FLORIDA', 'country': 'UNITED STATES'}
}, {
  'name': 'Signature Flight Support',
  'id': 9828,
  'address': {'city': 'Fort Lauderdale', 'state': 'FLORIDA', 'country': 'UNITED STATES'}
}, {
  'name': 'SunJet Fueling Services',
  'id': 9829,
  'address': {'city': 'Fort Lauderdale', 'state': 'FLORIDA', 'country': 'UNITED STATES'}
}, {'name': 'National Jets', 'id': 9825, 'address': {'city': 'Fort Lauderdale', 'state': 'FLORIDA', 'country': 'UNITED STATES'}}];

export const OrderForm = () => ({
  component: OrderFormComponent,
  props: {
    order: {...order},
    contractType: 0,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }

});

OrderForm.story = {
  name: 'order form private charter MVP2'
};

export const OrderFormDateTime = () => ({
  component: OrderFormComponentDT,
  props: {
    order: {...order},
    contractType: 0,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }
});

OrderFormDateTime.story = {
  name: 'Order form with date-time pickers and sections'
};

export const OrderFormDateTimeShuttle = () => ({
  component: OrderFormComponentDT,
  props: {
    order: {...order},
    contractType: 1,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }
});

OrderFormDateTimeShuttle.story = {
  name: 'Order form with date-time pickers shared charter'
};

export const OrderFormColumns = () => ({
  component: OrderFormV3Component,
  props: {
    order: {...order},
    contractType: 0,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }
});

OrderFormColumns.story = {
  name: 'Order form with column layout'
};

export const OrderFormColumnsShuttle = () => ({
  component: OrderFormV3Component,
  props: {
    order: {...order},
    contractType: 1,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }
});

OrderFormColumnsShuttle.story = {
  name: 'Order form with column layout for shared charter'
};

export const OrderFormEftTimepicker = () => ({
  component: OrderFormV4Component,
  props: {
    order: {...order},
    contractType: 0,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }
});

OrderFormEftTimepicker.story = {
  name: 'Order form with eft timepicker'
};

export const OrderFormEftTimepickerShuttle = () => ({
  component: OrderFormV4Component,
  props: {
    order: {...order},
    contractType: 1,
    aircraftList,
    validation$: new Subject<any>(),
    originAirportFboList,
    destinationAirportFboList,
    onLowPriceConfirmed: () => {
      confirmation.lowPriceConfirmed = true;
    },
    onHighPriceConfirmed: () => confirmation.highPriceConfirmed = true,
    lowPriceConfirmed: confirmation.lowPriceConfirmed,
    highPriceConfirmed: confirmation.highPriceConfirmed
  }
});

OrderFormEftTimepickerShuttle.story = {
  name: 'Order form with eft timepicker for shared charter'
};
