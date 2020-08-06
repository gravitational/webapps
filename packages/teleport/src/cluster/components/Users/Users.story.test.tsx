import React from 'react';
import { Success, Processing } from './Users.story';
import { render } from 'design/utils/testing';

test('success state', async () => {
  const { container, findByText } = render(<Success />);
  await findByText(/add user/i);
  expect(container).toMatchSnapshot();
});

test('processing state', async () => {
  const { container, findByTestId } = render(<Processing />);
  await findByTestId('loader');
  expect(container.firstChild).toMatchSnapshot();
});
