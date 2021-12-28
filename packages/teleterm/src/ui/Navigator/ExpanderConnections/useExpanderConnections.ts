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

export default function useExpanderConnections() {
  const ctx = useAppContext();
  const items = initItems(ctx);

  // subscribe to services
  ctx.serviceClusters.useState();
  ctx.serviceDocs.useState();

  return {
    serviceClusters: ctx.serviceClusters,
    items,
  };
}

function initItems(ctx: AppContext): ConnectionItem[] {
  const gateways = ctx.serviceClusters.getGateways();
  const tshDocs = ctx.serviceDocs.getTshNodeDocuments();

  const demoHistoryItems: ConnectionItem[] = [
    {
      title: 'root@node1',
      kind: 'nav.connection-tsh',
      uri: '/nothing/402',
      Icon: Icons.Keypair,
      items: [],
      group: false,
      status: 'disconnected',
    },
    {
      title: 'pearl@node1',
      kind: 'nav.connection-tsh',
      uri: '/nothing/2cf',
      Icon: Icons.Keypair,
      items: [],
      group: false,
      status: 'disconnected',
    },
    {
      title: 'lulu@node1',
      kind: 'nav.connection-tsh',
      uri: '/nothing/23b',
      Icon: Icons.Keypair,
      items: [],
      group: false,
      status: 'disconnected',
    },
  ];

  const tshItems: ConnectionItem[] = tshDocs.map(d => ({
    title: d.title,
    status: 'connected',
    kind: 'nav.connection-tsh',
    uri: d.uri,
    Icon: Icons.Keypair,
    items: [],
    group: false,
  }));

  const gwItems: ConnectionItem[] = gateways.map(g => ({
    title: g.resourceName,
    status: 'connected',
    Icon: Icons.Keypair,
    uri: g.uri,
    kind: 'nav.connection-gw',
    items: [],
    group: false,
  }));

  return [...tshItems, ...gwItems, ...demoHistoryItems];
}

export interface ConnectionItem extends types.NavItem {
  status: 'connected' | 'disconnected';
  kind: 'nav.connection-tsh' | 'nav.connection-gw';
}

export type State = ReturnType<typeof useExpanderConnections>;
