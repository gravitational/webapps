import Service from './clusters';
import {
  Cluster,
  Database,
  Gateway,
  Server,
  TshClient,
} from '../../../services/tshd/types';
import { SyncStatus } from '../../../ui/services/clusters/types';

const clusterUri = 'testId';

const clusterMock: Cluster = {
  uri: clusterUri,
  name: 'Test',
  connected: true,
  loggedInUser: {
    name: 'admin',
    acl: {},
    sshLoginsList: [],
    rolesList: [],
  },
};

const gatewayMock: Gateway = {
  uri: 'gatewayTestUri',
  clusterId: '100',
  status: 1,
  caCertPath: '',
  dbCertPath: '',
  hostId: '1000',
  keyPath: '',
  localAddress: 'localhost',
  localPort: '2000',
  nativeClientArgs: '',
  nativeClientPath: '',
  protocol: 'https',
  resourceName: 'Test',
};

const databaseMock: Database = {
  uri: 'databaseTestUri',
  desc: 'Desc',
  name: 'Name',
  addr: 'addr',
  clusterId: clusterUri,
  protocol: 'psql',
  type: '',
  hostname: 'localhost',
  labelsList: [],
};

const serverMock: Server = {
  uri: 'serverTestUri',
  addr: 'addr',
  name: 'Name',
  hostname: 'localhost',
  labelsList: [],
  clusterId: clusterUri,
  tunnel: false,
};

function createService(client: Partial<TshClient>): Service {
  return new Service(client as TshClient);
}

function getClientMocks(): Partial<TshClient> {
  return {
    login: jest.fn().mockResolvedValueOnce(undefined),
    logout: jest.fn().mockResolvedValueOnce(undefined),
    addCluster: jest.fn().mockResolvedValueOnce(clusterMock),
    removeCluster: jest.fn().mockResolvedValueOnce(undefined),
    getCluster: jest.fn().mockResolvedValueOnce(clusterMock),
    listGateways: jest.fn().mockResolvedValueOnce([gatewayMock]),
    listDatabases: jest.fn().mockResolvedValueOnce([databaseMock]),
    listServers: jest.fn().mockResolvedValueOnce([serverMock]),
    createGateway: jest.fn().mockResolvedValueOnce(gatewayMock),
    removeGateway: jest.fn().mockResolvedValueOnce(undefined),
  };
}

function testIfClusterResourcesHaveBeenCleared(service: Service): void {
  expect(service.findServers(clusterUri)).toStrictEqual([]);
  expect(service.findDbs(clusterUri)).toStrictEqual([]);
  expect(service.getClusterSyncStatus(clusterUri)).toStrictEqual({
    dbs: { status: '' },
    servers: { status: '' },
  });
}

test('should add cluster', async () => {
  const { addCluster } = getClientMocks();
  const service = createService({
    addCluster,
  });

  await service.addCluster(clusterUri);

  expect(addCluster).toHaveBeenCalledWith(clusterUri);
  expect(service.state.clusters).toStrictEqual(
    new Map([[clusterUri, clusterMock]])
  );
});

test('should remove cluster', async () => {
  const { removeCluster } = getClientMocks();
  const service = createService({
    removeCluster,
  });

  await service.removeCluster(clusterUri);

  expect(removeCluster).toHaveBeenCalledWith(clusterUri);
  testIfClusterResourcesHaveBeenCleared(service);
});

test('should sync cluster and its resources', async () => {
  const { getCluster, listGateways, listDatabases, listServers } =
    getClientMocks();
  const service = createService({
    getCluster,
    listGateways,
    listDatabases,
    listServers,
  });

  await service.syncCluster(clusterUri);

  expect(service.findCluster(clusterUri)).toStrictEqual(clusterMock);
  expect(listGateways).toHaveBeenCalledWith();
  expect(listDatabases).toHaveBeenCalledWith(clusterUri);
  expect(listServers).toHaveBeenCalledWith(clusterUri);
});

test('should login into cluster and sync resources', async () => {
  const { login, getCluster, listGateways, listDatabases, listServers } =
    getClientMocks();
  const service = createService({
    login,
    getCluster,
    listGateways,
    listDatabases,
    listServers,
  });
  const loginParams = {
    clusterUri,
    local: { username: 'admin', password: 'admin', token: '1234' },
    oss: { providerType: 'github', providerName: 'GitHub' },
  };

  await service.login(loginParams, undefined);

  expect(login).toHaveBeenCalledWith(loginParams, undefined);
  expect(listGateways).toHaveBeenCalledWith();
  expect(listDatabases).toHaveBeenCalledWith(clusterUri);
  expect(listServers).toHaveBeenCalledWith(clusterUri);
  expect(service.findCluster(clusterUri).connected).toBe(true);
});

