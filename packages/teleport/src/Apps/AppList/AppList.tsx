/**
 * Copyright 2020 Gravitational, Inc.
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
import { Text, Flex } from 'design';
import { App } from 'teleport/services/apps';
import { NewTab } from 'design/Icon';

export default function AppList({ apps = [] }: Props) {
  const $apps = apps.map(app => <Item app={app} key={app.id} />);
  return <Flex flexWrap="wrap">{$apps}</Flex>;
}

function Item({ app }) {
  return (
    <StyledAppListItem
      as="a"
      href={app.addr}
      target="_blank"
      width="240px"
      borderRadius="3"
      flexDirection="column"
      bg="primary.light"
      px="4"
      py="5"
      mr="5"
      mb="5"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        color="text.primary"
      >
        <NewTab fontSize="62px" mb="3" />
        <Text bold mb="2" style={{ textTransform: 'capitalize' }}>
          {app.name}
        </Text>
        <Text typography="body2">Cluster: {app.clusterId}</Text>
      </Flex>
    </StyledAppListItem>
  );
}

const StyledAppListItem = styled(Flex)`
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: box-shadow 0.1s;
  text-decoration: none;
  :hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
`;

type Props = {
  apps: App[];
};
