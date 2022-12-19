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

import { WebSession } from 'teleport/services/websession';
import history from 'teleport/services/history';

import { SessionContextProvider } from 'teleport/WebSessionContext';

const logger = Logger.create('/components/Authenticated');
const ACTIVITY_CHECKER_INTERVAL_MS = 30 * 1000;
const ACTIVITY_EVENT_DELAY_MS = 15 * 1000;

const events = [
  // Fired from any keyboard key press.
  'keydown',
  // Fired when a pointer (cursor, pen/stylus, touch) changes coordinates.
  // This also handles mouse scrolling. It's unlikely a user will keep their
  // mouse still when scrolling.
  'pointermove',
  // Fired when a pointer (cursor, pen/stylus, touch) becomes active button
  // states (ie: mouse clicks or pen/finger has physical contact with touch enabled screen).
  'pointerdown',
];

const Container: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const session = new WebSession();

  return <Authenticated session={session}>{children}</Authenticated>;
};

const Authenticated: React.FC<{
  session: WebSession;
  children: React.ReactNode;
}> = ({ session, children }) => {
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

    return startActivityChecker(inactivityTtl, session);
  }, []);

  if (!session.isValid()) {
    return null;
  }

  return (
    <SessionContextProvider session={session}>
      {children}
    </SessionContextProvider>
  );
};

export default Container;

function startActivityChecker(ttl = 0, session: WebSession) {
  // adjustedTtl slightly improves accuracy of inactivity time.
  // This will at most cause user to log out ACTIVITY_CHECKER_INTERVAL_MS early.
  // NOTE: Because of browser js throttling on inactive tabs, expiry timeout may
  // still be extended up to over a minute.
  const adjustedTtl = ttl - ACTIVITY_CHECKER_INTERVAL_MS;

  // See if there is inactive date already set in local storage.
  // This is to check for idle timeout reached while app was closed
  // ie. browser still openend but all app tabs closed.
  if (isInactive(adjustedTtl, session.getLastActive())) {
    logger.warn('inactive session');
    session.logout();
    return;
  }

  // Initialize or renew the storage before starting interval.
  session.setLastActive(Date.now());

  const intervalId = setInterval(() => {
    if (isInactive(adjustedTtl, session.getLastActive())) {
      logger.warn('inactive session');
      session.logout();
    }
  }, ACTIVITY_CHECKER_INTERVAL_MS);

  const throttled = throttle(() => {
    session.setLastActive(Date.now());
  }, ACTIVITY_EVENT_DELAY_MS);

  events.forEach(event => window.addEventListener(event, throttled));

  function stop() {
    throttled.cancel();
    clearInterval(intervalId);
    events.forEach(event => window.removeEventListener(event, throttled));
  }

  return stop;
}

function isInactive(ttl = 0, lastActive: number) {
  return lastActive > 0 && Date.now() - lastActive > ttl;
}
