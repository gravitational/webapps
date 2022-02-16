import { MockMainProcessClient } from 'teleterm/mainProcess/fixtures/mocks';
import { MockTshClient } from 'teleterm/services/tshd/fixtures/mocks';
import { MockPtyServiceClient } from 'teleterm/services/pty/fixtures/mocks';
import { createMockFileStorage } from 'teleterm/services/fileStorage/fixtures/mocks';
import AppContext from 'teleterm/ui/appContext';
import { Document } from 'teleterm/ui/services/docs';

export class MockAppContext extends AppContext {
  constructor() {
    const mainProcessClient = new MockMainProcessClient();
    const tshdClient = new MockTshClient();
    const ptyServiceClient = new MockPtyServiceClient();
    const loggerService = createLoggerService();
    const fileStorage = createMockFileStorage();

    super({
      loggerService,
      mainProcessClient,
      tshClient: tshdClient,
      ptyServiceClient,
      fileStorage,
    });
  }
}

function createLoggerService() {
  return {
    createLogger() {
      return {
        error: () => {},
        warn: () => {},
        info: () => {},
      };
    },
  };
}

export function getMockDocuments(): Document[] {
  return [
    {
      kind: 'doc.home',
      uri: 'test_uri_0',
      title: 'Test 0',
    },
    {
      kind: 'doc.blank',
      uri: 'test_uri_1',
      title: 'Test 1',
    },
    {
      kind: 'doc.blank',
      uri: 'test_uri_2',
      title: 'Test 2',
    },
    {
      kind: 'doc.blank',
      uri: 'test_uri_3',
      title: 'Test 3',
    },
    {
      kind: 'doc.gateway',
      uri: 'test_uri_4',
      title: 'Test 4',
      gatewayUri: '',
      targetUri: ''
    },
    {
      kind: 'doc.gateway',
      uri: 'test_uri_5',
      title: 'Test 5',
      gatewayUri: '',
      targetUri: ''
    },
    {
      kind: 'doc.cluster',
      uri: 'test_uri_6',
      title: 'Test 6',
      clusterUri: 'none',
    },
    {
      kind: 'doc.cluster',
      uri: 'test_uri_7',
      title: 'Test 7',
      clusterUri: 'test_uri',
    },
    {
      kind: 'doc.cluster',
      uri: 'test_uri_8',
      title: 'Test 8',
      clusterUri: 'test_uri_8',
    },
    {
      kind: 'doc.cluster',
      uri: 'test_uri_9',
      title: 'Test 9',
      clusterUri: 'test_uri_9',
    },
  ];
}
