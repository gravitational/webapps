import { ImmutableStore } from 'teleterm/ui/services/immutableStore';
import {
  NotificationItem,
  NotificationItemContent,
  NotificationItemOptions,
} from 'teleterm/ui/components/Notifcations';
import { useStore } from 'shared/libs/stores';
import { unique } from 'teleterm/ui/utils/uid';

export class NotificationsService extends ImmutableStore<NotificationItem[]> {
  state: NotificationItem[] = [];

  notifyError(
    content: NotificationItemContent,
    options?: NotificationItemOptions
  ): string {
    return this.notify({ severity: 'error', content, ...options });
  }

  notifyWarning(
    content: NotificationItemContent,
    options?: NotificationItemOptions
  ): string {
    return this.notify({ severity: 'warn', content, ...options });
  }

  notifyInfo(
    content: NotificationItemContent,
    options?: NotificationItemOptions
  ): string {
    return this.notify({ severity: 'info', content, ...options });
  }

  removeNotification(id: string): void {
    this.setState(draftState =>
      draftState.filter(stateItem => stateItem.id !== id)
    );
  }

  getNotifications(): NotificationItem[] {
    return this.state;
  }

  useState(): NotificationItem[] {
    return useStore(this).state;
  }

  private notify(options: Omit<NotificationItem, 'id'>): string {
    const id = unique();

    this.setState(draftState => {
      draftState.push({
        ...options,
        id,
      });
    });

    return id;
  }
}
