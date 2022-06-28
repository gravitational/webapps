import { createContext, useState } from 'react';

// Notification Context
type NotificationContextType = ReturnType<typeof makeNotificationContextValue>;

const NotificationContext = createContext<NotificationContextType | null>(null);

// Context Value
const makeNotificationContextValue = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (index: number) => {
    setNotifications([
      ...notifications.slice(0, index),
      ...notifications.slice(index + 1),
    ]);
  };

  const addNotification = (message: string) => {
    setNotifications([...notifications, message]);
  };

  return {
    notifications,
    removeNotification,
    addNotification,
  };
};

export { NotificationContext, makeNotificationContextValue };
