import * as grpc from '@grpc/grpc-js';
import { TerminalServiceClient } from 'teleterm/services/tshd/v1/service_grpc_pb';
import * as api from 'teleterm/services/tshd/v1/service_pb';
import * as types from 'teleterm/services/tshd/types';
import middleware, { withLogging } from './middleware';

export function createGrpcClient(addr?: string) {
  addr = addr || 'unix:///tmp/tshd/socket';
  return new TerminalServiceClient(addr, grpc.credentials.createInsecure());
}

export default function createClient(addr: string) {
  const tsh = middleware(createGrpcClient(addr), [withLogging]);

  const listGateways = async () => {
    const req = new api.ListGatewaysRequest();
    return new Promise<types.Gateway[]>((resolve, reject) => {
      tsh.listGateways(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().gatewaysList);
        }
      });
    });
  };

  const listClusters = async () => {
    const req = new api.ListClustersRequest();
    return new Promise<types.Cluster[]>((resolve, reject) => {
      tsh.listClusters(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().clustersList);
        }
      });
    });
  };

  const listDatabases = async (clusterUri: string) => {
    const req = new api.ListDatabasesRequest().setClusterUri(clusterUri);
    return new Promise<types.Database[]>((resolve, reject) => {
      tsh.listDatabases(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().databasesList);
        }
      });
    });
  };

  const listServers = async (clusterUri: string) => {
    const req = new api.ListServersRequest().setClusterUri(clusterUri);
    return new Promise<types.Server[]>((resolve, reject) => {
      tsh.listServers(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().serversList);
        }
      });
    });
  };

  const createCluster = async (addr: string) => {
    const req = new api.CreateClusterRequest().setName(addr);
    return new Promise<types.Cluster>((resolve, reject) => {
      tsh.createCluster(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  };

  const getCluster = async (uri: string) => {
    const req = new api.GetClusterRequest().setClusterUri(uri);
    return new Promise<types.Cluster>((resolve, reject) => {
      tsh.getCluster(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  };

  const localLogin = async (clusterUri = '', user = '', password = '') => {
    const req = new api.CreateAuthChallengeRequest()
      .setClusterUri(clusterUri)
      .setUser(user)
      .setPassword(password);
    return new Promise<void>((resolve, reject) => {
      tsh.createAuthChallenge(req, err => {
        if (err) {
          reject(err);
          return;
        }

        const solvedReq = new api.SolveAuthChallengeRequest();
        solvedReq.setClusterUri(clusterUri);
        solvedReq.setPassword(password);
        solvedReq.setUser(user);
        tsh.solveAuthChallenge(solvedReq, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  };

  const ssoLogin = async (clusterUri = '', pType = '', pName = '') => {
    const req = new api.CreateAuthSSOChallengeRequest()
      .setClusterUri(clusterUri)
      .setProviderName(pName)
      .setProviderType(pType);
    return new Promise<void>((resolve, reject) => {
      tsh.createAuthSSOChallenge(req, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  const getAuthSettings = async (clusterUri = '') => {
    const req = new api.GetAuthSettingsRequest().setClusterUri(clusterUri);
    return new Promise<types.AuthSettings>((resolve, reject) => {
      tsh.getAuthSettings(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  };

  const createGateway = async (targetUri = '', port = '') => {
    const req = new api.CreateGatewayRequest()
      .setTargetUri(targetUri)
      .setPort(port);
    return new Promise<types.Gateway>((resolve, reject) => {
      tsh.createGateway(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  };

  const removeGateway = async (gatewayUri = '') => {
    const req = new api.DeleteGatewayRequest().setGatewayUri(gatewayUri);
    return new Promise<void>((resolve, reject) => {
      tsh.deleteGateway(req, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  return {
    listGateways,
    listClusters,
    listDatabases,
    listServers,
    createCluster,
    getCluster,
    getAuthSettings,
    localLogin,
    ssoLogin,
    createGateway,
    removeGateway,
  };
}
