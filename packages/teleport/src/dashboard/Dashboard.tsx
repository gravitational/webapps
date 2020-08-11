/*
Copyright 2019-2020 Gravitational, Inc.

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
import styled from 'styled-components';
import TeleportContextProvider, {
  useTeleport,
} from 'teleport/teleportContextProvider';
import TeleportContext from 'teleport/teleportContext';
import FeatureClusters from 'teleport/dashboard/features/featureClusters';
import FeatureSupport from './features/featureSupport';
import FeatureSettings from './features/featureSettings';
import { Indicator } from 'design';
import { Failed } from 'design/CardError';
import { useAttempt } from 'shared/hooks';
import { Switch, Route } from 'teleport/components/Router';
import * as Layout from './components/Layout';
import TopBar from './components/TopBar';

export default function CommunityDashboard() {
  const [ctx] = React.useState(() => {
    const features = [
      new FeatureClusters(),
      new FeatureSettings(),
      new FeatureSupport(),
    ];
    return new TeleportContext({ features });
  });

  return (
    <TeleportContextProvider value={ctx}>
      <Dashboard />
    </TeleportContextProvider>
  );
}

export function Dashboard() {
  const teleCtx = useTeleport();
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const { isFailed, isSuccess, message } = attempt;

  React.useState(() => {
    attemptActions.do(() => {
      return teleCtx.init();
    });
  });

  if (isFailed) {
    return <Failed message={message} />;
  }

  if (!isSuccess) {
    return (
      <StyledIndicator>
        <Indicator />
      </StyledIndicator>
    );
  }

  // render allowed features
  const allowed = teleCtx.features.filter(f => !f.isDisabled());
  const $features = allowed.map((item, index) => {
    const { path, title, exact, component } = item.getRoute();
    return (
      <Route
        title={title}
        key={index}
        path={path}
        exact={exact}
        component={component}
      />
    );
  });

  return (
    <StyledLayout>
      <TopBar />
      <Switch>{$features}</Switch>
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const StyledIndicator = styled(Layout.AppVerticalSplit)`
  align-items: center;
  justify-content: center;
`;
