import React from 'react';
import { fireEvent, render } from 'design/utils/testing';
import { ShareFeedback } from './ShareFeedback';
import { MockAppContextProvider } from 'teleterm/ui/fixtures/MockAppContextProvider';
import { Cluster } from 'teleterm/services/tshd/v1/cluster_pb';
import { MockAppContext } from 'teleterm/ui/fixtures/mocks';

test('email field is not prefilled with the username if is not an email', () => {
  const appContext = new MockAppContext();
  jest
    .spyOn(appContext.clustersService, 'findCluster')
    .mockImplementation(clusterUri => {
      if (clusterUri === '/clusters/localhost')
        return {
          loggedInUser: { name: 'alice' },
        } as Cluster.AsObject;
    });

  jest
    .spyOn(appContext.workspacesService, 'getRootClusterUri')
    .mockReturnValue('/clusters/localhost');

  const { getByLabelText } = render(
    <MockAppContextProvider appContext={appContext}>
      <ShareFeedback onClose={undefined} />
    </MockAppContextProvider>
  );

  expect(getByLabelText('Email Address')).toHaveValue('');
});

test('email field is prefilled with the username if it looks like an email', () => {
  const appContext = new MockAppContext();
  jest
    .spyOn(appContext.clustersService, 'findCluster')
    .mockImplementation(clusterUri => {
      if (clusterUri === '/clusters/production') {
        return {
          loggedInUser: {
            name: 'bob@prod.com',
          },
        } as Cluster.AsObject;
      }
    });

  jest
    .spyOn(appContext.workspacesService, 'getRootClusterUri')
    .mockReturnValue('/clusters/production');

  const { getByLabelText } = render(
    <MockAppContextProvider appContext={appContext}>
      <ShareFeedback onClose={undefined} />
    </MockAppContextProvider>
  );

  expect(getByLabelText('Email Address')).toHaveValue('bob@prod.com');
});

test('onClose is called when close button is clicked', () => {
  const appContext = new MockAppContext();
  const handleClose = jest.fn();

  const { getByTitle } = render(
    <MockAppContextProvider appContext={appContext}>
      <ShareFeedback onClose={handleClose} />
    </MockAppContextProvider>
  );

  fireEvent.click(getByTitle('Close'));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
