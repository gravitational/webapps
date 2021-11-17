import * as types from 'teleterm/services/tshd/types';

export class MockTshClient implements types.TshClient {
  listGateways: () => Promise<types.Gateway[]>;
  listClusters: () => Promise<types.Cluster[]>;
  listDatabases: (clusterUri: string) => Promise<types.Database[]>;
  listServers: (clusterUri: string) => Promise<types.Server[]>;
  createCluster: (clusterUri: string) => Promise<types.Cluster>;
  createGateway: (targetUri: string, port: string) => Promise<types.Gateway>;
  getCluster: (clusterUri: string) => Promise<types.Cluster>;
  getAuthSettings: (clusterUri: string) => Promise<types.AuthSettings>;
  ssoLogin: (clusterUri: string, pType: string, pName: string) => Promise<void>;
  removeGateway: (gatewayUri: string) => Promise<void>;
  localLogin: (
    clusterUri: string,
    user: string,
    password: string
  ) => Promise<void>;
}
