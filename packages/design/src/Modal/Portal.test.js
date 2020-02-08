/*
Copyright 2020 Gravitational, Inc.

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
import { render } from 'design/utils/testing';
import Portal from './Portal';

describe('design/Modal/Portal', () => {
  test('container to be attached to body element', () => {
    const { getByTestId, container } = renderPortal();
    const content = getByTestId('content');
    expect(container).not.toContainElement(content);
    expect(content.parentNode.nodeName).toEqual('BODY');
  });

  test('container to be attached to custom element', () => {
    const customElement = document.createElement('div');
    const { queryByTestId } = renderPortal({ container: customElement });
    expect(queryByTestId('content')).not.toBeInTheDocument();
    expect(customElement).toHaveTextContent('hello');
  });

  test('disable the portal behavior', () => {
    const { getByTestId, container } = renderPortal({ disablePortal: true });
    expect(container).toContainElement(getByTestId('content'));
  });
});

function renderPortal(props) {
  return render(
    <div data-testid="parent">
      <Portal {...props}>
        <div data-testid="content">hello</div>
      </Portal>
    </div>
  );
}
