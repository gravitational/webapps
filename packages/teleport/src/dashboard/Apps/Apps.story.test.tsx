import React from 'react';
import { Loaded, Empty } from './Apps.story';
import { render } from 'design/utils/testing';

test('success state', async () => {
  const { container, findAllByText } = render(<Loaded />);
  await findAllByText(/view quickstart/i);
  expect(container).toMatchSnapshot();
});

test('empty state', async () => {
  const { container, findByText } = render(<Empty />);
  await findByText(/first application/i);
  expect(container).toMatchSnapshot();
});
