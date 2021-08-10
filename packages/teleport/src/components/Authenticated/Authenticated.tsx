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

const logger = Logger.create('/components/Authenticated');

const IDLE_EXPIRY_CHECKER_INTERVAL_MS = 30 * 1000;
const EVENT_DELAY_MS = 15 * 1000;

const Authenticated: React.FC = ({ children }) => {
  const [isProcessing, setIsProcessing] = React.useState(true);

  React.useEffect(() => {
    if (!session.isValid()) {
      logger.warn('invalid session');
      session.clear();
      history.goToLogin(true);
      return;
    }
    session.ensureSession();

    // See if there is idle expiry already set in local storage.
    // This is to check for idle timeout reached while app was closed
    // ie. browser still openend but all app tabs closed
    const idleExpiry = session.getIdleExpiry();
    if (idleExpiry > 0 && idleExpiry <= Date.now()) {
      logger.warn('inactive session');
      session.logout();
      return;
    }

    // Duration of zero means web idle timeout is not configured,
    // so we skip starting a idle watcher.
    const maxIdleTime = session.getIdleTimeout();
    if (maxIdleTime <= 0) {
      setIsProcessing(false);
      return;
    }

    // Set up a idle watcher.
    const renewIdleExpiry = () => {
      session.setIdleExpiry(Date.now() + maxIdleTime);
    };

    const eventHandler = throttle(renewIdleExpiry, EVENT_DELAY_MS);

    setListenersForUserInteraction(eventHandler);
    renewIdleExpiry();

    const intervalId = setInterval(() => {
      // This will at most cause user to log out IDLE_EXPIRY_CHECKER_INTERVAL_MS early.
      // NOTE: Because of browser js throttling on inactive tabs, expiry timeout may be extended.
      // up to over a minute.
      const expiry = session.getIdleExpiry();
      if (expiry - Date.now() <= IDLE_EXPIRY_CHECKER_INTERVAL_MS) {
        logger.warn('inactive session');
        session.logout();
      }
    }, IDLE_EXPIRY_CHECKER_INTERVAL_MS);

    setIsProcessing(false);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', eventHandler);
      window.removeEventListener('pointermove', eventHandler);
      window.removeEventListener('pointerdown', eventHandler);
    };
  }, []);

  if (isProcessing) {
    return null;
  }

  return <>{children}</>;
};

export default Authenticated;

// setListenersForUserInteraction adds event listeners that are common for determining
// user interacting with the UI.
function setListenersForUserInteraction(eventHandler: any) {
  // Fired from any keyboard key press.
  window.addEventListener('keydown', eventHandler);

  // Fired when a pointer (cursor, pen/stylus, touch) changes coordinates.
  // This also handles mouse scrolling. It's unlikely a user will keep their
  // mouse still when scrolling.
  window.addEventListener('pointermove', eventHandler);

  // Fired when a pointer (cursor, pen/stylus, touch) becomes active button
  // states (ie: mouse clicks or pen/finger has physical contact with touch enabled screen).
  window.addEventListener('pointerdown', eventHandler);
}
