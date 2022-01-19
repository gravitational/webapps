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

import * as Icons from 'design/Icon';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import AppContext from 'teleterm/ui/appContext';
import * as types from 'teleterm/ui/Navigator/types';
import { Document, DocumentTshNode } from 'teleterm/ui/services/docs/types';
import React, { useEffect } from 'react';

export default function useExpanderConnections() {
  const ctx = useAppContext();
  const items = getWorkspaceItems(ctx);
  const [, rerender] = React.useState<any>();

  // subscribe to services
  ctx.clustersService.useState();
  ctx.docsService.useState();

  //TODO: think how to use useStore for services from context bridge
  useEffect(() => {
    function onChange() {
      rerender({});
    }

    ctx.workspaceService.subscribe(onChange);
    return () => ctx.workspaceService.unsubscribe(onChange);
  }, []);

  return {
    items,
    onItemOpen: (item: ConnectionItem) => handleItemOpen(ctx, item),
    onItemRemove: (item: ConnectionItem) => handleItemRemove(ctx, item),
  };
}

function getWorkspaceItems(ctx: AppContext): ConnectionItem[] {
  return [
    ...ctx.workspaceService
      .getRecentDocuments()
      .map(document => createConnectionItem(ctx, document)),
  ].sort(item => {
    if (item.status === 'connected') {
      return -1;
    }
    return 1;
  });
}

function handleItemOpen(ctx: AppContext, item: ConnectionItem) {
  if (!ctx.docsService.getDocuments().find(d => d.uri === item.uri)) {
    const recentDocument = ctx.workspaceService
      .getRecentDocuments()
      .find(d => d.uri === item.uri);
    if (recentDocument) {
      if (recentDocument.kind === 'doc.terminal_tsh_node') {
        const disconnectedDocument: Document = {
          ...recentDocument,
          status: 'disconnected',
        };
        ctx.docsService.add(disconnectedDocument);
      } else {
        ctx.docsService.add(recentDocument);
      }
    }
  }
  ctx.docsService.open(item.uri);
}

function handleItemRemove(ctx: AppContext, item: ConnectionItem) {
  ctx.workspaceService.removeFromRecentDocuments(item.uri);
}

function createConnectionItem(
  ctx: AppContext,
  document: Document
): ConnectionItem {
  function getStatus() {
    switch (document.kind) {
      case 'doc.terminal_tsh_node':
        return (ctx.docsService.getDocument(document.uri) as DocumentTshNode)
          ?.status === 'connected'
          ? 'connected'
          : 'disconnected';
      case 'doc.gateway':
        return ctx.clustersService.findGateway(document.uri)
          ? 'connected'
          : 'disconnected';
    }
  }

  return {
    status: getStatus(),
    uri: document.uri,
    title: document.title,
    Icon: Icons.Keypair,
    items: [],
    group: false,
  };
}

export interface ConnectionItem extends types.NavItem {
  readonly status: 'connected' | 'disconnected';
}

export type State = ReturnType<typeof useExpanderConnections>;
