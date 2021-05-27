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

import React from 'react';
import styled from 'styled-components';
import { color, space, typography } from 'design/system';
import Icon, { Close as IconClose } from 'design/Icon';
import ButtonIcon from 'design/ButtonIcon';

export default function Tag({ name, onClick }) {
  function onIconClick() {
    onClick(name);
  }

  return (
    <StyledTag
      typography="body2"
      bg="primary.lighter"
      color="primary.contrastText"
    >
      <span>{name}</span>
      <ButtonIcon size={0} onClick={onIconClick} ml="1" bg="primary.light">
        <IconClose />
      </ButtonIcon>
    </StyledTag>
  );
}

const StyledTag = styled.div`
  max-width: 200px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-right: 16px;
  margin-bottom: 16px;

  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 2px 4px 2px 12px;
  }

  ${Icon}{
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 50%;
    font-size: 14px;
    min-width: 10px;
  }

  ${typography}
  ${color}
  ${space}
`;
