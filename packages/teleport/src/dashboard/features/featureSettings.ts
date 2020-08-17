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

import Settings from 'teleport/dashboard/Settings';
import getCommunityFeatures from 'teleport/dashboard/Settings/features/getFeatures';
import { FeatureBase } from 'teleport/components/withFeature';
import Ctx from 'teleport/teleportContext';
import cfg from 'teleport/config';

class FeatureSettings extends FeatureBase {
  Component = Settings;

  getRoute() {
    return {
      title: 'Settings',
      path: cfg.routes.settings,
      exact: false,
      component: this.Component,
    };
  }

  getFeatures(ctx: Ctx) {
    return getCommunityFeatures(ctx);
  }

  onload(ctx: Ctx) {
    if (this.getFeatures(ctx).length === 0) {
      this.setDisabled();
      return;
    }

    ctx.storeNav.addTopItem({
      title: 'Settings',
      Icon: null,
      exact: false,
      to: cfg.routes.settings,
    });
  }
}

export default FeatureSettings;
