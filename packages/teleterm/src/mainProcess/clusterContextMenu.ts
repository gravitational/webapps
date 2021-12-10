import { ipcMain, ipcRenderer, Menu } from 'electron';
import {
  ClusterContextMenuEventChannel,
  ClusterContextMenuEventType,
  ClusterContextMenuOptions,
} from './types';

type MainClusterContextMenuOptions = Pick<
  ClusterContextMenuOptions,
  'isClusterConnected'
>;

export function subscribeToClusterContextMenuEvent(): void {
  ipcMain.on(
    ClusterContextMenuEventChannel.ToMain,
    (event, options: MainClusterContextMenuOptions) => {
      Menu.buildFromTemplate([
        {
          label: 'Refresh',
          enabled: options.isClusterConnected,
          click: () =>
            event.reply(
              ClusterContextMenuEventChannel.ToRenderer,
              ClusterContextMenuEventType.Refresh
            ),
        },
        {
          type: 'separator',
        },
        {
          label: 'Login',
          enabled: !options.isClusterConnected,
          click: () =>
            event.reply(
              ClusterContextMenuEventChannel.ToRenderer,
              ClusterContextMenuEventType.Login
            ),
        },
        {
          label: 'Logout',
          enabled: options.isClusterConnected,
          click: () =>
            event.reply(
              ClusterContextMenuEventChannel.ToRenderer,
              ClusterContextMenuEventType.Logout
            ),
        },
        {
          type: 'separator',
        },
        {
          label: 'Remove',
          click: () =>
            event.reply(
              ClusterContextMenuEventChannel.ToRenderer,
              ClusterContextMenuEventType.Remove
            ),
        },
      ]).popup();
    }
  );
}

export function openClusterContextMenu(
  options: ClusterContextMenuOptions
): void {
  ipcRenderer.removeAllListeners(ClusterContextMenuEventChannel.ToRenderer);
  ipcRenderer.on(
    ClusterContextMenuEventChannel.ToRenderer,
    (event, eventType: ClusterContextMenuEventType) => {
      switch (eventType) {
        case ClusterContextMenuEventType.Refresh:
          return options.onRefresh();
        case ClusterContextMenuEventType.Login:
          return options.onLogin();
        case ClusterContextMenuEventType.Logout:
          return options.onLogout();
        case ClusterContextMenuEventType.Remove:
          return options.onRemove();
      }
    }
  );

  const mainOptions: MainClusterContextMenuOptions = {
    isClusterConnected: options.isClusterConnected,
  };
  ipcRenderer.send(ClusterContextMenuEventChannel.ToMain, mainOptions);
}
