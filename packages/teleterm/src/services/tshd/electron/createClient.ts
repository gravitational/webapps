import { TerminalServiceClient } from '../v1/service_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import * as api from './../v1/service_pb';
import * as types from './../types';

export function createGrpcClient(addr?: string) {
  addr = addr || 'unix:///tmp/tshd/socket';
  return new TerminalServiceClient(addr, grpc.credentials.createInsecure());
}

/**
 * TODO(alex-kovoy):
 *  1. add better error handling by reading grpc details field
 *  2. add logging
 */

export default function createClient(addr: string) {
  const tsh = createGrpcClient(addr);

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
    const req = new api.ListDatabasesRequest();
    req.setClusterUri(clusterUri);
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
    const req = new api.ListServersRequest();
    req.setClusterUri(clusterUri);
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
    const req = new api.CreateClusterRequest();
    req.setName(addr);
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
    const req = new api.GetClusterRequest();
    req.setClusterUri(uri);
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

  const localLogin = async (
    clusterUri = '',
    user = '',
    password = '',
    otp = ''
  ) => {
    const req = new api.CreateAuthChallengeRequest();
    req.setClusterUri(clusterUri);
    req.setUser(user);
    req.setPassword(password);
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
    const req = new api.CreateAuthSSOChallengeRequest();
    req.setClusterUri(clusterUri);
    req.setProviderName(pName);
    req.setProviderType(pType);
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

  return {
    listGateways,
    listClusters,
    listDatabases,
    listServers,
    createCluster,
    getCluster,
    localLogin,
    ssoLogin,
  };
}
