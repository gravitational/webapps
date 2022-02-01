/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useAppContext } from 'teleterm/ui/appContextProvider';

export function useExpanderConnections() {
  const { connectionTracker, mainProcessClient, docsService } = useAppContext();

  connectionTracker.useState();

  function onContextMenu(id: string) {
    if (connectionTracker.findConnection(id).kind === 'connection.gateway') {
      return; //TODO: add 'connection.gateway' support
    }

    mainProcessClient.openConnectionContextMenu({
      isConnected: connectionTracker.isConnected(id),
      onConnect() {
        console.log('TODO');
      },
      onClose() {
        connectionTracker
          .findAllTshDocuments(id)
          .forEach(document => docsService.close(document.uri));
      },
      onRemove() {
        connectionTracker.processItemRemove(id);
      },
      onDuplicate() {
        const [tshDocument] = connectionTracker.findAllTshDocuments(id);
        if (tshDocument) {
          docsService.duplicatePtyAndActivate(tshDocument.uri);
        }
      },
    });
  }

  return {
    processRemove: connectionTracker.processItemRemove,
    processClick: connectionTracker.processItemClick,
    items: connectionTracker.state.connections,
    onContextMenu,
  };
}

export type State = ReturnType<typeof useExpanderConnections>;
