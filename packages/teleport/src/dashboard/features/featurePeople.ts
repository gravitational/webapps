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

import People from 'teleport/dashboard/People';
import { FeatureBase } from 'teleport/components/withFeature';
import Ctx from 'teleport/teleportContext';
import cfg from 'teleport/config';
import getFeatures from 'teleport/dashboard/People/features/getFeatures';

class FeaturePeople extends FeatureBase {
  Component = People;

  getRoute() {
    return {
      title: 'People',
      path: cfg.routes.people,
      exact: false,
      component: this.Component,
    };
  }

  onload(ctx: Ctx) {
    if (getFeatures(ctx).length === 0) {
      this.setDisabled();
      return;
    }

    ctx.storeNav.addTopItem({
      title: 'People',
      exact: false,
      Icon: null,
      to: cfg.routes.people,
    });
  }
}

export default FeaturePeople;
