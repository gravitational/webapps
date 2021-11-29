/*
Copyright 2021 Gravitational, Inc.

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
import { MemoryRouter, Route } from 'react-router';
import { screen, fireEvent, act, render } from 'design/utils/testing';
import history from 'teleport/services/history';
import { Logger } from 'shared/libs/logger';
import cfg from 'teleport/config';
import Accept from './Accept';

describe('teleport/components/Accept', () => {
  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(history, 'push').mockImplementation();
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('accept button redirects', async () => {
    await act(async () => renderAccept());
    fireEvent.click(screen.getByRole('button'));
    expect(history.push).toHaveBeenCalledWith('/web/invite/7992');
  });
});

function renderAccept(url = `/web/accept/7992`) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Route path={cfg.routes.userAccept}>
        <Accept />
      </Route>
    </MemoryRouter>
  );
}
