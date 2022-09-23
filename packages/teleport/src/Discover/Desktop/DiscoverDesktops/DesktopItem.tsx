import React, { useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { NodeLine } from 'teleport/Discover/Desktop/DiscoverDesktops/NodeLine';
import {
  createLine,
  Line,
} from 'teleport/Discover/Desktop/DiscoverDesktops/utils';

import { WindowsComputer } from 'teleport/Discover/Desktop/DiscoverDesktops/WindowsComputer';

interface DesktopItemProps {
  computerName: string;
  os: string;
  osVersion: string;
  address: string;
  desktopServiceElement: HTMLDivElement;
  containerElement: HTMLDivElement;
  index: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  margin-bottom: 30px;
`;

const Content = styled.div`
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.4);
  position: relative;
  animation: ${fadeIn} 0.9s ease-in 1s forwards;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
  min-width: 330px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
`;

export function DesktopItem(props: DesktopItemProps) {
  const ref = useRef<HTMLDivElement>();

  // TODO: add connect button back in
  // const connect = useCallback(() => {
  //   openNewTab(
  //     `https://teleport.dev/web/cluster/${clusterId}/desktops/${props.computerName}/Administrator`
  //   );
  // }, []);

  const [line, setLine] = useState<Line>(null);

  useLayoutEffect(() => {
    if (props.desktopServiceElement && ref.current && props.containerElement) {
      setLine(
        createLine(
          props.desktopServiceElement,
          ref.current,
          props.containerElement
        )
      );
    }
  }, [props.desktopServiceElement && ref.current && props.containerElement]);

  let path;
  if (line) {
    path = (
      <NodeLine width={line.width} height={line.height}>
        <path d={line.path} />
      </NodeLine>
    );
  }

  return (
    <Container ref={ref}>
      {path}

      <Content>
        <WindowsComputer
          os={props.os}
          osVersion={props.osVersion}
          address={props.address}
          computerName={props.computerName}
        />
      </Content>
    </Container>
  );
}
