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
import { addSideNavItem } from 'gravity/cluster/flux/nav/actions';
import * as Icons from 'design/Icon';
import Dashboard from '../components/Dashboard';

class DashboardFeature extends FeatureBase {
  constructor() {
    super();
    this.Component = withFeature(this)(Dashboard);
  }

  getRoute() {
    return {
      title: 'Dashboard',
      path: cfg.routes.siteBase,
      exact: true,
      component: this.Component,
    };
  }

  onload() {
    addSideNavItem({
      title: 'Dashboard',
      Icon: Icons.Tablet,
      exact: true,
      to: cfg.getSiteRoute(),
    });
  }
}

export default DashboardFeature;
