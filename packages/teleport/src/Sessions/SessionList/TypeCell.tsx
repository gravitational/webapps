/*
Copyright 2019-2022 Gravitational, Inc.

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
import styled, { useTheme } from 'styled-components';
import { Box } from 'design';
import { Cell } from 'design/DataTable';
import { Session } from 'teleport/services/session';
import * as Icons from 'design/Icon/Icon';
import cfg from 'teleport/config';

export default function renderTypeCell({
  sid,
  clusterId,
  kind,
  hostname,
  kubeClusterId,
}: Session) {
  const theme = useTheme();

  let desc = `${kind} [${kubeClusterId}]`;
  if (kind === 'ssh') {
    desc = `${kind} [${hostname}]`;
  }

  return (
    <Cell>
      <StyledEventType>
        <Box width="40px">
          {kind === 'ssh' && (
            <Icons.Cli
              as="a"
              href={cfg.getSshSessionRoute({ sid, clusterId })}
              target="_blank"
              p="1"
              mr="3"
              bg="bgTerminal"
              fontSize="2"
              disabled={true}
              style={{
                borderRadius: '50%',
                border: `solid 2px ${theme.colors.success}`,
                textDecoration: 'none',
              }}
            />
          )}
        </Box>
        {desc}
      </StyledEventType>
    </Cell>
  );
}

const StyledEventType = styled.div`
  display: flex;
  align-items: center;
  min-width: 130px;
`;
