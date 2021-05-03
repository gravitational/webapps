/*
Copyright 2021 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { Indicator, Box } from 'design';
import { Danger } from 'design/Alert';
import useTeleport from 'teleport/useTeleport';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import DatabaseList from './DatabaseList';
import useDatabases, { Props } from './useDatabases';
import ButtonAdd from './ButtonAdd';
import AddDatabase from './AddDatabase/AddDatabase';

export default function Container() {
  const ctx = useTeleport();
  const data = useDatabases(ctx);
  return <Databases {...data} />;
}

export function Databases(props: Props) {
  const {
    databases,
    attempt,
    isLeafCluster,
    isEnterprise,
    canCreate,
    showAddDatabase,
    hideAddDatabase,
    isAddDatabaseVisible,
  } = props;

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center" justifyContent="space-between">
        <FeatureHeaderTitle>Databases</FeatureHeaderTitle>
        <ButtonAdd
          isLeafCluster={isLeafCluster}
          isEnterprise={isEnterprise}
          canCreate={canCreate}
          onClick={showAddDatabase}
        />
      </FeatureHeader>
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status === 'failed' && <Danger>{attempt.statusText}</Danger>}
      {attempt.status === 'success' && <DatabaseList databases={databases} />}
      {isAddDatabaseVisible && <AddDatabase onClose={hideAddDatabase} />}
    </FeatureBox>
  );
}
