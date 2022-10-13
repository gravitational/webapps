import { AccessRequest } from 'e-teleport/services/workflow';

import { ImmutableStore } from 'teleterm/ui/services/immutableStore';

import {
  AccessRequestsService,
  getEmptyPendingAccessRequest,
} from './accessRequestsService';
import { PendingAccessRequest } from './workspacesService';

function getMockPendingAccessRequest(): PendingAccessRequest {
  return {
    node: {
      '123': 'node1',
    },
    app: {
      '123': 'app1',
      '456': 'app2',
    },
    db: {},
    windows_desktop: {},
    role: {
      access: 'access',
    },
    kube_cluster: {},
  };
}

function getMockAssumed(assumed = {}): Record<string, AccessRequest> {
  return assumed;
}

function createService(
  pending: PendingAccessRequest,
  assumed: Record<string, AccessRequest>
): AccessRequestsService {
  const store = new ImmutableStore<{
    isBarCollapsed: boolean;
    pending: PendingAccessRequest;
    assumed: Record<string, AccessRequest>;
  }>();
  store.state = {
    isBarCollapsed: false,
    pending,
    assumed,
  };
  return new AccessRequestsService(
    () => store.state,
    draftState => store.setState(draftState)
  );
}

test('getCollapsed() returns the bar collapse state', () => {
  let service = createService(getMockPendingAccessRequest(), getMockAssumed());
  expect(service.getCollapsed()).toBe(false);
});

test('toggleBar() changes the collapse state', () => {
  let service = createService(getMockPendingAccessRequest(), getMockAssumed());
  expect(service.getCollapsed()).toBe(false);
  service.toggleBar();
  expect(service.getCollapsed()).toBe(true);
});

test('clearPendingAccessRequest() clears pending access reuqest', () => {
  let service = createService(
    getMockPendingAccessRequest(),
    getMockAssumed({})
  );
  service.clearPendingAccessRequest();
  expect(service.getPendingAccessRequest()).toStrictEqual(
    getEmptyPendingAccessRequest()
  );
});

test('getAddedResourceCount() returns added resource count for pending request', () => {
  let service = createService(
    getMockPendingAccessRequest(),
    getMockAssumed({})
  );
  expect(service.getAddedResourceCount()).toBe(3);
  service.clearPendingAccessRequest();
  expect(service.getAddedResourceCount()).toBe(0);
});

test('addOrRemoveResource() adds resource to pending request', () => {
  let service = createService(
    getMockPendingAccessRequest(),
    getMockAssumed({})
  );
  service.addOrRemoveResource('node', '456', 'node2');
  const pendingAccessRequest = service.getPendingAccessRequest();
  expect(pendingAccessRequest['node']).toHaveProperty('456');
});

test('addOrRemoveResource() removes resource if it already exists on pending request', () => {
  let service = createService(
    getMockPendingAccessRequest(),
    getMockAssumed({})
  );
  service.addOrRemoveResource('node', '123', 'node1');
  const pendingAccessRequest = service.getPendingAccessRequest();
  expect(pendingAccessRequest['node']).not.toHaveProperty('123');
});
