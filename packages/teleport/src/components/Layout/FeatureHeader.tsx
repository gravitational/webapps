import React from 'react';
import styled from 'styled-components';
import Flex from 'design/Flex';
import Box from 'design/Box';
import { Info } from 'design/Icon';
import { Danger } from 'design/Alert';
import Text from 'design/Text';
import Link from 'design/Link';

export default function Container(props: Props) {
  // reads context alerts and append to props.errMessages
  <FeatureHeader {...props} />;
}

const Message = styled(Danger)`
  box-shadow: 0 1px 4px rgb(0 0 0 / 50%);
`;

const HeaderMessage = ({ messages }: { messages: ErrorMessage[] }) => {
  const lastMessageStyle = {
    borderRadius: '0 0 6px 6px',
  };
  return (
    <React.Fragment>
      {messages.map((msg: ErrorMessage, index: number) => (
        <Message
          key={msg.text}
          display="flex"
          style={index === messages.length - 1 ? lastMessageStyle : {}}
          mb="0"
        >
          <Flex width="100%" justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Info mr={2} fontSize="3" />
              <Text bold>{msg.text}</Text>
            </Flex>
            {msg.dismissable && (
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
            )}
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

export type ErrorMessage = {
  text: string;
  dismissable: boolean;
  onDismiss?: () => void;
};

type Props = {
  errMessages?: ErrorMessage;
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
      <HeaderMessage messages={errMessages} />
    </Box>
  );
};

FeatureHeader.defaultProps = {
  alignItems: 'center',
  mb: 4,
};

export { FeatureHeader };
