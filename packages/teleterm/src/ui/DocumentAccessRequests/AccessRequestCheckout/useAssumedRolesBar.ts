import { useState, useEffect } from 'react';
import { access } from 'original-fs';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { intervalToDuration, differenceInMilliseconds } from 'date-fns';
import { useIdentity } from 'teleterm/ui/TopBar/Identity/useIdentity';
import { AccessRequest } from 'e-teleport/services/workflow';
import useAttempt from 'shared/hooks/useAttemptNext';

export default function useAssumedRolesBar(role: AccessRequest) {
  const ctx = useAppContext();
  const clusterUri = ctx.workspacesService.getRootClusterUri();
  const { activeRootCluster } = useIdentity();
  const accessRequestService =
    ctx.workspacesService.getActiveWorkspaceAccessRequestsService();
  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });
  const { attempt: switchBackAttempt, run: runSwitchBack } = useAttempt('');

  async function setDuration() {
    const start = new Date();
    const end = new Date(role.expires);
    const duration = intervalToDuration({ start, end });

    // tsh certs will always be the shortest lived expiry
    // between 'default' cert or assumed request so if something
    // here expires that means the cert is expired too, regardless
    // of other requests assumed
    if (differenceInMilliseconds(end, start) <= 0) {
      accessRequestService.removeFromAssumed(role);
      await ctx.clustersService.logout(clusterUri);
      await ctx.clustersService.removeCluster(clusterUri);

      if (ctx.workspacesService.getRootClusterUri() === clusterUri) {
        const [firstConnectedWorkspace] =
          ctx.workspacesService.getConnectedWorkspacesClustersUri();
        if (firstConnectedWorkspace) {
          await ctx.workspacesService.setActiveWorkspace(
            firstConnectedWorkspace
          );
        } else {
          await ctx.workspacesService.setActiveWorkspace(null);
        }
      }
      ctx.workspacesService.removeWorkspace(clusterUri);
      ctx.connectionTracker.removeItemsBelongingToRootCluster(clusterUri);
      ctx.notificationsService.notifyError({
        title: `${activeRootCluster.name}: Certificate Expired`,
        description: `Please login again to connect to your cluster.`,
      });
    } else {
      setTime({
        hours: duration.hours,
        minutes: duration.minutes,
        seconds: duration.seconds,
      });
    }
  }

  async function switchBack() {
    runSwitchBack(() =>
      // only passing the 'unassumed' role id as the backend will
      // persist any other access requests currently available that
      // are not present in the dropIds array
      ctx.clustersService
        .assumeRole(clusterUri, [], [role.id])
        .then(() => {
          ctx.clustersService.syncRootClusterAndCatchErrors(clusterUri);
          accessRequestService.removeFromAssumed(role);
        })
        .catch(err => {
          ctx.notificationsService.notifyError({
            title: 'Failed',
            description: err.message,
          });
        })
    );
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
    switchBackAttempt,
    assumedRoles: role.roles,
  };
}

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
