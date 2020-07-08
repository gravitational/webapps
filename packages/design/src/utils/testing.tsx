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
import {
  render as testingRender,
  act,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import { screen, wait, prettyDOM, getByTestId } from '@testing-library/dom';
import { MemoryRouter as Router } from 'react-router-dom';
import ThemeProvider from 'design/ThemeProvider';
import theme from 'design/theme';
import '@testing-library/jest-dom';
import 'jest-styled-components';

function Providers({ children }: { children: React.ReactElement }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

function render(ui: React.ReactElement<any>, options?: RenderOptions) {
  return testingRender(ui, { wrapper: Providers, ...options });
}

screen.debug = () => {
  window.console.log(prettyDOM());
};

type RenderOptions = {
  wrapper: React.FC;
  container: HTMLElement;
};

export {
  act,
  screen,
  wait,
  fireEvent,
  theme,
  render,
  prettyDOM,
  waitForElement,
  getByTestId,
  Router,
};
