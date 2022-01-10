import DocumentService from './docs';
import { Document } from './types';

function getMockedDocuments(): Document[] {
  return [
    { uri: 'test1', kind: 'doc.terminal_shell', title: 'T1' },
    { uri: 'test2', kind: 'doc.terminal_shell', title: 'T2' },
    { uri: 'test3', kind: 'doc.terminal_shell', title: 'T3' },
  ];
}

function createService(mockDocks: Document[]): DocumentService {
  const service = new DocumentService();
  mockDocks.forEach(d => service.add(d));

  return service;
}

test('close multiple docs', () => {
  const mockedDocuments = getMockedDocuments();
  const service = createService(mockedDocuments);

  service.closeMultiple([mockedDocuments[0], mockedDocuments[1]]);

  expect(service.getDocuments()).not.toContain(mockedDocuments[0]);
  expect(service.getDocuments()).not.toContain(mockedDocuments[1]);
  expect(service.getDocuments()).toContain(mockedDocuments[2]);
});

test('close other docs', () => {
  const mockedDocks = getMockedDocuments();
  const service = createService(mockedDocks);

  service.closeOthers(mockedDocks[0]);

  expect(service.getDocuments()).toContain(mockedDocks[0]);
  expect(service.getDocuments()).not.toContain(mockedDocks[1]);
  expect(service.getDocuments()).not.toContain(mockedDocks[2]);
});

test('close docs to the right', () => {
  const mockedDocks = getMockedDocuments();
  const service = createService(mockedDocks);

  service.closeToRight(mockedDocks[1]);

  expect(service.getDocuments()).toContain(mockedDocks[0]);
  expect(service.getDocuments()).toContain(mockedDocks[1]);
  expect(service.getDocuments()).not.toContain(mockedDocks[2]);
});

test('duplicate PTY doc and activate it', () => {
  const mockedDocks = getMockedDocuments();
  const service = createService(mockedDocks);
  const ptyToDuplicate = mockedDocks[1];
  const ptyToDuplicateIndex = service.getDocuments().indexOf(ptyToDuplicate);
  const initialLength = service.getDocuments().length;

  service.duplicatePtyAndActivate(ptyToDuplicate);

  expect(service.getDocuments()).toHaveLength(initialLength + 1);
  expect({
    ...service.getDocuments()[ptyToDuplicateIndex + 1],
    uri: '', // omit URI, all other properties should be copied
  }).toStrictEqual({ ...ptyToDuplicate, uri: '' });
  expect(service.getActive()).toStrictEqual(
    service.getDocuments()[ptyToDuplicateIndex + 1]
  );
});
