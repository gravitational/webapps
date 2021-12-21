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

import * as nodePTY from 'node-pty';
import { EventEmitter } from 'events';
import { PtyOptions } from './types';
import Logger from 'teleterm/logger';

class PtyProcess extends EventEmitter {
  private buffered = true;
  private attachedBufferTimer;
  private attachedBuffer: string;
  private process?: nodePTY.IPty;
  private logger: Logger;

  constructor(private options: PtyOptions) {
    super();
    this.logger = new Logger('PTY Process');
  }

  start(cols: number, rows: number) {
    this.process = nodePTY.spawn(this.options.path, this.options.args, {
      cols,
      rows,
      name: 'xterm-color',
      cwd: this.options.cwd || process.cwd(),
      env: {
        ...process.env,
        ...this.options.env,
      },
    });

    this.onStart();
    this.process.onData(data => this.onData(data));
    this.process.onExit(ev => this.onExit(ev));
  }

  send(data: string) {
    if (!this.process || !data) {
      return;
    }

    this.process.write(data);
  }

  resize(cols: number, rows: number) {
    this.process?.resize(cols, rows);
  }

  dispose() {
    this.removeAllListeners();
    this.process?.kill();
  }

  getPid() {
    return this.process?.pid;
  }

  private flushBuffer() {
    this.emit(TermEventEnum.DATA, this.attachedBuffer);
    this.attachedBuffer = null;
    clearTimeout(this.attachedBufferTimer);
    this.attachedBufferTimer = null;
  }

  private pushToBuffer(data: string) {
    if (this.attachedBuffer) {
      this.attachedBuffer += data;
    } else {
      this.attachedBuffer = data;
      setTimeout(this.flushBuffer.bind(this), 10);
    }
  }

  private onExit(e: { exitCode: number; signal?: number }) {
    this.emit(TermEventEnum.EXIT, e);
    this.process = undefined;
    this.logger.info('pty has been terminated');
  }

  private onStart() {
    this.emit('open');
    this.logger.info('pty is open');
  }

  private onData(data: string) {
    try {
      if (this.buffered) {
        this.pushToBuffer(data);
      } else {
        this.emit(TermEventEnum.DATA, data);
      }
    } catch (err) {
      this.logger.error('failed to parse incoming message.', err);
    }
  }
}

export default PtyProcess;

export const TermEventEnum = {
  CLOSE: 'terminal.close',
  RESET: 'terminal.reset',
  DATA: 'terminal.data',
  EXIT: 'terminal.exit',
};
