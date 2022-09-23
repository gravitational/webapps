import React, { useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Flex } from 'design';

import { NodeLine } from 'teleport/Discover/Desktop/DiscoverDesktops/NodeLine';
import {
  createLine,
  Line,
} from 'teleport/Discover/Desktop/DiscoverDesktops/utils';

import windowsIcon from './windows.svg';

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
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  background: white;
  position: relative;
  animation: ${fadeIn} 0.9s ease-in 1s forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px 10px 15px;
  opacity: 0;
  width: 240px;
  height: 146px;
`;

const ComputerName = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
`;

const ComputerIcon = styled.div`
  background: url(${windowsIcon}) no-repeat;
  width: 30px;
  height: 30px;
  background-size: contain;
  flex: 0 0 30px;
`;

const ComputerOS = styled.div`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
`;

const ComputerOSVersion = styled.div`
  color: rgba(0, 0, 0, 0.4);
`;

const ComputerAddress = styled.div`
  font-family: Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
`;

const ComputerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Online = styled.div`
  background: #31c842;
  border-radius: 5px;
  color: white;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  line-height: 1;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
`;

// TODO: add connect button back in
// const Connect = styled.div`
//   background: #0091ea;
//   color: white;
//   border-radius: 5px;
//   display: inline-flex;
//   padding: 3px 10px;
//   cursor: pointer;
//
//   &:hover {
//     background: #4db2f0;
//   }
// `;

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
        <Flex>
          <ComputerInfo>
            <ComputerName>{props.computerName}</ComputerName>
            <ComputerAddress>{props.address}</ComputerAddress>
          </ComputerInfo>
          <ComputerIcon />
        </Flex>
        <ComputerOS>{props.os}</ComputerOS>
        <Flex justifyContent="space-between" alignItems="center">
          <ComputerOSVersion>{props.osVersion}</ComputerOSVersion>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Online>Online</Online>
          {/*
            TODO: add this back in
            <Connect onClick={() => connect()}>Connect</Connect>
          */}
        </Flex>
      </Content>
    </Container>
  );
}
