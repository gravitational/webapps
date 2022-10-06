import { FileTransferListeners } from 'shared/components/FileTransfer';

import { TshClient } from 'teleterm/services/tshd/types';
import { FileTransferRequest } from 'teleterm/services/tshd/v1/service_pb';

export class FileTransferClient {
  constructor(private tshClient: TshClient) {}

  transferFile(
    options: FileTransferRequest.AsObject,
    abortController: AbortController
  ): FileTransferListeners {
    const abortSignal = {
      addEventListener: (cb: (...args: any[]) => void) => {
        abortController.signal.addEventListener('abort', cb);
      },
      removeEventListener: (cb: (...args: any[]) => void) => {
        abortController.signal.removeEventListener('abort', cb);
      },
    };
    return this.tshClient.transferFile(options, abortSignal);
  }
}
