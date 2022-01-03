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

import ServiceClusters from 'teleterm/ui/services/clusters';
import CommandLauncher from 'teleterm/ui/commandLauncher';
import {
  QuickInputPicker,
  Item,
  ItemCmd,
  ItemServer,
  ItemDb,
  ItemNewCluster,
  ItemCluster,
} from './types';

export abstract class ClusterPicker implements QuickInputPicker {
  abstract onFilter(value: string): Item[];
  abstract onPick(result: Item): void;

  launcher: CommandLauncher;
  serviceCluster: ServiceClusters;

  constructor(launcher: CommandLauncher, service: ServiceClusters) {
    this.serviceCluster = service;
    this.launcher = launcher;
  }

  protected searchClusters(value: string): Item[] {
    const clusters = this.serviceCluster.getClusters();
    const items: Item[] = clusters
      .filter(s => !s.leaf)
      .filter(s => {
        return [s.name].join('').toLocaleLowerCase().includes(value);
      })
      .map(cluster => {
        return {
          kind: 'item.cluster',
          data: cluster,
        };
      });

    return items;
  }

  protected searchServers(value: string): Item[] {
    const servers = this.serviceCluster.getServers();
    if (servers.length === 0) {
      return [{ kind: 'item.empty', data: null }];
    }

    return servers
      .filter(s => {
        return [s.uri, s.name, s.hostname]
          .join('')
          .toLocaleLowerCase()
          .includes(value);
      })
      .map(server => {
        return {
          kind: 'item.server',
          data: server,
        };
      });
  }

  protected searchDbs(value: string): Item[] {
    const dbs = this.serviceCluster.getDbs();
    if (dbs.length === 0) {
      return [{ kind: 'item.empty', data: null }];
    }

    return dbs
      .filter(db => {
        return [db.uri, db.name, db.hostname]
          .join('')
          .toLocaleLowerCase()
          .includes(value);
      })
      .map(db => {
        return {
          kind: 'item.db',
          data: db,
        };
      });
  }
}

export class QuickLoginPicker extends ClusterPicker {
  onFilter(value = '') {
    const items = this.searchClusters(value);
    if (value === '') {
      const addNew: ItemNewCluster = {
        kind: 'item.cluster-new',
        data: {
          displayName: 'new cluster...',
          description: 'Enter a new cluster name to login',
        },
      };

      items.unshift(addNew);
    }

    return items;
  }

  onPick(item: ItemCluster | ItemNewCluster) {
    this.launcher.executeCommand('cluster-login', {
      clusterUri: item.data.uri,
    });
  }
}

export class QuickDbPicker extends ClusterPicker {
  onFilter(value = '') {
    return this.searchDbs(value);
  }

  onPick(item: ItemDb) {
    this.launcher.executeCommand('proxy-db', {
      dbUri: item.data.uri,
    });
  }
}

export class QuickServerPicker extends ClusterPicker {
  onFilter(value = '') {
    return this.searchServers(value);
  }

  onPick(item: ItemServer) {
    this.launcher.executeCommand('ssh', {
      serverUri: item.data.uri,
    });
  }
}

export class QuickCmdPicker implements QuickInputPicker {
  launcher: CommandLauncher;

  constructor(launcher: CommandLauncher) {
    this.launcher = launcher;
  }

  onFilter(value = '') {
    return this.launcher
      .getPaletteCommands()
      .filter(cmd => {
        return [cmd.description].join('').toLocaleLowerCase().includes(value);
      })
      .map(cmd => {
        return {
          kind: 'item.cmd' as const,
          data: cmd,
        };
      });
  }

  onPick(item: ItemCmd) {
    this.launcher.executeCommand(item.data.name as any, null);
  }
}
