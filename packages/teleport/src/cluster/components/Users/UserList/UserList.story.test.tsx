import React from 'react';
import { UserList } from './UserList.story';
import { render } from 'design/utils/testing';

test('renders', () => {
  const { container } = render(<UserList />);
  expect(container.firstChild).toMatchSnapshot();
});
