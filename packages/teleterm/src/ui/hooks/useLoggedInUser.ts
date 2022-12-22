import { useAppContext } from 'teleterm/ui/appContextProvider';
import { LoggedInUser } from 'teleterm/services/tshd/types';

export function useLoggedInUser() {
  const ctx = useAppContext();

  ctx.clustersService.useState();
  ctx.workspacesService.useState();

  function getLoggedInUser(): LoggedInUser | undefined {
    const clusterUri = ctx.workspacesService.getRootClusterUri();
    if (!clusterUri) {
      return;
    }
    const cluster = ctx.clustersService.findCluster(clusterUri);
    if (!cluster) {
      return;
    }
    return cluster.loggedInUser;
  }

  return getLoggedInUser();
}
