import { ITerminalServiceClient } from './v1/service_grpc_pb';
import * as api from './v1/service_pb';
import * as types from './types';

/**
 * TODO(alex-kovoy):
 *  1. add better error handling by reading grpc details field
 *  2. add logging
 */

export default class Client {
  tsh: ITerminalServiceClient;

  constructor(tsh: ITerminalServiceClient) {
    this.tsh = tsh;
  }

  async listGateways() {
    const req = new api.ListGatewaysRequest();
    return new Promise<types.Gateway[]>((resolve, reject) => {
      this.tsh.listGateways(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().gatewaysList);
        }
      });
    });
  }

  async listClusters() {
    const req = new api.ListClustersRequest();
    return new Promise<types.Cluster[]>((resolve, reject) => {
      this.tsh.listClusters(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().clustersList);
        }
      });
    });
  }

  async listDatabases(clusterUri: string) {
    const req = new api.ListDatabasesRequest();
    req.setClusterUri(clusterUri);
    return new Promise<types.Database[]>((resolve, reject) => {
      this.tsh.listDatabases(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().databasesList);
        }
      });
    });
  }

  async listServers(clusterUri: string) {
    const req = new api.ListServersRequest();
    req.setClusterUri(clusterUri);
    return new Promise<types.Server[]>((resolve, reject) => {
      this.tsh.listServers(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject().serversList);
        }
      });
    });
  }

  async createCluster(addr: string) {
    const req = new api.CreateClusterRequest();
    req.setName(addr);
    return new Promise<types.Cluster>((resolve, reject) => {
      this.tsh.createCluster(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  }

  async getCluster(uri: string) {
    const req = new api.GetClusterRequest();
    req.setClusterUri(uri);
    return new Promise<types.Cluster>((resolve, reject) => {
      this.tsh.getCluster(req, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.toObject());
        }
      });
    });
  }

  async localLogin(clusterUri = '', user = '', password = '', otp = '') {
    const req = new api.CreateAuthChallengeRequest();
    req.setClusterUri(clusterUri);
    req.setUser(user);
    req.setPassword(password);
    return new Promise<void>((resolve, reject) => {
      this.tsh.createAuthChallenge(req, err => {
        if (err) {
          reject(err);
          return;
        }

        const solvedReq = new api.SolveAuthChallengeRequest();
        solvedReq.setClusterUri(clusterUri);
        solvedReq.setPassword(password);
        solvedReq.setUser(user);
        this.tsh.solveAuthChallenge(solvedReq, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  async ssoLogin(clusterUri = '', pType = '', pName = '') {
    const req = new api.CreateAuthSSOChallengeRequest();
    req.setClusterUri(clusterUri);
    req.setProviderName(pName);
    req.setProviderType(pType);
    return new Promise<void>((resolve, reject) => {
      this.tsh.createAuthSSOChallenge(req, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
