import React from 'react';

import { Box } from 'design';

import { StepItem } from './StepItem';

import type { View } from 'teleport/Discover/flow';

interface StepListProps {
  views: View[];
  currentStep: number;
}

export function StepList(props: StepListProps) {
  const items = props.views.map((view, index) => (
    <StepItem key={index} view={view} currentStep={props.currentStep} />
  ));

  return (
    <Box ml={4} mt={2}>
      {items}
    </Box>
  );
}
