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

import { useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import Ctx from 'teleport/teleportContext';
import type { UpgradeWindowStart } from 'teleport/services/upgradeWindow';

export function useUpgradeWindowStart(ctx: Ctx) {
  const { attempt, run } = useAttempt();

  const [scheduleUpgradesVisible, setScheduleUpgradesVisible] = useState(false);
  const [selectedUpgradeWindowStart, setSelectedUpgradeWindowStart] =
    useState<UpgradeWindowStart>();

  useEffect(() => {
    run(() =>
      ctx.upgradeWindowService
        .getUpgradeWindowStart()
        .then(setSelectedUpgradeWindowStart)
    );
  }, []);

  function showScheduleUpgrade() {
    setScheduleUpgradesVisible(true);
  }

  function closeScheduleUpgrade() {
    setScheduleUpgradesVisible(false);
  }

  function onUpdate() {
    return run(() =>
      ctx.upgradeWindowService
        .updateUpgradeWindowStart(selectedUpgradeWindowStart)
        .then(() => closeScheduleUpgrade())
    );
  }

  return {
    scheduleUpgradesVisible,
    showScheduleUpgrade,
    closeScheduleUpgrade,
    selectedUpgradeWindowStart,
    setSelectedUpgradeWindowStart,
    onUpdate,
    attempt,
  };
}
