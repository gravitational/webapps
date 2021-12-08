import { ipcMain, ipcRenderer, Menu } from 'electron';

enum ClusterContextMenuEventChannel {
  ToMain = 'main-process-cluster-context-menu-to-main',
  ToRenderer = 'main-process-cluster-context-menu-to-renderer',
}

enum ClusterContextMenuEventType {
  Refresh = 'Refresh',
  Login = 'Login',
  Logout = 'Logout',
  Remove = 'Remove',
}

export interface ClusterContextMenuOptions {
  isClusterConnected: boolean;

  onRefresh(): void;

  onLogin(): void;

  onLogout(): void;

  onRemove(): void;
}

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
