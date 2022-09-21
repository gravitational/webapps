import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, Flex, Box, Label, Alert } from 'design';
import { ArrowBack } from 'design/Icon';
import { FeatureHeaderTitle } from 'teleport/components/Layout';
import useReviewAccessRequest from '../useReviewAccessRequest';
import { RequestDelete } from 'e-teleport/Workflow/ReviewRequests/RequestView/RequestDelete/RequestDelete';
import { RequestView } from 'e-teleport/Workflow/ReviewRequests/RequestView/RequestView';

export default function Container(props: Props) {
  const state = useReviewAccessRequest(props);
  return <ReviewAccessRequest {...state} />;
}

export function ReviewAccessRequest({
  goBack,
  request,
  attempt,
  requestId,
  assumeRole,
  submitReviewAttempt,
  submitReview,
  deleteDialogOpen,
  assumeRoleAttempt,
  setDeleteDialogOpen,
  deleteRequest,
  deleteRequestAttempt,
  user,
  flags,
}: ReviewAccessRequestProps) {
  useEffect(() => {
    if (deleteRequestAttempt.status === 'success') {
      goBack();
    }
  }, [deleteRequestAttempt]);

  return (
    <Layout mx="auto" px={5} pt={3} height="100%">
      <FeatureHeaderTitle mb={3}>
        <Flex alignItems="center">
          <ArrowBack
            mr={2}
            fontSize={8}
            onClick={goBack}
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          />
          <Text>{`Request: ${requestId}`}</Text>
        </Flex>
      </FeatureHeaderTitle>
      {assumeRoleAttempt.status === 'failed' && (
        <Alert kind="danger" children={assumeRoleAttempt.statusText} />
      )}
      <RequestView
        user={user?.name}
        attempt={attempt}
        request={request}
        flags={flags}
        confirmDelete={false} // never show the embedded request delete
        toggleConfirmDelete={() => setDeleteDialogOpen(true)}
        submitReview={submitReview}
        assumeRole={assumeRole}
        reviewAttempt={submitReviewAttempt}
      />
      {request && deleteDialogOpen && (
        <RequestDelete
          attempt={deleteRequestAttempt}
          user={request?.user}
          roles={request?.roles}
          requestId={request?.id}
          requestState={request?.state}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={() => deleteRequest(request.id)}
        />
      )}
    </Layout>
  );
}

type Props = {
  requestId: string;
  goBack: () => void;
};

type ReviewAccessRequestProps = ReturnType<typeof useReviewAccessRequest>;

const Layout = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1248px;

  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;
