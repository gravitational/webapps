import { fireEvent, render } from 'design/utils/testing';
import React from 'react';
import { TabHost } from 'teleterm/ui/TabHost/TabHost';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';
import { Document, DocumentsService } from 'teleterm/ui/services/docs';
import { KeyboardShortcutsService } from 'teleterm/ui/services/keyboardShortcuts';
import {
  MainProcessClient,
  TabContextMenuOptions,
} from 'teleterm/mainProcess/types';
import { getMockDocuments } from 'teleterm/ui/fixtures/mocks';
import { ClustersService } from 'teleterm/ui/services/clusters';

function getTestSetup() {
  const mockedDocuments = getMockDocuments();

  const keyboardShortcutsService: Partial<KeyboardShortcutsService> = {
    subscribeToEvents() {},
    unsubscribeFromEvents() {},
  };

  const mainProcessClient: Partial<MainProcessClient> = {
    openTabContextMenu: jest.fn(),
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

  const clustersService: Partial<ClustersService> = {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    findRootClusterByResource: jest.fn(),
    findCluster: jest.fn(),
  };

  const utils = render(
    <MockAppContextProvider
      appContext={{
        // @ts-expect-error - using mocks
        keyboardShortcutsService,
        // @ts-expect-error - using mocks
        docsService,
        // @ts-expect-error - using mocks
        mainProcessClient,
        // @ts-expect-error - using mocks
        clustersService,
      }}
    >
      <TabHost />
    </MockAppContextProvider>
  );

  return {
    ...utils,
    docsService,
    mainProcessClient,
  };
}

test('should render documents without home document', () => {
  const { queryByTitle, docsService } = getTestSetup();
  const documents = docsService.getDocuments();

  expect(queryByTitle(documents[0].title)).not.toBeInTheDocument();
  expect(queryByTitle(documents[1].title)).toBeInTheDocument();
  expect(queryByTitle(documents[2].title)).toBeInTheDocument();
  expect(queryByTitle(documents[3].title)).toBeInTheDocument();
});

test('should open tab on click', () => {
  const { getByTitle, docsService } = getTestSetup();
  const documents = docsService.getDocuments();
  const { open } = docsService;
  const $tabTitle = getByTitle(documents[1].title);

  fireEvent.click($tabTitle);

  expect(open).toHaveBeenCalledWith(documents[1].uri);
});

test('should open context menu', () => {
  const { getByTitle, docsService, mainProcessClient } = getTestSetup();
  const { openTabContextMenu } = mainProcessClient;
  const { close, closeOthers, closeToRight, duplicatePtyAndActivate } =
    docsService;
  const documents = docsService.getDocuments();
  const document = documents[1];

  const $tabTitle = getByTitle(documents[1].title);

  fireEvent.contextMenu($tabTitle);
  expect(openTabContextMenu).toHaveBeenCalled();

  // @ts-expect-error `openTabContextMenu` doesn't know about jest
  const options: TabContextMenuOptions = openTabContextMenu.mock.calls[0][0];
  expect(options.documentKind).toBe(document.kind);

  options.onClose();
  expect(close).toHaveBeenCalledWith(document.uri);

  options.onCloseOthers();
  expect(closeOthers).toHaveBeenCalledWith(document.uri);

  options.onCloseToRight();
  expect(closeToRight).toHaveBeenCalledWith(document.uri);

  options.onDuplicatePty();
  expect(duplicatePtyAndActivate).toHaveBeenCalledWith(document.uri);
});

test('should open new tab', () => {
  const { getByTitle, docsService } = getTestSetup();
  const { openNewTerminal } = docsService;
  const $newTabButton = getByTitle('New Tab');

  fireEvent.click($newTabButton);

  expect(openNewTerminal).toHaveBeenCalledWith();
});

test('should swap tabs', () => {
  const { getByTitle, docsService } = getTestSetup();
  const documents = docsService.getDocuments();
  const $firstTab = getByTitle(documents[1].title);
  const $thirdTab = getByTitle(documents[3].title);

  fireEvent.dragStart($thirdTab);
  fireEvent.drop($firstTab);

  expect(docsService.swapPosition).toHaveBeenCalledWith(2, 0); // not '3, 1' because doc.home is omitted
});
