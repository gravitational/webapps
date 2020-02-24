/**
 * Copyright 2020 Gravitational, Inc.
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
import FieldInput from './FieldInput';
import { render, fireEvent } from 'design/utils/testing';
import { useRule } from '../Validation';
import theme from '../../../design/src/theme';

jest.mock('./../Validation/useRule');

test('valid values, autofocus, onChange, onKeyPress', () => {
  const mockRule = jest.fn().mockName('rule');
  const label = 'label text';
  const placeholder = 'placeholder text';

  // mock positive validation
  useRule.mockImplementation(() => ({ valid: true, message: '' }));

  const mockOnChange = jest.fn().mockName('onChange');
  const mockOnKeyPress = jest.fn().mockName('onKeyPress');
  const { getByText, getByPlaceholderText } = render(
    <FieldInput
      placeholder={placeholder}
      autoFocus={true}
      label={label}
      rule={mockRule}
      onChange={mockOnChange}
      onKeyPress={mockOnKeyPress}
    />
  );

  // test label is displayed
  expect(getByText(label)).toBeInTheDocument();

  // test autofocus prop is respected
  const inputEl = getByPlaceholderText(placeholder);
  expect(document.activeElement).toEqual(inputEl);

  // test onChange prop is respected
  fireEvent.change(inputEl, { target: { value: 'test' } });
  expect(mockOnChange).toHaveBeenCalledTimes(1);

  // test onKeyPress prop is respected
  fireEvent.keyPress(inputEl, { key: 'Enter', keyCode: 13 });
  expect(mockOnKeyPress).toHaveBeenCalledTimes(1);
});

test('input validation error state', () => {
  const mockRule = jest.fn().mockName('rule');
  const label = 'label text';
  const placeholder = 'placeholder text';
  const errMsg = 'some error message';
  const errorColor = theme.colors.error.main;

  // mock negative validation
  useRule.mockImplementation(() => ({ valid: false, message: errMsg }));

  const { getByText, getByPlaceholderText } = render(
    <FieldInput placeholder={placeholder} label={label} rule={mockRule} />
  );

  // test !valid values renders with error message
  const labelEl = getByText(errMsg);
  expect(labelEl).toHaveStyle({ color: errorColor });

  // test !valid values renders error colors
  const inputEl = getByPlaceholderText(placeholder);
  expect(inputEl).toHaveStyle({
    'border-color': errorColor,
  });
});
