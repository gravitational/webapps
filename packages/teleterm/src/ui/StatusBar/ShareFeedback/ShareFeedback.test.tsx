import React from 'react';
import { fireEvent, render } from 'design/utils/testing';
import { ShareFeedback } from './ShareFeedback';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';
import { ClustersService } from 'teleterm/ui/services/clusters';
import AppContext from 'teleterm/ui/appContext';
import { WorkspacesService } from 'teleterm/ui/services/workspacesService';
import { Cluster } from 'teleterm/services/tshd/v1/cluster_pb';

jest.mock('teleterm/ui/services/clusters');
jest.mock('teleterm/ui/services/workspacesService');

function getTestSetup() {
  const clustersService = new ClustersService(undefined, undefined);
  const workspacesService = new WorkspacesService(
    undefined,
    undefined,
    undefined,
    undefined
  );

  jest
    .spyOn(ClustersService.prototype, 'findCluster')
    .mockImplementation(clusterUri => {
      if (clusterUri === '/clusters/localhost')
        return {
          loggedInUser: { name: 'alice' },
        } as Cluster.AsObject;

      if (clusterUri === '/clusters/production') {
        return {
          loggedInUser: {
            name: 'bob@prod.com',
          },
        } as Cluster.AsObject;
      }
    });

  jest
    .spyOn(WorkspacesService.prototype, 'getRootClusterUri')
    .mockReturnValue('/clusters/localhost');

  // @ts-expect-error - using mocks
  const appContext: AppContext = {
    clustersService,
    workspacesService,
  };

  return {
    MockedAppContext: ({ children }) => (
      <MockAppContextProvider appContext={appContext}>
        {children}
      </MockAppContextProvider>
    ),
  };
}

test('email field is not prefilled with the username if is not an email', () => {
  const { MockedAppContext } = getTestSetup();
  jest
    .spyOn(WorkspacesService.prototype, 'getRootClusterUri')
    .mockReturnValue('/clusters/localhost');

  const { getByLabelText } = render(
    <MockedAppContext>
      <ShareFeedback onClose={undefined} />
    </MockedAppContext>
  );

  expect(getByLabelText('Email Address')).toHaveValue('');
});

test('email field is prefilled with the username if it looks like an email', () => {
  const { MockedAppContext } = getTestSetup();
  jest
    .spyOn(WorkspacesService.prototype, 'getRootClusterUri')
    .mockReturnValue('/clusters/production');

  const { getByLabelText } = render(
    <MockedAppContext>
      <ShareFeedback onClose={undefined} />
    </MockedAppContext>
  );

  expect(getByLabelText('Email Address')).toHaveValue('bob@prod.com');
});

test('onClose is called when close button is clicked', () => {
  const { MockedAppContext } = getTestSetup();
  const handleClose = jest.fn();

  const { getByTitle } = render(
    <MockedAppContext>
      <ShareFeedback onClose={handleClose} />
    </MockedAppContext>
  );

  fireEvent.click(getByTitle('Close'));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
