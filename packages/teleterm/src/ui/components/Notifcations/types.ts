import { ReactElement } from 'react';

export interface NotificationItemOptions {
  autoRemoveDisabled?: boolean;
}

export interface NotificationItem extends NotificationItemOptions {
  content: NotificationItemContent;
  severity: 'info' | 'warn' | 'error';
  id: string;
}

export type NotificationItemContent =
  | string
  | { title: string; description: string }
  | ReactElement;
