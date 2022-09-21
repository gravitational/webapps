import React from 'react';
import styled from 'styled-components';

import { OpenBox } from 'design/Icon';
import { ButtonIcon, ButtonPrimary, Text } from 'design';
import { useAccessRequestsButton } from './useAccessRequestButton';

export function AccessRequestCheckoutButton() {
  const { toggleAccessRequestBar, getPendingResourceCount, isCollapsed } =
    useAccessRequestsButton();
  const count = getPendingResourceCount();

  if (count > 0 && isCollapsed()) {
    return (
      <ButtonPrimary
        onClick={toggleAccessRequestBar}
        px={2}
        size="small"
        title="Toggle Access Request Checkout"
      >
        <OpenBox mr={2} fontSize="12px" />
        <Text fontSize="12px">{count}</Text>
      </ButtonPrimary>
    );
  }
  return <></>;
}

const CheckoutButton = styled(ButtonPrimary)`
  height: 22px;
`;
