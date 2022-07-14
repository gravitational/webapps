/*
Copyright 2022 Gravitational, Inc.

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

import cfg from 'e-teleport/config';
import api from '../api';

export type UpgradeWindowStart = '08:00:00' | '16:00:00' | '23:00:00';

const service = {
  getUpgradeWindowStart(): Promise<UpgradeWindowStart> {
    return api
      .get(cfg.api.upgradeWindowStartPath)
      .then(res => res.upgrade_window_start);
  },

  updateUpgradeWindowStart(
    windowStart: UpgradeWindowStart
  ): Promise<UpgradeWindowStart> {
    return api
      .post(cfg.api.upgradeWindowStartPath, {
        upgrade_window_start: windowStart,
      })
      .then(res => res.windowStart);
  },
};

export default service;