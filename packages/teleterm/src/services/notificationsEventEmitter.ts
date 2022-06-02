import { NotificationItemContent } from 'teleterm/ui/components/Notifcations';

interface SimpleEventEmitter<T extends Record<string, any>> {
  emit<K extends keyof T>(key: K, value: T[K]): void;

  on<K extends keyof T>(key: K, fn: (value: T[K]) => void): this;
}

function getSimpleEventEmitter<T>(): SimpleEventEmitter<T> {
  const subscribers = new Set<{ key: keyof T; fn: (value: any) => void }>();
  const eventEmitter: SimpleEventEmitter<T> = {
    emit(key, value) {
      subscribers.forEach(s => {
        if (s.key === key) {
          s.fn(value);
        }
      });
    },
    on(key, fn) {
      subscribers.add({ key, fn });
      return eventEmitter;
    },
  };

  return eventEmitter;
}

type NotificationsEventsMap = Record<
  'notifyInfo' | 'notifyWarning' | 'notifyError',
  NotificationItemContent
>;

export type NotificationsEventEmitter =
  SimpleEventEmitter<NotificationsEventsMap>;

export function getNotificationsEventEmitter(): NotificationsEventEmitter {
  return getSimpleEventEmitter<NotificationsEventsMap>();
}
