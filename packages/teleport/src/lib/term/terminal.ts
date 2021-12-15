/*
Copyright 2019-2021 Gravitational, Inc.

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
import { TermEventEnum } from './enums';
import Tty from './tty';

const logger = Logger.create('lib/term/terminal');
const DISCONNECT_TXT = 'disconnected';
const WINDOW_RESIZE_DEBOUNCE_DELAY = 200;

/**
 * TtyTerminal is a wrapper on top of xtermjs that handles connections
 * and resize events
 */
export default class TtyTerminal {
  term: Terminal;
  tty: Tty;

  _el: HTMLElement;
  _scrollBack: number;
  _fitAddon = new FitAddon();

  _debouncedResize: () => void;

  constructor(tty: Tty, options: Options) {
    const { el, scrollBack } = options;
    this._el = el;
    this._scrollBack = scrollBack;
    this.tty = tty;
    this.term = null;

    this._debouncedResize = debounce(
      this._requestResize.bind(this),
      WINDOW_RESIZE_DEBOUNCE_DELAY
    );
  }

  open() {
    // render xtermjs with default values
    this.term = new Terminal({
      cursorBlink: false,
      scrollback: this._scrollBack || 1000,
      allowTransparency: true,
    });

    this.term.loadAddon(this._fitAddon);
    this.term.open(this._el);

    this._fitAddon.fit();
    this.term.focus();

    // subscribe to xtermjs output
    this.term.onData(data => {
      this.tty.send(data);
    });

    // subscribe to window resize events
    window.addEventListener('resize', this._debouncedResize);

    // subscribe to tty
    this.tty.on(TermEventEnum.RESET, this.reset.bind(this));
    this.tty.on(TermEventEnum.CONN_CLOSE, this._processClose.bind(this));
    this.tty.on(TermEventEnum.DATA, this._processData.bind(this));
    this.tty.on(
      TermEventEnum.U2F_CHALLENGE,
      this._processU2FChallenge.bind(this)
    );

    // subscribe tty resize event (used by session player)
    this.tty.on(TermEventEnum.RESIZE, ({ h, w }) => this.resize(w, h));

    this.connect();
  }

  connect() {
    this.tty.connect(this.term.cols, this.term.rows);
  }

  destroy() {
    this._disconnect();

    if (this.term !== null) {
      this.term.dispose();
    }

    this._fitAddon.dispose();
    this._el.innerHTML = null;

    window.removeEventListener('resize', this._debouncedResize);
  }

  reset() {
    this.term.reset();
  }

  resize(cols, rows) {
    try {
      // if not defined, use the size of the container
      if (!isInteger(cols) || !isInteger(rows)) {
        cols = this.term.cols;
        rows = this.term.rows;
      }

      if (cols === this.term.cols && rows === this.term.rows) {
        return;
      }

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

  _disconnect() {
    this.tty.disconnect();
    this.tty.removeAllListeners();
  }

  _requestResize() {
    this._fitAddon.fit();
    this.tty.requestResize(this.term.cols, this.term.rows);
  }

  _processU2FChallenge(payload) {
    if (!window['u2f']) {
      const termMsg =
        'This browser does not support U2F required for hardware tokens, please try Chrome or Firefox instead.';
      this.term.write(`\x1b[31m${termMsg}\x1b[m\r\n`);
      return;
    }

    const data = JSON.parse(payload);
    window['u2f'].sign(
      data.appId,
      data.challenge,
      data.u2f_challenges,
      this._processU2FResponse.bind(this)
    );

    const actionMsg =
      'Authentication is required. Tap any *registered* security key.';
    this.term.write(`\x1b[37m${actionMsg}\x1b[m\r\n`);
  }

  _processU2FResponse(res) {
    if (res.errorCode) {
      var errorMsg;
      if (res.errorMessage) {
        errorMsg = res.errorMessage;
      } else {
        errorMsg = `error code ${res.errorCode}`;
        // lookup error message for code.
        for (var msg in window['u2f'].ErrorCodes) {
          if (window['u2f'].ErrorCodes[msg] == res.errorCode) {
            errorMsg = msg;
          }
        }
      }
      const termMsg = `Please check your U2F settings, make sure it is plugged in and you are using the supported browser.\r\nU2F error: ${errorMsg}`;
      this.term.write(`\x1b[31m${termMsg}\x1b[m\r\n`);
      return;
    }
    this.tty.send(JSON.stringify(res));
  }
}

type Options = {
  el: HTMLElement;
  scrollBack?: number;
};
