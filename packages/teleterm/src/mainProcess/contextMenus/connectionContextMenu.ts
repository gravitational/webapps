import { ipcMain, ipcRenderer, Menu } from 'electron';
import {
  ConnectionContextMenuEventChannel,
  ConnectionContextMenuEventType,
  ConnectionContextMenuOptions,
} from '../types';

type MainConnectionContextMenuOptions = Pick<
  ConnectionContextMenuOptions,
  'isConnected'
>;

export function subscribeToConnectionContextMenuEvent(): void {
  ipcMain.handle(
    ConnectionContextMenuEventChannel,
    (event, options: MainConnectionContextMenuOptions) => {
      return new Promise(resolve => {
        Menu.buildFromTemplate([
          {
            label: 'Connect...',
            enabled: !options.isConnected,
            click: () => resolve(ConnectionContextMenuEventType.Connect),
          },
          {
            label: 'Duplicate Connection',
            enabled: options.isConnected,
            click: () => resolve(ConnectionContextMenuEventType.Duplicate),
          },
          {
            label: 'Close Connection',
            enabled: options.isConnected,
            click: () => resolve(ConnectionContextMenuEventType.Close),
          },
          {
            label: 'Remove Connection',
            enabled: !options.isConnected,
            click: () => resolve(ConnectionContextMenuEventType.Remove),
          },
        ]).popup({
          callback: () => resolve(undefined),
        });
      });
    }
  );
}

export async function openConnectionContextMenu(
  options: ConnectionContextMenuOptions
): Promise<void> {
  const mainOptions: MainConnectionContextMenuOptions = {
    isConnected: options.isConnected,
  };
  const eventType = await ipcRenderer.invoke(
    ConnectionContextMenuEventChannel,
    mainOptions
  );
  switch (eventType) {
    case ConnectionContextMenuEventType.Connect:
      return options.onConnect();
    case ConnectionContextMenuEventType.Duplicate:
      return options.onDuplicate();
    case ConnectionContextMenuEventType.Close:
      return options.onClose();
    case ConnectionContextMenuEventType.Remove:
      return options.onRemove();
  }
}
