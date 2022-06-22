import React, { useRef, useState } from 'react';
import { ButtonIcon, Flex, Popover, Text } from 'design';
import { ChatBubble } from 'design/Icon';
import { ShareFeedback } from './ShareFeedback/ShareFeedback';
import { useActiveDocumentClusterBreadcrumbs } from './useActiveDocumentClusterBreadcrumbs';

export function StatusBar() {
  const shareButtonRef = useRef<HTMLButtonElement>();
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const clusterBreadcrumbs = useActiveDocumentClusterBreadcrumbs();

  return (
    <Flex
      width="100%"
      height="28px"
      css={`
        border-top: 1px solid ${props => props.theme.colors.primary.light};
      `}
      alignItems="center"
      justifyContent="space-between"
      px={2}
      overflow="hidden"
    >
      <Text
        color="text.secondary"
        fontSize="14px"
        css={`
          white-space: nowrap;
        `}
        title={clusterBreadcrumbs}
      >
        {clusterBreadcrumbs}
      </Text>
      <ButtonIcon
        setRef={shareButtonRef}
        title="Share feedback"
        size={0}
        onClick={() => setIsPopoverOpened(true)}
      >
        <ChatBubble fontSize="14px" />
      </ButtonIcon>
      <Popover
        open={isPopoverOpened}
        anchorEl={shareButtonRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setIsPopoverOpened(false)}
      >
        <ShareFeedback onClose={() => setIsPopoverOpened(false)} />
      </Popover>
    </Flex>
  );
}
