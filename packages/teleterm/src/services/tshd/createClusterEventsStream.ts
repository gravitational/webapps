import { ClientReadableStream, StatusObject } from '@grpc/grpc-js';

import * as api from 'teleterm/services/tshd/v1/service_pb';

import * as types from './types';

export function createClusterEvenstsStream(
  stream: ClientReadableStream<api.ClusterEvent>
): types.ClusterEventsStream {
  return {
    onNewGatewayConnectionAccepted(
      callback: (event: types.NewGatewayConnectionAccepted) => void
    ): void {
      stream.addListener('data', (clusterEvent: api.ClusterEvent) => {
        if (clusterEvent.hasNewGatewayConnectionAccepted()) {
          const event = {
            ...clusterEvent.getNewGatewayConnectionAccepted().toObject(),
            clusterUri: clusterEvent.getClusterUri(),
          };
          callback(event);
        }
      });
    },

    /**
     *  From the docs:
     *
     *      The 'error' event indicates that an error has occurred and the stream has been closed.
     *      Only one of 'error' or 'end' will be emitted.
     *
     *  https://grpc.io/docs/languages/node/basics/#streaming-rpcs
     *
     *  However, there's an issue in grpc-js where if 'error' is emitted, 'end' is emitted
     *  afterwards anyway. https://github.com/grpc/grpc-node/issues/1396
     *  We should not depend on this behavior.
     */
    onError(callback: (error: Error) => void) {
      stream.addListener('error', callback);
    },

    /**
     *  From the docs:
     *
     *      The 'end' event indicates that the server has finished sending and no errors occurred.
     *      Only one of 'error' or 'end' will be emitted.
     *
     *  https://grpc.io/docs/languages/node/basics/#streaming-rpcs
     *
     *  However, there's an issue in grpc-js where if 'error' is emitted, 'end' is emitted
     *  afterwards anyway. https://github.com/grpc/grpc-node/issues/1396
     *  We should not depend on this behavior.
     */
    onEnd(callback: () => void) {
      stream.addListener('end', callback);
    },

    /**
     * Fired when the server sends the status.
     */
    onStatus(callback: (status: StatusObject) => void) {
      stream.addListener('status', callback);
    },
  };
}
