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
import { ButtonPrimary, ButtonSecondary } from 'design/Button';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'design/Dialog';
import Select, { Option } from 'shared/components/Select';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { UpgradeWindowStart } from 'teleport/services/upgradeWindow/upgradeWindow';
import Text from 'design/Text';
import Alert from 'design/Alert';

const availableUpgradeWindowStarts: UpgradeWindowStart[] = [
  '08:00:00',
  '16:00:00',
  '23:00:00',
];

export const makeLabel = (window: UpgradeWindowStart): string => {
  return `${window} (UTC)`;
};

const upgradeWindowOptions: Option<any>[] = availableUpgradeWindowStarts.map(
  (window: UpgradeWindowStart) => ({
    label: makeLabel(window),
    value: window,
  })
);

export function ScheduleUpgrades({
  onCancel,
  onSave,
  selectedWindow,
  onSelectedWindowChange,
  attempt,
}: Props) {
  const options = attempt.status === 'processing' ? [] : upgradeWindowOptions;

  const handleChange = (selected: Option<any>) =>
    onSelectedWindowChange(selected.value);

  return (
    <Dialog
      onCancel={onCancel}
      open={true}
      dialogCss={() => ({ maxWidth: '600px' })}
    >
      <DialogHeader>
        <DialogTitle>Select a maintenance start window</DialogTitle>
      </DialogHeader>
      {attempt.status === 'failed' && (
        <Alert kind="danger" children={attempt.statusText} />
      )}
      <DialogContent minWidth="500px" flex="0 0 auto">
        <Text mb={2}>
          Teleport provides different cluster maintenance windows to minimize
          downtime during upgrades, patches, etc.
        </Text>
        <Select
          onChange={handleChange}
          menuPosition="fixed"
          options={options}
          isDisabled={attempt.status === 'processing'}
          value={{ value: selectedWindow, label: makeLabel(selectedWindow) }}
        ></Select>
      </DialogContent>
      <DialogFooter>
        <ButtonPrimary
          mr="3"
          onClick={onSave}
          disabled={attempt.status === 'processing'}
        >
          Save
        </ButtonPrimary>
        <ButtonSecondary
          onClick={onCancel}
          disabled={attempt.status === 'processing'}
        >
          Cancel
        </ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

export type Props = {
  onCancel: () => void;
  onSave: (window: UpgradeWindowStart) => any;
  selectedWindow: UpgradeWindowStart;
  onSelectedWindowChange: (string) => void;
  attempt: Attempt;
};
