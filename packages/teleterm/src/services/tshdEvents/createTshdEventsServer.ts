import { Server, ServerCredentials } from '@grpc/grpc-js';

import Logger from 'teleterm/logger';

/**
 * Starts tshd events server.
 * @return {Promise} Object containing an instance of the server and the address it's listening on.
 */
export async function createTshdEventsServer(
  requestedAddress: string,
  credentials: ServerCredentials
): Promise<{ server: Server; resolvedAddress: string }> {
  const logger = new Logger('tshd events');
  const server = new Server();

  // grpc-js requires us to pass localhost:port for TCP connections,
  const grpcServerAddress = requestedAddress.replace('tcp://', '');

  return new Promise((resolve, reject) => {
    try {
      server.bindAsync(grpcServerAddress, credentials, (error, port) => {
        if (error) {
          reject(error);
          return logger.error(error.message);
        }

        server.start();

        const resolvedAddress = requestedAddress.startsWith('tcp:')
          ? `localhost:${port}`
          : requestedAddress;

        logger.info(`tshd events server is listening on ${resolvedAddress}`);
        resolve({ server, resolvedAddress });
      });
    } catch (e) {
      logger.error('Could not start tshd events server', e);
      reject(e);
    }
  });
}
