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
import { Box, Flex, ButtonIcon, ButtonText } from 'design';
import * as Icons from 'design/Icon';
import FieldInput from 'shared/components/FieldInput';
import { useValidation, Validator } from 'shared/components/Validation';
import { requiredField } from 'shared/components/Validation/rules';

import { AgentLabel } from 'teleport/services/agents';

export function LabelsCreater({
  labels = [],
  setLabels,
  disableBtns = false,
  isLabelOptional = false,
}: {
  labels: AgentLabel[];
  setLabels(l: AgentLabel[]): void;
  disableBtns?: boolean;
  isLabelOptional?: boolean;
}) {
  const validator = useValidation() as Validator;

  function addLabel() {
    // Prevent adding more rows if there are
    // empty input fields. After checking,
    // reset the validator so the newly
    // added empty input boxes are not
    // considered an error.
    if (!validator.validate()) {
      return;
    }
    validator.reset();
    setLabels([...labels, { name: '', value: '' }]);
  }

  function removeLabel(index: number) {
    if (!isLabelOptional && labels.length === 1) {
      // Since at least one label is required
      // instead of removing the last row, clear
      // the input and turn on error.
      const newList = [...labels];
      newList[index] = { name: '', value: '' };
      setLabels(newList);

      validator.validate();
      return;
    }
    const newList = [...labels];
    newList.splice(index, 1);
    setLabels(newList);
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    labelField: keyof AgentLabel
  ) => {
    const { value } = event.target;
    const newList = [...labels];
    newList[index] = { ...newList[index], [labelField]: value };
    setLabels(newList);
  };

  return (
    <>
      {labels.length > 0 && (
        <Flex mt={2}>
          <Box width="170px" mr="3">
            Key{' '}
            <span css={{ fontSize: '12px', fontWeight: 'lighter' }}>
              (required field)
            </span>
          </Box>
          <Box>
            Value{' '}
            <span css={{ fontSize: '12px', fontWeight: 'lighter' }}>
              (required field)
            </span>
          </Box>
        </Flex>
      )}
      <Box>
        {labels.map((label, index) => {
          return (
            <Box mb={2} key={index}>
              <Flex alignItems="center">
                <FieldInput
                  Input
                  rule={requiredField('required')}
                  autoFocus
                  value={label.name}
                  placeholder="label key"
                  width="170px"
                  mr={3}
                  mb={0}
                  onChange={e => handleChange(e, index, 'name')}
                />
                <FieldInput
                  rule={requiredField('required')}
                  value={label.value}
                  placeholder="label value"
                  width="170px"
                  mb={0}
                  mr={2}
                  onChange={e => handleChange(e, index, 'value')}
                />
                <ButtonIcon
                  size={1}
                  title="Remove Label"
                  onClick={() => removeLabel(index)}
                  css={`
                    &:disabled {
                      opacity: 0.65;
                      pointer-events: none;
                    }
                  `}
                  disabled={disableBtns}
                >
                  <Icons.Trash />
                </ButtonIcon>
              </Flex>
            </Box>
          );
        })}
      </Box>
      <ButtonText
        onClick={addLabel}
        css={`
          padding-left: 0px;
          &:disabled {
            .icon-add {
              opacity: 0.35;
            }
            pointer-events: none;
          }
        `}
        disabled={disableBtns}
      >
        <Icons.Add
          className="icon-add"
          disabled={disableBtns}
          css={`
            font-weight: bold;
            letter-spacing: 4px;
            margin-top: -2px;
            &:after {
              content: ' ';
            }
          `}
        />
        Add New Label
      </ButtonText>
    </>
  );
}
