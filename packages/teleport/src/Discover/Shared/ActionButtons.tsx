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

import { NavLink } from 'react-router-dom';

import { Box, ButtonPrimary } from 'design';
import { ButtonSecondary } from 'design/Button';

import cfg from 'teleport/config';

export const ActionButtons = ({
  onProceed = null,
  onSkip = null,
  proceedHref = '',
  disableProceed = false,
  lastStep = false,
}: {
  onProceed?(): void;
  onSkip?(): void;
  proceedHref?: string;
  disableProceed?: boolean;
  lastStep?: boolean;
  allowSkip?: boolean;
}) => {
  const allowSkip = !!onSkip;

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
      {allowSkip && (
        <ButtonSecondary width="165px" onClick={onSkip} mr={3}>
          Skip
        </ButtonSecondary>
      )}
      <ButtonSecondary as={NavLink} to={cfg.routes.root} mt={3} width="165px">
        Exit
      </ButtonSecondary>
    </Box>
  );
};
