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

import React, { useState } from 'react';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { Indicator, Box, Flex } from 'design';
import InputSearch from 'teleport/components/InputSearch';
import DatabaseList from 'teleport/components/DatabaseList';

export function Databases(props) {
  const { databases } = props;

  const [searchValue, setSearchValue] = useState('');

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center" justifyContent="space-between">
        <FeatureHeaderTitle>Databases</FeatureHeaderTitle>
      </FeatureHeader>
      <Flex
        mb={4}
        alignItems="center"
        flex="0 0 auto"
        justifyContent="space-between"
      >
        <InputSearch
          mr="3"
          onChange={e => {
            setSearchValue(e);
          }}
        />
      </Flex>
      <DatabaseList databases={databases} searchValue={searchValue} />
    </FeatureBox>
  );
}
