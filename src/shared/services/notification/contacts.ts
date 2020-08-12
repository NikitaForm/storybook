import { InjectionToken } from '@angular/core';

export interface INotificationService {
  show(message, style: NotificationStyle, type: NotificationType,
    position: NotificationPosition, timeout?: number, imageUrl?: string): string;

  remove(messageId: string): void;
  // show(message): void;
}

export const NOTIFICATION_SERVICE_TOKEN = new InjectionToken('Shared.NotificationService');

export enum NotificationStyle {
  Bar,
  Circle,
  Flip,
  Simple
}

export enum NotificationType {
  Danger,
  Default,
  Info,
  Warning,
  Success
}

export enum NotificationPosition {
  Top,
  TopLeft,
  TopRight,
  Bottom,
  BottomLeft,
  BottomRight
}
