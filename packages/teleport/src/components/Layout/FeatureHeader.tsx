/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from 'styled-components';
import Flex from 'design/Flex';
import Box from 'design/Box';
import { Info } from 'design/Icon';
import { Danger } from 'design/Alert';
import Text from 'design/Text';
import Link from 'design/Link';
import { NotificationContext } from 'teleport/NotificationContext';

export type Props = {
  errMessages: ErrorMessage[];
} & typeof Flex;

export default function Container(props: Props) {
  // read messages from context
  const ctx = React.useContext(NotificationContext);
  const ctxMessages = ctx?.notifications?.map((msg, index) => ({
    text: msg,
    onDismiss: () => ctx.removeNotification(index),
  }));

  return <FeatureHeader {...props} errMessages={ctxMessages} />;
}

export const FeatureHeader = ({
  children,
  errMessages,
  mb,
  ...props
}: Props) => {
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
