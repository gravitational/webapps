import apiCluster from './v1/cluster_pb';
import apiDb from './v1/database_pb';
import apigateway from './v1/gateway_pb';
import apiServer from './v1/server_pb';
import apiAuthSettings from './v1/auth_settings_pb';

export type Server = apiServer.Server.AsObject;
export type Gateway = apigateway.Gateway.AsObject;
export type Database = apiDb.Database.AsObject;
export type Cluster = apiCluster.Cluster.AsObject;
export type AuthSettings = apiAuthSettings.AuthSettings.AsObject;
export type AuthProvider = apiAuthSettings.AuthProvider.AsObject;
export type AuthProviderType = 'oidc' | 'saml' | 'github';

export type ApiClient = {
  listGateways: () => Promise<Gateway[]>;
  listClusters: () => Promise<Cluster[]>;
  listDatabases: (clusterUri: string) => Promise<Database[]>;
  listServers: (clusterUri: string) => Promise<Server[]>;
  createCluster: (clusterUri: string) => Promise<Cluster>;
  createGateway: (targetUri: string, port: string) => Promise<Gateway>;
  getCluster: (clusterUri: string) => Promise<Cluster>;
  getAuthSettings: (clusterUri: string) => Promise<AuthSettings>;
  ssoLogin: (clusterUri: string, pType: string, pName: string) => Promise<void>;
  localLogin: (
    clusterUri: string,
    user: string,
    password: string
  ) => Promise<void>;
};
