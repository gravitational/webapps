import * as grpc from '@grpc/grpc-js';
import { TerminalServiceClient } from 'teleterm/services/tshd/v1/service_grpc_pb';
import * as api from 'teleterm/services/tshd/v1/service_pb';
import * as types from 'teleterm/services/tshd/types';
import middleware, { withLogging } from './middleware';

export function createGrpcClient(addr?: string) {
  return new TerminalServiceClient(addr, grpc.credentials.createInsecure());
}

export default function createClient(addr: string) {
  const tshd = middleware(createGrpcClient(addr), [withLogging]);

  // Create a client instance that could be shared with the  renderer (UI) via Electron contextBridge
  const client = {
    async listGateways() {
      const req = new api.ListGatewaysRequest();
      return new Promise<types.Gateway[]>((resolve, reject) => {
        tshd.listGateways(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().gatewaysList);
          }
        });
      });
    },

    async listClusters() {
      const req = new api.ListClustersRequest();
      return new Promise<types.Cluster[]>((resolve, reject) => {
        tshd.listClusters(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().clustersList);
          }
        });
      });
    },

    async listDatabases(clusterUri: string) {
      const req = new api.ListDatabasesRequest().setClusterUri(clusterUri);
      return new Promise<types.Database[]>((resolve, reject) => {
        tshd.listDatabases(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().databasesList);
          }
        });
      });
    },

    async listServers(clusterUri: string) {
      const req = new api.ListServersRequest().setClusterUri(clusterUri);
      return new Promise<types.Server[]>((resolve, reject) => {
        tshd.listServers(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().serversList);
          }
        });
      });
    },

    async createCluster(addr: string) {
      const req = new api.CreateClusterRequest().setName(addr);
      return new Promise<types.Cluster>((resolve, reject) => {
        tshd.createCluster(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject());
          }
        });
      });
    },

    async getCluster(uri: string) {
      const req = new api.GetClusterRequest().setClusterUri(uri);
      return new Promise<types.Cluster>((resolve, reject) => {
        tshd.getCluster(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject());
          }
        });
      });
    },

    async localLogin(clusterUri = '', user = '', password = '') {
      const req = new api.CreateAuthChallengeRequest()
        .setClusterUri(clusterUri)
        .setUser(user)
        .setPassword(password);
      return new Promise<void>((resolve, reject) => {
        tshd.createAuthChallenge(req, err => {
          if (err) {
            reject(err);
            return;
          }

          const solvedReq = new api.SolveAuthChallengeRequest();
          solvedReq.setClusterUri(clusterUri);
          solvedReq.setPassword(password);
          solvedReq.setUser(user);
          tshd.solveAuthChallenge(solvedReq, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
    },

    async ssoLogin(clusterUri = '', pType = '', pName = '') {
      const req = new api.CreateAuthSSOChallengeRequest()
        .setClusterUri(clusterUri)
        .setProviderName(pName)
        .setProviderType(pType);
      return new Promise<void>((resolve, reject) => {
        tshd.createAuthSSOChallenge(req, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },

    async getAuthSettings(clusterUri = '') {
      const req = new api.GetAuthSettingsRequest().setClusterUri(clusterUri);
      return new Promise<types.AuthSettings>((resolve, reject) => {
        tshd.getAuthSettings(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject());
          }
        });
      });
    },

    async createGateway(targetUri = '', port = '') {
      const req = new api.CreateGatewayRequest()
        .setTargetUri(targetUri)
        .setPort(port);
      return new Promise<types.Gateway>((resolve, reject) => {
        tshd.createGateway(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject());
          }
        });
      });
    },

    async removeGateway(gatewayUri = '') {
      const req = new api.DeleteGatewayRequest().setGatewayUri(gatewayUri);
      return new Promise<void>((resolve, reject) => {
        tshd.deleteGateway(req, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },
  };

  return client;
}
