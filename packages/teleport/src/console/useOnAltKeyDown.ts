/**
 * Copyright 2020 Gravitational, Inc.
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

import React from 'react';
import ConsoleContext from './consoleContext';

// DIGITS defines event.key values on keyboard from 1 - 9.
const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// NOT_FOUND defines the value that means not found in DIGITS list.
const NOT_FOUND = -1;

/**
 * useOnAltKeyDown switches current console tab to the tab that
 * user indicated by numbers 1-9.
 *
 * @param ctx data that is shared between Console related components
 */
const useOnAltKeyDown = (ctx: ConsoleContext) => {
  React.useEffect(() => {
    /**
     * handleKeyDown listens and handles keyboard events: alt/command + <1-9>.
     * Checks if alt or cmd was pressed with a number and if a document exists
     * on the indicated tab, it will go to that tab.
     */
    const handleKeyDown = event => {
      const index = DIGITS.indexOf(event.key);

      // windows/ubuntu uses alt key
      // mac uses command key (meta key)
      if ((!event.altKey && !event.metaKey) || index == NOT_FOUND) return;

      // prevents browsers default behavior on alt/cmd + <1-9> events
      event.preventDefault();

      // document[0], is reserved for "blank doc"
      const doc = ctx.getDocuments()[index + 1];
      if (doc) {
        ctx.gotoTab(doc);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};

export default useOnAltKeyDown;
