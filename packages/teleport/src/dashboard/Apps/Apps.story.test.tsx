import React from 'react';
import { Loaded, Viewing, Empty } from './Apps.story';
import { render } from 'design/utils/testing';

test('success state', async () => {
  const { container, findAllByText } = render(<Loaded />);
  const numCards = await findAllByText(/launch/i);
  expect(container).toMatchSnapshot();
  expect(numCards).toHaveLength(3);
});

test('empty state', async () => {
  const { container, findByText } = render(<Empty />);
  await findByText(/add your first application/i);
  expect(container).toMatchSnapshot();
});

test('viewing state', async () => {
  const { findByTestId } = render(<Viewing />);
  const container = await findByTestId('dialogbox');
  expect(container).toMatchSnapshot();
});
