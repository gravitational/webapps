import { ChannelCredentials } from '@grpc/grpc-js';

import { TerminalServiceClient } from 'teleterm/services/tshd/v1/service_grpc_pb';
import * as api from 'teleterm/services/tshd/v1/service_pb';
import * as types from 'teleterm/services/tshd/types';
import Logger from 'teleterm/logger';

import middleware, { withLogging } from './middleware';
import createAbortController from './createAbortController';

export default function createClient(
  addr: string,
  credentials: ChannelCredentials
) {
  const logger = new Logger('tshd');
  const tshd = middleware(new TerminalServiceClient(addr, credentials), [
    withLogging(logger),
  ]);

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

      return withAbort(abortSignal, callRef => {
        const req = new api.LoginRequest().setClusterUri(params.clusterUri);

        // LoginRequest has oneof on `Local` and `Sso`, which means that setting one of them clears
        // the other.
        if (ssoParams) {
          req.setSso(ssoParams);
        } else {
          req.setLocal(localParams);
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

        return new Promise<void>((resolve, reject) => {
          callRef.current = tshd.loginPasswordless();
          const stream = callRef.current as grpc.ClientDuplexStream<
            api.LoginPasswordlessRequest,
            api.LoginPasswordlessResponse
          >;

          // Init the stream.
          stream.write(req);

          stream.on('data', function (response: api.LoginPasswordlessResponse) {
            const res = response.toObject();
            let prompt: types.WebauthnLoginPrompt = '';
            let customRes: types.LoginPasswordlessResponse = {};

            switch (res.prompt) {
              case api.PasswordlessPrompt.PASSWORDLESS_PROMPT_PIN:
                prompt = 'pin';
                // Need to write the pin back to stream.
                customRes.writeToStream = req => {
                  stream.write(
                    new api.LoginPasswordlessRequest().setPin(req.pin)
                  );
                };
                break;

              case api.PasswordlessPrompt.PASSWORDLESS_PROMPT_CREDENTIAL:
                prompt = 'credential';
                customRes.loginUsernames = res.usernamesList || [];
                // Need to write the selected index back to stream.
                customRes.writeToStream = req => {
                  stream.write(
                    new api.LoginPasswordlessRequest().setUsernameindex(
                      req.usernameindex
                    )
                  );
                };
                break;

              case api.PasswordlessPrompt.PASSWORDLESS_PROMPT_TAP:
                prompt = 'tap';
                break;

              case api.PasswordlessPrompt.PASSWORDLESS_PROMPT_RETAP:
                prompt = 'retap';
                break;

              // Following cases should never happen but just in case?
              case api.PasswordlessPrompt.PASSWORDLESS_PROMPT_UNSPECIFIED:
                stream.cancel();
                return reject(
                  new Error('no passwordless prompt was specified')
                );

              default:
                stream.cancel();
                return reject(
                  new Error(`passwordless prompt '${res.prompt}' not supported`)
                );
            }

            // Call the callback to trigger rendering of prompt dialogues.
            params.passwordless.onSuccess(prompt, customRes);
          });

          stream.on('end', function () {
            resolve();
          });

          stream.on('error', function (err: Error) {
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

    async restartGateway(gatewayUri = '') {
      const req = new api.RestartGatewayRequest().setGatewayUri(gatewayUri);
      return new Promise<void>((resolve, reject) => {
        tshd.restartGateway(req, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },

    async setGatewayTargetSubresourceName(
      gatewayUri = '',
      targetSubresourceName = ''
    ) {
      const req = new api.SetGatewayTargetSubresourceNameRequest()
        .setGatewayUri(gatewayUri)
        .setTargetSubresourceName(targetSubresourceName);
      return new Promise<types.Gateway>((resolve, reject) => {
        tshd.setGatewayTargetSubresourceName(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject());
          }
        });
      });
    },

    async setGatewayLocalPort(gatewayUri: string, localPort: string) {
      const req = new api.SetGatewayLocalPortRequest()
        .setGatewayUri(gatewayUri)
        .setLocalPort(localPort);
      return new Promise<types.Gateway>((resolve, reject) => {
        tshd.setGatewayLocalPort(req, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.toObject());
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
