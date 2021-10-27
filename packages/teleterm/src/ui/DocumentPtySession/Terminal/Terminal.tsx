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
import { Box, Flex } from 'design';
import styled from 'styled-components';
import XTermCtrl from './xterm';
import { colors } from 'teleterm/ui/ThemeProvider/colors';
import { PtyProcess } from 'teleterm/services/pty/types';

export default class Terminal extends React.Component<{
  ptyProcess: PtyProcess;
}> {
  terminal: XTermCtrl;

  refTermContainer = React.createRef<HTMLElement>();

  componentDidMount() {
    this.terminal = new XTermCtrl(this.props.ptyProcess, {
      el: this.refTermContainer.current,
    });

    this.terminal.open();
  }

  componentWillUnmount() {
    this.terminal.destroy();
  }

  shouldComponentUpdate() {
    return false;
  }

  focus() {
    this.terminal.term.focus();
  }

  render() {
    return (
      <Flex
        flexDirection="column"
        height="100%"
        width="100%"
        style={{ overflow: 'hidden' }}
      >
        <StyledXterm ref={this.refTermContainer} />
      </Flex>
    );
  }
}

const StyledXterm = styled(Box)(
  props => `
  height: 100%;
  width: 100%;
  font-size: 14px;
  line-height: normal;
  overflow: hidden;
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
