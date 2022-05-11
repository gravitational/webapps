import React from 'react';

import LabelSelector from './LabelSelector';

export default {
  title: 'Teleport/LabelSelector',
};

export const LabelSelectorEmpty = () => {
  return <LabelSelector onChange={() => {}} />;
};

export const LabelSelectorPills = () => {
  return (
    <LabelSelector
      onChange={() => {}}
      existingLabels={['arch: x86_64', 'aws: staging']}
    />
  );
};
