import React from 'react';
import Box from 'design/Box';
import { ButtonPrimary } from 'design/Button';

import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';

export const Downloads = () => {
  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle>
          <ButtonPrimary onClick={() => alert('this is just a mock')}>
            Download license
          </ButtonPrimary>
        </FeatureHeaderTitle>
      </FeatureHeader>
      <Box style={{ width: '300px' }}></Box>
      <Box>List of binaries here</Box>
    </FeatureBox>
  );
};
