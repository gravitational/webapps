/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Flex, Box, ButtonPrimary } from 'design';
import * as types from 'teleterm/ui/services/docs/types';
import Document from 'teleterm/ui/Document';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import ClusterCtx, {
  useClusterContext,
  ClusterContextProvider,
} from './clusterContext';
import ClusterResources from './ClusterResources';

export default function Container(props: DocumentProps) {
  const { uri } = props.doc;
  const appCtx = useAppContext();
  const [clusterCtx] = useState(() => new ClusterCtx(uri, appCtx));

  useEffect(() => {
    appCtx.serviceDocs.update(uri, {
      title: clusterCtx.state.clusterName,
    });

    return () => clusterCtx.dispose();
  }, []);

  return (
    <ClusterContextProvider value={clusterCtx}>
      <DocumentCluster {...props} />
    </ClusterContextProvider>
  );
}

export function DocumentCluster(props: { visible: boolean }) {
  const clusterCtx = useClusterContext();
  const { clusterName, connected } = clusterCtx.useState();
  return (
    <Document visible={props.visible}>
      <Layout mx="auto" px={5} pt={3} height="100%">
        <Flex justifyContent="space-between">
          <Text typography="h4" color="text.secondary">
            {`clusters / `}
            <Text as="span" typography="h4" color="text.primary">
              {`${clusterName}`}
            </Text>
          </Text>
          {connected && (
            <ButtonPrimary height="24px" size="small" onClick={clusterCtx.sync}>
              Sync
            </ButtonPrimary>
          )}
        </Flex>
        <StyledBorder mt={2} mb={3} />
        {connected && clusterCtx.isLocationActive('/resources/') && (
          <ClusterResources />
        )}
        {!connected && (
          <Offline clusterName={clusterName} login={clusterCtx.login} />
        )}
      </Layout>
    </Document>
  );
}

const Offline: React.FC<{ clusterName: string; login(): void }> = props => {
  return (
    <Flex flexDirection="column" mx="auto" alignItems="center">
      <ButtonPrimary mt={4} width="100px" onClick={props.login}>
        Connect
      </ButtonPrimary>
    </Flex>
  );
};

type DocumentProps = {
  visible: boolean;
  doc: types.DocumentCluster;
};

const Layout = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;

const StyledBorder = styled(Box)(({ theme }) => {
  return {
    background: theme.colors.primary.lighter,
    height: '1px',
  };
});
