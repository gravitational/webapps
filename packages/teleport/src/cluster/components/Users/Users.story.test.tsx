import React from 'react';
import { Success, Processing, Failed } from './Users.story';
import { render } from 'design/utils/testing';
import { Logger } from 'shared/libs/logger';

test('success state', async () => {
  const { container, findByText } = render(<Success />);
  await findByText(/no data available/i);
  expect(container).toMatchSnapshot();
});

test('processing state', async () => {
  const { container, findByTestId } = render(<Processing />);
  await findByTestId('loader');
  expect(container.firstChild).toMatchSnapshot();
});

// TODO: uncomment after we remove throw from useAttempt run().
// Currently, this test will fail from unhandled promise rejections.
// test('failed state', async () => {
//   jest.spyOn(Logger.prototype, 'error').mockImplementation();
//   const { container, findByText } = render(<Failed />);

//   await findByText(/error/i);

//   expect(container).toMatchSnapshot();
// });
