import React from 'react';
import styled from 'styled-components';
import Flex from 'design/Flex';
import Box from 'design/Box';
import { Info } from 'design/Icon';
import { Danger } from 'design/Alert';
import Text from 'design/Text';
import Link from 'design/Link';
import { NotificationContext } from 'teleport/NotificationContext';

// FeatureHeader reads from NotificationContext and displays it below the title
export default function Container(props: Props & typeof Flex) {
  const ctx = React.useContext(NotificationContext);
  const ctxMessages = ctx?.notifications?.map((msg, index) => ({
    text: msg,
    onDismiss: () => ctx.removeNotification(index),
  }));

  return <FeatureHeader {...props} errMessages={ctxMessages} />;
}

type Props = {
  children?: React.ReactNode | undefined;
};

const FeatureHeader = ({
  children,
  errMessages,
  mb,
  ...props
}: Props & typeof Flex) => {
  return (
    <Box mb={mb}>
      <StyledFeatureHeader {...props}>{children}</StyledFeatureHeader>
      <HeaderWarnings errMessages={errMessages} />
    </Box>
  );
};

FeatureHeader.defaultProps = {
  alignItems: 'center',
  mb: 4,
};

export type ErrorMessage = {
  text: string;
  onDismiss?: () => void;
};

type HeaderWarningsProps = { errMessages?: ErrorMessage[] };

const HeaderWarnings = ({ errMessages }: HeaderWarningsProps) => {
  const lastMessageStyle = {
    borderRadius: '0 0 6px 6px',
  };
  return (
    <React.Fragment>
      {errMessages?.map((msg: ErrorMessage, index: number) => (
        <Message
          key={msg.text}
          display="flex"
          style={index === errMessages.length - 1 ? lastMessageStyle : {}}
          mb="0"
        >
          <Flex width="100%" justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Info mr={2} fontSize="3" />
              <Text bold>{msg.text}</Text>
            </Flex>
            <Link
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                minWidth: '44px',
              }}
              onClick={msg.onDismiss}
            >
              Dismiss
            </Link>
          </Flex>
        </Message>
      ))}
    </React.Fragment>
  );
};

const StyledFeatureHeader = styled(Flex)`
  flex-shrink: 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary.main};
  height: 56px;
  margin-left: -40px;
  margin-right: -40px;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
`;

const Message = styled(Danger)`
  box-shadow: 0 1px 4px rgb(0 0 0 / 50%);
`;
