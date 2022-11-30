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

import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import { space } from 'design/system';

const kind = ({ kind, theme }) => {
  if (kind === 'secondary') {
    return {
      backgroundColor: theme.colors.primary.dark,
      color: theme.colors.text.primary,
    };
  }

  if (kind === 'warning') {
    return {
      backgroundColor: theme.colors.warning,
      color: theme.colors.primary.contrastText,
    };
  }

  if (kind === 'danger') {
    return {
      backgroundColor: theme.colors.danger,
      color: theme.colors.primary.contrastText,
    };
  }

  if (kind === 'success') {
    return {
      backgroundColor: theme.colors.success,
      color: theme.colors.primary.contrastText,
    };
  }

  // default is primary
  return {
    backgroundColor: theme.colors.secondary.main,
    color: theme.colors.text.secondary.contrastText,
  };
};

const Label = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  padding: 0 8px;
  margin: 1px 0;
  vertical-align: middle;

  ${kind}
  ${space}
`;

Label.propTypes = {
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'warning',
    'danger',
    'success',
  ]),
  invert: PropTypes.oneOf([true, false]),
};

export default Label;
export const Primary = props => <Label kind="primary" {...props} />;
export const Secondary = props => <Label kind="secondary" {...props} />;
export const Warning = props => <Label kind="warning" {...props} />;
export const Danger = props => <Label kind="danger" {...props} />;
