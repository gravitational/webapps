import React from 'react';
import styled from 'styled-components';
import { Box, Flex, ButtonPrimary, ButtonText, Text } from 'design';
import { ArrowDown } from 'design/Icon';
import { pluralize } from 'teleport/lib/util';
import { Transition } from 'react-transition-group';
import useAccessRequestCheckout from './useAccessRequestCheckout';
import AssumedRolesBar from './AssumedRolesBar';

import { RequestCheckout } from 'e-teleport/Workflow/NewRequest/RequestCheckout/RequestCheckout';

export default function Container() {
  const state = useAccessRequestCheckout();
  return <AccessRequestCheckout {...state} />;
}

export function RequestCheckoutSuccess({ onClose, reset }) {
  return (
    <Box textAlign="center">
      <ButtonPrimary
        mt={5}
        mb={3}
        width="100%"
        size="large"
        onClick={() => {
          reset();
          onClose();
        }}
      >
        Back to Listings
      </ButtonPrimary>
      <ButtonText
        onClick={() => {
          onClose();
        }}
      >
        Make Another Request
      </ButtonText>
    </Box>
  );
}

function AccessRequestCheckout({
  showCheckout,
  isCollapsed,
  collapseBar,
  toggleResource,
  createRequest,
  clearCreateAttempt,
  data,
  assumedRoles,
  attempt,
  goToRequestsList: reset, // have to pass through RequestCheckout because works differently on web
  setShowCheckout,
}: AccessRequestBarProps) {
  function handleClose() {
    setShowCheckout(false);

    // clear the attempt but only after the transition of the window is finished
    // just to make it look nicer
    if (attempt.status === 'success') {
      setTimeout(() => {
        clearCreateAttempt();
      }, 300);
    }
  }
  return (
    <>
      {data.length > 0 && !isCollapsed() && (
        <Box p={3} bg="primary.darker" border={1} borderColor="primary.dark">
          <Flex justifyContent="space-between" alignItems="center">
            <Text typography="h4" color="light" bold>
              {data.length} {pluralize(data.length, 'Resource')} Selected
            </Text>
            <Flex gap={3}>
              <ButtonPrimary onClick={() => setShowCheckout(!showCheckout)}>
                Proceed to Request
              </ButtonPrimary>
              <CollapseButton onClick={collapseBar}>
                <ArrowDown fontSize={3} />
              </CollapseButton>
            </Flex>
          </Flex>
        </Box>
      )}
      {assumedRoles.map(role => (
        <AssumedRolesBar key={role.id} role={role} />
      ))}
      <Transition in={showCheckout} timeout={300} mountOnEnter unmountOnExit>
        {transitionState => (
          <RequestCheckout
            toggleResource={toggleResource}
            onClose={handleClose}
            transitionState={transitionState}
            SuccessComponent={RequestCheckoutSuccess}
            reset={reset}
            data={data}
            attempt={attempt}
            createRequest={createRequest}
            clearAttempt={clearCreateAttempt}
            reviewers={[]} // need a way to get reviewers as options. for now you can create a text entry
            requireReason={false}
            numRequestedResources={0}
          />
        )}
      </Transition>
    </>
  );
}

const CollapseButton = styled(Flex)`
  background: ${props => props.theme.colors.primary.dark};
  width: 26px;
  justify-content: center;
  align-items: center;
  height: 26px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.secondary.main};
  }
  transition: background linear 0.1s;
`;

const StyledButtonLink = styled.button`
  color: ${props => props.theme.colors.text.primary};
  background: none;
  text-decoration: underline;
  text-transform: none;
  padding: 8px;
  outline: none;
  border: none;
  border-radius: 4px;

  &:hover,
  &:focus {
    background: #793cff;
    cursor: pointer;
  }

  &:disabled {
    background: #793cff;
    color: ${props => props.theme.colors.action.disabled};
  }
`;

type AccessRequestBarProps = ReturnType<typeof useAccessRequestCheckout>;
