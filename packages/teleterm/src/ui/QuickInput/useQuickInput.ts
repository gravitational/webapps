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
import { useAppContext } from 'teleterm/ui/appContextProvider';

export default function useQuickInput() {
  const { serviceQuickInput } = useAppContext();
  const { picker, inputValue } = serviceQuickInput.useState();
  const [activeItem, setActiveItem] = React.useState(0);
  const listItems = React.useMemo(
    () => picker.onFilter(inputValue),
    [inputValue, picker]
  );

  const handleArrowKey = (e: React.KeyboardEvent, nudge = 0) => {
    e.stopPropagation();
    const next = getNext(activeItem + nudge, listItems.length);
    setActiveItem(next);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keyCode = e.which;
    switch (keyCode) {
      case KeyEnum.RETURN:
        if (listItems.length > 0) {
          e.target['value'] = '';
          e.stopPropagation();
          e.preventDefault();
          picker.onPick(listItems[activeItem]);
        }
        return;
      case KeyEnum.ESC:
        serviceQuickInput.reset();
        return;
      case KeyEnum.TAB:
        return;
      case KeyEnum.UP:
        e.stopPropagation();
        e.preventDefault();
        handleArrowKey(e, -1);
        return;
      case KeyEnum.DOWN:
        e.stopPropagation();
        e.preventDefault();
        handleArrowKey(e, 1);
        return;
    }
  };

  React.useEffect(() => {
    setActiveItem(0);
  }, [picker]);

  return {
    activeItem,
    reset: serviceQuickInput.reset,
    inputValue,
    setInputValue: serviceQuickInput.setInputValue,
    listItems,
    onKeyDown,
  };
}

export type State = ReturnType<typeof useQuickInput>;

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
