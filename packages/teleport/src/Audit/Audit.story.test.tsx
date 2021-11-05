import React from 'react';
import { render } from 'design/utils/testing';
import { Loaded, AllEventsList } from './Audit.story';

test('loaded audit log screen', async () => {
  const { container, findByText } = render(<Loaded />);
  await findByText(/Audit Log/);
  expect(container.firstChild).toMatchSnapshot();
});

test('list of all events', async () => {
  const { container } = render(<AllEventsList />);
  expect(container.firstChild).toMatchSnapshot();
});
