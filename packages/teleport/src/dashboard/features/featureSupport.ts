/**
 * Copyright 2020 Gravitational, Inc.
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

import { FeatureBase } from 'teleport/components/withFeature';
import Ctx from 'teleport/teleportContext';
import cfg from 'teleport/config';
import Support from './../Support';

class FeatureSupport extends FeatureBase {
  Component = Support;

  getRoute() {
    return {
      title: 'Help & Support',
      path: cfg.routes.support,
      exact: true,
      component: this.Component,
    };
  }

  onload(context: Ctx) {
    context.storeNav.addTopItem({
      title: 'Help & Support',
      Icon: null,
      exact: true,
      to: cfg.routes.support,
    });
  }
}

export default FeatureSupport;
