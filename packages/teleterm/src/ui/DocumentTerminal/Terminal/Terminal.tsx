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

import React, { useEffect, useRef } from 'react';
import { Box, Flex } from 'design';
import styled, { useTheme } from 'styled-components';
import XTermCtrl from './xterm';
import { colors } from 'teleterm/ui/ThemeProvider/colors';
import { PtyProcess } from 'teleterm/services/pty/types';
import { debounce } from 'lodash';

export default function Terminal(props: Props) {
  const refElement = useRef<HTMLElement>();
  const refCtrl = useRef<XTermCtrl>();
  const monoFont = useTheme().fonts.mono;

  useEffect(() => {
    const ctrl = new XTermCtrl(props.ptyProcess, {
      el: refElement.current,
      monospacedFontFamily: monoFont
    });

    ctrl.open();

    ctrl.term.onKey(event => {
      if (event.domEvent.key === 'Enter') {
        handleEnterPress();
      }
    });

    refCtrl.current = ctrl;

    const handleEnterPress = debounce(() => {
      props.onEnterKey && props.onEnterKey();
    }, 100);

    return () => {
      handleEnterPress.cancel();
      ctrl.destroy();
    };
  }, []);

  useEffect(() => {
    if (!refCtrl.current || !props.visible) {
      return;
    }

    refCtrl.current.focus();
    refCtrl.current.requestResize();
  }, [props.visible]);

  return (
    <Flex
      flexDirection="column"
      height="100%"
      width="100%"
      style={{ overflow: 'hidden' }}
    >
      <StyledXterm ref={refElement} />
    </Flex>
  );
}

type Props = {
  ptyProcess: PtyProcess;
  visible: boolean;
  onEnterKey?(): void;
};

const StyledXterm = styled(Box)(
  props => `
   height: 100%;
   width: 100%;
   font-size: 14px;
   line-height: normal;
   overflow: auto;
   background-color: ${colors.bgTerminal};
   .terminal {
     font-family: ${props.theme.fonts.mono};
     border: none;
     font-size: inherit;
     line-height: normal;
     position: relative;
   }
   .terminal .xterm-viewport {
     background-color: ${colors.bgTerminal};
   }
 }`
);
