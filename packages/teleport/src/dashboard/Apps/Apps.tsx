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
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { Danger } from 'design/Alert';
import { Indicator, Text, Box, Flex, ButtonPrimary } from 'design';
import Card from 'design/Card';
import Image from 'design/Image';
import { useTeleport } from 'teleport/teleportContextProvider';
import AppViewDetails from './AppViewDetails';
import AppListCards from './AppListCards';
import useApps from './useApps';

// TODO replace sample image
const samplePNG = require('design/assets/images/trusted-cluster.png');

export default function Container() {
  const state = useApps();
  return <Apps {...state} />;
}

/**
 * Apps is a view component that based on permissions:
 * - Displays list of running apps
 * - Allows user to view details of an app
 */
export function Apps({
  attempt,
  apps,
  app,
  isViewing,
  onView,
  onClose,
}: Props) {
  const ctx = useTeleport();
  const canView = ctx.storeUser.getAppAccess().read;
  const isEmpty = attempt.status === 'success' && apps.length === 0;
  const hasApps = attempt.status === 'success' && !isEmpty;

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle>Apps</FeatureHeaderTitle>
      </FeatureHeader>
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status === 'failed' && <Danger>{attempt.statusText} </Danger>}
      {isEmpty && <Empty />}
      {hasApps && (
        <AppListCards apps={apps} onView={onView} canView={canView} />
      )}
      {isViewing && <AppViewDetails app={app} onClose={onClose} />}
    </FeatureBox>
  );
}

// TODO replace placeholder texts/links with actual
const Empty = () => {
  return (
    <Card
      maxWidth="700px"
      my={4}
      mx="auto"
      py={4}
      as={Flex}
      alignItems="center"
    >
      <Box width={4 / 10}>
        <Image src={samplePNG.default} width={'100%'} />
      </Box>
      <Box width={6 / 10}>
        <Box pr={4} mb={6}>
          <Text typography="h6" mb={3}>
            Add Your First Application
          </Text>
          <Text typography="subtitle1" mb={3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Box>
        <ButtonPrimary
          onClick={() =>
            window.open('https://gravitational.com/teleport/docs/', '_blank')
          }
          width="240px"
        >
          Add Application
        </ButtonPrimary>
      </Box>
    </Card>
  );
};

type Props = ReturnType<typeof useApps>;
