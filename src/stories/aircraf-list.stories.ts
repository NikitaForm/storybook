import { moduleMetadata } from '@storybook/angular';
import { AircraftListComponent } from '../app/aircraft-list/aircraft-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { MainScreenComponent } from '../app/main-screen/main-screen.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { AircraftFormComponent } from '../app/aircraft-form/aircraft-form.component';
import { linkTo } from '@storybook/addon-links';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FileUploadInterceptor } from '../app/file-upload.interceptor';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ImageUploadComponent } from '../app/image-upload/image-upload.component';
import { AutoCompleteModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextMaskModule } from 'angular2-text-mask';
import { AircraftFormV2Component } from '../app/aircraft-form-v2/aircraft-form-v2.component';
import { MainScreenFleetComponent } from '../app/aircraft-card-list/main-screen-fleet/main-screen-fleet.component';
import { AircraftListCardComponent } from '../app/aircraft-card-list/aircraft-list/aircraft-list.component';
import { AircraftListCardPageComponent } from '../app/aircraft-card-list/aircraft-list-page/aircraft-list-page.component';
import { pgTabsModule } from '../assets/pages/components/tabs/tabs.module';
import { PagesModule } from '../assets/pages/components/pages.module';
import { SharedModule } from '../shared/shared.module';
import { AircraftListFiltersComponent } from '../app/aircraft-card-list/aircraft-list-filters/aircraft-list-filters.component';

export default {
  title: 'Aircraft-list',
  component: AircraftListComponent,
  decorators: [
    moduleMetadata({
      declarations: [AircraftListComponent, MainScreenComponent, AircraftFormComponent, ImageUploadComponent,
        AircraftFormV2Component, MainScreenFleetComponent, AircraftListCardComponent, AircraftListCardPageComponent, AircraftListFiltersComponent],
      imports: [CommonModule, GridModule, AppRoutingModule, LayoutModule,
        FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), DatePickerModule,
        ScrollViewModule, BrowserModule, BrowserAnimationsModule, UploadModule, HttpClientModule,
        DropDownsModule, TextMaskModule, pgTabsModule, PagesModule, SharedModule, AutoCompleteModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/iframe.html'},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FileUploadInterceptor,
          multi: true
        }]
    }),
  ],
};

const aircraft = {
    'modelName': 'Gulfstream G200',
    'aircraftId': 301,
    'amenities': [
      {
        'id': '7',
        'name': 'Pets Allowed',
        'visible': true
      }, {
        'id': '6',
        'name': 'Coffee Machine',
        'visible': true
      }
    ],
    'tailNumber': 'N100EK',
    'modelId': 98,
    'categoryId': 6,
    'categoryName': 'Super Mid Size Jet',
    'operatorName': 'Delta Private Jets, Inc.',
    'yom': 2006,
    'yor': 2012,
    'maxPax': 8,
    'insuranceCurrency': 'US',
    'insuranceAmount': 150000000,
    'insuranceExpirationDate': null,
    'insuranceApproved': false,
    'homeBase': 'KTEB',
    'requiresOwnerApproval': null,
    'deleted': false,
    'shuttleMaxPax': null,
    'noChange': false,
    'source': 'migration',
    'images': [
      {
        'url': 'https://d291r578x84oc8.cloudfront.net/delta/2016-11-22/N100EK/n100ek_int2.jpg',
        'id': '2836',
        'type': 'INTERIOR',
        'width': 1626,
        'height': 800,
        'sortOrder': 0
      },
      {
        'url': 'https://d291r578x84oc8.cloudfront.net/delta/2016-11-22/N100EK/n100ek_int.jpg',
        'id': '2835',
        'type': 'INTERIOR',
        'width': 1626,
        'height': 800,
        'sortOrder': 0
      },
      {
        'url': 'https://d291r578x84oc8.cloudfront.net/delta/2016-11-22/N100EK/n100ek_layout.png',
        'id': '2838',
        'type': 'FLOORPLAN',
        'width': 702,
        'height': 370,
        'sortOrder': 0
      },
      {
        'url': 'https://d291r578x84oc8.cloudfront.net/delta/2016-11-22/N100EK/n100ek_int3.jpg',
        'id': '2837',
        'type': 'INTERIOR',
        'width': 1626,
        'height': 800,
        'sortOrder': 0
      },
      {
        'url': 'https://d291r578x84oc8.cloudfront.net/delta/2016-11-22/N100EK/n100ek_ext.jpg',
        'id': '2833',
        'type': 'EXTERIOR',
        'width': 1626,
        'height': 800,
        'sortOrder': 0
      },
      {
        'url': 'https://d291r578x84oc8.cloudfront.net/delta/2016-11-22/N100EK/n100ek_ext2.jpg',
        'id': '2834',
        'type': 'EXTERIOR',
        'width': 1626,
        'height': 800,
        'sortOrder': 0
      }
    ],
    'serviceClassId': 0,
    'completed': false,
    'notes': null,
    'costPerHour': 5500,
    'capacity': 8
  };

export const AircraftList = () => ({
  component: AircraftListComponent,
  props: {
    onEdit: linkTo('aircraft-list--aircraft-form-v-2')
  },
});

AircraftList.story = {
  name: 'example of aircraft list',
  parameters: {notes: 'My notes'},
};

export const AircraftListOnMainScreen = () => ({
  component: MainScreenComponent,
  props: {
    onEdit: (a) => {
      linkTo('Aircraft-list');
    }
  },
});

AircraftListOnMainScreen.story = {
  name: 'main screen view'
};

export const AircraftForm = () => ({
  component: AircraftFormComponent,
  props: {
    aircraft: aircraft
  }
});

AircraftForm.story = {
  name: 'aircraft form with multiselect'
};

export const AircraftFormV2 = () => ({
  component: AircraftFormV2Component,
  props: {
    aircraft: aircraft
  }
});

AircraftFormV2.story = {
  name: 'aircraft form with checkboxes'
};

export const AircraftListAsCards = () => ({
  component: MainScreenFleetComponent,
  props: {
    onEdit: (a) => {
      linkTo('Aircraft-list');
    }
  },
});

AircraftListAsCards.story = {
  name: 'Aircraft list as cards'
};

