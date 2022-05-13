import * as grpc from '@grpc/grpc-js';
import { TerminalServiceClient } from 'teleterm/services/tshd/v1/service_grpc_pb';
import * as api from 'teleterm/services/tshd/v1/service_pb';
import * as types from 'teleterm/services/tshd/types';
import middleware, { withLogging } from './middleware';
import createAbortController from './createAbortController';
import Logger from 'teleterm/logger';

export function createGrpcClient(addr?: string) {
  return new TerminalServiceClient(addr, grpc.credentials.createInsecure());
}

export default function createClient(addr: string) {
  const logger = new Logger('tshd');
  const tshd = middleware(createGrpcClient(addr), [withLogging(logger)]);

  // Create a client instance that could be shared with the  renderer (UI) via Electron contextBridge
  const client = {
    createAbortController,

    async logout(clusterUri: string) {
      const req = new api.LogoutRequest().setClusterUri(clusterUri);
      return new Promise<void>((resolve, reject) => {
        tshd.logout(req, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },

    async listApps(clusterUri: string) {
      const req = new api.ListAppsRequest().setClusterUri(clusterUri);
      return new Promise<types.Application[]>((resolve, reject) => {
        tshd.listApps(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().appsList);
          }
        });
      });
    },

    async listKubes(clusterUri: string) {
      const req = new api.ListKubesRequest().setClusterUri(clusterUri);
      return new Promise<types.Kube[]>((resolve, reject) => {
        tshd.listKubes(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().kubesList);
          }
        });
      });
    },

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

    async listLeafClusters(clusterUri: string) {
      const req = new api.ListLeafClustersRequest().setClusterUri(clusterUri);
      return new Promise<types.Cluster[]>((resolve, reject) => {
        tshd.listLeafClusters(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().clustersList);
          }
        });
      });
    },

    async listRootClusters() {
      const req = new api.ListClustersRequest();
      return new Promise<types.Cluster[]>((resolve, reject) => {
        tshd.listRootClusters(req, (err, response) => {
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

    async listDatabaseUsers(dbUri: string) {
      const req = new api.ListDatabaseUsersRequest().setDbUri(dbUri);
      return new Promise<string[]>((resolve, reject) => {
        tshd.listDatabaseUsers(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject().usersList);
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

    async addRootCluster(addr: string) {
      const req = new api.AddClusterRequest().setName(addr);
      return new Promise<types.Cluster>((resolve, reject) => {
        tshd.addCluster(req, (err, response) => {
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

    async login(params: types.LoginParams, abortSignal?: types.TshAbortSignal) {
      const ssoParams = params.sso
        ? new api.LoginRequest.SsoParams()
            .setProviderName(params.sso.providerName)
            .setProviderType(params.sso.providerType)
        : null;

      const localParams = params.local
        ? new api.LoginRequest.LocalParams()
            .setToken(params.local.token)
            .setUser(params.local.username)
            .setPassword(params.local.password)
        : null;

      const passwordlessParams = params.passwordless
        ? new api.LoginRequest.PasswordlessParams().setUser(
            params.passwordless.username
          )
        : null;

      return withAbort(abortSignal, callRef => {
        const req = new api.LoginRequest().setClusterUri(params.clusterUri);

        // LoginRequest has oneof on `Local` and `Sso`, which means that setting one of them clears
        // the other.
        if (ssoParams) {
          req.setSso(ssoParams);
        } else if (localParams) {
          req.setLocal(localParams);
        } else {
          req.setPasswordless(passwordlessParams);
        }

        return new Promise<void>((resolve, reject) => {
          callRef.current = tshd.login(req, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
    },

    async loginPasswordless(
      params: types.LoginParams,
      abortSignal?: types.TshAbortSignal
    ) {
      return withAbort(abortSignal, callRef => {
        const req = new api.LoginPasswordlessRequest().setClusterUri(
          params.clusterUri
        );
        req.setUser('sumo');

        return new Promise<void>((resolve, reject) => {
          callRef.current = tshd.loginPasswordless();

          // it's init
          callRef.current.write(req);

          callRef.current.on('data', function (response) {
            console.log(
              '>>>> ------------ response: ',
              response,
              response.array[0]
            );

            if (response.array[0] === 1) {
              params.passwordless.cb('PIN', pin => {
                console.log('-------- about to write back pin: ', pin);
                const req = new api.LoginPasswordlessRequest().setPin(pin);
                console.log('------- pin req: ', req);
                callRef.current.write(req);
              });
              return;
            }

            if (response.array[0] === 2) {
              params.passwordless.cb('TAP');
              return;
            }
            if (response.array[0] === 3) {
              params.passwordless.cb('RETAP');
              return;
            }
          });

          callRef.current.on('end', function (response) {
            console.log('---------------- stream ended', response);
            // if (err) {
            //   reject(err);
            // } else {
            resolve();
            // }
          });

          callRef.current.on('error', function (err) {
            console.log('---------------- stream error out?', err);
            reject(err);
          });
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

    async createGateway(params: types.CreateGatewayParams) {
      const req = new api.CreateGatewayRequest()
        .setTargetUri(params.targetUri)
        .setTargetUser(params.user)
        .setLocalPort(params.port)
        .setTargetSubresourceName(params.subresource_name);
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

    async removeCluster(clusterUri = '') {
      const req = new api.RemoveClusterRequest().setClusterUri(clusterUri);
      return new Promise<void>((resolve, reject) => {
        tshd.removeCluster(req, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },

    async removeGateway(gatewayUri = '') {
      const req = new api.RemoveGatewayRequest().setGatewayUri(gatewayUri);
      return new Promise<void>((resolve, reject) => {
        tshd.removeGateway(req, err => {
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

type CallRef = {
  current?: {
    cancel(): void;
  };
};

async function withAbort<T>(
  sig: types.TshAbortSignal,
  cb: (ref: CallRef) => Promise<T>
) {
  const ref = {
    current: null,
  };

  const abort = () => {
    ref?.current.cancel();
  };

  sig?.addEventListener(abort);

  return cb(ref).finally(() => {
    sig?.removeEventListener(abort);
  });
}
