/**
 * Copyright 2022 Gravitational, Inc.
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
import { fireEvent, render } from 'design/utils/testing';
import { ExpanderConnectionsPresentational } from './ExpanderConnections';
import { ConnectionItem } from './types';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';
/*
test('should render connection items', () => {
  const items: ConnectionItem[] = [
    { uri: 'test-uri', title: 'TestItem', status: 'disconnected' },
  ];

  const { getByText } = render(
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational items={items} />
    </MockAppContextProvider>
  );
  expect(getByText(items[0].title)).toBeInTheDocument();
});

test('should invoke callback when remove button is clicked', () => {
  const handleRemove = jest.fn();

  const items: ConnectionItem[] = [
    { uri: 'test-uri', title: 'TestItem', status: 'disconnected' },
  ];
  const { getByTitle } = render(
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational
        items={items}
        onItemRemove={handleRemove}
      />
    </MockAppContextProvider>
  );

  const removeButton = getByTitle('Remove');
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);
  expect(handleRemove).toHaveBeenCalledWith(items[0]);
});

test('should invoke callback item is clicked', () => {
  const handleOpen = jest.fn();

  const items: ConnectionItem[] = [
    { uri: 'test-uri', title: 'TestItem', status: 'disconnected' },
  ];
  const { getByTitle } = render(
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational
        items={items}
        onItemOpen={handleOpen}
      />
    </MockAppContextProvider>
  );

  fireEvent.click(getByTitle(items[0].title));
  expect(handleOpen).toHaveBeenCalledWith(items[0]);
});

test('should not show remove button for connected items', () => {
  const items: ConnectionItem[] = [
    { uri: 'test-uri', title: 'TestItem', status: 'connected' },
  ];
  const { queryByTitle } = render(
    <MockAppContextProvider>
      <ExpanderConnectionsPresentational items={items} />
    </MockAppContextProvider>
  );
  expect(queryByTitle('Remove')).not.toBeInTheDocument();
});
*/
