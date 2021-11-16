import {
  GlobalSearchProvider,
  Result,
} from 'teleterm/ui/services/globalSearch/types';
import ServiceClusters from './clusters';
import uri from 'teleterm/ui/uris';

export default class ClusterSearchProvider implements GlobalSearchProvider {
  serviceCluster: ServiceClusters;

  constructor(service: ServiceClusters) {
    this.serviceCluster = service;
  }

  search(value: string): Result[] {
    return [
      ...this._searchQuickNavs(value),
      ...this._searchServers(value),
      ...this._searchDbs(value),
    ];
  }

  private _searchQuickNavs(value: string): Result[] {
    const quickNavs: Result[] = [];
    [...this.serviceCluster.state.clusters.values()]
      .filter(c => c.connected)
      .forEach(c => {
        quickNavs.push({
          kind: 'servers',
          data: {
            ...c,
            uri: uri.getUriServer({ clusterId: c.name }),
          },
        });
        quickNavs.push({
          kind: 'dbs',
          data: {
            ...c,
            uri: uri.getUriDbs({ clusterId: c.name }),
          },
        });
      });

    return quickNavs.filter(n => n.kind.includes(value));
  }

  private _searchServers(value: string): Result[] {
    const servers = this.serviceCluster.getServers();
    return servers
      .filter(s => {
        return [s.uri, s.name, s.hostname]
          .join('')
          .toLocaleLowerCase()
          .includes(value);
      })
      .map(server => {
        return {
          kind: 'server',
          data: server,
        };
      });
  }

  private _searchDbs(value: string): Result[] {
    const dbs = this.serviceCluster.getDbs();
    return dbs
      .filter(db => {
        return [db.uri, db.name, db.hostname]
          .join('')
          .toLocaleLowerCase()
          .includes(value);
      })
      .map(db => {
        return {
          kind: 'db',
          data: db,
        };
      });
  }
}
