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
import FieldSelect from './FieldSelect';
import { render, fireEvent } from 'design/utils/testing';
import { useRule } from '../Validation';
import theme from '../../../design/src/theme';

jest.mock('./../Validation/useRule');

test('valid values and onChange prop', () => {
  const rule = jest.fn();
  const onChange = jest.fn();
  const options = ['a', 'b', 'c'];

  useRule.mockImplementation(() => ({ valid: true, message: '' }));
  const { getByText, container } = render(
    <FieldSelect
      label="labelText"
      placeholder="placeholderText"
      options={options}
      rule={rule}
      onChange={onChange}
    />
  );

  // test valid label is rendered
  expect(getByText('labelText')).toBeInTheDocument();

  // test placeholder is rendered
  expect(getByText('placeholderText')).toBeInTheDocument();

  // test onChange is respected
  // "react-select__control" defined by react-select library
  const selectEl = container.getElementsByClassName('react-select__control')[0];
  fireEvent.keyDown(selectEl, { key: 'ArrowDown', keyCode: 40 });

  // menu is only visible after clicking or keydowning the select element
  // "react-select__menu" defined by react-select library
  const menuEl = container.getElementsByClassName('react-select__menu')[0];
  fireEvent.keyDown(menuEl, { key: 'Enter', keyCode: 13 });

  expect(onChange).toHaveBeenCalledTimes(1);
});

test('select element validation error state', () => {
  const rule = jest.fn();
  const errorColor = theme.colors.error.main;

  useRule.mockImplementation(() => ({ valid: false, message: 'errorMsg' }));
  const { getByText, container } = render(
    <FieldSelect label="labelText" placeholder="placeholderText" rule={rule} />
  );

  // test !valid values renders with error message
  const labelEl = getByText('errorMsg');
  expect(labelEl).toHaveStyle({ color: errorColor });

  // test !valid values renders error colors
  // "react-select__control" defined by react-select library
  const selectEl = container.getElementsByClassName('react-select__control')[0];
  expect(selectEl).toHaveStyle({
    'border-color': errorColor,
  });
});
