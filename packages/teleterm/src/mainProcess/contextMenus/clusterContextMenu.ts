import { ipcMain, ipcRenderer, Menu } from 'electron';
import {
  ClusterContextMenuEventChannel,
  ClusterContextMenuEventType,
  ClusterContextMenuOptions,
} from '../types';

type MainClusterContextMenuOptions = Pick<
  ClusterContextMenuOptions,
  'isConnected' | 'isRoot'
>;

export function subscribeToClusterContextMenuEvent(): void {
  ipcMain.handle(
    ClusterContextMenuEventChannel,
    (event, options: MainClusterContextMenuOptions) => {
      return new Promise(resolve => {
        Menu.buildFromTemplate([
          {
            label: 'Refresh',
            enabled: options.isConnected,
            click: () => resolve(ClusterContextMenuEventType.Refresh),
          },
          {
            type: 'separator',
          },
          {
            label: 'Login',
            enabled: options.isRoot && !options.isConnected,
            click: () => resolve(ClusterContextMenuEventType.Login),
          },
          {
            label: 'Logout',
            enabled: options.isRoot && options.isConnected,
            click: () => resolve(ClusterContextMenuEventType.Logout),
          },
          {
            type: 'separator',
          },
          {
            label: 'Remove',
            enabled: options.isRoot,
            click: () => resolve(ClusterContextMenuEventType.Remove),
          },
        ]).popup({
          callback: () => resolve(undefined),
        });
      });
    }
  );
}

export async function openClusterContextMenu(
  options: ClusterContextMenuOptions
): Promise<void> {
  const mainOptions: MainClusterContextMenuOptions = {
    isConnected: options.isConnected,
    isRoot: options.isRoot,
  };
  const eventType = await ipcRenderer.invoke(
    ClusterContextMenuEventChannel,
    mainOptions
  );
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
