import React from 'react';
import { ButtonPrimary, Flex, Text } from 'design';
import styled from 'styled-components';
import clusterPng from './clusters.png';
import Image from 'design/Image';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { RecentClusters } from './RecentClusters';

export function ClusterConnectPanel() {
  const ctx = useAppContext();

  function handleConnect() {
    ctx.commandLauncher.executeCommand('cluster-connect', {});
  }

  return (
    <ScrollingContainer>
      <Flex m="auto" flexDirection="column" minWidth={0}>
        <Flex
          mt={2}
          width="370px"
          pb={5}
          flexDirection="column"
          alignItems="center"
        >
          <Image width="120px" src={clusterPng} mb={3} />
          <Text typography="h3" bold mb={2}>
            Connect a Cluster
          </Text>
          <Text color="text.secondary" mb={3} textAlign="center">
            Connect an existing Teleport cluster <br /> to start using Teleport
            Connect.
          </Text>
          <ButtonPrimary size="large" onClick={handleConnect}>
            Connect
          </ButtonPrimary>
        </Flex>
        <RecentClusters />
      </Flex>
    </ScrollingContainer>
  );
}

const ScrollingContainer = styled(Flex)`
  background: ${props => props.theme.colors.primary.darker};
  width: 100%;
  overflow: auto;
`;
