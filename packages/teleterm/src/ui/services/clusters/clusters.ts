import { useStore } from 'shared/libs/stores';
import ClusterSearchProvider from './clustersSearchProvider';
import { tsh, SyncStatus, AuthSettings, LoginParams } from './types';
import { ImmutableStore } from '../immutableStore';

type State = {
  clusters: Map<string, tsh.Cluster>;
  gateways: Map<string, tsh.Gateway>;
  servers: Map<string, tsh.Server>;
  serversSyncStatus: Map<string, SyncStatus>;
  dbs: Map<string, tsh.Database>;
  dbsSyncStatus: Map<string, SyncStatus>;
};

export default class Service extends ImmutableStore<State> {
  searchProvider: ClusterSearchProvider;
  state: State = {
    clusters: new Map(),
    gateways: new Map(),
    servers: new Map(),
    serversSyncStatus: new Map(),
    dbs: new Map(),
    dbsSyncStatus: new Map(),
  };

  constructor(public client: tsh.TshClient) {
    super();
    this.searchProvider = new ClusterSearchProvider(this);
  }

  async addCluster(clusterUri: string) {
    const cluster = await this.client.addCluster(clusterUri);
    this.setState(draftState => {
      draftState.clusters.set(cluster.uri, cluster);
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
    this.syncDbs(clusterUri);
    this.syncServers(clusterUri);
    this.syncGateways();
  }

  async syncClusters() {
    const clusters = await this.client.listClusters();
    this.setState(draftState => {
      draftState.clusters = new Map(clusters.map(c => [c.uri, c]));
    });

    clusters.filter(c => c.connected).forEach(c => this.syncCluster(c.uri));
  }

  async syncGateways() {
    const gws = await this.client.listGateways();

    this.setState(draftState => {
      draftState.gateways = new Map(gws.map(g => [g.uri, g]));
    });
  }

  async syncDbs(clusterUri: string) {
    const cluster = this.state.clusters.get(clusterUri);
    if (!cluster.connected) {
      this.setState(draftState => {
        draftState.dbsSyncStatus.delete(clusterUri);
        helpers.updateMap(clusterUri, draftState.dbs, []);
      });

      return;
    }

    this.setState(draftState => {
      draftState.dbsSyncStatus.set(clusterUri, {
        status: 'processing',
      });
    });

    try {
      const received = await this.client.listDatabases(clusterUri);

      this.setState(draftState => {
        draftState.dbsSyncStatus.set(clusterUri, { status: 'ready' });
        helpers.updateMap(clusterUri, draftState.dbs, received);
      });
    } catch (err) {
      this.setState(draftState => {
        draftState.dbsSyncStatus.set(clusterUri, {
          status: 'failed',
          statusText: err.message,
        });
      });
    }
  }

  async syncServers(clusterUri: string) {
    const cluster = this.state.clusters.get(clusterUri);
    if (!cluster.connected) {
      this.setState(draftState => {
        draftState.serversSyncStatus.delete(clusterUri);
        helpers.updateMap(clusterUri, draftState.servers, []);
      });

      return;
    }

    this.setState(draftState => {
      draftState.serversSyncStatus.set(clusterUri, {
        status: 'processing',
      });
    });

    try {
      const received = await this.client.listServers(clusterUri);

      this.setState(draftState => {
        draftState.serversSyncStatus.set(clusterUri, { status: 'ready' });
        helpers.updateMap(clusterUri, draftState.servers, received);
      });
    } catch (err) {
      this.setState(draftState => {
        draftState.serversSyncStatus.set(clusterUri, {
          status: 'failed',
          statusText: err.message,
        });
      });
    }
  }

  async removeCluster(clusterUri: string) {
    await this.client.removeCluster(clusterUri);
    this.setState(draftState => {
      draftState.clusters.delete(clusterUri);
    });
    this.cleanUpClusterResources(clusterUri);
  }

  async getAuthSettings(clusterUri: string) {
    return (await this.client.getAuthSettings(clusterUri)) as AuthSettings;
  }

  async createGateway(targetUri: string, port: string) {
    const gateway = await this.client.createGateway(targetUri, port);
    this.setState(draftState => {
      draftState.gateways.set(gateway.uri, gateway);
    });
    return gateway;
  }

  async removeGateway(gatewayUri: string) {
    await this.client.removeGateway(gatewayUri);
    this.setState(draftState => {
      draftState.gateways.delete(gatewayUri);
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
      servers: this.state.serversSyncStatus.get(clusterUri) || empty,
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
    this.setState(draftState => {
      draftState.clusters.set(clusterUri, cluster);
    });
  }

  private cleanUpClusterResources(clusterUri: string) {
    this.setState(draftState => {
      this.findDbs(clusterUri).forEach(db => {
        draftState.dbs.delete(db.uri);
      });
      this.findServers(clusterUri).forEach(server => {
        draftState.servers.delete(server.uri);
      });
      draftState.serversSyncStatus.delete(clusterUri);
      draftState.dbsSyncStatus.delete(clusterUri);
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
