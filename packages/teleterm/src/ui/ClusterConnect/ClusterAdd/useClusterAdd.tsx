import { useAppContext } from 'teleterm/ui/appContextProvider';
import useAsync from 'teleterm/ui/useAsync';
import { ClusterAddProps, ClusterAddPresentationProps } from './ClusterAdd';

export function useClusterAdd(
  props: ClusterAddProps
): ClusterAddPresentationProps {
  const ctx = useAppContext();
  const [{ status, statusText }, addCluster] = useAsync(
    async (addr: string) => {
      const cluster = await ctx.clustersService.addRootCluster(addr);
      return props.onSuccess(cluster.uri);
    }
  );

  return {
    addCluster,
    status,
    statusText,
    onClose: props.onClose,
  };
}
