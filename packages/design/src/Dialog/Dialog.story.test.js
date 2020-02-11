import React from 'react';
import { Basic } from './Dialog.story';
import { render } from 'design/utils/testing';

describe('design/Dialog', () => {
  it('renders parent and its children', () => {
    const { getByTestId } = render(<Basic />);

    const parent = getByTestId('Modal');
    const header = getByTestId('header');
    const title = getByTestId('title');
    const content = getByTestId('content');
    const footer = getByTestId('footer');

    expect(parent).not.toBeNull();
    expect(header).not.toBeNull();
    expect(title).not.toBeNull();
    expect(content).not.toBeNull();
    expect(footer).not.toBeNull();
  });
});
