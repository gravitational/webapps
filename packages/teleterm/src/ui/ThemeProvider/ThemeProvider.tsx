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
import theme from 'design/theme';
import DesignThemeProvider from 'design/ThemeProvider';
import { colors } from './colors';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.primary,
      ...colors.primary,
    },
  },
};

const ThemeProvider = props => (
  <DesignThemeProvider children={props.children} />
);

export const ThemeProviderTabs = props => (
  <DesignThemeProvider theme={customTheme} children={props.children} />
);

export default ThemeProvider;
