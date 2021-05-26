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
import styled from 'styled-components';
import { Cell } from 'design/DataTable';
import Icon, * as Icons from 'design/Icon/Icon';
import { Event, eventTypes as events } from 'teleport/services/audit';
import cfg from 'teleport/config';

export default function TypeCell(props) {
  const { rowIndex, data, clusterId } = props;
  const [eventIconMap] = React.useState(getEventIcons());

  const event: Event = data[rowIndex];
  const IconType = eventIconMap[event.code] || Icons.List;

  const iconProps = {
    p: '1',
    mr: '3',
    fontSize: '3',
  };

  // use button for interactive ssh sessions
  if (
    event.code === events.sessionEnd.code &&
    event.raw.interactive &&
    event.raw.session_recording !== 'off'
  ) {
    return (
      <Cell>
        <StyledEventType>
          <a
            title="Open Session Player"
            href={cfg.getPlayerRoute({ clusterId, sid: event.raw.sid })}
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <StyledCliIcon {...iconProps} />
          </a>
          {event.codeDesc}
        </StyledEventType>
      </Cell>
    );
  }

  return (
    <Cell>
      <StyledEventType>
        <Icon {...iconProps} as={IconType} />
        {event.codeDesc}
      </StyledEventType>
    </Cell>
  );
}

function getEventIcons() {
  const eventIconMap = {};
  Object.keys(events).forEach(key => {
    eventIconMap[events[key].code] = events[key].icon;
  });

  return eventIconMap;
}

const StyledCliIcon = styled(Icons.Cli)(
  props => `
  background: ${props.theme.colors.dark};
  border: 2px solid ${props.theme.colors.accent};
  color: ${props.theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 100px;
  transition: all 0.3s;

  &:hover,
  &:active,
  &:focus {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.24);
    color: ${props.theme.colors.light};
  }

  &:active {
    box-shadow: none;
    opacity: 0.56;
  }
`
);

const StyledEventType = styled.div`
  display: flex;
  align-items: center;
  min-width: 130px;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
`;
