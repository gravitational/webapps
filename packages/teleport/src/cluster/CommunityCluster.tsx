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
import styled from 'styled-components';
import { useAttempt } from 'shared/hooks';
import { Indicator } from 'design';
import { Failed } from 'design/CardError';
import { useParams, Redirect, Switch, Route } from 'teleport/components/Router';
import FeatureAudit from 'teleport/cluster/features/featureAudit';
import FeatureNodes from 'teleport/cluster/features/featureNodes';
import FeatureSessions from 'teleport/cluster/features/featureSessions';
import TeleportContext from 'teleport/teleportContext';
import TeleportContextProvider, {
  useTeleport,
} from 'teleport/teleportContextProvider';
import cfg from 'teleport/config';
import SideNav from './SideNav';
import TopBar, { InfoDialog } from './TopBar';

export default function CommunityCluster() {
  const { clusterId } = useParams();
  const [ctx] = React.useState(() => {
    const features = [
      new FeatureNodes(),
      new FeatureSessions(),
      new FeatureAudit(),
    ];
    return new TeleportContext({ clusterId, features });
  });

  return (
    <TeleportContextProvider value={ctx}>
      <Cluster />
    </TeleportContextProvider>
  );
}

export function Cluster() {
  const teleportCtx = useTeleport();
  const [attempt, attemptActions] = useAttempt({ isProcessing: true });
  const { isFailed, isSuccess, message } = attempt;
  const [viewClusterInfo, setViewClusterInfo] = React.useState(() => false);

  React.useEffect(() => {
    attemptActions.do(() => {
      return teleportCtx.init();
    });
  }, []);

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

  const handleViewClusterInfo = () => setViewClusterInfo(!viewClusterInfo);

  // render allowed features
  const allowed = teleportCtx.features.filter(f => !f.isDisabled());
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
    <HorizontalSplit>
      <TopBar onClickClusterInfo={handleViewClusterInfo} />
      <VerticalSplit>
        <SideNav />
        <Switch>
          <Redirect
            exact
            from={cfg.routes.cluster}
            to={cfg.routes.clusterNodes}
          />
          {$features}
        </Switch>
      </VerticalSplit>
      {viewClusterInfo && (
        <InfoDialog
          onClose={handleViewClusterInfo}
          {...teleportCtx.storeUser.state.cluster}
        />
      )}
    </HorizontalSplit>
  );
}

const VerticalSplit = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const HorizontalSplit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  min-width: 900px;
`;

const StyledIndicator = styled(HorizontalSplit)`
  align-items: center;
  justify-content: center;
`;
