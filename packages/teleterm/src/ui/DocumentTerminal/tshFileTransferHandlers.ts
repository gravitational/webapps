import { FileTransferListeners } from 'shared/components/FileTransfer';

import { routing } from 'teleterm/ui/uri';
import { FileTransferClient } from 'teleterm/ui/services/fileTransferClient';
import { FileTransferDirection } from 'teleterm/services/tshd/v1/service_pb';

export function getTshFileTransferHandlers(
  fileTransferClient: FileTransferClient
) {
  return {
    upload(
      file: FileTransferRequestObject,
      fileTransferListeners: FileTransferListeners,
      abortController: AbortController
    ): void {
      fileTransferClient.transferFile(
        {
          source: file.source,
          destination: file.destination,
          login: file.login,
          serverUri: routing.getServerUri({
            rootClusterId: file.clusterId,
            serverId: file.serverId,
          }),
          serverId: file.serverId,
          clusterId: file.clusterId,
          direction: FileTransferDirection.FILE_TRANSFER_DIRECTION_UPLOAD,
        },
        fileTransferListeners,
        abortController
      );
    },
    download(
      file: FileTransferRequestObject,
      fileTransferListeners: FileTransferListeners,
      abortController: AbortController
    ): void {
      fileTransferClient.transferFile(
        {
          source: file.source,
          destination: file.destination,
          login: file.login,
          serverUri: routing.getServerUri({
            rootClusterId: file.clusterId,
            serverId: file.serverId,
          }),
          serverId: file.serverId,
          clusterId: file.clusterId,
          direction: FileTransferDirection.FILE_TRANSFER_DIRECTION_DOWNLOAD,
        },
        fileTransferListeners,
        abortController
      );
    },
  };
}

type FileTransferRequestObject = {
  source: string;
  destination: string;
  login: string;
  clusterId: string;
  serverId: string;
};
