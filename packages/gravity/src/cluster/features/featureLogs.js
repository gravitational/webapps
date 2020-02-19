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

import cfg from 'gravity/config';
import withFeature, { FeatureBase } from 'gravity/components/withFeature';
import * as Icons from 'design/Icon';
import Logs from './../components/Logs';
import { addSideNavItem } from 'gravity/cluster/flux/nav/actions';

class FeatureLogs extends FeatureBase {
  constructor() {
    super();
    this.Component = withFeature(this)(Logs);
  }

  getRoute() {
    return {
      title: 'Logs',
      path: cfg.routes.siteLogs,
      exact: true,
      component: this.Component,
    };
  }

  onload({ featureFlags }) {
    if (!featureFlags.siteLogs()) {
      this.setDisabled();
      return;
    }

    addSideNavItem({
      title: 'Logs',
      Icon: Icons.Code,
      to: cfg.getSiteLogsRoute(),
    });
  }
}

export default FeatureLogs;
