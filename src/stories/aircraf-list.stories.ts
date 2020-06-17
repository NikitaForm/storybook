import { moduleMetadata } from '@storybook/angular';
import { AircraftListComponent } from '../app/aircraft-list/aircraft-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';

export default {
  title: 'Aircraft-list',
  component: AircraftListComponent,
  decorators: [
    moduleMetadata({
      // imports both components to allow component composition with storybook
      declarations: [AircraftListComponent],
      imports: [CommonModule, GridModule],
    }),
  ],
};

export const AircraftList = () => ({
  component: AircraftListComponent,
  props: {
  },
});

AircraftList.story = {
  name: 'example of aircraft list',
  parameters: { notes: 'My notes' },
};

