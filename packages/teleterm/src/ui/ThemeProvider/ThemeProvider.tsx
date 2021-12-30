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
import { createGlobalStyle } from 'styled-components';
import theme from 'design/theme';
import DesignThemeProvider from 'design/ThemeProvider';
import { colors } from './colors';
import { useAppContext } from 'teleterm/ui/appContextProvider';

const customThemeTabs: typeof theme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.primary,
      ...colors.primary,
    },
  },
};

function useTeletermTheme(): Pick<typeof theme, 'font' | 'fonts'> {
  const { mainProcessClient } = useAppContext();
  const { mono, sansSerif } =
    mainProcessClient.configService.get().appearance.fonts;
  return {
    ...theme,
    font: sansSerif,
    fonts: {
      mono,
      sansSerif,
    },
  };
}

const ThemeProvider = props => {
  const theme = useTeletermTheme();
  return (
    <DesignThemeProvider theme={theme}>
      <GlobalThemeStyle />
      {props.children}
    </DesignThemeProvider>
  );
};

export const ThemeProviderTabs = props => {
  const theme = { ...useTeletermTheme(), ...customThemeTabs };
  return (
    <DesignThemeProvider theme={theme}>
      <GlobalThemeStyle />
      {props.children}
    </DesignThemeProvider>
  );
};

const GlobalThemeStyle = createGlobalStyle`
  body {
    font-family: ${theme => theme.font}
  }
`;

export default ThemeProvider;
