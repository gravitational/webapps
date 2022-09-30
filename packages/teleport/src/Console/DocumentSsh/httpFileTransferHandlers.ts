import { EventEmitter } from 'events';

import { FileTransferListeners } from 'shared/components/FileTransfer';

import { getAuthHeaders, getNoCacheHeaders } from 'teleport/services/api';

export function getHttpFileTransferHandlers() {
  return {
    upload(
      url: string,
      file: File,
      fileTransferListeners: FileTransferListeners,
      abortController?: AbortController
    ) {
      const eventEmitter = new EventEmitter();
      const xhr = getBaseXhrRequest({
        method: 'post',
        url,
        eventEmitter,
        abortController,
        fileTransferListeners: fileTransferListeners,
        transformFailedResponse: () => getErrorText(xhr.response),
      });

      xhr.upload.addEventListener('progress', e => {
        eventEmitter.emit('progress', calculateProgress(e));
      });
      xhr.send(file);
    },
    download(
      url: string,
      fileTransferListeners: FileTransferListeners,
      abortController?: AbortController
    ) {
      const eventEmitter = new EventEmitter();
      const xhr = getBaseXhrRequest({
        method: 'get',
        url,
        eventEmitter,
        abortController,
        fileTransferListeners: fileTransferListeners,
        transformSuccessfulResponse: () => {
          const fileName = getDispositionFileName(xhr);
          if (!fileName) {
            throw new Error('Bad response');
          } else {
            saveOnDisk(fileName, xhr.response);
          }
        },
        transformFailedResponse: () => getFileReaderErrorAsText(xhr.response),
      });

      xhr.onprogress = e => {
        if (xhr.status === 200) {
          eventEmitter.emit('progress', calculateProgress(e));
        }
      };
      xhr.responseType = 'blob';
      xhr.send();
    },
  };
}

function getBaseXhrRequest({
  method,
  url,
  abortController,
  eventEmitter,
  fileTransferListeners,
  transformSuccessfulResponse,
  transformFailedResponse,
}: {
  method: string;
  url: string;
  eventEmitter: EventEmitter;
  abortController: AbortController;
  fileTransferListeners: FileTransferListeners;
  transformSuccessfulResponse?(): void;
  transformFailedResponse?(): Promise<string> | string;
}) {
  function setHeaders(): void {
    const headers = {
      ...getAuthHeaders(),
      ...getNoCacheHeaders(),
    };

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });
  }

  function attachHandlers(): void {
    if (abortController) {
      abortController.signal.onabort = () => {
        xhr.abort();
      };
    }

    xhr.onload = async () => {
      if (xhr.status !== 200) {
        eventEmitter.emit('error', new Error(await transformFailedResponse()));
        return;
      }

      try {
        eventEmitter.emit('completed', transformSuccessfulResponse?.());
      } catch (error) {
        eventEmitter.emit('error', error);
      }
    };

    xhr.onerror = async () => {
      eventEmitter.emit('error', new Error(await transformFailedResponse()));
    };

    xhr.ontimeout = () => {
      eventEmitter.emit('error', new Error('Request timed out.'));
    };

    xhr.onabort = () => {
      eventEmitter.emit('error', new DOMException('Aborted', 'AbortError'));
    };
  }

  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  setHeaders();
  attachHandlers();

  eventEmitter.on('progress', fileTransferListeners.onProgress);
  eventEmitter.on('completed', fileTransferListeners.onComplete);
  eventEmitter.on('error', fileTransferListeners.onError);
  return xhr;
}

function getFileReaderErrorAsText(xhrResponse: Blob): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onerror = () => {
      resolve(reader.error.message);
    };

    reader.onload = () => {
      const text = getErrorText(reader.result as string);
      resolve(text);
    };

    reader.readAsText(xhrResponse);
  });
}

function saveOnDisk(fileName: string, blob: Blob): void {
  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// backend may return errors in different formats,
// look at different JSON structures to retrieve the error message
function getErrorText(response: string | undefined): string {
  const badRequest = 'Bad request';
  if (!response) {
    return badRequest;
  }

  try {
    const json = JSON.parse(response);
    return json.error?.message || json.message || badRequest;
  } catch (err) {
    return 'Bad request, failed to parse error message.';
  }
}

function calculateProgress(e: ProgressEvent): number {
  // if Content-Length is present
  if (e.lengthComputable) {
    return Math.round((e.loaded / e.total) * 100);
  } else {
    const done = e.loaded;
    const total = e.total;
    return Math.floor((done / total) * 1000) / 10;
  }
}

function getDispositionFileName(xhr: XMLHttpRequest) {
  let fileName = '';
  const disposition = xhr.getResponseHeader('Content-Disposition');
  if (disposition) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      fileName = matches[1].replace(/['"]/g, '');
    }
  }

  return decodeURIComponent(fileName);
}