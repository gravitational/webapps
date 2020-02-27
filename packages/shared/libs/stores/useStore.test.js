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
import useStore from './useStore';
import Store from './store';
import { render, fireEvent } from 'design/utils/testing';

test('components subscribes to store changes', () => {
  const { getByTestId } = render(
    <>
      <ComponentDisplayName />
      <ComponentDisplayNameAndNum />
    </>
  );

  // test default values
  expect(getByTestId('name1')).toBeEmpty();
  expect(getByTestId('name2')).toBeEmpty();
  expect(getByTestId('static').textContent).toBe('1234');

  // test intended values are updated first run
  fireEvent.click(getByTestId('button1'));
  expect(getByTestId('name1').textContent).toBe('firstRun');
  expect(getByTestId('name2').textContent).toBe('firstRun');
  expect(getByTestId('static').textContent).toBe('1234');

  // test intended values are updated second run
  fireEvent.click(getByTestId('button2'));
  expect(getByTestId('name1').textContent).toBe('secondRun');
  expect(getByTestId('name2').textContent).toBe('secondRun');
  expect(getByTestId('static').textContent).toBe('1234');
});

class MockedStoreClass extends Store {
  state = {
    name: '',
    static: 1234,
  };
}

const MockedContext = React.createContext(new MockedStoreClass());

function ComponentDisplayName({ visible = true }) {
  const context = React.useContext(MockedContext);
  const mockedStore = useStore(context);

  const onClick = () => {
    mockedStore.setState({
      name: 'firstRun',
    });
  };

  return (
    <>
      {visible && <p data-testid="name1">{mockedStore.state.name}</p>}
      <button onClick={onClick} data-testid="button1"></button>
    </>
  );
}

function ComponentDisplayNameAndNum() {
  const context = React.useContext(MockedContext);
  const mockedStore = useStore(context);

  const onClick = () => {
    mockedStore.setState({
      name: 'secondRun',
    });
  };

  return (
    <>
      <p data-testid="name2">{mockedStore.state.name}</p>
      <p data-testid="static">{mockedStore.state.static}</p>
      <button onClick={onClick} data-testid="button2"></button>
    </>
  );
}
