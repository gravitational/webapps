import React from 'react';
import Modal from './Modal';
import { render, screen, fireEvent } from 'design/utils/testing';

const renderModal = props => {
  return render(
    <Modal open={true} {...props}>
      <div>Hello</div>
    </Modal>
  );
};

const keyDown = {
  key: 'Escape',
  code: 27,
};

describe('design/Modal', () => {
  it('respects open prop set to false', () => {
    const { queryByTestId } = render(
      <Modal open={false}>
        <div>Hello</div>
      </Modal>
    );

    expect(queryByTestId('Modal')).toBeNull();
  });

  it('respects onBackdropClick and onEscapeKeyDown props', () => {
    const mockFn = jest.fn();

    const { container, getByTestId } = renderModal({
      onBackdropClick: mockFn,
      onEscapeKeyDown: mockFn,
    });

    // handlebackdropClick
    fireEvent.click(getByTestId('backdrop'));
    expect(mockFn).toHaveBeenCalled();

    // handleDocumentKeyDown
    fireEvent.keyDown(container, keyDown);
    expect(mockFn).toHaveBeenCalled();
  });

  it('respects onClose prop', () => {
    const mockFn = jest.fn();

    const { container, getByTestId } = renderModal({
      onClose: mockFn,
    });

    // handlebackdropClick
    fireEvent.click(getByTestId('backdrop'));
    expect(mockFn).toHaveBeenCalled();

    // handleDocumentKeyDown
    fireEvent.keyDown(container, keyDown);
    expect(mockFn).toHaveBeenCalled();
  });

  it('respects hideBackDrop prop', () => {
    const { queryByTestId } = renderModal({
      hideBackdrop: true,
    });

    expect(queryByTestId('backdrop')).toBeNull();
  });

  it('respects disableBackdropClick and disableEscapeKeyDown prop', () => {
    const mockFn = jest.fn();
    const { container, getByTestId } = renderModal({
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
      onClose: mockFn,
    });

    // handleBackdropClick
    fireEvent.click(getByTestId('backdrop'));
    expect(mockFn).not.toHaveBeenCalled();

    // handleDocumentKeyDown
    fireEvent.keyDown(container, keyDown);
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('unmount cleans up event listeners and closes modal', () => {
    const mockFn = jest.fn();
    const { container, queryByTestId, unmount } = renderModal({
      onEscapeKeyDown: mockFn,
    });

    unmount();

    expect(queryByTestId('Modal')).toBeNull();

    // TODO remove keydown event
    fireEvent.keyDown(container, keyDown);
    expect(mockFn).not.toHaveBeenCalled();
  });
});

// TODO
//     disableEnforceFocus: false,
//     disableAutoFocus
//     disableRestoreFocus: false,
//     BackdropProps???
//     removing of focus event
