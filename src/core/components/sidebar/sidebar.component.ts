import {
  Component,
  Input,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import * as sharedTypes from '../../../shared/types';
import * as models from '../../models';

@Component({
  selector: 'op-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppSidebarComponent {
  @Input() viewPermissions: models.ViewPermissions = null;
  @Input() overlay = false;
  @Input() collapsed = true;

  get viewPublishedFlights(): boolean {
    if (this.viewPermissions !== null) {
      return this.viewPermissions.publishedFlights;
    }
    return false;
  }

  get viewFulfillFlights(): boolean {
    if (this.viewPermissions !== null) {
      return this.viewPermissions.fulfillFlights;
    }
    return false;
  }
}
