import { ipcMain, ipcRenderer } from 'electron';

import {
  FileStorageEventChannel,
  FileStorageEventType,
} from '../../mainProcess/types';

import { FileStorage } from './fileStorage';

export function subscribeToFileStorageEvents(configService: FileStorage): void {
  ipcMain.on(
    FileStorageEventChannel,
    (event, eventType: FileStorageEventType, item) => {
      switch (eventType) {
        case FileStorageEventType.Get:
          return (event.returnValue = configService.get(item.path));
        case FileStorageEventType.PutKey:
          return configService.putKey(item.path, item.json);
        case FileStorageEventType.Put:
          return configService.put(item.json);
        case FileStorageEventType.PutAllSync:
          return configService.putAllSync();
      }
    }
  );
}

export function createFileStorageClient(): FileStorage {
  return {
    get: path =>
      ipcRenderer.sendSync(FileStorageEventChannel, FileStorageEventType.Get, {
        path,
      }),
    put: json =>
      ipcRenderer.send(FileStorageEventChannel, FileStorageEventType.Put, {
        json,
      }),
    putKey: (key, json) =>
      ipcRenderer.send(FileStorageEventChannel, FileStorageEventType.PutKey, {
        key,
        json,
      }),
    putAllSync: () =>
      ipcRenderer.send(
        FileStorageEventChannel,
        FileStorageEventType.PutAllSync,
        {}
      ),
  };
}
