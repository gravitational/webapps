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
import { BannerList } from 'teleport/components/BannerList';
import cfg from 'teleport/config';

import { LINK_LABEL } from 'teleport/services/alerts/alerts';
import { Sidebar } from 'teleport/Discover/Sidebar/Sidebar';

import { SelectResource } from 'teleport/Discover/SelectResource';

import { findViewAtIndex } from './flow';

import { useDiscover } from './useDiscover';

import type { BannerType } from 'teleport/components/BannerList/BannerList';

export function Discover() {
  const [features] = useState(() => getFeatures());
  const ctx = useTeleport();

  const {
    alerts,
    initAttempt,
    customBanners,
    dismissAlert,
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

  // The backend defines the severity as an integer value with the current
  // pre-defined values: LOW: 0; MEDIUM: 5; HIGH: 10
  const mapSeverity = (severity: number) => {
    if (severity < 5) {
      return 'info';
    }
    if (severity < 10) {
      return 'warning';
    }
    return 'danger';
  };

  const banners: BannerType[] = alerts.map(alert => ({
    message: alert.spec.message,
    severity: mapSeverity(alert.spec.severity),
    link: alert.metadata.labels[LINK_LABEL],
    id: alert.metadata.name,
  }));

  return (
    <BannerList
      banners={banners}
      customBanners={customBanners}
      onBannerDismiss={dismissAlert}
    >
      <MainContainer>
        <Prompt
          message={nextLocation => {
            if (nextLocation.pathname === cfg.routes.discover) return true;
            return 'Are you sure you want to exit the “Add New Resource” workflow? You’ll have to start from the beginning next time.';
          }}
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
              <main.ContentMinWidth>
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
                <FeatureBox pt={4} maxWidth="1450px">
                  {content}
                </FeatureBox>
              </main.ContentMinWidth>
            </main.HorizontalSplit>
          </>
        )}
      </MainContainer>
    </BannerList>
  );
}

const MainContainer = styled(main.MainContainer)`
  --sidebar-width: 280px;
`;
