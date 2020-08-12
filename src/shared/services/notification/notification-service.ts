import * as contracts from './contacts';
import { Inject, Injectable } from '@angular/core';
import { MessageService } from '../../../assets/pages/components/message/message.service';

@Injectable()
export class NotificationService implements contracts.INotificationService {

  constructor(private notificationService: MessageService) {
  }

  show(
    message: string, style: contracts.NotificationStyle,
    type: contracts.NotificationType, position: contracts.NotificationPosition,
    timeout = 3000,
    imgURL?: string): string {

    const returnObj = this.notificationService.create(
      getColor(type),
      message,
      {
        imgURL,
        Position: getPosition(position),
        Style: getStyle(style),
        Duration: timeout
      });

    return returnObj.messageId;
  }

  remove(messgaeId: string): void {
    this.notificationService.remove(messgaeId);
  }
}

export const getPosition = (position: contracts.NotificationPosition): any => {
  switch (position) {
    case contracts.NotificationPosition.Bottom:
      return 'bottom';
    case contracts.NotificationPosition.BottomLeft:
      return 'bottom-left';
    case contracts.NotificationPosition.BottomRight:
      return 'bottom-right';
    case contracts.NotificationPosition.Top:
      return 'top';
    case contracts.NotificationPosition.TopLeft:
      return 'top-left';
    case contracts.NotificationPosition.TopRight:
      return 'top-right';
    default:
      throw new Error(`Position ${position} is not supported`);
  }
};

export const getColor = (type: contracts.NotificationType): any => {
  switch (type) {
    case contracts.NotificationType.Danger:
      return 'danger';
    case contracts.NotificationType.Default:
      return 'default';
    case contracts.NotificationType.Info:
      return 'info';
    case contracts.NotificationType.Success:
      return 'success';
    case contracts.NotificationType.Warning:
      return 'warning';
    default:
      throw new Error(`Color ${type} is not supported`);
  }
};

export const getStyle = (style: contracts.NotificationStyle): any => {
  switch (style) {
    case contracts.NotificationStyle.Bar:
      return 'bar';
    case contracts.NotificationStyle.Circle:
      return 'circle';
    case contracts.NotificationStyle.Flip:
      return 'flip';
    case contracts.NotificationStyle.Simple:
      return 'simple';
    default:
      throw new Error(`Style ${style} is not supported`);
  }
};
