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
import {
  Indicator,
  Text,
  Box,
  Flex,
  ButtonPrimary,
  ButtonSecondary,
} from 'design';
import Card from 'design/Card';
import Image from 'design/Image';
import AppListCards from './AppListCards';
import useApps from './useApps';

const aapPng = require('./application.png');

export default function Container() {
  const state = useApps();
  return <Apps {...state} />;
}

/**
 * Apps is a view component that based on permissions:
 * - Displays list of running apps
 * - Allows user to view details of an app
 */
export function Apps({ attempt, apps }: Props) {
  const isEmpty = attempt.status === 'success' && apps.length === 0;
  const hasApps = attempt.status === 'success' && !isEmpty;

  function onClickDoc() {
    window.open('https://gravitational.com/teleport/docs/', '_blank');
  }

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle>Applications</FeatureHeaderTitle>
        {hasApps && (
          <ButtonSecondary onClick={onClickDoc} ml="auto" width="240px">
            View Documentation
          </ButtonSecondary>
        )}
      </FeatureHeader>
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status === 'failed' && <Danger>{attempt.statusText} </Danger>}
      {isEmpty && <Empty onClick={onClickDoc} />}
      {hasApps && <AppListCards apps={apps} />}
    </FeatureBox>
  );
}

const Empty = ({ onClick }) => {
  return (
    <Card maxWidth="700px" my={4} mx="auto" p={5} as={Flex} alignItems="center">
      <Box width={4 / 10}>
        <Image src={aapPng.default} width={'100%'} />
      </Box>
      <Box width={6 / 10} ml={5}>
        <Box mb={6}>
          <Text typography="h6" mb={3} caps>
            Secure Your First Application
          </Text>
          <Text typography="subtitle1" mb={3}>
            Teleport Application Access provides secure access to internal
            applications without the need for a VPN, but with the full control
            and audibility of Teleport.
          </Text>
        </Box>
        <ButtonPrimary onClick={onClick} width="240px">
          View Quickstart Guide
        </ButtonPrimary>
      </Box>
    </Card>
  );
};

type Props = ReturnType<typeof useApps>;
