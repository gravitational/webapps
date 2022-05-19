import React, { useState } from 'react';

import { LabelSelector } from './LabelSelector';

export default {
  title: 'Teleport/LabelSelector',
};

export const LabelSelectorEmpty = () => {
  const [labels, setLabels] = useState([]);
  return (
    <>
      <LabelSelector onChange={setLabels} />
      <div>
        <h3>Labels</h3>
        {labels}
      </div>
    </>
  );
};
