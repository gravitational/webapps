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
import {
  ThemeProvider as StyledThemeProvider,
  StyleSheetManager,
} from 'styled-components';
import { GlobalStyle } from './globals';
import theme from 'design/theme';
import { colors } from './colors';
import { useAppContext } from 'teleterm/ui/appContextProvider';

// ThemeProviderTemp is a temporary provider used for experimental purposes
export const ThemeProviderTemp = props => {
  const theme = useTheme();
  return (
    <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
  );
};

const ThemeProvider = props => {
  const theme = { ...useTheme(), ...customThemeTabs };
  return (
    <StyledThemeProvider theme={props.theme || theme}>
      <StyleSheetManager disableVendorPrefixes>
        <React.Fragment>
          <GlobalStyle />
          {props.children}
        </React.Fragment>
      </StyleSheetManager>
    </StyledThemeProvider>
  );
};

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

function useTheme(): typeof theme {
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

export default ThemeProvider;
