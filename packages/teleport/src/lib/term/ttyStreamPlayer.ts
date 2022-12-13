/*
Copyright 2019-2022 Gravitational, Inc.

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

import Logger from 'shared/libs/logger';
import { Buffer } from 'buffer';

import { EventTypeEnum, TermEventEnum } from './enums';
import Tty from './tty';

const logger = Logger.create('TtyPlayer');
export const StatusEnum = {
  PLAYING: 'PLAYING',
  ERROR: 'ERROR',
  PAUSED: 'PAUSED',
  LOADING: 'LOADING',
  ENDED: 'ENDED',
};

enum Action {
  TOGGLE_PLAY_PAUSE = 'play/pause',
  PLAY_SPEED = 'speed',
  MOVE = 'move',
}

const PLAY_SPEED = 10;

function formatDisplayTime(ms): string {
  if (ms <= 0) {
    return '00:00';
  }

  const totalSec = Math.floor(ms / 1000);
  const totalDays = (totalSec % 31536000) % 86400;
  const hours = Math.floor(totalDays / 3600);
  const minutes = Math.floor((totalDays % 3600) / 60);
  const seconds = (totalDays % 3600) % 60;

  const minutesStr = minutes > 9 ? minutes : '0' + minutes;
  const secondsStr = seconds > 9 ? seconds : '0' + seconds;
  const hoursStr = hours > 0 ? hours + ':' : '';

  return `${hoursStr}${minutesStr}:${secondsStr}`;
}

export default class TtyPlayer extends Tty {
  private decoder = new TextDecoder('utf-8');
  public status = StatusEnum.LOADING;
  public statusText = '';
  private eventCount = 0;
  public current = 0;
  public currentEventIndex = 0;
  private timer: NodeJS.Timer;

  constructor(private address: string, public duration: number) {
    super({});
  }

  connect(): Promise<void> {
    return new Promise(resolve => {
      this.socket = new WebSocket(this.address);
      this.socket.binaryType = 'arraybuffer';
      this.socket.onopen = () => {
        this._onOpenConnection();
        resolve();
      };
      this.socket.onmessage = this._onMessage;
      this.socket.onclose = this._onCloseConnection;
      this.status = StatusEnum.LOADING;
    });
  }

  isLoading(): boolean {
    return this.status === StatusEnum.LOADING;
  }

  isPlaying(): boolean {
    return this.status === StatusEnum.PLAYING;
  }

  // This is read only player, so no sending any messages back to server here
  send(): void {}

  // This is read only player, so no sending any messages back to server he
  requestResize(): void {}

  _onMessage(ev: any): void {
    const message = JSON.parse(this.decoder.decode(ev.data));
    this.eventCount++;

    if (message.ms) {
      this.current = message.ms;
    }

    this.change();
    if (this.isLoading()) {
      this.startInterval();
      this.status = StatusEnum.PLAYING;
    }

    if (message.message === 'end') {
      this.status = StatusEnum.ENDED;
      return;
    }

    switch (message.event) {
      case EventTypeEnum.START:
        this.resize(message);
        break;
      case EventTypeEnum.RESIZE:
        this.resize(message);
        break;
      case EventTypeEnum.PRINT:
        this.print(message);
        break;
      case EventTypeEnum.RESET:
        this.reset();
        break;
      case EventTypeEnum.MOVE:
        this.current = message.position;
        break;
    }
  }

  private reset() {
    this.current = 0;
    this.emit(TermEventEnum.RESET);
  }

  private resize(message: any): void {
    const [w, h] = message.size.split(':');

    this.emit(TermEventEnum.RESIZE, { h, w });
  }

  private print(message: any): void {
    const text = Buffer.from(message.data, 'base64').toString('utf8');

    this.emit(TermEventEnum.DATA, text);
  }

  getCurrentTime(): string {
    if (this.duration > 0) {
      return `${formatDisplayTime(this.current)}`;
    }

    return '--:--';
  }

  getEventCount(): number {
    return this.eventCount;
  }

  protected sendMsg(
    data: string | ArrayBufferLike | Blob | ArrayBufferView
  ): void {
    if (this.socket && this.socket.readyState === 1) {
      try {
        this.socket.send(data);
      } catch (e) {
        this.handleError(e);
      }
      return;
    }

    this.handleError(new Error('websocket unavailable'));
  }

  // Emits an errType event, closing the socket if the error was fatal.
  private handleError(err: Error) {
    logger.error(err);
    this.socket?.close();
  }

  togglePlayPause() {
    this.sendMsg(JSON.stringify({ action: Action.TOGGLE_PLAY_PAUSE }));
    this.status =
      this.status === StatusEnum.PLAYING
        ? StatusEnum.PAUSED
        : StatusEnum.PLAYING;

    if (!this.isPlaying()) {
      this.clearInterval();
    } else {
      this.startInterval();
    }

    this.change();
  }

  stop() {
    if (this.isPlaying()) {
      this.togglePlayPause();
    }
  }

  play() {
    if (!this.isPlaying()) {
      this.togglePlayPause();
    }
  }

  move(value: number) {
    if (this.status === StatusEnum.ENDED) {
      this.current = 0;
      this.status = StatusEnum.LOADING;
      this.connect();
      return;
    }

    this.sendMsg(JSON.stringify({ action: Action.MOVE, movePosition: value }));
  }

  private startInterval() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.current += 10;
        this.change();
      }, PLAY_SPEED);
    }
  }

  private clearInterval() {
    clearInterval(this.timer);
    this.timer = null;
  }

  private change() {
    this.emit('change');
  }
}
