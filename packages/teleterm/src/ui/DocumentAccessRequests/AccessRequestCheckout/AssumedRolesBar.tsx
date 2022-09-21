import React, { useRef } from 'react';
import { Box, Flex, Text, ButtonPrimary } from 'design';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { pluralize } from 'teleport/lib/util';
import useAssumedRolesBar from './useAssumedRolesBar';
import { AccessRequest } from 'e-teleport/services/workflow';

export default function Container({ role }: { role: AccessRequest }) {
  const state = useAssumedRolesBar(role);
  return <AssumeRolesBar {...state} />;
}

export function AssumeRolesBar({
  time,
  assumedRoles,
  switchBack,
}: AssumedRolesBarState) {
  const durationTxt = getDurationText(time.hours, time.minutes, time.seconds);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Box px={3} py={2} bg="accent" border={1} borderColor="primary.dark">
      <Flex justifyContent="space-between" alignItems="center">
        <Text typography="body" color="light" bold>
          {assumedRoles} assumed, expires in {durationTxt}
        </Text>
        <ButtonPrimary setRef={ref} onClick={switchBack}>
          Switch Back
        </ButtonPrimary>
      </Flex>
    </Box>
  );
}

function getDurationText(hrs: number, mins: number, secs: number) {
  if (!hrs && !mins) {
    return `${secs} secs`;
  }

  const hrText = pluralize(hrs, 'hr');
  const minText = pluralize(mins, 'min');

  if (!hrs) {
    return `${mins} ${minText}`;
  }

  if (hrs && !mins) {
    return `${hrs} ${hrText}`;
  }

  return `${hrs} ${hrText} and ${mins} ${minText}`;
}

type Props = {
  assumedRoles: string[];
  attempt: Attempt;
  onSwitchBack: () => void;
};

type AssumedRolesBarState = ReturnType<typeof useAssumedRolesBar>;
