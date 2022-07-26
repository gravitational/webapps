/*
Copyright 2019 Gravitational, Inc.

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
import { Box } from 'design';
import ButtonSso, { guessProviderType } from 'shared/components/ButtonSso';

import * as types from 'teleterm/ui/services/clusters/types';

const SSOBtnList = ({ providers, prefixText, isDisabled, onClick }: Props) => {
  const $btns = providers.map((item, index) => {
    let { name, type, displayName } = item;
    const title = displayName || `${prefixText} ${name}`;
    const ssoType = guessProviderType(title, type as types.AuthProviderType);
    return (
      <ButtonSso
        key={index}
        title={title}
        ssoType={ssoType}
        disabled={isDisabled}
        mt={3}
        onClick={e => {
          e.preventDefault();
          onClick(item);
        }}
      />
    );
  });

  if ($btns.length === 0) {
    return <h4> You have no SSO providers configured </h4>;
  }

  return (
    <Box pt={2} mb={3}>
      {$btns}
    </Box>
  );
};

type Props = {
  prefixText: string;
  isDisabled: boolean;
  onClick(provider: types.AuthProvider): void;
  providers: types.AuthProvider[];
};

export default SSOBtnList;
