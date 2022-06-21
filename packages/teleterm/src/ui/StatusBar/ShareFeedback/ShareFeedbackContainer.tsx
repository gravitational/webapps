import { ButtonIcon, Popover } from 'design';
import { ChatBubble } from 'design/Icon';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { ShareFeedback } from './ShareFeedback';
import { useShareFeedback } from './useShareFeedback';

export function ShareFeedbackContainer() {
  const buttonRef = useRef<HTMLButtonElement>();
  const {
    submitFeedbackAttempt,
    formValues,
    hasBeenShareFeedbackOpened,
    isShareFeedbackOpened,
    submitFeedback,
    setFormValues,
    openShareFeedback,
    closeShareFeedback,
  } = useShareFeedback();

  return (
    <>
      <ButtonIcon
        css={`
          position: relative;
        `}
        setRef={buttonRef}
        title="Share feedback"
        size={0}
        onClick={openShareFeedback}
      >
        {!hasBeenShareFeedbackOpened && <NotOpenedYetIndicator />}
        <ChatBubble fontSize="14px" />
      </ButtonIcon>
      <Popover
        open={isShareFeedbackOpened}
        anchorEl={buttonRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={closeShareFeedback}
        data-testid="share-feedback-container"
      >
        <ShareFeedback
          formValues={formValues}
          submitFeedbackAttempt={submitFeedbackAttempt}
          onClose={closeShareFeedback}
          submitFeedback={submitFeedback}
          setFormValues={setFormValues}
        />
      </Popover>
    </>
  );
}

const NotOpenedYetIndicator = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  height: 8px;
  width: 8px;
  background-color: ${props => props.theme.colors.info};
  border-radius: 50%;
  display: inline-block;
`;
