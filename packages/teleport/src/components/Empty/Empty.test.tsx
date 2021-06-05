import React from 'react';
import { render } from 'design/utils/testing';
import Empty, { Props } from './Empty';

test('empty state for enterprise, can create', async () => {
  const { findByText } = render(<Empty {...props} />);

  expect(await findByText(/ADD YOUR FIRST SERVER/i)).toBeVisible();
});

test('empty state for enterprise, cannot create', async () => {
  const { findByText } = render(<Empty {...props} canCreate={false} />);

  expect(await findByText(/There are no servers for the/i)).toBeVisible();
});

test('empty state for enterprise, can create, leaf cluster', async () => {
  const { findByText } = render(<Empty {...props} isLeafCluster={true} />);

  expect(await findByText(/There are no servers for the/i)).toBeVisible();
});

test('empty state for oss', async () => {
  const { findByText } = render(<Empty {...props} isEnterprise={false} />);

  expect(await findByText(/There are no servers for the/i)).toBeVisible();
});

const props: Props = {
  type: 'nodes',
  clusterId: 'im-a-cluster',
  isEnterprise: true,
  canCreate: true,
  isLeafCluster: false,
  onButtonClick: () => null,
};
