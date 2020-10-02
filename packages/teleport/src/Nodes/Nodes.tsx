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

import React from 'react';
import { Indicator, Box, Flex } from 'design';
import { Danger } from 'design/Alert';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import QuickLaunch from 'teleport/components/QuickLaunch';
import InputSearch from 'teleport/components/InputSearch';
import NodeList from 'teleport/components/NodeList';
import useTeleport from 'teleport/useTeleport';
import useStickyClusterId from 'teleport/useStickyClusterId';
import useNodes from './useNodes';
import Empty from './Empty';
import AddButton from './AddButton';
import NodeAddEnterprise from 'teleport/Nodes/NodeAdd/NodeAddOptions';
import NodeAddOSS from 'teleport/Nodes/NodeAdd/NodeAddByCustom';
import cfg from 'teleport/config';

export default function Container() {
  const teleCtx = useTeleport();
  const { clusterId } = useStickyClusterId();
  const state = useNodes(teleCtx, clusterId);
  return <Nodes {...state} />;
}

export function Nodes(props: ReturnType<typeof useNodes>) {
  const {
    nodes,
    searchValue,
    setSearchValue,
    getNodeLoginOptions,
    startSshSession,
    attempt,
  } = props;

  const ctx = useTeleport().storeUser;

  const canCreate = attempt.isSuccess && ctx.getNodeAccess().create;
  const isEmpty = attempt.isSuccess && nodes.length === 0;
  const hasNodes = attempt.isSuccess && nodes.length > 0;
  const [showDialog, setShowDialog] = React.useState(false);

  function onLoginSelect(e: React.MouseEvent, login: string, serverId: string) {
    e.preventDefault();
    startSshSession(login, serverId);
  }

  function onQuickLaunchEnter(login: string, serverId: string) {
    startSshSession(login, serverId);
  }

  if (isEmpty) {
    return (
      <FeatureNodes canCreate={canCreate}>
        <Empty canCreate={canCreate} onCreate={() => null} />
      </FeatureNodes>
    );
  }

  let NodeAddDialog;
  if (cfg.isEnterprise) {
    NodeAddDialog = <NodeAddEnterprise onClose={() => setShowDialog(false)} />;
  } else {
    NodeAddDialog = <NodeAddOSS onClose={() => setShowDialog(false)} />;
  }

  return (
    <FeatureNodes
      canCreate={canCreate}
      onClick={() => setShowDialog(true)}
      showBtn={attempt.isSuccess}
    >
      <Flex mb={4} alignItems="center" justifyContent="space-between">
        <InputSearch height="30px" mr="3" onChange={setSearchValue} />
        <QuickLaunch
          width="240px"
          onPress={onQuickLaunchEnter}
          inputProps={{ bg: 'bgTerminal' }}
        />
      </Flex>
      {attempt.isFailed && <Danger>{attempt.message} </Danger>}
      {attempt.isProcessing && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {hasNodes && (
        <NodeList
          nodes={nodes}
          searchValue={searchValue}
          onLoginMenuOpen={getNodeLoginOptions}
          onLoginSelect={onLoginSelect}
        />
      )}
      {showDialog && NodeAddDialog}
    </FeatureNodes>
  );
}

const FeatureNodes: React.FC<Props> = props => {
  return (
    <FeatureBox>
      <FeatureHeader alignItems="center" justifyContent="space-between">
        <FeatureHeaderTitle>Servers</FeatureHeaderTitle>
        {props.showBtn && (
          <AddButton canCreate={props.canCreate} onClick={props.onClick} />
        )}
      </FeatureHeader>
      {props.children}
    </FeatureBox>
  );
};

type Props = {
  canCreate: boolean;
  showBtn?: boolean;
  onClick?(): void;
};
