import React from 'react';
import renderHook from 'design/utils/renderHook';
import { useTabShortcuts } from 'teleterm/ui/TabHost/useTabShortcuts';
import { Document, DocumentsService } from 'teleterm/ui/services/docs';
import {
  KeyboardShortcutEvent,
  KeyboardShortcutEventSubscriber,
  KeyboardShortcutsService,
} from 'teleterm/ui/services/keyboardShortcuts';
import AppContextProvider from 'teleterm/ui/appContextProvider';
import { getMockDocuments } from 'teleterm/ui/fixtures/mocks';

function getTestSetup() {
  const mockedDocuments = getMockDocuments();

  let eventEmitter: KeyboardShortcutEventSubscriber;
  const keyboardShortcutsService: Partial<KeyboardShortcutsService> = {
    subscribeToEvents(subscriber: KeyboardShortcutEventSubscriber) {
      eventEmitter = subscriber;
    },
    unsubscribeFromEvents() {
      eventEmitter = null;
    },
  };

  const docsService: Partial<DocumentsService> = {
    getDocuments(): Document[] {
      return mockedDocuments;
    },
    getActive() {
      return mockedDocuments[0];
    },
    close: jest.fn(),
    open: jest.fn(),
    closeOthers: jest.fn(),
    closeToRight: jest.fn(),
    openNewTerminal: jest.fn(),
    swapPosition: jest.fn(),
    duplicatePtyAndActivate: jest.fn(),
    useState() {
      return null;
    },
  };

  renderHook(() => useTabShortcuts(), {
    wrapper: props => (
      // @ts-expect-error - using mocks
      <AppContextProvider value={{ keyboardShortcutsService, docsService }}>
        {props.children}
      </AppContextProvider>
    ),
  });

  return {
    emitKeyboardShortcutEvent: eventEmitter,
    docsService,
    keyboardShortcutsService,
  };
}

test.each([
  { type: 'tab-1', value: 1 },
  { type: 'tab-2', value: 2 },
  { type: 'tab-3', value: 3 },
  { type: 'tab-4', value: 4 },
  { type: 'tab-5', value: 5 },
  { type: 'tab-6', value: 6 },
  { type: 'tab-7', value: 7 },
  { type: 'tab-8', value: 8 },
  { type: 'tab-9', value: 9 },
])('should open tab using $type shortcut', ({ type, value }) => {
  const { emitKeyboardShortcutEvent, docsService } = getTestSetup();

  emitKeyboardShortcutEvent({ type } as KeyboardShortcutEvent);

  expect(docsService.open).toHaveBeenCalledWith(
    docsService.getDocuments()[value].uri
  );
});

test('should close active tab', () => {
  const { emitKeyboardShortcutEvent, docsService } = getTestSetup();
  const documentToClose = docsService.getDocuments()[2];
  docsService.getActive = () => documentToClose;

  emitKeyboardShortcutEvent({ type: 'tab-close' });

  expect(docsService.close).toHaveBeenCalledWith(documentToClose.uri);
});

test('should open new tab', () => {
  const { emitKeyboardShortcutEvent, docsService } = getTestSetup();

  emitKeyboardShortcutEvent({ type: 'tab-new' });

  expect(docsService.openNewTerminal).toHaveBeenCalledWith();
});

describe('open next/previous tab', () => {
  const { emitKeyboardShortcutEvent, docsService } = getTestSetup();

  test('should open next tab', () => {
    const activeTabIndex = 2;
    docsService.getActive = () => docsService.getDocuments()[activeTabIndex];

    emitKeyboardShortcutEvent({ type: 'tab-next' });

    expect(docsService.open).toHaveBeenCalledWith(
      docsService.getDocuments()[activeTabIndex + 1].uri
    );
  });

  test('should open first tab if active is last (omitting doc.home)', () => {
    const activeTabIndex = docsService.getDocuments().length - 1;
    docsService.getActive = () => docsService.getDocuments()[activeTabIndex];

    emitKeyboardShortcutEvent({ type: 'tab-next' });

    expect(docsService.open).toHaveBeenCalledWith(
      docsService.getDocuments()[1].uri
    );
  });

  test('should open previous tab', () => {
    const activeTabIndex = 2;
    docsService.getActive = () => docsService.getDocuments()[activeTabIndex];

    emitKeyboardShortcutEvent({ type: 'tab-previous' });

    expect(docsService.open).toHaveBeenCalledWith(
      docsService.getDocuments()[activeTabIndex - 1].uri
    );
  });

  test('should open the last tab if active is the first one (omitting doc.home)', () => {
    const activeTabIndex = 1;
    docsService.getActive = () => docsService.getDocuments()[activeTabIndex];

    emitKeyboardShortcutEvent({ type: 'tab-previous' });

    expect(docsService.open).toHaveBeenCalledWith(
      docsService.getDocuments()[docsService.getDocuments().length - 1].uri
    );
  });
});
