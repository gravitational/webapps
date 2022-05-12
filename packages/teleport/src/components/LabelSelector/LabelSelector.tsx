import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Text from 'design/Text';
import { Info } from '../../../../design/src/Icon';
import Pill from '../../../../design/src/Pill';

function LabelSelector({ existingLabels = [], onChange }: LabelSelectorProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState('');

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
      <AddLabelContainer>
        <AddLabelInput
          onChange={e => {
            setNewLabel(e.target.value);
          }}
        />
        <CreateLabel>+ Create new label "{newLabel}"</CreateLabel>
      </AddLabelContainer>
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
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 10px rgba(12, 12, 14, 0.07);
  clear: both;
  cursor: pointer;
  display: flex;
  gap: 10px;
  margin-top: 8px;
  min-height: 36px;
  padding: 10px 16px;
`;

const AddLabelContainer = styled.div`
  background: #182250;
  border-radius: 4px;
  height: 100px;
  padding: 1rem;
`;

const AddLabelInput = styled.input`
  background: #182250;
  border-radius: 52px;
  border: 1.5px solid #512fc9;
  color: white;
  height: 40px;
  padding: 0 12px;
  width: calc(100% - 2rem);
`;

const CreateLabel = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 16px;
  margin-top: 25px;
`;

type LabelSelectorProps = {
  existingLabels?: string[];
  onChange: (labels: string[]) => void;
};

function labelList({ labels }: { labels: string[] }) {
  return labels.map(label => <Pill label={label} dismissable />);
}

export default LabelSelector;
