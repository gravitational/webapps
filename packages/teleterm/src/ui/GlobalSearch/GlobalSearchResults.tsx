/*
Copyright 2018 Gravitational, Inc.

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
import styled from 'styled-components';
import { Label, Box, Text, Flex } from 'design';
import * as types from 'teleterm/ui/services/globalSearch/types';

function GlobalSearchResults(props: Props) {
  const { results, current } = props;
  if (results.length === 0) {
    return null;
  }

  const $results = results.map((r, index) => {
    const Cmpt = ComponentMap[r.kind] || UnknownResult;
    return (
      <StyledItem $active={index === current} key={` ${index}`}>
        <Cmpt result={r} />
      </StyledItem>
    );
  });

  return <StyledGlobalSearchResults>{$results}</StyledGlobalSearchResults>;
}

function ServerResult(props: { result: types.ResultServer }) {
  const { hostname, clusterId, labelsList } = props.result.data;
  const $labels = labelsList.map((label, index) => (
    <Label mr="1" key={index} kind="secondary">
      {label.name}: {label.value}
    </Label>
  ));

  return (
    <div>
      <Flex alignItems="center">
        <Box mr={2}>{`servers/${hostname}`}</Box>
        <Box color="text.placeholder">{`/clusters/${clusterId}/servers/${hostname}`}</Box>
      </Flex>
      {$labels}
    </div>
  );
}

function ServersResult(props: { result: types.ResultServers }) {
  const { name } = props.result.data;
  return (
    <div>
      <Flex alignItems="center">
        <Box mr={2}>{`servers`}</Box>
        <Box color="text.placeholder">{`/clusters/${name}/servers}`}</Box>
      </Flex>
    </div>
  );
}

function DbsResult(props: { result: types.ResultDbs }) {
  const { name } = props.result.data;
  return (
    <div>
      <Flex alignItems="center">
        <Box mr={2}>{`databases`}</Box>
        <Box color="text.placeholder">{`/clusters/${name}/dbs`}</Box>
      </Flex>
    </div>
  );
}

function DbResult(props: { result: types.ResultDb }) {
  const db = props.result.data;
  const $labels = db.labelsList.map((label, index) => (
    <Label mr="1" key={index} kind="secondary">
      {label.name}: {label.value}
    </Label>
  ));
  return (
    <div>
      <Flex alignItems="center">
        <Box mr={2}>databases/{db.name}</Box>
        <Box color="text.placeholder">{`/${db.uri}`}</Box>
        <Text ml="auto" typography="body2" fontSize={0}>
          {db.type}/{db.protocol}
        </Text>
      </Flex>
      {$labels}
    </div>
  );
}

function UnknownResult(props: { result: types.Result }) {
  const { kind } = props.result;
  return <div>unknown kind: {kind} </div>;
}

const StyledItem = styled.div(({ theme, $active }) => {
  return {
    borderBottom: `2px solid ${theme.colors.primary.main}`,
    padding: '2px 8px',
    color: theme.colors.primary.contrastText,
    background: $active
      ? theme.colors.primary.lighter
      : theme.colors.primary.light,
  };
});

const StyledGlobalSearchResults = styled.div(({ theme }) => {
  return {
    boxShadow: '8px 8px 18px rgb(0 0 0)',
    color: theme.colors.primary.contrastText,
    background: theme.colors.primary.light,
    boxSizing: 'border-box',
    width: '600px',
    marginTop: '24px',
    display: 'block',
    position: 'absolute',
    border: '1px solid ' + theme.colors.action.hover,
    fontSize: '12px',
    listStyle: 'none outside none',
    textShadow: 'none',
    zIndex: '1000',
    maxHeight: '350px',
    overflow: 'auto',
  };
});

export default GlobalSearchResults;

const ComponentMap: Record<
  types.Result['kind'],
  React.FC<{ result: types.Result }>
> = {
  ['dbs']: DbsResult,
  ['db']: DbResult,
  ['servers']: ServersResult,
  ['server']: ServerResult,
};

type Props = {
  current: number;
  results: types.Result[];
};
