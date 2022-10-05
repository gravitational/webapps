import { FileTransferListeners } from 'shared/components/FileTransfer';

import { routing } from 'teleterm/ui/uri';
import { FileTransferDirection } from 'teleterm/services/tshd/v1/service_pb';
import { retryWithRelogin } from 'teleterm/ui/utils';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { IAppContext } from 'teleterm/ui/types';

export function useTshFileTransferHandlers(options: {
  originatingDocumentUri: string;
}) {
  const appContext = useAppContext();

  return {
    upload(
      file: FileTransferRequestObject,
      fileTransferListeners: FileTransferListeners,
      abortController: AbortController
    ): void {
      transferFile(
        appContext,
        options.originatingDocumentUri,
        file,
        fileTransferListeners,
        abortController,
        FileTransferDirection.FILE_TRANSFER_DIRECTION_UPLOAD
      );
    },
    download(
      file: FileTransferRequestObject,
      fileTransferListeners: FileTransferListeners,
      abortController: AbortController
    ): void {
      transferFile(
        appContext,
        options.originatingDocumentUri,
        file,
        fileTransferListeners,
        abortController,
        FileTransferDirection.FILE_TRANSFER_DIRECTION_DOWNLOAD
      );
    },
  };
}

function transferFile(
  appContext: IAppContext,
  originatingDocumentUri: string,
  file: FileTransferRequestObject,
  fileTransferListeners: FileTransferListeners,
  abortController: AbortController,
  direction: FileTransferDirection
): void {
  const serverUri = routing.getServerUri({
    rootClusterId: file.clusterId,
    serverId: file.serverId,
  });
  const getFileTransferActionAsPromise = () =>
    new Promise((resolve, reject) => {
      appContext.fileTransferClient.transferFile(
        {
          source: file.source,
          destination: file.destination,
          login: file.login,
          serverUri,
          serverId: file.serverId,
          clusterId: file.clusterId,
          direction,
        },
        {
          onProgress: (percentage: number) => {
            fileTransferListeners.onProgress(percentage);
          },
          onError: (error: Error) => {
            reject(error);
          },
          onComplete: () => {
            resolve(undefined);
          },
        },
        abortController
      );
    });

  retryWithRelogin(
    appContext,
    originatingDocumentUri,
    serverUri,
    getFileTransferActionAsPromise
  )
    .then(fileTransferListeners.onComplete)
    .catch(fileTransferListeners.onError);
}

type FileTransferRequestObject = {
  source: string;
  destination: string;
  login: string;
  clusterId: string;
  serverId: string;
};
