/*
Copyright 2020 Gravitational, Inc.

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

import React from 'react';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import { Danger } from 'design/Alert';
import { Indicator, Text, Box, Flex, ButtonPrimary } from 'design';
import ResourceEditor from 'teleport/components/ResourceEditor';
import useResources from 'teleport/components/useResources';
import TrustedList from './TrustedList';
import DeleteTrustedClusterDialog from './DeleteTrustedClusterDialog';
import templates from './templates';
import useTrustedClusters from './useTrustedClusters';
import Card from 'design/Card';
import Image from 'design/Image';
const idCardPNG = require('design/assets/images/trusted-cluster.png');

export default function TrustedClusters() {
  const tclusters = useTrustedClusters();
  const isEmpty = tclusters.items.length === 0;
  const resources = useResources(tclusters.items, templates);

  const title =
    resources.status === 'creating'
      ? 'Add a new trusted cluster'
      : 'Edit trusted cluster';

  function remove() {
    return tclusters.remove(resources.item);
  }

  function save(content: string) {
    const isNew = resources.status === 'creating';
    return tclusters.save(content, isNew);
  }

  if (tclusters.isProcessing) {
    return (
      <Flex justifyContent="center" alignItems="center" flex="1">
        <Indicator />
      </Flex>
    );
  }

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center">
        <FeatureHeaderTitle>Trusted Clusters</FeatureHeaderTitle>
        {!isEmpty && (
          <ButtonPrimary
            disabled={!tclusters.canCreate}
            ml="auto"
            width="240px"
            onClick={() => resources.create('trusted_cluster')}
          >
            Connect to Root Cluster
          </ButtonPrimary>
        )}
      </FeatureHeader>
      {tclusters.isFailed && <Danger>{tclusters.message} </Danger>}
      <Flex alignItems="start">
        {isEmpty && (
          <Empty
            disabled={!tclusters.canCreate}
            onCreate={() => resources.create('trusted_cluster')}
          />
        )}
        {!isEmpty && (
          <>
            <TrustedList
              mt="4"
              flex="1"
              items={tclusters.items}
              onEdit={resources.edit}
              onDelete={resources.remove}
            />
            <Info
              ml="4"
              width="240px"
              color="text.primary"
              style={{ flexShrink: 0 }}
            />
          </>
        )}
      </Flex>
      {(resources.status === 'creating' || resources.status === 'editing') && (
        <ResourceEditor
          onSave={save}
          title={title}
          onClose={resources.disregard}
          text={resources.item.content}
          name={resources.item.name}
          isNew={resources.status === 'creating'}
        />
      )}
      {resources.status === 'removing' && (
        <DeleteTrustedClusterDialog
          name={resources.item.name}
          onClose={resources.disregard}
          onDelete={remove}
        />
      )}
    </FeatureBox>
  );
}

const Info = props => (
  <Box {...props}>
    <Text typography="h6" mb={3}>
      TRUSTED CLUSTERS
    </Text>
    <Text typography="subtitle1" mb={3}>
      Trusted Clusters allows Teleport administrators to connect multiple
      clusters together and establish trust between them. Users of trusted
      clusters can seamlessly access the nodes of the cluster from the root
      cluster.
    </Text>
    <Text typography="subtitle1" mb={2}>
      Please{' '}
      <Text
        as="a"
        color="light"
        href="https://gravitational.com/teleport/docs/trustedclusters/"
        target="_blank"
      >
        view our documentation
      </Text>{' '}
      to learn more about trusted clusters.
    </Text>
  </Box>
);

const Empty = (props: EmptyProps) => {
  const imgProps = {
    src: idCardPNG.default,
    style: { width: '100%' },
  };

  return (
    <Card
      maxWidth="700px"
      my={4}
      mx="auto"
      py={4}
      as={Flex}
      alignItems="center"
    >
      <Box width={4 / 10}>
        <Image {...imgProps} />
      </Box>
      <Box width={6 / 10}>
        <Info pr={4} mb={6} />
        <ButtonPrimary
          disabled={props.disabled}
          onClick={props.onCreate}
          mb="2"
          mx="auto"
          width="240px"
        >
          Connect to Root Cluster
        </ButtonPrimary>
      </Box>
    </Card>
  );
};

type EmptyProps = {
  onCreate(): void;
  disabled: boolean;
};
