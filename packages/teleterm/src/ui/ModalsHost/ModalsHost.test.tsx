import React from 'react';
import { render } from 'design/utils/testing';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';
import { ModalsService } from 'teleterm/ui/services/modals';
import ModalsHost from './ModalsHost';

jest.mock('teleterm/ui/ClusterLogout/ClusterLogout', () => {
  const MockClusterLogout = () => (
    <div data-testid="mocked-dialog" data-dialog-name="ClusterLogout"></div>
  );
  return MockClusterLogout;
});

jest.mock('teleterm/ui/DocumentsReopen', () => ({
  DocumentsReopen: () => (
    <div data-testid="mocked-dialog" data-dialog-name="DocumentsReopen"></div>
  ),
}));

test('dialogs are rendered in reverse order', () => {
  // Create ModalsService and manipulate its state so that the dialog kinds look like this:
  //
  //     ['documents-reopen', 'cluster-logout', 'none']
  const modalsService = new ModalsService();
  modalsService.openDialog({
    kind: 'documents-reopen',
    onConfirm: () => {},
    onCancel: () => {},
  });
  modalsService.openDialog({
    kind: 'cluster-logout',
    clusterUri: '/clusters/foo',
    clusterTitle: 'Foo',
  });

  const appContext = new MockAppContext();
  appContext.modalsService = modalsService;

  const { queryAllByTestId } = render(
    <MockAppContextProvider appContext={appContext}>
      <ModalsHost />
    </MockAppContextProvider>
  );

  // The DOM testing library doesn't really allow us to test actual visibility in terms of the order
  // of rendering, so we have to fall back to manually checking items in the array.
  // https://github.com/testing-library/react-testing-library/issues/313
  const dialogs = queryAllByTestId('mocked-dialog');

  // The first dialog in ModalsService state should be rendered as the last one.
  expect(dialogs[1]).toHaveAttribute('data-dialog-name', 'DocumentsReopen');
  expect(dialogs[0]).toHaveAttribute('data-dialog-name', 'ClusterLogout');
});
