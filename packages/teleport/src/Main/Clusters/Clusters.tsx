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
import { FeatureBox, FeatureHeader } from 'teleport/components/Layout';
import LeafClusters from './LeafClusters';
import TrustedClusters from './TrustedClusters';
import Tabs, { TabItem } from './Tabs';
import cfg from 'teleport/config';
import { Switch, Route } from 'teleport/components/Router';

export default function Clusters() {
  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <Tabs>
          <TabItem to={cfg.routes.clusters} title="Joined Clusters" />
          {cfg.isEnterprise && (
            <TabItem to={cfg.routes.trustedClusters} title="Trusted" />
          )}
        </Tabs>
      </FeatureHeader>
      <Switch>
        <Route
          title="Managed Clusters"
          path={cfg.routes.clusters}
          exact={true}
          component={LeafClusters}
        />
        {cfg.isEnterprise && (
          <Route
            title="Managed Clusters"
            path={cfg.routes.trustedClusters}
            exact={true}
            component={TrustedClusters}
          />
        )}
      </Switch>
    </FeatureBox>
  );
}
