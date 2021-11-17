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

import React from 'react';
import { useAppContext } from './../appContextProvider';
import { Result } from 'teleterm/ui/services/globalSearch/types';

export default function useGlobalSearch() {
  const ctx = useAppContext();
  const [searchResults, setResults] = React.useState<Result[]>([]);
  const [current, setCurrent] = React.useState(0);
  const search = (value = '') => {
    const results = ctx.serviceGlobalSearch.search(value);
    setCurrent(0);
    setResults(results);
  };

  const handleArrow = (e: React.KeyboardEvent, nudge = 0) => {
    e.stopPropagation();
    const next = getNext(current + nudge, searchResults.length);
    setCurrent(next);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keyCode = e.which;
    switch (keyCode) {
      case KeyEnum.RETURN:
        if (searchResults.length > 0) {
          e.target['value'] = '';
          setResults([]);

          const selectedResult = searchResults[current];
          // TODO (alex-kovoy): implement a command pattern
          if (selectedResult.kind === 'server') {
            ctx.serviceModals.openDialog({
              kind: 'server-connect',
              serverUri: selectedResult.data.uri,
            });
          } else {
            ctx.serviceDocs.open(searchResults[current].data.uri);
          }
        }
        return;
      case KeyEnum.ESC:
        return;
      case KeyEnum.TAB:
        return;
      case KeyEnum.UP:
        handleArrow(e, -1);
        return;
      case KeyEnum.DOWN:
        handleArrow(e, 1);
        return;
    }
  };

  return {
    current,
    search,
    searchResults,
    onKeyDown,
  };
}

export type State = ReturnType<typeof useGlobalSearch>;

function getNext(selectedIndex = 0, max = 0) {
  let index = selectedIndex % max;
  if (index < 0) {
    index += max;
  }
  return index;
}

const KeyEnum = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  COMMA: 188,
  PERIOD: 190,
  A: 65,
  Z: 90,
  ZERO: 48,
  NUMPAD_0: 96,
  NUMPAD_9: 105,
};
