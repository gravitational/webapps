import { FileTransferListeners } from 'shared/components/FileTransfer';

import { FileTransferRequest, TshClient } from 'teleterm/services/tshd/types';
import { UsageEventService } from 'teleterm/ui/services/usageEvent';
import { FileTransferDirection } from 'teleterm/services/tshd/v1/service_pb';

export class FileTransferService {
  constructor(
    private tshClient: TshClient,
    private usageEventService: UsageEventService
  ) {}

  transferFile(
    options: FileTransferRequest,
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
    const listeners = this.tshClient.transferFile(options, abortSignal);
    if (
      options.direction ===
      FileTransferDirection.FILE_TRANSFER_DIRECTION_DOWNLOAD
    ) {
      this.usageEventService.captureFileTransferRun(
        options.clusterUri,
        'download'
      );
    }
    if (
      options.direction === FileTransferDirection.FILE_TRANSFER_DIRECTION_UPLOAD
    ) {
      this.usageEventService.captureFileTransferRun(
        options.clusterUri,
        'upload'
      );
    }
    return listeners;
  }
}
