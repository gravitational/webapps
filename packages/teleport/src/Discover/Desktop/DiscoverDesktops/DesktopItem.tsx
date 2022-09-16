import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

import windowsIcon from './windows.svg';
import { Flex } from 'design';
import cfg from 'teleport/config';
import { openNewTab } from 'teleport/lib/util';
import useStickyClusterId from 'teleport/useStickyClusterId';

interface DesktopItemProps {
  computerName: string;
  os: string;
  osVersion: string;
  address: string;
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
  position: relative;
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

const appear = keyframes`
  from {
    width: 0;
  }
  to {
    width: 160px;
  }
`;

const NodeLineContainer = styled.div`
  position: absolute;
  height: 3px;
  width: 160px;
  top: 50%;
  transform: translate(0, -50%);
  left: -160px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  animation: ${appear} 1s ease-in forwards;

  svg {
    position: absolute;

    path {
      stroke: #31c842;
      stroke-width: 4;
      fill: none;
    }
  }
`;

const line = keyframes`
  0% {
    stroke-dashoffset: -25;
  }

  100% {
    stroke-dashoffset: 0;
  }
`;

const AnimatedSVG = styled.svg`
  stroke-dasharray: 5, 20;
  stroke-dashoffset: 0;

  animation: ${line} 1s linear infinite 0.6s;
`;

const Connect = styled.div`
  background: #0091ea;
  color: white;
  border-radius: 5px;
  display: inline-flex;
  padding: 3px 10px;
  cursor: pointer;

  &:hover {
    background: #4db2f0;
  }
`;

function NodeLine() {
  return (
    <NodeLineContainer>
      <svg width={160} height={3} viewBox="0 0 160 3">
        <path opacity={0.6} d="M0,1.5H160" />
      </svg>
      <AnimatedSVG width={160} height={3} viewBox="0 0 160 3">
        <path d="M0,1.5H160" />
      </AnimatedSVG>
    </NodeLineContainer>
  );
}

export function DesktopItem(props: DesktopItemProps) {
  const { clusterId } = useStickyClusterId();

  const connect = useCallback(() => {
    const url = cfg.getDesktopRoute({
      clusterId,
      desktopName: props.computerName,
      username: 'Administrator',
    });

    openNewTab(url);
  }, []);

  return (
    <Container>
      <NodeLine />
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
          <Connect onClick={() => connect()}>Connect</Connect>
        </Flex>
      </Content>
    </Container>
  );
}
