/*
Copyright 2020 Gravitational, Inc.

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

import { useState } from 'react';
import Ctx from 'teleport/teleportContext';
import useAttempt from 'shared/hooks/useAttemptNext';
import cfg from 'teleport/config';
import type { UpgradeWindow } from 'teleport/services/upgradeWindow';

export default function useUpgradeWindows(ctx: Ctx) {
  const { attempt, run } = useAttempt();

  const canScheduleUpgrades = cfg.isCloud;

  const [scheduleUpgradesVisible, setScheduleUpgradesVisible] = useState(false);
  const upgradeWindows = cfg.scheduledUpgradeWindows;
  const [selectedUpgradeWindow, setSelectedUpgradeWindow] =
    useState<UpgradeWindow>(upgradeWindows[0] as UpgradeWindow); // TODO read from cluster infos

  function showScheduleUpgrade() {
    setScheduleUpgradesVisible(true);
  }

  function hideScheduleUpgrade() {
    setScheduleUpgradesVisible(false);
  }

  function onUpdate() {
    return run(() =>
      ctx.upgradeWindowService.updateWindow(selectedUpgradeWindow)
    ).then(() => hideScheduleUpgrade());
  }

  return {
    canScheduleUpgrades,
    scheduleUpgradesVisible,
    showScheduleUpgrade,
    hideScheduleUpgrade,
    upgradeWindows,
    selectedUpgradeWindow,
    setSelectedUpgradeWindow,
    onUpdate,
    attempt,
  };
}
