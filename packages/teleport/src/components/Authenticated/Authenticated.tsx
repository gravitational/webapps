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

import React from 'react';
import { throttle } from 'lodash';
import Logger from 'shared/libs/logger';
import session from 'teleport/services/session';
import history from 'teleport/services/history';
import localStorage from 'teleport/services/localStorage';

const logger = Logger.create('/components/Authenticated');
const ACTIVITY_CHECKER_INTERVAL_MS = 30 * 1000;
const ACTIVITY_EVENT_DELAY_MS = 15 * 1000;

const Authenticated: React.FC = ({ children }) => {
  React.useEffect(() => {
    if (!session.isValid()) {
      logger.warn('invalid session');
      session.clear();
      history.goToLogin(true);
      return;
    }

    session.ensureSession();

    const inactivityTtl = session.getInactivityTimeout();
    if (inactivityTtl === 0) {
      return;
    }

    return startActivityChecker(inactivityTtl);
  }, []);

  if (!session.isValid()) {
    return null;
  }

  return <>{children}</>;
};

export default Authenticated;

function startActivityChecker(inactivityTtl = 0) {
  // adjustedInactivityTtl slightly improves accuracy of inactivity time.
  // This will at most cause user to log out ACTIVITY_CHECKER_INTERVAL_MS early.
  // NOTE: Because of browser js throttling on inactive tabs, expiry timeout may
  // still be extended up to over a minute.
  const adjustedInactivityTtl = inactivityTtl - ACTIVITY_CHECKER_INTERVAL_MS;

  // See if there is inactive date already set in local storage.
  // This is to check for idle timeout reached while app was closed
  // ie. browser still openend but all app tabs closed.
  checkInactivityTimeout(adjustedInactivityTtl);

  localStorage.setLastActive(Date.now());

  const intervalId = setInterval(() => {
    checkInactivityTimeout(adjustedInactivityTtl);
  }, ACTIVITY_CHECKER_INTERVAL_MS);

  const throttled = throttle(() => {
    localStorage.setLastActive(Date.now());
  }, ACTIVITY_EVENT_DELAY_MS);

  // Fired from any keyboard key press.
  window.addEventListener('keydown', throttled);

  // Fired when a pointer (cursor, pen/stylus, touch) changes coordinates.
  // This also handles mouse scrolling. It's unlikely a user will keep their
  // mouse still when scrolling.
  window.addEventListener('pointermove', throttled);

  // Fired when a pointer (cursor, pen/stylus, touch) becomes active button
  // states (ie: mouse clicks or pen/finger has physical contact with touch enabled screen).
  window.addEventListener('pointerdown', throttled);

  function stop() {
    throttled.cancel();
    clearInterval(intervalId);
    window.removeEventListener('keydown', throttled);
    window.removeEventListener('pointermove', throttled);
    window.removeEventListener('pointerdown', throttled);
  }

  return stop;
}

function checkInactivityTimeout(inactivityTtl = 0) {
  const lastActive = localStorage.getLastActive();
  if (Date.now() - lastActive > inactivityTtl) {
    logger.warn('inactive session');
    session.logout();
  }
}
