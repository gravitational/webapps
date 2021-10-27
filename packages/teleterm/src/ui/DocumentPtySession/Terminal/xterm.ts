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

import 'xterm/css/xterm.css';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { debounce, isInteger } from 'lodash';
import Logger from 'shared/libs/logger';
import { PtyProcess } from 'teleterm/services/pty/types';

const logger = Logger.create('lib/term/terminal');
const DISCONNECT_TXT = 'disconnected';
const WINDOW_RESIZE_DEBOUNCE_DELAY = 200;

type Options = {
  el: HTMLElement;
  scrollBack?: number;
};

class TtyTerminal {
  term: Terminal;
  cols: number;
  rows: number;

  _ptyProcess: PtyProcess;
  _el: HTMLElement;
  _fitAddon = new FitAddon();

  _debouncedResize: () => void;

  constructor(ptyProcess: PtyProcess, options: Options) {
    const { el, scrollBack = 1000 } = options;
    this._el = el;
    this._ptyProcess = ptyProcess;
    this.rows = undefined;
    this.cols = undefined;
    this.term = null;

    this._debouncedResize = debounce(
      this._requestResize.bind(this),
      WINDOW_RESIZE_DEBOUNCE_DELAY
    );
  }

  open() {
    this.term = new Terminal({
      cursorBlink: false,
    });

    this.term.loadAddon(this._fitAddon);
    this.term.open(this._el);

    this._fitAddon.fit();

    // subscribe to xtermjs output
    this.term.onData(data => {
      this._ptyProcess.write(data);
    });

    this._ptyProcess.onData(this._processData.bind(this));

    this._ptyProcess.start(this.term.cols, this.term.rows);

    this.term.onResize(size => {
      this._ptyProcess.resize(size.cols, size.rows);
    });

    window.addEventListener('resize', this._debouncedResize);
  }

  destroy() {
    window.removeEventListener('resize', this._debouncedResize);
    this._ptyProcess.dispose();
    if (this.term !== null) {
      this.term.dispose();
    }

    this._el.innerHTML = null;
  }

  resize(cols, rows) {
    try {
      // if not defined, use the size of the container
      if (!isInteger(cols) || !isInteger(rows)) {
        const dim = this._getDimensions();
        cols = dim.cols;
        rows = dim.rows;
      }

      if (cols === this.cols && rows === this.rows) {
        return;
      }

      this.cols = cols;
      this.rows = rows;
      this.term.resize(cols, rows);
    } catch (err) {
      logger.error('xterm.resize', { w: cols, h: rows }, err);
      this.term.reset();
    }
  }

  _processData(data) {
    try {
      this.term.write(data);
    } catch (err) {
      logger.error('xterm.write', data, err);
      // recover xtermjs by resetting it
      this.term.reset();
    }
  }

  _processClose(e) {
    const { reason } = e;
    let displayText = DISCONNECT_TXT;
    if (reason) {
      displayText = `${displayText}: ${reason}`;
    }

    displayText = `\x1b[31m${displayText}\x1b[m\r\n`;
    this.term.write(displayText);
  }

  _requestResize() {
    this._fitAddon.fit();
    this._ptyProcess.resize(this.term.cols, this.term.rows);
  }

  _getDimensions() {
    const $terminal = this._el.querySelector('.terminal');

    const $fakeRow = document.createElement('div');
    $fakeRow.innerHTML = `<span>&nbsp;</span>`;
    $terminal.appendChild($fakeRow);

    const fakeColHeight = $fakeRow.getBoundingClientRect().height;
    const fakeColWidth = $fakeRow.firstElementChild.getBoundingClientRect()
      .width;
    const width = this._el.clientWidth;
    const height = this._el.clientHeight;
    const cols = Math.floor(width / fakeColWidth);
    const rows = Math.floor(height / fakeColHeight);

    $terminal.removeChild($fakeRow);
    return { cols, rows };
  }
}

export default TtyTerminal;
