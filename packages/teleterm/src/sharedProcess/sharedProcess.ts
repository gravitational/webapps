import { Server, ServerCredentials } from '@grpc/grpc-js';
import { PtyHostService } from './api/protogen/ptyHostService_grpc_pb';
import createLoggerService from 'teleterm/services/logger';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import Logger from 'teleterm/logger';
import { createPtyHostService } from './ptyHost/ptyHostService';
import { readGrpcCerts } from 'teleterm/services/grpcCerts';

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
  const { caCert, serverCert, serverKey } = await readGrpcCerts(
    runtimeSettings.certsDir
  );

  server.bindAsync(
    address,
    ServerCredentials.createSsl(
      caCert,
      [
        {
          cert_chain: serverCert,
          private_key: serverKey,
        },
      ],
      true
    ),
    (error, port) => {
      sendBoundNetworkPort(port);

      if (error) {
        return logger.error(error.message);
      }

      server.start();
    }
  );

  process.once('exit', () => {
    server.forceShutdown();
  });
}

function sendBoundNetworkPort(address: number) {
  // writes to stdout
  console.log(`{CONNECT_GRPC_PORT: ${address}}`);
}

const runtimeSettings = getRuntimeSettings();
initializeLogger(runtimeSettings);
initializeServer(runtimeSettings);
