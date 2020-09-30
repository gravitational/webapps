import React from 'react';
import { Overflow, AuditLog } from './Audit.story';
import { render } from 'design/utils/testing';

test('overflow', async () => {
  const { container, findByText } = render(<Overflow />);
  await findByText(/exceeded the maximum limit of 9999 events/);

  expect(container.firstChild).toMatchSnapshot();
});

test('null response still renders table', async () => {
  const { container, findByText } = render(<AuditLog />);
  await findByText(/no data available/i);

  expect(container.firstChild).toMatchSnapshot();
});
