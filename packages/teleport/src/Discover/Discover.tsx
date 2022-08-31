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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Indicator, Text } from 'design';
import { Danger } from 'design/Alert';

import { Prompt } from 'react-router-dom';

import useTeleport from 'teleport/useTeleport';
import getFeatures from 'teleport/features';
import { UserMenuNav } from 'teleport/components/UserMenuNav';
import * as main from 'teleport/Main';
import { TopBarContainer } from 'teleport/TopBar';
import { FeatureBox } from 'teleport/components/Layout';

import { Sidebar } from 'teleport/Discover/Sidebar/Sidebar';

import { SelectResource } from 'teleport/Discover/SelectResource';

import { findViewAtIndex } from './flow';

import { useDiscover } from './useDiscover';

export function Discover() {
  const [features] = useState(() => getFeatures());
  const ctx = useTeleport();

  const {
    initAttempt,
    userMenuItems,
    username,
    currentStep,
    selectedResourceKind,
    onSelectResource,
    logout,
    views,
    ...agentProps
  } = useDiscover(ctx, features);

  let content;
  // we reserve step 0 for "Select Resource Type", that is present in all resource configs
  if (currentStep > 0) {
    const view = findViewAtIndex(views, currentStep);

    const Component = view.component;
    content = <Component {...agentProps} />;
  } else {
    content = (
      <SelectResource
        selectedResourceKind={selectedResourceKind}
        onSelect={kind => onSelectResource(kind)}
        onNext={() => agentProps.nextStep()}
      />
    );
  }

  return (
    <MainContainer>
      <Prompt
        message="Are you sure you want to exit the “Add New Resource” workflow? You’ll have to start from the beginning next time."
        when={currentStep > 0}
      />
      {initAttempt.status === 'processing' && (
        <main.StyledIndicator>
          <Indicator />
        </main.StyledIndicator>
      )}
      {initAttempt.status === 'failed' && (
        <Danger>{initAttempt.statusText}</Danger>
      )}
      {initAttempt.status === 'success' && (
        <>
          <Sidebar
            views={views}
            currentStep={currentStep}
            selectedResourceKind={selectedResourceKind}
          />
          <main.HorizontalSplit>
            <TopBarContainer>
              <Text typography="h5" bold>
                Manage Access
              </Text>
              <UserMenuNav
                navItems={userMenuItems}
                logout={logout}
                username={username}
              />
            </TopBarContainer>
            <FeatureBox pt={4}>{content}</FeatureBox>
          </main.HorizontalSplit>
        </>
      )}
    </MainContainer>
  );
}

// TODO (lisa) we should look into reducing this width.
// Any smaller than this will produce a double stacked horizontal scrollbar
// making navigation harder.
//
// Our SelectResource component is the widest and can use some space
// tightening. Also look into shrinking the side nav if possible.
const MainContainer = styled(main.MainContainer)`
  min-width: 1460px;
`;
