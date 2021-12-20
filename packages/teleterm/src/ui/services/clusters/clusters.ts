import { useStore } from 'shared/libs/stores';
import ClusterSearchProvider from './clustersSearchProvider';
import { tsh, SyncStatus, AuthSettings, LoginParams } from './types';
import { ImmutableStore } from '../immutableStore';

type State = {
  clusters: Map<string, tsh.Cluster>;
  gateways: Map<string, tsh.Gateway>;
  apps: Map<string, tsh.Application>;
  servers: Map<string, tsh.Server>;
  kubes: Map<string, tsh.Kube>;
  dbs: Map<string, tsh.Database>;
  kubesSyncStatus: Map<string, SyncStatus>;
  appsSyncStatus: Map<string, SyncStatus>;
  serversSyncStatus: Map<string, SyncStatus>;
  dbsSyncStatus: Map<string, SyncStatus>;
};

export default class ClusterService extends ImmutableStore<State> {
  searchProvider: ClusterSearchProvider;
  state: State = {
    apps: new Map(),
    kubes: new Map(),
    clusters: new Map(),
    gateways: new Map(),
    servers: new Map(),
    dbs: new Map(),
    serversSyncStatus: new Map(),
    dbsSyncStatus: new Map(),
    kubesSyncStatus: new Map(),
    appsSyncStatus: new Map(),
  };

  constructor(public client: tsh.TshClient) {
    super();
    this.searchProvider = new ClusterSearchProvider(this);
  }

  async addCluster(clusterUri: string) {
    const cluster = await this.client.addCluster(clusterUri);
    this.setState(draft => {
      draft.clusters.set(cluster.uri, cluster);
    });

    return cluster;
  }

  async logout(clusterUri: string) {
    await this.client.logout(clusterUri);
    await this.syncClusterOnly(clusterUri);
    this.cleanUpClusterResources(clusterUri);
  }

  async login(params: LoginParams, abortSignal: tsh.TshAbortSignal) {
    await this.client.login(params, abortSignal);
    await this.syncCluster(params.clusterUri);
  }

  async syncCluster(clusterUri: string) {
    await this.syncClusterOnly(clusterUri);

    // do not await these
    this.syncKubes(clusterUri);
    this.syncApps(clusterUri);
    this.syncDbs(clusterUri);
    this.syncServers(clusterUri);
    this.syncGateways();
  }

  async syncClusters() {
    const clusters = await this.client.listClusters();
    this.setState(draft => {
      draft.clusters = new Map(clusters.map(c => [c.uri, c]));
    });

    clusters.filter(c => c.connected).forEach(c => this.syncCluster(c.uri));
  }

  async syncGateways() {
    const gws = await this.client.listGateways();

    this.setState(draft => {
      draft.gateways = new Map(gws.map(g => [g.uri, g]));
    });
  }

  async syncKubes(clusterUri: string) {
    const cluster = this.state.clusters.get(clusterUri);
    if (!cluster.connected) {
      this.setState(draft => {
        draft.kubesSyncStatus.delete(clusterUri);
        helpers.updateMap(clusterUri, draft.kubes, []);
      });

      return;
    }

    this.setState(draft => {
      draft.kubesSyncStatus.set(clusterUri, {
        status: 'processing',
      });
    });

    try {
      const received = await this.client.listKubes(clusterUri);
      this.setState(draft => {
        draft.kubesSyncStatus.set(clusterUri, { status: 'ready' });
        helpers.updateMap(clusterUri, draft.kubes, received);
      });
    } catch (err) {
      this.setState(draft => {
        draft.kubesSyncStatus.set(clusterUri, {
          status: 'failed',
          statusText: err.message,
        });
      });
    }
  }

  async syncApps(clusterUri: string) {
    const cluster = this.state.clusters.get(clusterUri);
    if (!cluster.connected) {
      this.setState(draft => {
        draft.appsSyncStatus.delete(clusterUri);
        helpers.updateMap(clusterUri, draft.apps, []);
      });

      return;
    }

    this.setState(draft => {
      draft.appsSyncStatus.set(clusterUri, {
        status: 'processing',
      });
    });

    try {
      const received = await this.client.listApps(clusterUri);
      this.setState(draft => {
        draft.appsSyncStatus.set(clusterUri, { status: 'ready' });
        helpers.updateMap(clusterUri, draft.apps, received);
      });
    } catch (err) {
      this.setState(draft => {
        draft.appsSyncStatus.set(clusterUri, {
          status: 'failed',
          statusText: err.message,
        });
      });
    }
  }

