import { moduleMetadata } from '@storybook/angular';
import { AircraftListComponent } from '../app/aircraft-list/aircraft-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { MainScreenComponent } from '../app/main-screen/main-screen.component';
import { AppRoutingModule } from '../app/app-routing.module';
import { AircraftFormComponent } from '../app/aircraft-form/aircraft-form.component';
import { linkTo } from '@storybook/addon-links';
import { LayoutModule } from '@progress/kendo-angular-layout';

export default {
  title: 'Aircraft-list',
  component: AircraftListComponent,
  decorators: [
    moduleMetadata({
      // imports both components to allow component composition with storybook
      declarations: [AircraftListComponent, MainScreenComponent, AircraftFormComponent],
      imports: [CommonModule, GridModule, AppRoutingModule, LayoutModule],
      providers: [ { provide: APP_BASE_HREF, useValue: '/iframe.html' } ]
    }),
  ],
};

export const AircraftList = () => ({
  component: AircraftListComponent,
  props: {
    onEdit: (a) => {
      linkTo('Aircraft-list', 'AircraftForm');
    }
  },
});

AircraftList.story = {
  name: 'example of aircraft list',
  parameters: { notes: 'My notes' },
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
});

AircraftForm.story = {
  name: 'aircraft-form'
};

