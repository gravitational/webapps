import React from 'react';
import { Success } from './Users.story';
import { render } from 'design/utils/testing';

test('success state', async () => {
  const { container, findByText } = render(<Success />);
  await findByText(/add user/i);
  expect(container).toMatchSnapshot();
});