test('should logout from cluster and clean its resources', async () => {
  const { logout } = getClientMocks();
  const service = createService({
    logout,
    getCluster: () => Promise.resolve({ ...clusterMock, connected: false }),
  });
  service.setState(draftState => {
    draftState.clusters = new Map([[clusterMock.uri, clusterMock]]);
  });

  await service.logout(clusterUri);

  expect(logout).toHaveBeenCalledWith(clusterUri);
  expect(service.findCluster(clusterUri).connected).toBe(false);
  testIfClusterResourcesHaveBeenCleared(service);
});

test('should create a gateway', async () => {
  const { createGateway } = getClientMocks();
  const service = createService({
    createGateway,
  });
  const targetUri = 'testId';
  const port = '2000';

  await service.createGateway(targetUri, port);

  expect(createGateway).toHaveBeenCalledWith(targetUri, port);
  expect(service.state.gateways).toStrictEqual(
    new Map([[gatewayMock.uri, gatewayMock]])
  );
});

test('should remove a gateway', async () => {
  const { removeGateway } = getClientMocks();
  const service = createService({
    removeGateway,
  });
  const gatewayUri = 'gatewayUri';

  await service.removeGateway(gatewayUri);

  expect(removeGateway).toHaveBeenCalledWith(gatewayUri);
  expect(service.findGateway(gatewayUri)).toBeUndefined();
});

test('should sync gateways', async () => {
  const { listGateways } = getClientMocks();
  const service = createService({
    listGateways,
  });

  await service.syncGateways();

  expect(service.getGateways()).toStrictEqual([gatewayMock]);
});

test('should sync databases', async () => {
  const { listDatabases } = getClientMocks();
  const service = createService({
    listDatabases,
  });
  service.setState(draftState => {
    draftState.clusters.set(clusterUri, clusterMock);
  });

  await service.syncDbs(clusterUri);

  expect(listDatabases).toHaveBeenCalledWith(clusterUri);
  expect(service.getDbs()).toStrictEqual([databaseMock]);
  const readySyncStatus: SyncStatus = { status: 'ready' };
  expect(service.getClusterSyncStatus(clusterUri).dbs).toStrictEqual(
    readySyncStatus
  );
});

test('should sync servers', async () => {
  const { listServers } = getClientMocks();
  const service = createService({
    listServers,
  });
  service.setState(draftState => {
    draftState.clusters.set(clusterUri, clusterMock);
  });

  await service.syncServers(clusterUri);

  expect(listServers).toHaveBeenCalledWith(clusterUri);
  expect(service.getServers()).toStrictEqual([serverMock]);
  const readySyncStatus: SyncStatus = { status: 'ready' };
  expect(service.getClusterSyncStatus(clusterUri).servers).toStrictEqual(
    readySyncStatus
  );
});

test('should find servers by uri', () => {
  const service = createService({});
  service.setState(draftState => {
    draftState.servers.set(serverMock.uri, serverMock);
    draftState.servers.set('secondUri', { ...serverMock, uri: 'secondUri' });
  });

  const foundServers = service.findServers(serverMock.uri);

  expect(foundServers).toStrictEqual([serverMock]);
});

test('should find databases by uri', () => {
  const service = createService({});
  service.setState(draftState => {
    draftState.dbs.set(databaseMock.uri, databaseMock);
    draftState.dbs.set('secondUri', { ...databaseMock, uri: 'secondUri' });
  });

  const foundDbs = service.findDbs(databaseMock.uri);

  expect(foundDbs).toStrictEqual([databaseMock]);
});

test('should find cluster by resource uri', () => {
  const service = createService({});
  service.setState(draftState => {
    draftState.clusters.set(clusterUri, clusterMock);
    draftState.clusters.set('secondUri', { ...clusterMock, uri: 'secondUri' });
  });

  const foundClusters = service.findClusterByResource(
    `${clusterUri}/ae321-dkf32`
  );

  expect(foundClusters).toStrictEqual(clusterMock);
});
