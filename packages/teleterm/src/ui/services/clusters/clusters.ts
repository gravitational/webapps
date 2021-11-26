import { Store, useStore } from 'shared/libs/stores';
import ClusterSearchProvider from './clustersSearchProvider';
import { tsh, SyncStatus } from './types';

type State = {
  clusters: Map<string, tsh.Cluster>;
  gateways: Map<string, tsh.Gateway>;
  servers: Map<string, tsh.Server>;
  serversSyncStatus: Map<string, SyncStatus>;
  dbs: Map<string, tsh.Database>;
  dbsSyncStatus: Map<string, SyncStatus>;
};

export default class Service extends Store<State> {
  searchProvider: ClusterSearchProvider;

  client: tsh.TshClient;

  state: State = {
    clusters: new Map(),
    gateways: new Map(),
    servers: new Map(),
    serversSyncStatus: new Map(),
    dbs: new Map(),
    dbsSyncStatus: new Map(),
  };

  constructor(client: tsh.TshClient) {
    super();
    this.client = client;
    this.searchProvider = new ClusterSearchProvider(this);
  }

  async addCluster(addr: string) {
    const cluster = await this.client.createCluster(addr);
    this.state.clusters.set(cluster.uri, cluster);
    this.setState({
      clusters: new Map(this.state.clusters),
    });

    return cluster;
  }

  async login({ clusterUri, local, oss }: LoginOptions) {
    if (local) {
      await this.client.localLogin(clusterUri, local.username, local.password);
    } else if (oss) {
      await this.client.ssoLogin(
        clusterUri,
        oss.providerType,
        oss.providerName
      );
    } else {
      throw Error('unknown login request parameters');
    }

    await this.syncCluster(clusterUri);
  }

  async syncCluster(clusterUri: string) {
    const cluster = await this.client.getCluster(clusterUri);
    this.state.clusters.set(clusterUri, cluster);
    this.setState({
      clusters: new Map(this.state.clusters),
    });

    // do not await these
    this.syncDbs(clusterUri);
    this.syncServers(clusterUri);
  }

  async syncClusters() {
    const clusters = await this.client.listClusters();
    this.setState({
      clusters: new Map(clusters.map(c => [c.uri, c])),
    });

    clusters.filter(c => c.connected).forEach(c => this.syncCluster(c.uri));
  }

  async syncGateways() {
    const gws = await this.client.listGateways();
    this.setState({
      gateways: new Map(gws.map(g => [g.uri, g])),
    });
  }

  async syncDbs(clusterUri: string) {
    this.setState({
      dbsSyncStatus: new Map(
        this.state.dbsSyncStatus.set(clusterUri, {
          status: 'processing',
        })
      ),
    });

    try {
      const received = await this.client.listDatabases(clusterUri);
      const { dbs, dbsSyncStatus } = this.state;

      dbsSyncStatus.set(clusterUri, { status: 'ready' });
      helpers.updateMap(clusterUri, dbs, received);

      this.setState({
        dbs: new Map(dbs),
        dbsSyncStatus: new Map(dbsSyncStatus),
      });
    } catch (err) {
      this.setState({
        dbsSyncStatus: new Map(
          this.state.dbsSyncStatus.set(clusterUri, {
            status: 'failed',
            statusText: err.message,
          })
        ),
      });
    }
  }

  async syncServers(clusterUri: string) {
    this.setState({
      serversSyncStatus: new Map(
        this.state.serversSyncStatus.set(clusterUri, {
          status: 'processing',
        })
      ),
    });

    try {
      const received = await this.client.listServers(clusterUri);
      const { servers, serversSyncStatus } = this.state;

      serversSyncStatus.set(clusterUri, { status: 'ready' });
      helpers.updateMap(clusterUri, servers, received);

      this.setState({
        servers: new Map(servers),
        serversSyncStatus: new Map(serversSyncStatus),
      });
    } catch (err) {
      this.setState({
        serversSyncStatus: new Map(
          this.state.serversSyncStatus.set(clusterUri, {
            status: 'failed',
            statusText: err.message,
          })
        ),
      });
    }
  }

  async getAuthSettings(clusterUri: string) {
    return await this.client.getAuthSettings(clusterUri);
  }

  async createGateway(targetUri: string, port: string) {
    const gateway = await this.client.createGateway(targetUri, port);
    this.state.gateways.set(gateway.uri, gateway);
    this.setState({ gateways: new Map(this.state.gateways) });
    return gateway;
  }

  async removeGateway(gatewayUri: string) {
    await this.client.removeGateway(gatewayUri);
    this.state.gateways.delete(gatewayUri);
    this.setState({
      gateways: new Map(this.state.gateways),
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
}

export type LoginOptions = {
  clusterUri: string;
  oss?: {
    providerType: string;
    providerName: string;
  };
  local?: {
    username: string;
    password: string;
    token?: string;
  };
};

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
