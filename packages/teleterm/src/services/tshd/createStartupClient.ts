import grpc from '@grpc/grpc-js';

import { StartupServiceClient } from 'teleterm/services/tshd/v1/startup_service_grpc_pb';
import * as api from 'teleterm/services/tshd/v1/startup_service_pb';
import Logger from 'teleterm/logger';

import middleware, { withLogging } from './middleware';

export function createStartupClient(
  addr: string,
  credentials: grpc.ChannelCredentials
) {
  const logger = new Logger('startup');
  const grpcClient = middleware(new StartupServiceClient(addr, credentials), [
    withLogging(logger),
  ]);

  return {
    async resolveTshdEventsServerAddress(address: string) {
      const req = new api.ResolveTshdEventsServerAddressRequest().setAddress(
        address
      );
      return new Promise<void>((resolve, reject) => {
        grpcClient.resolveTshdEventsServerAddress(req, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    },

    async waitForTshdEventsClient(options?: { timeoutMs?: number }) {
      const callOptions: Partial<grpc.CallOptions> = {};
      if (options?.timeoutMs) {
        callOptions.deadline = Date.now() + options.timeoutMs;
      }

      const req = new api.WaitForTshdEventsClientRequest();
      return new Promise<void>((resolve, reject) => {
        grpcClient.waitForTshdEventsClient(
          req,
          // @ts-expect-error The client actually expects options here, unlike what the types
          // suggest. Passing empty metadata as the second argument results in an error.
          // This is another case of the tool that generates our gRPC types being wrong.
          callOptions,
          err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    },
  };
}
