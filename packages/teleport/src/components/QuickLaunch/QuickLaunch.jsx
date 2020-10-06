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
import { Box, Input, LabelInput } from 'design';

export default function FieldInputSsh({
  onPress,
  autoFocus = true,
  width = '200px',
  labelProps = {},
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

  const labelText = 'SSH:';

  return (
    <Box {...boxProps}>
      <StyledSSH>
        <StyledLabel {...labelProps} hasError={hasError}>
          {labelText}
        </StyledLabel>
        <StyledInput
          height="34px"
          bg="primary.light"
          color="text.primary"
          placeholder="login@host"
          autoFocus={autoFocus}
          width={width}
          onKeyPress={onKeyPress}
          {...inputProps}
          hasError={hasError}
        />
      </StyledSSH>
    </Box>
  );
}

// Checks for spaces between chars, and
// captures two named groups: username and host.
const SSH_STR_REGEX = /^(?:(?<username>[^\s]+)@)(?<host>[^\s]+)$/;
const check = value => {
  return SSH_STR_REGEX.exec(value.trim());
};

const StyledSSH = styled.div`
  position: relative;
  display: flex; 
  align-items: center; 
`

const StyledLabel = styled(LabelInput)`
  position: absolute; 
  opacity: .56;
  left: 8px; 
`;

const StyledInput = styled(Input)(
  ({ theme }) => `
  background: ${theme.colors.bgTerminal};
  transition: all .2s;
  box-shadow: none;
  padding-left: 40px; 
  width: 200px;

  ::placeholder {
    opacity: 1;
    color: ${theme.colors.text.placeholder};
    font-size: ${theme.fontSizes[1]}px;
  }

  &:hover {
    background: ${theme.colors.primary.lighter};
  }
`
);
