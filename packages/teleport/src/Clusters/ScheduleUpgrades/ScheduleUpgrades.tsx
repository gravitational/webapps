import React from 'react';
import { ButtonPrimary, ButtonSecondary } from 'design/Button';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from 'design/Dialog';
import Select, { Option } from 'shared/components/Select';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { UpgradeWindowStart } from 'teleport/services/upgradeWindow/upgradeWindow';
import Text from 'design/Text';
import Alert from 'design/Alert';

export function ScheduleUpgrades({
  onClose,
  onSave,
  upgradeWindowOptions,
  selectedWindow,
  onSelectedWindowChange,
  attempt,
}: Props) {
  const options =
    attempt.status === 'processing'
      ? []
      : upgradeWindowOptions.map((window: UpgradeWindowStart) => ({
          label: makeLabel(window),
          value: window,
        }));

  const handleChange = (selected: Option<any>) =>
    onSelectedWindowChange(selected.value);

  return (
    <Dialog
      onClose={onClose}
      open={true}
      dialogCss={() => ({ maxWidth: '600px' })}
    >
      <DialogTitle mr="auto">Select a maintenance start window</DialogTitle>
      <DialogContent minWidth="500px" flex="0 0 auto">
        <Text my={2}>
          Teleport provides different cluster maintenance windows to minimize
          downtime during upgrades, patches, etc.
        </Text>
        {attempt.status === 'failed' && (
          <Alert kind="danger" children={attempt.statusText} />
        )}
        <Select
          onChange={handleChange}
          menuPosition="fixed"
          options={options}
          value={
            attempt.status === 'processing'
              ? {
                  label: 'Processing...',
                  value: null,
                }
              : { value: selectedWindow, label: makeLabel(selectedWindow) }
          }
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

export const makeLabel = (window: UpgradeWindowStart): string => {
  return `UTC - ${window}`;
};

export type Props = {
  onClose: () => void;
  onSave: (window: UpgradeWindowStart) => any;
  upgradeWindowOptions: string[];
  selectedWindow: UpgradeWindowStart;
  onSelectedWindowChange: (string) => void;
  attempt: Attempt;
};
