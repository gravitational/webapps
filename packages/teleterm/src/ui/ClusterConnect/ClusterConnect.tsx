import React, { useState } from 'react';

import Dialog from 'design/Dialog';

import { useAppContext } from 'teleterm/ui/appContextProvider';
import { ClusterConnectReason } from 'teleterm/ui/services/modals';

import { ClusterAdd } from './ClusterAdd';
import { ClusterLogin } from './ClusterLogin';

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
        padding: '0',
      })}
      disableEscapeKeyDown={false}
      onClose={props.onCancel}
      open={true}
    >
      {!clusterUri ? (
        <ClusterAdd onCancel={props.onCancel} onSuccess={handleClusterAdd} />
      ) : (
        <ClusterLogin
          reason={props.reason}
          clusterUri={clusterUri}
          onCancel={props.onCancel}
          onSuccess={() => props.onSuccess(clusterUri)}
        />
      )}
    </Dialog>
  );
}

interface ClusterConnectProps {
  clusterUri: string | undefined;
  reason: ClusterConnectReason | undefined;
  onCancel(): void;
  onSuccess(clusterUri: string): void;
}
