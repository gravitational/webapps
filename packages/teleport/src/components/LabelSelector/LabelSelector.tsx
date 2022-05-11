import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Text from 'design/Text';
import { Info } from '../../../../design/src/Icon';
import Pill from '../../../../design/src/Pill';

function LabelSelector({ existingLabels = [], onChange }: LabelSelectorProps) {
  const [labels, setLabels] = useState<string[]>([]);

  return (
    <div>
      <Heading>
        <Text style={{ float: 'left' }}>Assign Labels (optional)</Text>
        <Info style={{ float: 'left' }} />
        <Text style={{ float: 'right' }}>
          <Link href="https://goteleport.com/docs/setup/admin/labels/">
            View Documentation
          </Link>
        </Text>
      </Heading>
      <LabelContainer>
        {labels.length === 0 && existingLabels.length === 0 && (
          <Text style={{ color: 'rgba(255, 255, 255, 0.1)' }}>
            Click to add new labels.
          </Text>
        )}
        {labelList({ labels: existingLabels })}
        {labelList({ labels })}
      </LabelContainer>
    </div>
  );
}

const Heading = styled.div`
  clear: both;
  height: 1.5rem;
  position: relative;
`;

const Link = styled.a`
  color: rgb(255, 255, 255);
`;

const LabelContainer = styled.div`
  clear: both;
  display: flex;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  gap: 10px;
  min-height: 36px;
  margin-top: 8px;
  padding: 10px 16px;
`;

type LabelSelectorProps = {
  existingLabels?: string[];
  onChange: (labels: string[]) => void;
};

function labelList({ labels }: { labels: string[] }) {
  return labels.map(label => <Pill label={label} dismissable />);
}

export default LabelSelector;
