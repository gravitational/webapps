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
import { Text, Flex, ButtonPrimary } from 'design';
import * as Icons from 'design/Icon';
import { MenuIcon, MenuItem } from 'shared/components/MenuAction';
import { App } from 'teleport/services/apps';

export default function AppListCards({ apps, onView, canView = false }: Props) {
  apps = apps || [];
  const $apps = apps.map(app => {
    return (
      <AppListCard app={app} onView={onView} key={app.id} canView={canView} />
    );
  });

  return <Flex flexWrap="wrap">{$apps}</Flex>;
}

function AppListCard({ app, onView, canView }) {
  function handleOnLaunch() {
    // TODO
    window.open('', '_blank');
  }

  return (
    <Flex
      style={{
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)',
      }}
      width="240px"
      height="240px"
      borderRadius="3"
      flexDirection="column"
      bg="primary.light"
      p="5"
      mr="5"
    >
      {canView && (
        <MenuIcon buttonIconProps={menuActionProps}>
          <MenuItem onClick={() => onView(app)}>View Details</MenuItem>
        </MenuIcon>
      )}
      <Flex
        mb="3"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Icons.Cloud my="3" fontSize="48px" color="text.primary" />
        <Text typography="body2" bold caps mb="1">
          {app.name}
        </Text>
        <Text typography="body2" color="text.primary">
          {app.clusterId}
        </Text>
      </Flex>
      <ButtonPrimary mt="auto" size="medium" block onClick={handleOnLaunch}>
        Launch
      </ButtonPrimary>
    </Flex>
  );
}

const menuActionProps = {
  style: {
    right: '10px',
    position: 'absolute',
    top: '10px',
  },
};

type Props = {
  apps: App[];
  onView(id: string): void;
  canView?: boolean;
};
