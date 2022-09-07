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

import styled from 'design/styled';

import { Spinner as SpinnerIcon } from '../Icon';

const DelayValueMap = {
  none: 0,
  short: 400, // 0.4s;
  long: 600, // 0.6s;
};

interface IndicatorProps {
  delay?: 'none' | 'short' | 'long';
  fontSize?: string;
}

interface IndicatorState {
  canDisplay: boolean;
}

export class Indicator extends React.Component<IndicatorProps, IndicatorState> {
  private timer: number;
  private readonly delay: IndicatorProps['delay'];

  constructor(props) {
    super(props);
    this.delay = props.delay || 'short';

    this.state = {
      canDisplay: false,
    };
  }

  componentDidMount() {
    let timeoutValue = DelayValueMap[this.delay];
    this.timer = window.setTimeout(() => {
      this.setState({
        canDisplay: true,
      });
    }, timeoutValue);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (!this.state.canDisplay) {
      return null;
    }

    return <StyledSpinner {...this.props} />;
  }
}

const StyledSpinner = styled(SpinnerIcon)`
  ${({ fontSize = '32px' }) => `
    font-size: ${fontSize};
    height: ${fontSize};
    width: ${fontSize};
  `}

  animation: anim-rotate 2s infinite linear;
  color: #fff;
  display: inline-block;
  margin: 16px;
  opacity: 0.24;

  @keyframes anim-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
