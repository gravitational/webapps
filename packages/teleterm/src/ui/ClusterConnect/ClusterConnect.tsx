import React, { useState } from 'react';
import { ClusterAdd } from './ClusterAdd';
import { ClusterLogin } from './ClusterLogin';
import Dialog from 'design/Dialog';
import { useAppContext } from 'teleterm/ui/appContextProvider';

export function ClusterConnect(props: ClusterConnectProps) {
  const [createdClusterUri, setCreatedClusterUri] = useState<
    string | undefined
  >();
  const { clustersService } = useAppContext();
  const clusterUri = props.clusterUri || createdClusterUri;

  function handleClusterAdd(clusterUri: string): void {
    const cluster = clustersService.findCluster(clusterUri);
    if (cluster?.connected) {
      props.onSuccess(clusterUri);
    } else {
      setCreatedClusterUri(clusterUri);
    }
  }

  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '480px',
        width: '100%',
        padding: '20px',
      })}
      disableEscapeKeyDown={false}
      onClose={props.onCancel}
      open={true}
    >
      {!clusterUri ? (
        <ClusterAdd onCancel={props.onCancel} onSuccess={handleClusterAdd} />
      ) : (
        <ClusterLogin
          clusterUri={clusterUri}
          onCancel={props.onCancel}
          onSuccess={() => props.onSuccess(clusterUri)}
        />
      )}
    </Dialog>
  );
}

interface ClusterConnectProps {
  clusterUri?: string;

  onCancel(): void;

  onSuccess(clusterUri: string): void;
}
