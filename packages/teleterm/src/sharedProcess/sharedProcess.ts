import { Server } from '@grpc/grpc-js';

import createLoggerService from 'teleterm/services/logger';
import { getServerCredentials } from 'teleterm/services/grpcCredentials';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import Logger from 'teleterm/logger';

import { PtyHostService } from './api/protogen/ptyHostService_grpc_pb';
import { createPtyHostService } from './ptyHost/ptyHostService';

function getRuntimeSettings(): RuntimeSettings {
  const args = process.argv.slice(2);
  const argName = '--runtimeSettingsJson=';
  const runtimeSettingsJson = args[0].startsWith(argName)
    ? args[0].replace(argName, '')
    : undefined;
  const runtimeSettings: RuntimeSettings =
    runtimeSettingsJson && JSON.parse(runtimeSettingsJson);

  if (!runtimeSettings) {
    throw new Error('Provide process runtime settings');
  }
  return runtimeSettings;
}

function initializeLogger(runtimeSettings: RuntimeSettings): void {
  const loggerService = createLoggerService({
    dev: runtimeSettings.dev,
    dir: runtimeSettings.userDataDir,
    name: 'shared',
  });

  Logger.init(loggerService);
  const logger = new Logger();
  process.on('uncaughtException', logger.error);
}

async function initializeServer(
  runtimeSettings: RuntimeSettings
): Promise<void> {
  const address = runtimeSettings.sharedProcess.requestedNetworkAddress;
  const logger = new Logger('gRPC server');
  if (!address) {
    throw new Error('Provide gRPC server address');
  }

  const server = new Server();
  // @ts-expect-error we have a typed service
  server.addService(PtyHostService, createPtyHostService());

  try {
    server.bindAsync(
      address,
      (await getServerCredentials(runtimeSettings)).shared,
      (error, port) => {
        sendBoundNetworkPortToStdout(port);

        if (error) {
          return logger.error(error.message);
        }

        server.start();
      }
    );
  } catch (e) {
    logger.error('Could not start shared server', e);
  }

  process.once('exit', () => {
    server.forceShutdown();
  });
}

function sendBoundNetworkPortToStdout(port: number) {
  console.log(`{CONNECT_GRPC_PORT: ${port}}`);
}

const runtimeSettings = getRuntimeSettings();
initializeLogger(runtimeSettings);
initializeServer(runtimeSettings);
