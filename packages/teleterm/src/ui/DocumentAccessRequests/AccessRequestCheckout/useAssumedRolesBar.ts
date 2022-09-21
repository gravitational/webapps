import { useState, useEffect } from 'react';
import { access } from 'original-fs';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { intervalToDuration, differenceInMilliseconds } from 'date-fns';
import { useIdentity } from 'teleterm/ui/TopBar/Identity/useIdentity';
import { AccessRequest } from 'e-teleport/services/workflow';

export default function useAssumedRolesBar(role: AccessRequest) {
  const appCtx = useAppContext();
  const accessRequestService =
    appCtx.workspacesService.getActiveWorkspaceAccessRequestsService();
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });

  function setDuration() {
    const start = new Date();
    const end = new Date(role.expires);
    const duration = intervalToDuration({ start, end });

    if (differenceInMilliseconds(end, start) <= 0) {
      // logout or do something here
      return;
    }

    setTime({
      hours: duration.hours,
      minutes: duration.minutes,
      seconds: duration.seconds,
    });
  }

  function switchBack() {
    console.log('switching back', role.id);
  }

  useEffect(() => {
    setDuration();

    // Default update countdown every 15 sec.
    const id = setInterval(setDuration, 15000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return {
    time,
    switchBack,
    assumedRoles: role.roles,
  };
}

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
