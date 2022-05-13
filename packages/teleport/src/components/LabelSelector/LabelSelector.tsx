import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Text from 'design/Text';
import { Info, Warning } from '../../../../design/src/Icon';
import Pill from '../../../../design/src/Pill';
import Popover from 'design/Popover';
import Box from 'design/Box';

const VALID_LABEL = /^[a-z]+:\s?[a-z]+$/;

function LabelSelector({ existingLabels = [], onChange }: LabelSelectorProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [validLabel, setValidLabel] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const infoIconRef = useRef();

  useEffect(() => {
    setValidLabel(VALID_LABEL.test(newLabel));
  }, [newLabel]);

  useEffect(() => {
    onChange(labels);
  }, [labels]);

  const handleAddLabel = () => {
    setLabels([...labels, newLabel.trim()]);
    setNewLabel('');
  };

  return (
    <div>
      <Heading>
        <Text style={{ float: 'left' }}>Assign Labels (optional)</Text>
        <div ref={infoIconRef} style={{ marginLeft: '12px', float: 'left' }}>
          <Info
            style={{
              cursor: 'pointer',
              fontSize: '16px',
              paddingTop: '5px',
            }}
            onClick={() => setShowTooltip(!showTooltip)}
          />
        </div>
        <Popover
          id="simple-popper"
          open={showTooltip}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          anchorEl={infoIconRef.current}
          onClose={() => setShowTooltip(false)}
        >
          <Box
            bg="#011223"
            color="white"
            width={362}
            p={4}
            style={{
              boxShadow: '0px 8px 14px rgba(12, 12, 14, 0.07)',
              borderRadius: '8px',
            }}
          >
            Teleport provides users the ability to add labels (in the form of
            key:value pairs) to resources. Some valid example labels are “env:
            prod” and “arch: x86_64”. Labels, used in conjunction with roles,
            define access in Teleport. For example, you can specify that users
            with the “on-call” role can access resources labeled “env: prod”.
            For more information, check out our documentation on{' '}
            <a
              href="https://goteleport.com/docs/setup/admin/trustedclusters/"
              target="_blank"
            >
              RBAC
            </a>{' '}
            and{' '}
            <a
              href="https://goteleport.com/docs/setup/admin/labels/"
              target="_blank"
            >
              labels
            </a>
            .
          </Box>
        </Popover>
        <Text style={{ float: 'right' }}>
          <a
            href="https://goteleport.com/docs/setup/admin/labels/"
            target="_blank"
            style={{ color: 'rgb(255, 255, 255)' }}
          >
            View Documentation
          </a>
        </Text>
      </Heading>
      <LabelContainer onClick={() => setShowAdd(!showAdd)}>
        {labels.length === 0 && existingLabels.length === 0 && (
          <Text style={{ color: 'rgba(255, 255, 255, 0.1)' }}>
            Click to add new labels.
          </Text>
        )}
        {labelList({ labels: existingLabels })}
        {labelList({ labels })}
      </LabelContainer>
      {showAdd && (
        <AddLabelContainer>
          <AddLabelInput
            value={newLabel}
            onChange={e => {
              setNewLabel(e.target.value);
            }}
            onKeyPress={e => {
              // Add a new label on `Enter` if it's valid.
              if (e.charCode === 13 && validLabel) {
                handleAddLabel();
              }
            }}
          />
          {validLabel ? (
            <CreateLabel onClick={handleAddLabel}>
              + Create new label "{newLabel}"
            </CreateLabel>
          ) : (
            <CreateLabelError>
              <WarningIconWrapper>
                <Warning />
              </WarningIconWrapper>
              <WarningText>
                <Text style={{ color: '#D83C31', fontWeight: 700 }}>
                  Invalid label format
                </Text>
                <Text>Follow `key:pair` format to add a new label</Text>
              </WarningText>
            </CreateLabelError>
          )}
        </AddLabelContainer>
      )}
    </div>
  );
}

const Heading = styled.div`
  clear: both;
  height: 1.5rem;
  position: relative;
`;

const LabelContainer = styled.div`
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 10px rgba(12, 12, 14, 0.07);
  clear: both;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
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

const CreateLabelError = styled.div`
  margin-top: 8px;
`;

const WarningIconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 54px;
  float: left;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
  padding: 5px;
  text-align: center;
  width: 20px;
`;

const WarningText = styled.div`
  float: left;
  margin-left: 8px;
`;

type LabelSelectorProps = {
  existingLabels?: string[];
  onChange: (labels: string[]) => void;
};

function labelList({ labels }: { labels: string[] }) {
  return labels.map(label => <Pill label={label} dismissable />);
}

export default LabelSelector;
