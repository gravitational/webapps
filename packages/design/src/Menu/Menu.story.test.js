import React from 'react';
import { IconExample } from './Menu.story';
import { render } from 'design/utils/testing';

describe('design/Menu', () => {
  it('renders parent and its children', () => {
    const { getByRole, getByTestId, getAllByTestId } = render(<IconExample />);

    const parent = getByTestId('Modal');
    const menu = getByRole('menu');
    const item = getAllByTestId('item');
    const icon = getAllByTestId('icon');

    expect(parent).not.toBeNull();
    expect(menu).not.toBeNull();
    expect(item).toHaveLength(3);
    expect(icon).toHaveLength(3);
  });
});
