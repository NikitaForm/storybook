import { moduleMetadata } from '@storybook/angular';
import { GridModule } from '@progress/kendo-angular-grid';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from '../app/app-routing.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
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
import { ConfirmationDialogComponent } from '../app/confirmation-dialog/confirmation-dialog.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { OrderFormComponentDT } from '../app/order-form-dt/order-form.component';
import { MainLandingScreenComponent } from '../app/main-landing/main-screen.component';
import { LandingComponent } from '../app/landing/landing.component';
import { PagesModule } from '../assets/pages/components/pages.module';
import { linkTo } from '@storybook/addon-links';
import { MainScreenProfileComponent } from '../app/profile-stories/main-screen-profile/main-screen-profile.component';
import { ProfileViewComponent } from '../app/profile-stories/profile/profile-view.component';

export default {
  title: 'Introducing Profile Page',
  component: MainLandingScreenComponent,
  decorators: [
    moduleMetadata({
      declarations: [OrderFormComponent, AircraftListComponent, MainScreenComponent, AircraftFormComponent, ImageUploadComponent,
        AircraftFormV2Component, EnumToArrayPipe, PriceTypePipe, ConfirmationDialogComponent, OrderFormComponentDT,
        MainLandingScreenComponent, LandingComponent, MainScreenProfileComponent, ProfileViewComponent],
      imports: [CommonModule, GridModule, AppRoutingModule, LayoutModule,
        FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), DatePickerModule,
        ScrollViewModule, BrowserModule, BrowserAnimationsModule, UploadModule, HttpClientModule,
        TextMaskModule, SharedModule, TimePickerModule, DialogModule, DateTimePickerModule, PagesModule,
        DropDownsModule, BsDropdownModule.forRoot()],
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

export const LandingPage = () => ({
  component: MainLandingScreenComponent,
  props: {
    showProfile: linkTo('introducing-profile-page--profile-view')
  },
});

LandingPage.story = {
  name: 'Landing Page'
};

export const ProfileView = () => ({
  component: MainScreenProfileComponent,
});

ProfileView.story = {
  name: 'Operator Profile Page'
};