  async syncDbs(clusterUri: string) {
    const cluster = this.state.clusters.get(clusterUri);
    if (!cluster.connected) {
      this.setState(draft => {
        draft.dbsSyncStatus.delete(clusterUri);
        helpers.updateMap(clusterUri, draft.dbs, []);
      });

      return;
    }

    this.setState(draft => {
      draft.dbsSyncStatus.set(clusterUri, {
        status: 'processing',
      });
    });

    try {
      const received = await this.client.listDatabases(clusterUri);
      this.setState(draft => {
        draft.dbsSyncStatus.set(clusterUri, { status: 'ready' });
        helpers.updateMap(clusterUri, draft.dbs, received);
      });
    } catch (err) {
      this.setState(draft => {
        draft.dbsSyncStatus.set(clusterUri, {
          status: 'failed',
          statusText: err.message,
        });
      });
    }
  }

  async syncServers(clusterUri: string) {
    const cluster = this.state.clusters.get(clusterUri);
    if (!cluster.connected) {
      this.setState(draft => {
        delete draft.serversSyncStatus[clusterUri];
        helpers.updateMap(clusterUri, draft.servers, []);
      });

      return;
    }

    this.setState(draft => {
      draft.serversSyncStatus[clusterUri] = {
        status: 'processing',
      };
    });

    try {
      const received = await this.client.listServers(clusterUri);
      this.setState(draft => {
        draft.serversSyncStatus.set(clusterUri, { status: 'ready' });
        helpers.updateMap(clusterUri, draft.servers, received);
      });
    } catch (err) {
      this.setState(draft => {
        draft.serversSyncStatus[clusterUri] = {
          status: 'failed',
          statusText: err.message,
        };
      });
    }
  }

  async removeCluster(clusterUri: string) {
    await this.client.removeCluster(clusterUri);
    this.setState(draft => {
      draft.clusters.delete(clusterUri);
    });
    this.cleanUpClusterResources(clusterUri);
  }

  async getAuthSettings(clusterUri: string) {
    return (await this.client.getAuthSettings(clusterUri)) as AuthSettings;
  }

  async createGateway(targetUri: string, port: string) {
    const gateway = await this.client.createGateway(targetUri, port);
    this.setState(draft => {
      draft.gateways.set(gateway.uri, gateway);
    });
    return gateway;
  }

  async removeGateway(gatewayUri: string) {
    await this.client.removeGateway(gatewayUri);
    this.setState(draft => {
      draft.gateways.delete(gatewayUri);
    });
  }

  findCluster(clusterUri: string) {
    return this.state.clusters.get(clusterUri);
  }

  findClusterByResource(resourceUri: string) {
    return [...this.state.clusters.values()].find(c =>
      resourceUri.startsWith(c.uri)
    );
  }

  findDbs(clusterUri: string) {
    return [...this.state.dbs.values()].filter(db =>
      db.uri.startsWith(clusterUri)
    );
  }

  findGateway(gatewayUri: string) {
    return this.state.gateways.get(gatewayUri);
  }

  findDb(dbUri: string) {
    return this.state.dbs.get(dbUri);
  }

  findApps(clusterUri: string) {
    return [...this.state.apps.values()].filter(s =>
      s.uri.startsWith(clusterUri)
    );
  }

  findKubes(clusterUri: string) {
    return [...this.state.kubes.values()].filter(s =>
      s.uri.startsWith(clusterUri)
    );
  }

  findServers(clusterUri: string) {
    return [...this.state.servers.values()].filter(s =>
      s.uri.startsWith(clusterUri)
    );
  }

  findServer(serverUri: string) {
    return this.state.servers.get(serverUri);
  }

  getGateways() {
    return [...this.state.gateways.values()];
  }

  getClusters() {
    return [...this.state.clusters.values()];
  }

  getClusterSyncStatus(clusterUri: string) {
    const empty: SyncStatus = { status: '' };
    return {
      dbs: this.state.dbsSyncStatus.get(clusterUri) || empty,
      servers: this.state.serversSyncStatus[clusterUri] || empty,
      apps: this.state.appsSyncStatus.get(clusterUri) || empty,
      kubes: this.state.kubesSyncStatus.get(clusterUri) || empty,
    };
  }

  getServers() {
    return [...this.state.servers.values()];
  }

  getDbs() {
    return [...this.state.dbs.values()];
  }

  useState() {
    return useStore(this).state;
  }

  private async syncClusterOnly(clusterUri: string) {
    const cluster = await this.client.getCluster(clusterUri);
    this.setState(draft => {
      draft.clusters.set(clusterUri, cluster);
    });
  }

  private cleanUpClusterResources(clusterUri: string) {
    this.setState(draft => {
      this.findDbs(clusterUri).forEach(db => {
        draft.dbs.delete(db.uri);
      });
      this.findServers(clusterUri).forEach(server => {
        draft.servers.delete(server.uri);
      });
      delete draft.serversSyncStatus[clusterUri];
      draft.dbsSyncStatus.delete(clusterUri);
    });
  }
}

const helpers = {
  updateMap<T extends { uri: string }>(
    parentUri = '',
    map: Map<string, T>,
    received: T[]
  ) {
    // delete all entries under given uri
    for (let k of map.keys()) {
      if (k.startsWith(parentUri)) {
        map.delete(k);
      }
    }

    received.forEach(s => map.set(s.uri, s));
  },
};
