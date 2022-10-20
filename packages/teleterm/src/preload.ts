import { contextBridge } from 'electron';
import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';

import createTshClient from 'teleterm/services/tshd/createClient';
import { createStartupClient } from 'teleterm/services/tshd/createStartupClient';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import Logger from 'teleterm/logger';
import { createPtyService } from 'teleterm/services/pty/ptyService';
import {
  GrpcCertName,
  createClientCredentials,
  createServerCredentials,
  createInsecureClientCredentials,
  createInsecureServerCredentials,
  generateAndSaveGrpcCert,
  readGrpcCert,
  shouldEncryptConnection,
} from 'teleterm/services/grpcCredentials';
import * as apiService from 'teleterm/services/tshd/v1/tshd_events_service_grpc_pb';
import { ElectronGlobals, RuntimeSettings } from 'teleterm/types';
import {
  createTshdEventsServer,
  createTshdEventsService,
} from 'teleterm/services/tshdEvents';

const mainProcessClient = createMainProcessClient();
const runtimeSettings = mainProcessClient.getRuntimeSettings();
const loggerService = createLoggerService({
  dev: runtimeSettings.dev,
  dir: runtimeSettings.userDataDir,
  name: 'renderer',
});

Logger.init(loggerService);
const logger = new Logger('preload');

contextBridge.exposeInMainWorld('loggerService', loggerService);

contextBridge.exposeInMainWorld(
  'electron',
  withErrorLogging(getElectronGlobals())
);

async function getElectronGlobals(): Promise<ElectronGlobals> {
  const [addresses, credentials] = await Promise.all([
    mainProcessClient.getResolvedChildProcessAddresses(),
    createGrpcCredentials(runtimeSettings),
  ]);
  const tshClient = createTshClient(addresses.tsh, credentials.tshd);
  const startupClient = createStartupClient(addresses.tsh, credentials.tshd);
  const ptyServiceClient = createPtyService(
    addresses.shared,
    credentials.shared,
    runtimeSettings
  );
  const { server: tshdEventsServer, resolvedAddress: tshdEventsServerAddress } =
    await createTshdEventsServer(
      runtimeSettings.tshdEvents.requestedNetworkAddress,
      credentials.tshdEvents
    );
  const { service: tshdEventsService, subscribeToEvent: subscribeToTshdEvent } =
    createTshdEventsService();

  tshdEventsServer.addService(
    apiService.TshdEventsServiceService,
    // Whatever we use for generating protobufs generated wrong types.
    // The types say that tshdEventsServer.addService expects an UntypedServiceImplementation as the
    // second argument. ITshdEventsServiceService does implement UntypedServiceImplementation.
    // However, what we actually need to pass as the second argument needs to have the shape of
    // ITshdEventsServiceServer. That's why we ignore the error below.
    // @ts-expect-error The generated protobuf types seem to be wrong.
    tshdEventsService
  );

  // Here we send to tshd the address of the tshd events server that we just created. Then we send
  // another request that is going to resolve once tshd prepares a client for that server and
  // injects it into daemon.Service.
  //
  // All uses of tshClient must wait before waitForTshdEventsClient finishes. Otherwise we run into
  // a risk of causing panics in tshd due to a missing tshd events client.
  try {
    await startupClient.resolveTshdEventsServerAddress(tshdEventsServerAddress);
    await startupClient.waitForTshdEventsClient({ timeoutMs: 5_000 });
  } catch (e) {
    logger.error(e);
    // Make sure the UI shows an understandable error and not just something like
    // "DEADLINE_EXCEEDED: Deadline exceeded".
    throw new Error(
      `Ran into a problem while setting up the tshd events client: ${e.message}`
    );
  }

  return {
    mainProcessClient,
    tshClient,
    ptyServiceClient,
    subscribeToTshdEvent,
  };
}

/**
 * For TCP transport, createGrpcCredentials generates the renderer key pair and reads the public key
 * for tshd and the shared process from disk. This lets us set up gRPC clients in the renderer
 * process that connect to the gRPC servers of tshd and the shared process.
 */
async function createGrpcCredentials(
  runtimeSettings: RuntimeSettings
): Promise<{
  // Credentials for talking to the tshd process.
  tshd: ChannelCredentials;
  // Credentials for talking to the shared process.
  shared: ChannelCredentials;
  // Credentials for the tshd events server running in the renderer process.
  tshdEvents: ServerCredentials;
}> {
  if (!shouldEncryptConnection(runtimeSettings)) {
    return {
      tshd: createInsecureClientCredentials(),
      shared: createInsecureClientCredentials(),
      tshdEvents: createInsecureServerCredentials(),
    };
  }

  const { certsDir } = runtimeSettings;
  const [rendererKeyPair, tshdCert, sharedCert] = await Promise.all([
    generateAndSaveGrpcCert(certsDir, GrpcCertName.Renderer),
    readGrpcCert(certsDir, GrpcCertName.Tshd),
    readGrpcCert(certsDir, GrpcCertName.Shared),
  ]);

  return {
    tshd: createClientCredentials(rendererKeyPair, tshdCert),
    shared: createClientCredentials(rendererKeyPair, sharedCert),
    tshdEvents: createServerCredentials(rendererKeyPair, tshdCert),
  };
}

// withErrorLogging logs the error if the promise returns a rejected value. Electron's contextBridge
// loses the stack trace, so we want to log the error with its stack before it crosses the
// contextBridge.
async function withErrorLogging<ReturnValue>(
  promise: Promise<ReturnValue>
): Promise<ReturnValue> {
  try {
    return await promise;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
