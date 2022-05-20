import { ClientDuplexStream } from '@grpc/grpc-js';
import * as api from 'teleterm/services/tshd/v1/service_pb';
import { ClusterEventsStream } from './types';

// Creates contextBridge-compatible object implementing ClusterEventsStream type.
export function createClusterEventsStream(
  stream: ClientDuplexStream<api.ClusterClientEvent, api.ClusterServerEvent>
): ClusterEventsStream {
  const writeOrThrow = (event: api.ClusterClientEvent) => {
    return stream.write(event, (error: Error | undefined) => {
      if (error) {
        throw error;
      }
    });
  };

  return {
    /**
     * Client -> Server stream events
     */

    loginSuccess(clusterUri: string): void {
      writeOrThrow(
        new api.ClusterClientEvent().setClusterUri(clusterUri).setLoginSuccess()
      );
    },

    /**
     * Stream -> Client stream events
     */

    onCertExpired(callback: (clusterUri: string) => void): void {
      stream.addListener('data', (event: api.ClusterServerEvent) => {
        if (event.hasCertExpired()) {
          callback(event.getClusterUri());
        }
      });
    },
  };
}
