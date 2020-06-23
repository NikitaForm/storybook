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
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { FileUploadInterceptor } from './file-upload.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    AppComponent,
    AircraftListComponent,
    MainScreenComponent,
    AircraftFormComponent,
    ImageUploadComponent
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
    TextMaskModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FileUploadInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
