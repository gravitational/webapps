import { renderHook, act } from '@testing-library/react-hooks';

// Imports to be mocked
import { fetchClusterAlerts } from 'teleport/services/alerts'; // eslint-disable-line
import useStickyClusterId from 'teleport/useStickyClusterId'; // eslint-disable-line

import { useAlerts } from './useAlerts';

const ALERTS = {
  alerts: [
    {
      kind: 'cluster_alert',
      version: 'v1',
      metadata: {
        name: 'upgrade-suggestion',
        labels: {
          'teleport.internal/alert-on-login': 'yes',
          'teleport.internal/alert-permit-all': 'yes',
        },
        expires: '2022-08-31T17:26:05.728149Z',
      },
      spec: {
        severity: 5,
        message:
          'A new major version of Teleport is available. Please consider upgrading your cluster to v10.',
        created: '2022-08-30T17:26:05.728149Z',
      },
    },
  ],
};

jest.mock('teleport/services/alerts', () => ({
  fetchClusterAlerts: () => Promise.resolve(ALERTS),
}));

jest.mock('teleport/useStickyClusterId', () => () => ({ clusterId: 42 }));

describe('components/BannerList/useAlerts', () => {
  it('fetches disabled alerts on load', async () => {
    const { result } = renderHook(() => useAlerts());
    expect(result.current.alerts).toBe(ALERTS);
  });
  it.todo('fetches cluster alerts on load');
  it.todo('fetches cluster alerts on clusterid update');
  it.todo('provides a method that dismisses alerts for 24h');
  it.todo('only returns alerts that are not dismissed');
});
