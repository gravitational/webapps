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
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { GlobalStyle } from './globals';
import theme from './theme';
import { AppearanceConfig } from 'teleterm/types';

export type TeletermThemeProvider = {
  appearanceConfig?: AppearanceConfig;
};

const TeletermThemeProvider: React.FC<TeletermThemeProvider> = props => {
  if (props?.appearanceConfig?.fonts) {
    theme.font = props?.appearanceConfig?.fonts?.sansSerif;
    theme.fonts = props?.appearanceConfig?.fonts;
  }

  return (
    <ThemeProvider theme={theme}>
      <StyleSheetManager disableVendorPrefixes>
        <React.Fragment>
          <GlobalStyle />
          {props.children}
        </React.Fragment>
      </StyleSheetManager>
    </ThemeProvider>
  );
};

export default TeletermThemeProvider;
