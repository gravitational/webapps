import { Server, ServerCredentials } from '@grpc/grpc-js';

import { createStdoutLoggerService } from 'teleterm/services/logger';

import {
  createInsecureServerCredentials,
  createServerCredentials,
  generateAndSaveGrpcCert,
  GrpcCertName,
  readGrpcCert,
  shouldEncryptConnection,
} from 'teleterm/services/grpcCredentials';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import Logger from 'teleterm/logger';

import { PtyHostService } from './api/protogen/ptyHostService_grpc_pb';
import { createPtyHostService } from './ptyHost/ptyHostService';

const runtimeSettings = getRuntimeSettings();
initializeLogger();
initializeServer(runtimeSettings);

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

function initializeLogger(): void {
  const loggerService = createStdoutLoggerService();

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

  // grpc-js requires us to pass localhost:port for TCP connections,
  const grpcServerAddress = address.replace('tcp://', '');

  try {
    const credentials = await createGrpcCredentials(runtimeSettings);

    server.bindAsync(grpcServerAddress, credentials, (error, port) => {
      sendBoundNetworkPortToStdout(port);

      if (error) {
        return logger.error(error.message);
      }

      server.start();
    });
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

/**
 * Creates credentials for the gRPC server running in the shared process.
 */
async function createGrpcCredentials(
  runtimeSettings: RuntimeSettings
): Promise<ServerCredentials> {
  if (!shouldEncryptConnection(runtimeSettings)) {
    return createInsecureServerCredentials();
  }

  const { certsDir } = runtimeSettings;
  const [sharedKeyPair, rendererCert] = await Promise.all([
    generateAndSaveGrpcCert(certsDir, GrpcCertName.Shared),
    readGrpcCert(certsDir, GrpcCertName.Renderer),
  ]);

  return createServerCredentials(sharedKeyPair, rendererCert);
}
