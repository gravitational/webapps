import renderHook from 'design/utils/renderHook';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import React from 'react';
import AppContextProvider from 'teleterm/ui/appContextProvider';
import { KeyboardShortcutsService } from './keyboardShortcutsService';
import { KeyboardShortcutEventSubscriber } from './types';
import AppContext from 'teleterm/ui/appContext';

describe('teleterm/ui/services/useKeyboardShortcuts', () => {
  it('should call handler on its event type', () => {
    const { handler, getEventEmitter, wrapper } = getTestSetup();

    renderHook(() => useKeyboardShortcuts({ 'tab-1': handler }), { wrapper });
    const emitEvent = getEventEmitter();
    emitEvent({ type: 'tab-1' });

    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler on other event type', () => {
    const { handler, getEventEmitter, wrapper } = getTestSetup();

    renderHook(() => useKeyboardShortcuts({ 'tab-1': handler }), { wrapper });
    const emitEvent = getEventEmitter();
    emitEvent({ type: 'tab-2' });

    expect(handler).not.toHaveBeenCalled();
  });
});

function getTestSetup() {
  const { getEventEmitter, wrapper } = makeWrapper();
  const handler = jest.fn();
  return { handler, getEventEmitter, wrapper };
}

function makeWrapper() {
  let eventEmitter: KeyboardShortcutEventSubscriber;
  return {
    wrapper: (props: any) => {
      const serviceKeyboardShortcuts: Partial<KeyboardShortcutsService> = {
        subscribeToEvents(subscriber: KeyboardShortcutEventSubscriber) {
          eventEmitter = subscriber;
        },
        unsubscribeFromEvents() {
          eventEmitter = null;
        },
      };

      return (
        <AppContextProvider value={{ serviceKeyboardShortcuts } as AppContext}>
          {props.children}
        </AppContextProvider>
      );
    },
    getEventEmitter: () => {
      return eventEmitter;
    },
  };
}
