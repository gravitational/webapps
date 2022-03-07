import React from 'react';
import { fireEvent, render, screen } from 'design/utils/testing';
import Automatically from './Automatically';

test('render command only after form submit', async () => {
  const cmd = 'sudo some-command';
  render(
    <Automatically
      cmd={cmd}
      attempt={{ status: 'success' }}
      onClose={() => {}}
      onCreate={() => Promise.resolve(true)}
      expires=""
    />
  );

  // initially, should not show the command
  expect(screen.queryByText(cmd)).toBeNull();

  // set app name
  const appNameInput = screen.getByPlaceholderText('jenkins');
  fireEvent.change(appNameInput, { target: { value: 'app-name' } });

  // set app url
  const appUriInput = screen.getByPlaceholderText('https://localhost:4000');
  fireEvent.change(appUriInput, {
    target: { value: 'https://gravitational.com' },
  });

  // click button
  screen.getByRole('button', { name: /Generate Script/i }).click();

  // after form submission should show the command
  expect(screen.queryByText(cmd)).not.toBeNull();
});
