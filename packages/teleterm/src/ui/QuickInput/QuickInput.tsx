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

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { color, height, margin, padding, width } from 'design/styled';

import { debounce } from 'lodash';
import { Box, Flex } from 'design';

import { useAppContext } from 'teleterm/ui/appContextProvider';

import useQuickInput from './useQuickInput';
import QuickInputList from './QuickInputList';

export default function Container() {
  const { workspacesService } = useAppContext();

  workspacesService.useState();

  if (!workspacesService.getRootClusterUri()) {
    return null;
  }
  return <QuickInput />;
}

function QuickInput() {
  const props = useQuickInput();
  const { visible, activeSuggestion, autocompleteResult, inputValue } = props;
  const hasSuggestions =
    autocompleteResult.kind === 'autocomplete.partial-match';
  const refInput = useRef<HTMLInputElement>();
  const measuringInputRef = useRef<HTMLSpanElement>();
  const refList = useRef<HTMLDivElement>();
  const refContainer = useRef<HTMLDivElement>();
  const [measuredInputTextWidth, setMeasuredInputTextWidth] =
    useState<number>();

  const handleInputChange = useMemo(() => {
    return debounce(() => {
      props.onInputChange(refInput.current.value);
      measureInputTextWidth();
    }, 100);
  }, []);

  // Update input value if it changed outside of this component. This happens when the user pick an
  // autocomplete suggestion.
  useEffect(() => {
    if (refInput.current.value !== inputValue) {
      refInput.current.value = inputValue;
      measureInputTextWidth();
    }
  }, [inputValue]);

  function handleOnFocus(e: React.SyntheticEvent) {
    // trigger a callback when focus is coming from external element
    if (!refContainer.current.contains(e['relatedTarget'])) {
      props.onFocus(e);
    }

    // ensure that
    if (!visible) {
      props.onShow();
    }
  }

  function handleOnBlur(e: any) {
    const inside =
      e?.relatedTarget?.contains(refInput.current) ||
      e?.relatedTarget?.contains(refList.current);

    if (inside) {
      refInput.current.focus();
      return;
    }

    props.onHide();
  }

  const handleArrowKey = (e: React.KeyboardEvent, nudge = 0) => {
    e.stopPropagation();
    if (!hasSuggestions) {
      return;
    }
    const next = getNext(
      activeSuggestion + nudge,
      autocompleteResult.suggestions.length
    );
    props.onActiveSuggestion(next);
  };

  const measureInputTextWidth = () => {
    const width = measuringInputRef.current?.getBoundingClientRect().width || 0;
    setMeasuredInputTextWidth(width);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const keyCode = e.which;
    switch (keyCode) {
      case KeyEnum.RETURN:
        e.stopPropagation();
        e.preventDefault();

        props.onEnter(activeSuggestion);
        return;
      case KeyEnum.ESC:
        props.onBack();
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

  useEffect(() => {
    if (visible) {
      refInput.current.focus();
    }

    return () => handleInputChange.cancel();
  }, [visible]);

  return (
    <Flex
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      flex={1}
      ref={refContainer}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    >
      <MeasuringInput ref={measuringInputRef}>{inputValue}</MeasuringInput>
      <Input
        ref={refInput}
        spellCheck={false}
        placeholder="Enter a command and press enter"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        isOpened={visible}
      />
      {!visible && <Shortcut>{props.keyboardShortcut}</Shortcut>}
      {visible && hasSuggestions && (
        <QuickInputList
          ref={refList}
          position={measuredInputTextWidth}
          items={autocompleteResult.suggestions}
          activeItem={activeSuggestion}
          onPick={props.onEnter}
        />
      )}
    </Flex>
  );
}

const MeasuringInput = styled.span`
  z-index: -1;
  font-size: 14px;
  padding-left: 8px;
  position: absolute;
  visibility: hidden;
`;

interface InputProps {
  isOpened: boolean;
}

const Input = styled.input([margin, padding, width, height, color])<InputProps>`
  height: 100%;
  background: inherit;
  display: flex;
  flex: 1;
  z-index: 0;
  box-sizing: border-box;
  color: ${p => p.theme.colors.text.primary};
  width: 100%;
  font-size: 14px;
  border: 0.5px ${p => p.theme.colors.action.disabledBackground} solid;
  border-radius: 4px;
  outline: none;
  padding: ${p =>
    p.isOpened
      ? '2px 8px'
      : '2px 46px 2px 8px'}; // wider right margin makes place for a shortcut

  &::placeholder {
    color: ${p => p.theme.colors.text.secondary};
  }

  &:hover, &:focus {
    color: ${p => p.theme.colors.primary.contrastText};
    border-color: ${p => p.theme.colors.light};
  }

  &:focus {
    border-color: ${p => p.theme.colors.secondary.main};
    background-color: ${p => p.theme.colors.primary.darker};

    ::placeholder {
      color: ${p => p.theme.colors.text.placeholder};
    }
  }
`;

const Shortcut = styled(Box)`
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 2px 3px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.primary.light};
  line-height: 12px;
  font-size: 12px;
  border-radius: 2px;
`;

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

function getNext(selectedIndex = 0, max = 0) {
  let index = selectedIndex % max;
  if (index < 0) {
    index += max;
  }
  return index;
}
