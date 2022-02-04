import React, { ReactNode, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Flex } from 'design';
import { DraggablePosition } from 'shared/hooks/useDraggable';

interface ResizablePaneProps {
  children?: ReactNode;
  minHeight: number;
  position: DraggablePosition;
  isDragging: boolean;
  defaultSize: string;
  isCollapsed: boolean;
  isNextCollapsed: boolean;
}

export function ResizablePane(props: ResizablePaneProps) {
  const {
    children,
    minHeight,
    position,
    isDragging,
    defaultSize,
    isCollapsed,
    isNextCollapsed,
  } = props;

  const compRef = useRef<HTMLDivElement>();

  // size contains the width and height of the element to be resized
  const size = useMemo(() => {
    return {
      height: 0,
    };
  }, []);

  // remember the element size before and after drag
  useEffect(() => {
    const element = compRef.current;
    size.height = element.clientHeight;
    // trigger windows resize event so other components can adjust
    // to the new div size
    window.dispatchEvent(new Event('resize'));
  }, [isDragging]);

  // handle drag movements which causes a position to change
  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const element = compRef.current;
    const newHeight = size.height + position.y;
    const parentHeight = compRef.current.parentElement.clientHeight;
    element.style.flexBasis = (newHeight / parentHeight) * 100 + '%';
  }, [position.y]);

  return (
    <PaneContent
      ref={compRef}
      $isCollapsed={isCollapsed}
      $isNextCollapsed={isNextCollapsed}
      $defaultSize={defaultSize}
      $isDragging={isDragging}
      $minHeight={minHeight}
    >
      {children}
    </PaneContent>
  );
}

const PaneContent = styled(Flex)`
  flex: ${props => (props.$isCollapsed ? '0 !important' : '1 1 auto')};
  min-height: ${props =>
    props.$isCollapsed ? 'unset' : `${props.$minHeight + 'px' || 0}`};
  flex-grow: ${props => (props.$isNextCollapsed ? 1 : 0)};
  flex-basis: ${props => props.$defaultSize};
  pointer-events: ${props => (props.$isDragging ? 'none' : 'auto')};
  height: 100%;
  flex-direction: column;
`;
