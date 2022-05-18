import { ModalsService } from './modalsService';

test('openDialog appends the dialog before DialogNone', () => {
  const modalsService = new ModalsService();

  modalsService.openDialog({
    kind: 'documents-reopen',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const expectedModalKinds = ['documents-reopen', 'none'];
  const actualModalKinds = modalsService.state.map(dialog => dialog.kind);

  expect(actualModalKinds).toEqual(expectedModalKinds);
});

test('openDialog called for a second time puts the new dialog between the first and the last one', () => {
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

  const expectedModalKinds = ['documents-reopen', 'cluster-logout', 'none'];
  const actualModalKinds = modalsService.state.map(dialog => dialog.kind);

  expect(actualModalKinds).toEqual(expectedModalKinds);
});
