/**
 * Copyright 2021 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { throttle } from 'lodash';
import Logger from 'shared/libs/logger';
import session from 'teleport/services/session';

const logger = Logger.create('lib/idleTimer');

// IDLE_EXPIRY is the local storage key to store idle expiry.
const IDLE_EXPIRY = 'grv_teleport_idle_expiry';

// IDLE_EXPIRY_CHECKER_INTERVAL is the time interval used to check idle expiry time.
const IDLE_EXPIRY_CHECKER_INTERVAL = 60 * 1000; // 1 min.

// EVENT_DELAY_MS is the delay in between one event to the next event.
const EVENT_DELAY_MS = 30 * 1000;

// IdleTimer once instantiated starts a checker that periodically checks
// if user has reached idle expiry, which if expired logs user out.
export default class IdleTimer {
  // maxIdleTime is the max duration in milliseconds a user can be idle before being logged out.
  private maxIdleTime: number;

  // idleExpiryCheckerId is the id of the expiry checker interval timer, used to cancel the timer.
  private idleExpiryCheckerId: NodeJS.Timeout;

  // eventHandler is the function to call when an event is triggered.
  private eventHandler: any;

  constructor(maxIdleTime = 0) {
    if (maxIdleTime <= 0) {
      logger.error('idleTimer.constructor', 'maxIdleTime cannot be <= 0');
      return;
    }

    // See if there is idle expiry already set in local storage.
    // This is to check for idle timeout reached while app was closed
    // ie. browser still openend but all app tabs closed
    const idleExpiry = getIdleExpiryFromLocalStorage();
    if (idleExpiry > 0 && idleExpiry < Date.now()) {
      this.onIdleTimeout();
      return;
    }

    // Subtract a minute off the actual max idle time to minimize inaccurate idleness.
    // This results in about +/- one minute inaccuracy: user can get logged out at most 1 minute
    // earlier (depending on checker interval) or user can get at least a minute of extra time
    // than specified to provide event activity (depending on browser js timer throttling,
    // safari was seen to go up to 108 seconds).
    this.maxIdleTime = maxIdleTime - 60 * 1000;

    this.eventHandler = throttle(
      this.renewIdleExpiry.bind(this),
      EVENT_DELAY_MS
    );

    this.setListenersForUserInteraction();
    this.renewIdleExpiry();
    this.startIdleExpiryChecker();
  }

  private startIdleExpiryChecker() {
    this.idleExpiryCheckerId = setInterval(() => {
      if (isIdleTimeoutReached()) {
        this.onIdleTimeout();
      }
    }, IDLE_EXPIRY_CHECKER_INTERVAL);
  }

  private onIdleTimeout() {
    this.destroy();

    // This clears the local storage.
    session.logout();
  }

  private renewIdleExpiry() {
    setIdleExpiryInLocalStorage(Date.now() + this.maxIdleTime);
  }

  // setListenersForUserInteraction adds event listeners that are common for determining
  // user interacting with the UI.
  private setListenersForUserInteraction() {
    // Fired from any keyboard key press.
    window.addEventListener('keydown', this.eventHandler);

    // Fired when a pointer (cursor, pen/stylus, touch) changes coordinates.
    // This also handles mouse scrolling. It's unlikely a user will keep their
    // mouse still when scrolling.
    window.addEventListener('pointermove', this.eventHandler);

    // Fired when a pointer (cursor, pen/stylus, touch) becomes active button
    // states (ie: mouse clicks or pen/finger has physical contact with touch enabled screen).
    window.addEventListener('pointerdown', this.eventHandler);
  }

  destroy() {
    clearInterval(this.idleExpiryCheckerId);
    window.removeEventListener('keydown', this.eventHandler);
    window.removeEventListener('pointermove', this.eventHandler);
    window.removeEventListener('pointerdown', this.eventHandler);
  }
}

function isIdleTimeoutReached() {
  return getIdleExpiryFromLocalStorage() < Date.now();
}

function getIdleExpiryFromLocalStorage() {
  const time = Number(window.localStorage.getItem(IDLE_EXPIRY));

  return time ? time : 0;
}

function setIdleExpiryInLocalStorage(timeout: number) {
  window.localStorage.setItem(IDLE_EXPIRY, `${timeout}`);
}
