import React, { ReactNode } from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import Document from 'teleterm/ui/Document';
import { Box, ButtonPrimary, Flex } from 'design';

type ReconnectProps = {
  visible: boolean;
  children: ReactNode;
  serverUri?: string;
  connected: boolean;
  afterReconnect(): void;
};

export function ResourceReconnect(props: ReconnectProps) {
  const ctx = useAppContext();
  const { visible, connected, children, serverUri } = props;

  function reconnect() {
    if (serverUri) {
      const cluster = ctx.clustersService.findClusterByResource(serverUri);
      ctx.modalsService.openLoginDialog(cluster.uri, () => {
        props.afterReconnect();
      });
    }
  }

  return (
    <Document visible={visible} flexDirection="column" pl={2}>
      {!connected ? (
        <Flex flexDirection="column" mx="auto" alignItems="center" mt={100}>
          <Box>The connection is currently offline, click to reconnect</Box>
          <ButtonPrimary mt={4} width="100px" onClick={reconnect}>
            Reconnect
          </ButtonPrimary>
        </Flex>
      ) : (
        children
      )}
    </Document>
  );
}