// Copyright 2021 Gravitational, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import Logger from 'shared/libs/logger';
import { TermEventEnum } from 'teleport/lib/term/enums.js';
import { EventEmitterWebAuthnSender } from 'teleport/lib/EventEmitterWebAuthnSender';
import { WebauthnAssertionResponse } from 'teleport/services/auth';
import Codec, {
  MessageType,
  MouseButton,
  ButtonState,
  ScrollAxis,
  ClientScreenSpec,
  PngFrame,
  ClipboardData,
  SharedDirectoryInfoResponse,
  SharedDirectoryListResponse,
  FileSystemObject,
  SharedDirectoryReadResponse,
  SharedDirectoryWriteResponse,
} from './codec';

export enum TdpClientEvent {
  TDP_CLIENT_SCREEN_SPEC = 'tdp client screen spec',
  TDP_PNG_FRAME = 'tdp png frame',
  TDP_CLIPBOARD_DATA = 'tdp clipboard data',
  TDP_ERROR = 'tdp error',
  WS_OPEN = 'ws open',
  WS_CLOSE = 'ws close',
}

// Client is the TDP client. It is responsible for connecting to a websocket serving the tdp server,
// sending client commands, and recieving and processing server messages. It's listener is responsible for
// calling Client.nuke() (typically after Client emits a TdpClientEvent.DISCONNECT or TdpClientEvent.ERROR event) in order to clean
// up its websocket listeners.
export default class Client extends EventEmitterWebAuthnSender {
  codec: Codec;
  socket: WebSocket;
  socketAddr: string;
  username: string;
  items: Map<string, string>;
  logger = Logger.create('TDPClient');
  simulated_fsos: Record<string, FileSystemObject>; // TODO(isaiah): delete this
  // TODO(LKozlowski): delete this - only for directory sharing simulation purposes
  simulated_files_data: Record<string, Uint8Array>;

  constructor(socketAddr: string) {
    super();
    this.socketAddr = socketAddr;
    this.codec = new Codec();
  }

  // Connect to the websocket and register websocket event handlers.
  init() {
    this.socket = new WebSocket(this.socketAddr);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      this.logger.info('websocket is open');
      this.emit(TdpClientEvent.WS_OPEN);
    };

    this.socket.onmessage = (ev: MessageEvent) => {
      this.processMessage(ev.data as ArrayBuffer);
    };

    // The socket 'error' event will only ever be emitted by the socket
    // prior to a socket 'close' event (https://stackoverflow.com/a/40084550/6277051).
    // Therefore, we can rely on our onclose handler to account for any websocket errors.
    this.socket.onerror = null;
    this.socket.onclose = () => {
      this.logger.info('websocket is closed');

      // Clean up all of our socket's listeners and the socket itself.
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onclose = null;
      this.socket = null;

      this.emit(TdpClientEvent.WS_CLOSE);
    };

    // TODO(isaiah): delete this
    this.simulated_fsos = {
      '': {
        lastModified: BigInt(1111111111111),
        fileType: 1,
        size: BigInt(1024),
        path: '',
      },
      'TestFile.txt': {
        lastModified: BigInt(2222222222222),
        fileType: 0,
        size: BigInt(1024),
        path: 'TestFile.txt',
      },
      TestDirectory: {
        lastModified: BigInt(3333333333333),
        fileType: 1,
        size: BigInt(1024),
        path: 'TestDirectory',
      },
    };

