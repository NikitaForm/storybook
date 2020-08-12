import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { EnvironmentEnum } from '../../../environments/environment.interface';
import { SystemComponent } from '../../../shared/components';
import * as sharedTypes from '../../../shared/types';

declare var pg: any;

@Component({
  selector: 'debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DebugComponent extends SystemComponent {
  notificationStyle = 0;
  notificationColor = 0;
  notificationPosition = 0;
  useImage = false;

  constructor(@Inject(sharedTypes.NOTIFICATION_SERVICE_TOKEN) private notificationService: sharedTypes.INotificationService) {
    super();
  }

  showNotification(): void {
    this.notificationService.show(
      `Dev Notification`,
      this.notificationStyle,
      this.notificationColor,
      this.notificationPosition,
      0, this.useImage === true ? 'assets/img/profiles/profile-picture-default.png' : null);
  }
}
