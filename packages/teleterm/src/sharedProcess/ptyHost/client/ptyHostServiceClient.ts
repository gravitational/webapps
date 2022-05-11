import * as grpc from '@grpc/grpc-js';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import { PtyHostClient } from '../../ptyHost/v1/ptyHostService_grpc_pb';
import { createPtyProcessClient } from './createPtyProcessClient';
import { buildPtyOptions } from './buildPtyOptions';
import {
  PtyCommand,
  PtyProcessOptions,
  PtyServiceClient,
} from '../types';
import { PtyCreate } from '../v1/ptyHostService_pb';

export function createPtyHostServiceClient(
  runtimeSettings: RuntimeSettings
): PtyServiceClient {
  const client = new PtyHostClient(
    runtimeSettings.shared.networkAddr,
    grpc.credentials.createInsecure()
  );

  return {
    createPtyProcess: async (command: PtyCommand) => {
      const ptyOptions = await buildPtyOptions(
        runtimeSettings,
        command
      );
      const ptyId = await createPtyProcess(client, ptyOptions);
      return createPtyProcessClient(client, ptyId);
    },
  };
}

async function createPtyProcess(
  client: PtyHostClient,
  ptyOptions: PtyProcessOptions
): Promise<string> {
  const request = new PtyCreate()
    .setArgsList(ptyOptions.args)
    .setPath(ptyOptions.path)
    .setEnv(Struct.fromJavaScript(ptyOptions.env));

  if (ptyOptions.cwd) {
    request.setCwd(ptyOptions.cwd);
  }

  if (ptyOptions.initCommand) {
    request.setInitCommand(ptyOptions.initCommand);
  }

  return new Promise<string>((resolve, reject) => {
    client.createPtyProcess(request, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.toObject().id);
      }
    });
  });
}
