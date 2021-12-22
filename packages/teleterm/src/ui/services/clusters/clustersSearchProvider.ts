import {
  GlobalSearchProvider,
  Result,
} from 'teleterm/ui/services/globalSearch/types';
import ServiceClusters from './clusters';

export default class ClusterSearchProvider implements GlobalSearchProvider {
  serviceCluster: ServiceClusters;

  constructor(service: ServiceClusters) {
    this.serviceCluster = service;
  }

  search(value: string): Result[] {
    return [...this._searchServers(value), ...this._searchDbs(value)];
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
          kind: 'tsh.server',
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
          kind: 'tsh.db',
          data: db,
        };
      });
  }
}
