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

import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Box, ButtonIcon, Flex, Text } from 'design';
import { CircleCheck, Cross, Warning } from 'design/Icon';

import { TransferredFile } from '../types';

type FileListItemProps = {
  file: TransferredFile;
  onStart(id: string): void;
  onCancel(id: string): void;
};

export function FileListItem(props: FileListItemProps) {
  const { name, transferState, id } = props.file;

  useEffect(() => {
    props.onStart(id);

    return () => props.onCancel(id);
  }, [props.onStart, props.onCancel]);

  return (
    <Li>
      <Box>
        <Flex justifyContent="space-between" alignItems="baseline">
          <Flex alignItems="baseline">
            <Text
              mb={1}
              typography="body2"
              css={`
                word-break: break-word;
              `}
            >
              {name}
            </Text>
            {transferState.type === 'completed' && (
              <CircleCheck
                ml={2}
                fontSize="14px"
                color="progressBarColor"
                title="Transfer completed"
              />
            )}
          </Flex>
          {transferState.type === 'processing' && (
            <ButtonIcon
              title="Cancel"
              size={0}
              onClick={() => props.onCancel(id)}
            >
              <Cross />
            </ButtonIcon>
          )}
        </Flex>
        {(transferState.type === 'processing' ||
          transferState.type === 'error') && (
          <Flex alignItems="baseline">
            <ProgressPercentage mr={1}>
              {transferState.progress}%
            </ProgressPercentage>
            <ProgressBackground>
              <ProgressIndicator
                progress={transferState.progress}
                isFailure={transferState.type === 'error'}
              />
            </ProgressBackground>
          </Flex>
        )}
      </Box>
      {transferState.type === 'error' && (
        <Error>{transferState.error.message}</Error>
      )}
    </Li>
  );
}

const Error: FC = props => {
  return (
    <Text color="error.light" typography="body2" mt={1}>
      <Warning mr={1} color="inherit" />
      {props.children}
    </Text>
  );
};

const ProgressPercentage = styled(Text)`
  line-height: 14px;
  width: 36px;
`;

const Li = styled.li`
  list-style: none;
  margin-top: ${props => props.theme.space[3]}px;
  font-size: ${props => props.theme.fontSizes[1]}px;
`;

const ProgressBackground = styled.div`
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
`;

const ProgressIndicator = styled.div`
  border-radius: 50px;
  background: ${props =>
    props.isFailure
      ? props.theme.colors.disabled
      : props.theme.colors.progressBarColor};

  height: 8px;
  width: ${props => props.progress}%;
`;