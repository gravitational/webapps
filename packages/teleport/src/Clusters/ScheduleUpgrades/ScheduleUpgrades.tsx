import React from 'react';
import { ButtonPrimary, ButtonSecondary } from 'design/Button';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'design/Dialog';
import Select, { Option } from 'shared/components/Select';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { UpgradeWindow } from 'teleport/services/upgradeWindow/upgradeWindow';
import Text from 'design/Text';
import Alert from 'design/Alert';

export function ScheduleUpgrades({
  onClose,
  onSave,
  upgradeWindows,
  selectedWindow,
  onSelectedWindowChange,
  attempt,
}: Props) {
  const options = upgradeWindows.map((window: UpgradeWindow) => ({
    label: makeLabel(window),
    value: window,
  }));

  const handleChange = (selected: Option<any>) =>
    onSelectedWindowChange(selected.value);

  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle mr="auto">Select a time for upgrade</DialogTitle>
      <DialogContent minWidth="500px" flex="0 0 auto">
        <Text my={2}>Select the start time for the upgrade window</Text>
        {attempt.status === 'failed' && (
          <Alert kind="danger" children={attempt.statusText} />
        )}
        <Select
          onChange={handleChange}
          menuPosition="fixed"
          options={options}
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
          onClick={onClose}
          disabled={attempt.status === 'processing'}
        >
          Close
        </ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

export const makeLabel = (window: UpgradeWindow): string => {
  return `UTC - ${window}`;
};

export type Props = {
  onClose: () => void;
  onSave: (window: UpgradeWindow) => any;
  upgradeWindows: string[];
  selectedWindow: UpgradeWindow;
  onSelectedWindowChange: (string) => void;
  attempt: Attempt;
};
