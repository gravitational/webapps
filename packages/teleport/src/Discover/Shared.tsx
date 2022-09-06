/**
 * Copyright 2022 Gravitational, Inc.
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
import { NavLink } from 'react-router-dom';

import { Text, ButtonPrimary, Box } from 'design';
import { ButtonSecondary } from 'design/Button';

import cfg from 'teleport/config';

export const Header: React.FC = ({ children }) => (
  <Text my={1} fontSize="18px" bold>
    {children}
  </Text>
);

export const HeaderSubtitle: React.FC = ({ children }) => (
  <Text mb={5}>{children}</Text>
);

export const ActionButtons = ({
  onProceed = null,
  proceedHref = '',
  disableProceed = false,
  lastStep = false,
}: {
  onProceed?(): void;
  proceedHref?: string;
  disableProceed?: boolean;
  lastStep?: boolean;
}) => {
  return (
    <Box mt={4}>
      {proceedHref && (
        <ButtonPrimary
          size="medium"
          as="a"
          href={proceedHref}
          target="_blank"
          width="224px"
          mr={3}
          rel="noreferrer"
        >
          View Documentation
        </ButtonPrimary>
      )}
      {onProceed && (
        <ButtonPrimary
          width="165px"
          onClick={onProceed}
          mr={3}
          disabled={disableProceed}
        >
          {lastStep ? 'Finish' : 'Next'}
        </ButtonPrimary>
      )}
      <ButtonSecondary as={NavLink} to={cfg.routes.root} mt={3} width="165px">
        Exit
      </ButtonSecondary>
    </Box>
  );
};

export const TextIcon = styled(Text)`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 8px;
  }
`;

export const TextBox = styled(Box)`
  width: 100%;
  margin-top: 32px;
  border-radius: 8px;
  background-color: ${p => p.theme.colors.primary.light};
  padding: 24px;
`;