    // TODO(LKozlowski): delete this - only for directory sharing simulation purposes
    this.simulated_files_data = {
      'TestFile.txt': new Uint8Array([
        84, 101, 108, 101, 112, 111, 114, 116, 32, 45, 32, 84, 104, 101, 32,
        101, 97, 115, 105, 101, 115, 116, 44, 32, 109, 111, 115, 116, 32, 115,
        101, 99, 117, 114, 101, 32, 119, 97, 121, 32, 116, 111, 32, 97, 99, 99,
        101, 115, 115, 32, 105, 110, 102, 114, 97, 115, 116, 114, 117, 99, 116,
        117, 114, 101, 46,
      ]),
    };
  }

  processMessage(buffer: ArrayBuffer) {
    try {
      const messageType = this.codec.decodeMessageType(buffer);
      switch (messageType) {
        case MessageType.PNG_FRAME:
          this.handlePngFrame(buffer);
          break;
        case MessageType.CLIENT_SCREEN_SPEC:
          this.handleClientScreenSpec(buffer);
          break;
        case MessageType.MOUSE_BUTTON:
          this.handleMouseButton(buffer);
          break;
        case MessageType.MOUSE_MOVE:
          this.handleMouseMove(buffer);
          break;
        case MessageType.CLIPBOARD_DATA:
          this.handleClipboardData(buffer);
          break;
        case MessageType.ERROR:
          this.handleError(new Error(this.codec.decodeErrorMessage(buffer)));
          break;
        case MessageType.MFA_JSON:
          this.handleMfaChallenge(buffer);
          break;
        case MessageType.SHARED_DIRECTORY_ACKNOWLEDGE:
          this.handleSharedDirectoryAcknowledge(buffer);
          break;
        case MessageType.SHARED_DIRECTORY_INFO_REQUEST:
          this.handleSharedDirectoryInfoRequest(buffer);
          break;
        case MessageType.SHARED_DIRECTORY_LIST_REQUEST:
          this.handleSharedDirectoryListRequest(buffer);
          break;
        case MessageType.SHARED_DIRECTORY_READ_REQUEST:
          this.handleSharedDirectoryReadRequest(buffer);
          break;
        case MessageType.SHARED_DIRECTORY_WRITE_REQUEST:
          this.handleSharedDirectoryWriteRequest(buffer);
          break;
        default:
          this.logger.warn(`received unsupported message type ${messageType}`);
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  handleClientScreenSpec(buffer: ArrayBuffer) {
    this.logger.warn(
      `received unsupported message type ${this.codec.decodeMessageType(
        buffer
      )}`
    );
  }

  handleMouseButton(buffer: ArrayBuffer) {
    this.logger.warn(
      `received unsupported message type ${this.codec.decodeMessageType(
        buffer
      )}`
    );
  }

  handleMouseMove(buffer: ArrayBuffer) {
    this.logger.warn(
      `received unsupported message type ${this.codec.decodeMessageType(
        buffer
      )}`
    );
  }

  handleClipboardData(buffer: ArrayBuffer) {
    this.emit(
      TdpClientEvent.TDP_CLIPBOARD_DATA,
      this.codec.decodeClipboardData(buffer)
    );
  }

  // Assuming we have a message of type PNG_FRAME, extract its
  // bounds and png bitmap and emit a render event.
  handlePngFrame(buffer: ArrayBuffer) {
    this.codec.decodePngFrame(buffer, (pngFrame: PngFrame) =>
      this.emit(TdpClientEvent.TDP_PNG_FRAME, pngFrame)
    );
  }

  // TODO(isaiah): neither of the TdpClientEvent.TDP_ERROR are accurate, they should
  // instead be associated with a new event TdpClientEvent.CLIENT_ERROR.
  // https://github.com/gravitational/webapps/issues/615
  handleMfaChallenge(buffer: ArrayBuffer) {
    try {
      const mfaJson = this.codec.decodeMfaJson(buffer);
      if (mfaJson.mfaType == 'n') {
        this.emit(TermEventEnum.WEBAUTHN_CHALLENGE, mfaJson.jsonString);
      } else {
        // mfaJson.mfaType === 'u', or else decodeMfaJson would have thrown an error.
        this.emit(
          TdpClientEvent.TDP_ERROR,
          new Error(
            'Multifactor authentication is required for accessing this desktop, \
      however the U2F API for hardware keys is not supported for desktop sessions. \
      Please notify your system administrator to update cluster settings \
      to use WebAuthn as the second factor protocol.'
          )
        );
      }
    } catch (err) {
      this.emit(TdpClientEvent.TDP_ERROR, err);
    }
  }

  handleSharedDirectoryAcknowledge(buffer: ArrayBuffer) {
    const ack = this.codec.decodeSharedDirectoryAcknowledge(buffer);
    console.log('Received SharedDirectoryAcknowledge: ' + JSON.stringify(ack));
  }

  handleSharedDirectoryInfoRequest(buffer: ArrayBuffer) {
    const req = this.codec.decodeSharedDirectoryInfoRequest(buffer);
    console.log('Received SharedDirectoryInfoRequest: ' + JSON.stringify(req));

    if (
      req.path === '' ||
      req.path === 'TestFile.txt' ||
      req.path === 'TestDirectory'
    ) {
      this.sendSharedDirectoryInfoResponse({
        completionId: req.completionId,
        errCode: 0,
        fso: this.simulated_fsos[req.path],
      });
    } else if (
      req.path === 'desktop.ini' ||
      req.path === 'TestDirectory/desktop.ini' ||
      req.path === 'TestFile.txt:Zone.Identifier'
    ) {
      this.sendSharedDirectoryInfoResponse({
        completionId: req.completionId,
        errCode: 2,
        fso: {
          lastModified: BigInt(0),
          fileType: 0,
          size: BigInt(0),
          path: req.path,
        },
      });
    } else {
      this.logger.error('Unrecognized path: ' + req.path);
      // If we receive anything unexpected, send back an operation failed error which will kill the session,
      // alerting us to new behavior on the backend.
      this.sendSharedDirectoryInfoResponse({
        completionId: req.completionId,
        errCode: 1,
        fso: {
          lastModified: BigInt(0),
          fileType: 0,
          size: BigInt(0),
          path: req.path,
        },
      });
    }
  }

  handleSharedDirectoryListRequest(buffer: ArrayBuffer) {
    const req = this.codec.decodeSharedDirectoryListRequest(buffer);
    console.log('Received SharedDirectoryListRequest: ' + JSON.stringify(req));

    if (req.path === '') {
      this.sendSharedDirectoryListResponse({
        completionId: req.completionId,
        errCode: 0,
        fsoList: [
          this.simulated_fsos['TestFile.txt'],
          this.simulated_fsos['TestDirectory'],
        ],
      });
    } else if (req.path === 'TestDirectory') {
      this.sendSharedDirectoryListResponse({
        completionId: req.completionId,
        errCode: 0,
        fsoList: [],
      });
    } else {
      this.logger.error('unrecognized path: ', req.path);
      // If we receive anything unexpected, send back an operation failed error which will kill the session,
      // alerting us to new behavior on the backend.
      this.sendSharedDirectoryListResponse({
        completionId: req.completionId,
        errCode: 1,
        fsoList: [],
      });
    }
  }

  handleSharedDirectoryReadRequest(buffer: ArrayBuffer) {
    const request = this.codec.decodeSharedDirectoryReadRequest(buffer);

    if (!this.simulated_files_data.hasOwnProperty(request.path)) {
      this.sendSharedDirectoryReadResponse({
        completionId: request.completionId,
        errCode: 1,
        readDataLength: 0,
        readData: new Uint8Array(),
      });
    } else {
      let data = this.simulated_files_data[request.path];
      this.sendSharedDirectoryReadResponse({
        completionId: request.completionId,
        errCode: 0,
        readDataLength: data.length,
        readData: data,
      });
    }
  }

  handleSharedDirectoryWriteRequest(buffer: ArrayBuffer) {
    const request = this.codec.decodeSharedDirectoryWriteRequest(buffer);

    // TODO(LKozlowski): delete this - only for directory sharing simulation purposes
    // just send success respone without doing anything for now
    if (!this.simulated_files_data.hasOwnProperty(request.path)) {
      this.sendSharedDirectoryWriteResponse({
        completionId: request.completionId,
        errCode: 0,
        bytesWritten: request.writeData.length,
      });
    } else {
      // for testing let's swap the contents ignoring offsets etc
      this.simulated_files_data[request.path] = request.writeData;
      // update the size of our file so when we read it again then we'll see the
      // all data. Without updating size it if we added text to the file then
      // we would see cropped contents
      this.simulated_fsos[request.path]['size'] = BigInt(
        request.writeData.length
      );
      this.sendSharedDirectoryWriteResponse({
        completionId: request.completionId,
        errCode: 0,
        bytesWritten: request.writeData.length,
      });
    }
  }

  sendUsername(username: string) {
    this.socket?.send(this.codec.encodeUsername(username));
  }

  sendMouseMove(x: number, y: number) {
    this.socket.send(this.codec.encodeMouseMove(x, y));
  }

  sendMouseButton(button: MouseButton, state: ButtonState) {
    this.socket.send(this.codec.encodeMouseButton(button, state));
  }

  sendMouseWheelScroll(axis: ScrollAxis, delta: number) {
    this.socket.send(this.codec.encodeMouseWheelScroll(axis, delta));
  }

  sendKeyboardInput(code: string, state: ButtonState) {
    // Only send message if key is recognized, otherwise do nothing.
    const msg = this.codec.encodeKeyboardInput(code, state);
    if (msg) this.socket.send(msg);
  }

  sendClipboardData(clipboardData: ClipboardData) {
    this.socket.send(this.codec.encodeClipboardData(clipboardData));
  }

  sendWebAuthn(data: WebauthnAssertionResponse) {
    const msg = this.codec.encodeMfaJson({
      mfaType: 'n',
      jsonString: JSON.stringify(data),
    });
    this.socket.send(msg);
  }

  sendSharedDirectoryAnnounce(name: string) {
    this.socket.send(
      this.codec.encodeSharedDirectoryAnnounce({
        completionId: 0, // This is always the first request.
        directoryId: 2, // Hardcode for now since we only support sharing 1 directory.
        name,
      })
    );
  }

  sendSharedDirectoryWriteResponse(response: SharedDirectoryWriteResponse) {
    this.socket.send(this.codec.encodeSharedDirectoryWriteResponse(response));
  }

  sendSharedDirectoryReadResponse(response: SharedDirectoryReadResponse) {
    this.socket.send(this.codec.encodeSharedDirectoryReadResponse(response));
  }

  sendSharedDirectoryInfoResponse(res: SharedDirectoryInfoResponse) {
    this.socket.send(this.codec.encodeSharedDirectoryInfoResponse(res));
  }

  sendSharedDirectoryListResponse(res: SharedDirectoryListResponse) {
    this.socket.send(this.codec.encodeSharedDirectoryListResponse(res));
  }

  resize(spec: ClientScreenSpec) {
    this.socket?.send(this.codec.encodeClientScreenSpec(spec));
  }

  // Emits an TdpClientEvent.ERROR event. Sets this.errored to true to alert the socket.onclose handler that
  // it needn't emit a generic unknown error event.
  handleError(err: Error) {
    this.logger.error(err);
    this.emit(TdpClientEvent.TDP_ERROR, err);
    this.socket?.close();
  }

  // Ensures full cleanup of this object.
  // Note that it removes all listeners first and then cleans up the socket,
  // so don't call this if your calling object is relying on listeners.
  // It's safe to call this multiple times, calls subsequent to the first call
  // will simply do nothing.
  nuke() {
    this.removeAllListeners();
    this.socket?.close();
  }
}
