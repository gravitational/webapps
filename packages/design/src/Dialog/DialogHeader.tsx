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
import Flex from './../Flex';
import styled from 'styled-components';
import { typography } from 'design/system';
import { Cross } from '../Icon';

export default function DialogHeader(props) {
  const { children, onClose } = props;
  return (
    <StyledDialogHeader minHeight="32px" mb="3" alignItems="center" {...props}>
      <Flex justifyContent="space-between" width="100%">
        {children}
        {onClose && (
          <Dismiss
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              props.onClose();
            }}
          >
            <Cross />
          </Dismiss>
        )}
      </Flex>
    </StyledDialogHeader>
  );
}

const StyledDialogHeader = styled(Flex)`
  ${typography}
`;

const Dismiss = styled.button`
  border-color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
`;
