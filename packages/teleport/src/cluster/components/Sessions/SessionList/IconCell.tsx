/*
Copyright 2019-2020 Gravitational, Inc.

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
import { Cell } from 'design/DataTable';
import { Session } from 'teleport/services/ssh';
import * as Icons from 'design/Icon/Icon';
import theme from 'design/theme';
import { NavLink } from 'react-router-dom';
import cfg from 'teleport/config';

export default function TypeCell(props: any) {
  const { rowIndex, data } = props;
  const { sid } = data[rowIndex] as Session;
  const url = cfg.getSshSessionRoute({ sid });

  return (
    <Cell>
      <StyledEventType>
        <Icons.Cli
          as={NavLink}
          to={url}
          p="1"
          mr="3"
          bg="bgTerminal"
          fontSize="2"
          style={{
            borderRadius: '50%',
            border: `solid 2px ${theme.colors.success}`,
            textDecoration: 'none',
          }}
        />
        Session in progress...
      </StyledEventType>
    </Cell>
  );
}

const StyledEventType = styled.div`
  width: 0;
`;
