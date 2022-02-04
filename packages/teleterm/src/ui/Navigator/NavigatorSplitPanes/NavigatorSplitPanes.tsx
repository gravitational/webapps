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

import React, { Fragment, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Flex } from 'design';
import useDraggable from 'shared/hooks/useDraggable';
import { useNavigatorSplitPanesState } from './useNavigatorSplitPanesState';
import { ResizablePane } from './ResizablePane';
import { NavigatorSplitPane, NavigatorSplitPanesOnChangeEvent } from './types';

interface NavigatorSplitPanesProps {
  panes: NavigatorSplitPane[];
  onChange?(event: NavigatorSplitPanesOnChangeEvent); //TODO: fire on size or expanded/collapse change and then save to the workspace
}

export function NavigatorSplitPanes(props: NavigatorSplitPanesProps) {
  const rootContainerRef = useRef<HTMLDivElement>();

  const {
    isCollapsed,
    collapseState,
    handleToggle,
    getMinYToResize,
    getMaxYToResize,
    isLast,
    isDraggingDisabled,
  } = useNavigatorSplitPanesState(props.panes, rootContainerRef);

  const { onMouseDown, isDragging, position } = useDraggable({
    getMinY: getMinYToResize,
    getMaxY: getMaxYToResize,
  });

  useEffect(() => {
    if (props.panes.length > 2) {
      throw new Error('NavigatorSplitPanes can handle up to 2 items currently');
    }
  }, [props.panes]);

  function renderPane(index: number): ReactNode {
    const pane = props.panes[index];
    return (
      <>
        {pane.Header({
          onToggle: () => handleToggle(pane.key),
          expanded: !collapseState[pane.key],
        })}
        <Collapsible
          $isCollapsed={isCollapsed(index)}
          $minHeight={pane.minSize}
        >
          <>{pane.Body}</>
        </Collapsible>
      </>
    );
  }

  return (
    <RootContainer ref={rootContainerRef}>
      {props.panes.map((pane, index) => {
        if (isLast(index)) {
          return (
            <Fragment key={pane.key}>
              <FillRemainingSpacePane
                $isCollapsed={isCollapsed(index)}
                $isDragging={isDragging}
                $minHeight={pane.minSize}
              >
                {renderPane(index)}
              </FillRemainingSpacePane>
              <XHolder $isDisabled={true} />
            </Fragment>
          );
        }

        return (
          <Fragment key={pane.key}>
            <ResizablePane
              isDragging={isDragging}
              position={position}
              defaultSize={pane.initialSize}
              isCollapsed={isCollapsed(index)}
              minHeight={pane.minSize}
              isNextCollapsed={isCollapsed(index + 1)}
            >
              {renderPane(index)}
            </ResizablePane>
            <XHolder
              $isDisabled={isDraggingDisabled(index)}
              onMouseDown={onMouseDown}
            />
          </Fragment>
        );
      })}
    </RootContainer>
  );
}

const RootContainer = styled(Flex)`
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: auto;
`;

const FillRemainingSpacePane = styled(Flex)`
  flex: 1 1;
  min-height: ${props =>
    props.$isCollapsed
      ? '36px'
      : props.$minHeight + 'px'}; // 36px is height of header
  flex-direction: column;
  flex-grow: ${props => (props.$isCollapsed ? 0 : 1)};
  pointer-events: ${props => (props.$isDragging ? 'none' : 'auto')};
`;

const Collapsible = styled.div`
  display: ${props => (props.$isCollapsed ? 'none' : 'block')};
  height: 100%;
  min-height: 0;
`;

const XHolder = styled.div`
  cursor: ${props => (props.$isDisabled ? 'unset' : 'row-resize')};
  width: 100%;
  height: 2px;
  background: ${props => props.theme.colors.primary.lighter};

  :hover {
    ${props =>
      props.$isDisabled
        ? null
        : {
            transform: 'scaleY(2)',
            background: `${props.theme.colors.accent}`,
          }}
  }
`;
