/**
 * Copyright 2023 Gravitational, Inc.
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

import { UsageService } from 'teleterm/ui/services/usage';
import { ModalsService } from 'teleterm/ui/services/modals';
import { StatePersistenceService } from 'teleterm/ui/services/statePersistence';
import { ConfigService } from 'teleterm/services/config';

export async function askAboutUserJobRoleIfNeeded(
  statePersistenceService: StatePersistenceService,
  configService: ConfigService,
  modalsService: ModalsService,
  usageService: UsageService
): Promise<void> {
  const { askedAboutJobRole } =
    statePersistenceService.getUsageReportingState();

  if (askedAboutJobRole || !configService.get('usageMetrics.enabled').value) {
    return;
  }

  await showUserJobRoleDialog(modalsService, usageService);
  statePersistenceService.saveUsageReportingState({
    askedAboutJobRole: true,
  });
}

function showUserJobRoleDialog(
  modalsService: ModalsService,
  usageService: UsageService
): Promise<void> {
  return new Promise(resolve => {
    modalsService.openRegularDialog({
      kind: 'user-job-role',
      onSend(jobRole) {
        usageService.captureUserJobRoleUpdate(jobRole);
        resolve();
      },
      onCancel() {
        resolve();
      },
    });
  });
}
