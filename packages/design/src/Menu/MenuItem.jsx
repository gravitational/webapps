/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize, color, space } from 'styled-system';

import defaultTheme from './../theme';

const defaultValues = {
  theme: defaultTheme,
  bg: 'light',
  color: 'link',
  fontSize: 1,
  px: 3,
};

const fromTheme = props => {
  const values = {
    ...defaultValues,
    ...props,
  };
  return {
    ...fontSize(values),
    ...space(values),
    ...color(values),
    fontWeight: values.theme.regular,
    color: values.theme.colors.grey[600],

    '&:hover, &:focus': {
      color: values.theme.colors.link,
      background: values.theme.colors.grey[50],
    },
  };
};

const MenuItem = styled.div`
  min-height: 40px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 140px;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  ${fromTheme}
`;

MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
  /**
   * Menu item contents.
   */
  children: PropTypes.node,
};

export default MenuItem;
