import { FileTransferListeners } from 'shared/components/FileTransfer';

import apiCluster from './v1/cluster_pb';
import apiDb from './v1/database_pb';
import apigateway from './v1/gateway_pb';
import apiServer from './v1/server_pb';
import apiKube from './v1/kube_pb';
import apiApp from './v1/app_pb';
import apiService from './v1/service_pb';
import apiAuthSettings from './v1/auth_settings_pb';

export type Application = apiApp.App.AsObject;
export type Kube = apiKube.Kube.AsObject;
export type Server = apiServer.Server.AsObject;
export type Gateway = apigateway.Gateway.AsObject;
// Available types are listed here:
// https://github.com/gravitational/teleport/blob/v9.0.3/lib/defaults/defaults.go#L513-L530
//
// The list below can get out of sync with what tsh actually implements.
export type GatewayProtocol =
  | 'postgres'
  | 'mysql'
  | 'mongodb'
  | 'cockroachdb'
  | 'redis'
  | 'sqlserver';
export type Database = apiDb.Database.AsObject;
export type Cluster = apiCluster.Cluster.AsObject;
export type LoggedInUser = apiCluster.LoggedInUser.AsObject;
export type AuthProvider = apiAuthSettings.AuthProvider.AsObject;
export type AuthSettings = apiAuthSettings.AuthSettings.AsObject;

export type FileTransferRequest = apiService.FileTransferRequest.AsObject;

export type WebauthnCredentialInfo = apiService.CredentialInfo.AsObject;
export type WebauthnLoginPrompt =
  | WebauthnLoginTapPrompt
  | WebauthnLoginRetapPrompt
  | WebauthnLoginPinPrompt
  | WebauthnLoginCredentialPrompt;
export type WebauthnLoginTapPrompt = { type: 'tap' };
export type WebauthnLoginRetapPrompt = { type: 'retap' };
export type WebauthnLoginPinPrompt = {
  type: 'pin';
  onUserResponse(pin: string): void;
};
export type WebauthnLoginCredentialPrompt = {
  type: 'credential';
  data: { credentials: WebauthnCredentialInfo[] };
  onUserResponse(index: number): void;
};
export type LoginPasswordlessRequest =
  Partial<apiService.LoginPasswordlessRequest.AsObject>;

export type TshClient = {
  listRootClusters: () => Promise<Cluster[]>;
  listLeafClusters: (clusterUri: string) => Promise<Cluster[]>;
  listApps: (clusterUri: string) => Promise<Application[]>;
  listKubes: (clusterUri: string) => Promise<Kube[]>;
  listDatabases: (clusterUri: string) => Promise<Database[]>;
  listDatabaseUsers: (dbUri: string) => Promise<string[]>;
  listServers: (clusterUri: string) => Promise<Server[]>;
  createAbortController: () => TshAbortController;
  addRootCluster: (addr: string) => Promise<Cluster>;

  listGateways: () => Promise<Gateway[]>;
  createGateway: (params: CreateGatewayParams) => Promise<Gateway>;
  removeGateway: (gatewayUri: string) => Promise<void>;
  restartGateway: (gatewayUri: string) => Promise<void>;
  setGatewayTargetSubresourceName: (
    gatewayUri: string,
    targetSubresourceName: string
  ) => Promise<Gateway>;
  setGatewayLocalPort: (
    gatewayUri: string,
    localPort: string
  ) => Promise<Gateway>;

  getCluster: (clusterUri: string) => Promise<Cluster>;
  getAuthSettings: (clusterUri: string) => Promise<AuthSettings>;
  removeCluster: (clusterUri: string) => Promise<void>;
  loginLocal: (
    params: LoginLocalParams,
    abortSignal?: TshAbortSignal
  ) => Promise<void>;
  loginSso: (
    params: LoginSsoParams,
    abortSignal?: TshAbortSignal
  ) => Promise<void>;
  loginPasswordless: (
    params: LoginPasswordlessParams,
    abortSignal?: TshAbortSignal
  ) => Promise<void>;
  logout: (clusterUri: string) => Promise<void>;
  transferFile: (
    options: FileTransferRequest,
    abortSignal?: TshAbortSignal
  ) => FileTransferListeners;
};

export type TshAbortController = {
  signal: TshAbortSignal;
  abort(): void;
};

export type TshAbortSignal = {
  addEventListener(cb: (...args: any[]) => void): void;
  removeEventListener(cb: (...args: any[]) => void): void;
};

interface LoginParamsBase {
  clusterUri: string;
}

export interface LoginLocalParams extends LoginParamsBase {
  username: string;
  password: string;
  token?: string;
}

export interface LoginSsoParams extends LoginParamsBase {
  providerType: string;
  providerName: string;
}

export interface LoginPasswordlessParams extends LoginParamsBase {
  onPromptCallback(res: WebauthnLoginPrompt): void;
}

export type CreateGatewayParams = {
  targetUri: string;
  port?: string;
  user: string;
  subresource_name?: string;
};
