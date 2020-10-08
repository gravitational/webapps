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
import styled from 'styled-components';
import { Flex } from 'design';
import { space, width, color, height } from 'styled-system';

// Checks for spaces between chars, and
// captures two named groups: username and host.
const SSH_STR_REGEX = /^(?:(?<username>[^\s]+)@)(?<host>[^\s]+)$/;
const check = value => {
  return SSH_STR_REGEX.exec(value.trim());
};

export default function FieldInputSsh({
  onPress,
  autoFocus = false,
  inputProps = {},
  ...boxProps
}) {
  const [hasError, setHasError] = React.useState(false);

  function onKeyPress(e) {
    const value = e.target.value;
    if ((e.key === 'Enter' || e.type === 'click') && value) {
      const match = check(value);
      setHasError(!match);
      if (match) {
        const { username, host } = match.groups;
        onPress(username, host);
      }
    } else {
      setHasError(false);
    }
  }

  return (
    <Flex {...boxProps} alignItems="center" style={{ position: 'relative' }}>
      <StyledLabel>SSH:</StyledLabel>
      <StyledInput
        height="30px"
        bg="primary.light"
        color="text.primary"
        placeholder="login@host"
        autoFocus={autoFocus}
        onKeyPress={onKeyPress}
        {...inputProps}
        hasError={hasError}
      />
    </Flex>
  );
}

function error({ hasError, theme }) {
  if (!hasError) {
    return;
  }

  return {
    border: `1px solid ${theme.colors.error.main}`,
    paddingLeft: '39px',
    paddingRight: '1px',
  };
}

const StyledLabel = styled.div`
  position: absolute;
  opacity: 0.56;
  left: 8px;
  display: block;
  font-size: 11px;
  font-weight: 500;
  width: auto;
`;

const StyledInput = styled.input`
  appearance: none;
  border:none;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  outline: none;
  width: 100%;
  transition: all .3s;

  box-shadow: none;
  padding-left: 40px;
  padding-right: 1px;
  font-size: 12px;

  ::-ms-clear {
    display: none;
  }

  :read-only {
    cursor: not-allowed
  }

  ::placeholder {
    opacity: 1;
    color: ${props => props.theme.colors.text.placeholder};
    font-size: ${props => props.theme.fontSizes[1]}px;
  }

  &:hover {
    background: ${props => props.theme.colors.primary.lighter};
  }

  ${color} ${space} ${width} ${height} ${error};
`;
