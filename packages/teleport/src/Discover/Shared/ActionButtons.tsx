import React from 'react';

import { NavLink } from 'react-router-dom';

import { Box, ButtonPrimary } from 'design';
import { ButtonSecondary } from 'design/Button';

import cfg from 'teleport/config';

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
