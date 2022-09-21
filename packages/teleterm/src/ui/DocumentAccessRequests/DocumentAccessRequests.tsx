import React, { useState } from 'react';
import * as types from 'teleterm/ui/services/workspacesService';

import Document from 'teleterm/ui/Document';

import useAccessRequests from './useAccessRequests';
import { RequestList } from './RequestList/RequestList';
// import SearchResources from './SearchResources/SearchResources';
import ReviewAccessRequest from './ReviewAccessRequest/ReviewAccessRequest';
import NewRequest from './NewRequest/NewRequest';

import ClusterCtx, {
  ClusterContextProvider,
  useClusterContext,
} from '../DocumentCluster/clusterContext';
import { useAppContext } from '../appContextProvider';

const Container = (props: DocumentProps) => {
  const state = useAccessRequests(props.doc);
  return (
    <Document doc={props.doc} visible={props.visible}>
      <DocumentAccessRequests {...state} />
    </Document>
  );
};

const DocumentAccessRequests = ({
  accessRequests,
  reviewing,
  attempt,
  docState,
  assumeRole,
  assumeRoleAttempt,
  getRequests,
  onViewRequest,
}: DocumentAccessRequestsProps) => {
  if (docState === 'creating') {
    return <NewRequest />;
  }

  if (reviewing) {
    return (
      <ReviewAccessRequest
        requestId={reviewing}
        goBack={() => onViewRequest('')}
      />
    );
  }

  return (
    <RequestList
      assumeRole={assumeRole}
      attempt={attempt}
      requests={accessRequests}
      getRequests={getRequests}
      viewRequest={(id: string) => onViewRequest(id)}
      assumeRoleAttempt={assumeRoleAttempt}
    />
  );
};

export type DocumentAccessRequestsProps = ReturnType<typeof useAccessRequests>;

type DocumentProps = {
  visible: boolean;
  doc: types.DocumentAccessRequests;
};

export default Container;
