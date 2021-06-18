import React from 'react';
import { render, screen } from 'design/utils/testing';
import { Loaded, Failed, Empty, EmptyReadOnly } from './Nodes.story';

test('loaded', () => {
  const { container } = render(<Loaded />);
  expect(container.firstChild).toMatchSnapshot();
});

test('search filter works', () => {
  render(<Loaded searchValue="fujedu" />);

  expect(screen.queryByText(/172.10.1.20:3022/i)).toBeInTheDocument();

  expect(screen.queryByText(/172.10.1.1:3022/i)).toBeNull();
});

test('failed', () => {
  const { container } = render(<Failed />);
  expect(container.firstChild).toMatchSnapshot();
});

test('empty state', () => {
  const { container } = render(<Empty />);
  expect(container).toMatchSnapshot();
});

test('readonly empty state', () => {
  const { container } = render(<EmptyReadOnly />);
  expect(container).toMatchSnapshot();
});
