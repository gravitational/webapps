/**
 * Copyright 2023 Gravitational, Inc.
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

import React, { ReactNode, useState } from 'react';

import { Flex } from 'design';

interface RadioObjectOption {
  value: string;
  label: ReactNode;
}

type RadioOption = RadioObjectOption | string;

interface RadioGroupProps {
  options: RadioOption[];
  onChange?: (value: string) => void;
  value?: string;
  /** Sets focus on the first radio input element */
  autoFocus?: boolean;

  [styles: string]: any;
}

export function RadioGroup({
  options,
  value,
  onChange,
  autoFocus,
  ...styles
}: RadioGroupProps) {
  // A radio group is defined by giving each of radio buttons in the group the same name.
  const [name] = useState(crypto.randomUUID());

  return (
    <Flex
      onChange={e => onChange?.(e.target.value)}
      flexDirection="column"
      {...styles}
    >
      {options.map((option, index) => {
        const optionValue = isRadioObjectOption(option) ? option.value : option;
        return (
          <Radio
            autoFocus={index === 0 && autoFocus}
            key={optionValue}
            option={option}
            name={name}
            checked={value && value === optionValue}
          />
        );
      })}
    </Flex>
  );
}

interface RadioProps {
  option: RadioOption;
  name: string;
  checked: boolean;
  autoFocus?: boolean;
}

function Radio(props: RadioProps) {
  const optionValue = isRadioObjectOption(props.option)
    ? props.option.value
    : props.option;
  const optionLabel = isRadioObjectOption(props.option)
    ? props.option.label
    : props.option;

  return (
    <label
      css={`
        display: flex;
        align-items: center;
        cursor: pointer;
      `}
    >
      <input
        autoFocus={props.autoFocus}
        css={`
          margin: 0 ${props => props.theme.space[2]}px 0 0;
          accent-color: ${props => props.theme.colors.accent};
          cursor: inherit;
        `}
        type="radio"
        name={props.name}
        checked={props.checked}
        // Suppresses React warning about missing `onChange` handler when
        // `checked` is provided. We catch the event at a parent element.
        onChange={noop}
        value={optionValue}
      />
      <span>{optionLabel}</span>
    </label>
  );
}

function isRadioObjectOption(option: RadioOption): option is RadioObjectOption {
  return typeof option === 'object';
}

function noop() {}
