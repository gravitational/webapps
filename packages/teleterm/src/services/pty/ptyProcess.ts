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

import { EventEmitter } from 'events';
import { Logger } from 'shared/libs/logger';
import * as types from './types';
import * as nodePTY from 'node-pty';

class PtyProcess extends EventEmitter {
  _options: types.PtyOptions;
  _buffered = true;
  _attachedBufferTimer;
  _attachedBuffer: string;
  _process: nodePTY.IPty;
  _logger: Logger;

  constructor(options: types.PtyOptions) {
    super();
    this._options = options || {};
    this._logger = new Logger();
  }

  //  runCmd() {

  /*

      cmd.getPath();
      cmd.getCwd();
      cmd.getEnv();
      cmd.getArgs();


      ptyService.createSshCommand(clusterId, nodeId, login){
        const cmd = new TshSshCommand()


      }





          this._process = nodePTY.spawn(
            'bash',
            [],
            //'/home/alexey/go/src/github.com/gravitational/teleport/e/build/tsh',
            //['--proxy=localhost', 'ssh', 'root@p14s'],
            {
              cols,
              rows,
              name: 'xterm-color',
              cwd: process.cwd(),
              env: {
                ...process.env,
                TELEPORT_CLUSTER: 'p14s',
              },
            }
          );
        }
    */

  start(cols: number, rows: number) {
    this._process = nodePTY.spawn(
      'bash',
      [],
      //'/home/alexey/go/src/github.com/gravitational/teleport/e/build/tsh',
      //['--proxy=localhost', 'ssh', 'root@p14s'],
      {
        cols,
        rows,
        name: 'xterm-color',
        cwd: process.cwd(),
        env: {
          ...process.env,
          ...this._options.env,
        },
      }
    );

    this._process.onData(data => this._onData(data));
    this._process.onExit(ev => this._onExit(ev));
  }

  send(data: string) {
    if (!this._process || !data) {
      return;
    }

    this._process.write(data);
  }

  resize(cols: number, rows: number) {
    this._process.resize(cols, rows);
  }

  dispose() {
    this.removeAllListeners();
    this._process.kill();
  }

  _flushBuffer() {
    this.emit(TermEventEnum.DATA, this._attachedBuffer);
    this._attachedBuffer = null;
    clearTimeout(this._attachedBufferTimer);
    this._attachedBufferTimer = null;
  }

  _pushToBuffer(data: string) {
    if (this._attachedBuffer) {
      this._attachedBuffer += data;
    } else {
      this._attachedBuffer = data;
      setTimeout(this._flushBuffer.bind(this), 10);
    }
  }

  _onExit(e: { exitCode: number; signal?: number }) {
    this.emit(TermEventEnum.EXIT, e);
    this._logger.info('pty has been terminated');
  }

  _onStart() {
    this.emit('open');
    this._logger.info('pty is open');
  }

  _onData(data: string) {
    try {
      console.log(data);
      if (this._buffered) {
        this._pushToBuffer(data);
      } else {
        this.emit(TermEventEnum.DATA, data);
      }
    } catch (err) {
      this._logger.error('failed to parse incoming message.', err);
    }
  }
}

export default PtyProcess;

export const TermEventEnum = {
  RESIZE: 'terminal.resize',
  CLOSE: 'terminal.close',
  RESET: 'terminal.reset',
  DATA: 'terminal.data',
  EXIT: 'terminal.exit',
};
