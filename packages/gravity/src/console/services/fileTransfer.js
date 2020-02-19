/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { getAuthHeaders, getNoCacheHeaders } from 'gravity/services/api';
import { EventEmitter } from 'events';
import Logger from 'shared/libs/logger';

const logger = Logger.create('api/fileTransfer');

const REQ_FAILED_TXT = 'Network request failed';

class Transfer extends EventEmitter {
  constructor() {
    super();
    this._xhr = new XMLHttpRequest();
    const xhr = this._xhr;

    xhr.onload = () => {
      const { status } = xhr;
      if (status === 200) {
        this.handleSuccess(xhr);
        return;
      }

      this.handleError(xhr);
    };

    xhr.onerror = () => {
      this.emit('error', new Error(REQ_FAILED_TXT));
    };

    xhr.ontimeout = () => {
      this.emit('error', new Error(REQ_FAILED_TXT));
    };

    xhr.onabort = () => {
      this.emit('error', new DOMException('Aborted', 'AbortError'));
    };
  }

  abort() {
    this._xhr.abort();
  }

  onProgress(cb) {
    this.on('progress', cb);
  }

  onCompleted(cb) {
    this.on('completed', cb);
  }

  onError(cb) {
    this.on('error', cb);
  }

  handleSuccess() {
    throw Error('not implemented');
  }

  handleError(xhr) {
    const errText = getErrorText(xhr.response);
    this.emit('error', new Error(errText));
  }

  handleProgress(e) {
    let progress = 0;
    // if Content-Length is present
    if (e.lengthComputable) {
      progress = Math.round((e.loaded / e.total) * 100);
    } else {
      const done = e.position || e.loaded;
      const total = e.totalSize || e.total;
      progress = Math.floor((done / total) * 1000) / 10;
    }

    this.emit('progress', progress);
  }
}

export class Uploader extends Transfer {
  constructor() {
    super();
  }

  handleSuccess() {
    this.emit('completed');
  }

  do(url, blob) {
    this._xhr.upload.addEventListener('progress', e => {
      this.handleProgress(e);
    });

    this._xhr.open('post', url, true);
    setHeaders(this._xhr);
    this._xhr.send(blob);
  }
}

export class Downloader extends Transfer {
  constructor() {
    super();
  }

  do(url) {
    this._xhr.open('get', url, true);
    this._xhr.onprogress = e => {
      this.handleProgress(e);
    };

    setHeaders(this._xhr);
    this._xhr.responseType = 'blob';
    this._xhr.send();
  }

  handleSuccess(xhr) {
    const fileName = getDispositionFileName(xhr);
    if (!fileName) {
      this.emit('error', new Error('Bad response'));
    } else {
      this.emit('completed', {
        fileName: fileName,
        blob: xhr.response,
      });
    }
  }

  // parses blob response to get an error text
  handleError(xhr) {
    const reader = new FileReader();

    reader.onerror = err => {
      this.emit('error', err);
    };

    reader.onload = () => {
      const text = getErrorText(reader.result);
      this.emit('error', new Error(text));
    };

    reader.readAsText(xhr.response);
  }
}

function getDispositionFileName(xhr) {
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

// TODO: as backend may return errors in different
// formats, look at different JSON structures to retreive the error message
function getErrorText(response, responseText) {
  const errText = 'Bad request';
  if (!response) {
    return responseText || errText;
  }

  try {
    const json = JSON.parse(response);
    if (json.message) {
      return json.message;
    }

    if (responseText) {
      return responseText;
    }
  } catch (err) {
    logger.error('faild to parse error message', err);
  }

  return errText;
}

function setHeaders(xhr) {
  const headers = {
    ...getAuthHeaders(),
    ...getNoCacheHeaders(),
  };

  Object.keys(headers).forEach(key => {
    xhr.setRequestHeader(key, headers[key]);
  });
}
