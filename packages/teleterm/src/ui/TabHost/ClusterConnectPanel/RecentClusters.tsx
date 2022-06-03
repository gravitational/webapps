import React from 'react';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import { getClusterName, getUserWithClusterName } from 'teleterm/ui/utils';
import { Box, ButtonBorder, Card, Text } from 'design';

export function RecentClusters() {
  const ctx = useAppContext();

  ctx.clustersService.useState();

  const rootClusters = ctx.clustersService
    .getClusters()
    .filter(c => !c.leaf)
    .map(cluster => ({
      userWithClusterName: getUserWithClusterName({
        userName: cluster.loggedInUser?.name,
        clusterName: getClusterName(cluster),
      }),
      uri: cluster.uri,
    }));

  function connect(clusterUri: string): void {
    ctx.workspacesService.setActiveWorkspace(clusterUri);
  }

  if (!rootClusters.length) {
    return null;
  }

  return (
    <Card py={3} maxWidth="400px" bg="primary.main">
      <Text px={3} bold fontSize={3} mb={1} color="light">
        Recent clusters
      </Text>
      <Box as="ul" px={3} m={0} maxHeight="110px" overflow="auto">
        {rootClusters.map((cluster, index) => (
          <Box
            as="li"
            mb={index !== rootClusters.length ? 1 : 0}
            key={cluster.uri}
            css={`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Text
              color="text.primary"
              mr={1}
              title={cluster.userWithClusterName}
              css={`
                white-space: nowrap;
              `}
            >
              {cluster.userWithClusterName}
            </Text>
            <ButtonBorder size="small" onClick={() => connect(cluster.uri)}>
              Connect
            </ButtonBorder>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
