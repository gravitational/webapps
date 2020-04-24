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
import { isMac } from 'design/utils/platform';

/**
 * useKeyboardNav defines handlers for handling hot key events.
 *
 * @param ctx data that is shared between Console related components
 */
const useKeyboardNav = (ctx: ConsoleContext) => {
  React.useEffect(() => {
    /**
     * handleKeydown listens and handles keyboard events:
     *   - windows/ubuntu: alt + <1-9>
     *   - mac: ctrl + <1-9>
     *
     * Checks if alt/ctrl key was pressed with a number and if a document exists
     * on the indicated tab, it will go to that tab.
     */
    const handleKeydown = event => {
      // 1-9 defines the event.key's on the keyboard
      const index = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(
        event.key
      );

      const isModifierKey = (isMac() && event.ctrlKey) || event.altKey;
      if (!isModifierKey || index == -1) {
        return;
      }

      // prevent browsers default handling of hot keys
      event.preventDefault();

      // document[0], is reserved for "blank doc"
      const doc = ctx.getDocuments()[index + 1];
      if (doc) {
        ctx.gotoTab(doc);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);
};

export default useKeyboardNav;
