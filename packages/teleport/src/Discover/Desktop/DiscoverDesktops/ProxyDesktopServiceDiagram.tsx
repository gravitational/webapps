import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Server } from './Server';
import { DesktopService } from 'teleport/Discover/Desktop/DiscoverDesktops/DesktopService';
import { usePingTeleport } from 'teleport/Discover/Desktop/ConnectTeleport/PingTeleportContext';

const NodeHostname = styled.div`
  font-family: Menlo, DejaVu Sans Mono, Consolas, Lucida Console, monospace;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

const NodeTitle = styled.div`
  font-size: 16px;
`;

const NodeIcon = styled.div`
  height: 92px;
  margin-bottom: 15px;
`;

const Nodes = styled.div`
  display: inline-flex;
  position: relative;
`;

const line = keyframes`
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -361;
  }
`;

const NodeLineContainer = styled.div`
  position: absolute;
  height: 94px;
  width: 257px;
  top: 0;
  left: 125px;
  right: 121px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;

  svg {
    position: absolute;
    
    path {
      stroke: #31c842;
      stroke-width: 4;
      fill: none;
    }
  }
`;

const AnimatedSVG = styled.svg`
  stroke-dasharray: 5, 20;
  stroke-dashoffset: 0;
  
  animation: ${line} 5s cubic-bezier(0.3, 0, 0.2, 1) alternate infinite 0.6s;
`;

function NodeLine() {
  return (
    <NodeLineContainer>
      <svg width={254} height={94} viewBox="0 0 254 93.5">
        <path
          opacity={0.6}
          d="M1.5,0V76.74c0,8.43,7.62,15.26,17.02,15.26H235.48c9.4,0,17.02-6.83,17.02-15.26V32.42"
        />
      </svg>
      <AnimatedSVG width={254} height={94} viewBox="0 0 254 93.5">
        <path d="M1.5,0V76.74c0,8.43,7.62,15.26,17.02,15.26H235.48c9.4,0,17.02-6.83,17.02-15.26V32.42" />
      </AnimatedSVG>
    </NodeLineContainer>
  );
}

const Node = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function getProxyAddress() {
  const { hostname, port } = window.location;

  if (port === '443') {
    return hostname;
  }

  return `${hostname}:${port}`;
}

export function ProxyDesktopServiceDiagram() {
  const result = {
    hostname: 'windows-service.teleport.dev',
    addr: 'remote.windows_desktop.proxy.teleport.cluster.local',
    labels: [
      {
        name: 'teleport.internal/resource-id',
        value: 'f8e383d9-f9ea-4001-95c2-1c3238066c33',
      },
    ],
  };

  const proxyAddress = getProxyAddress();

  return (
    <div>
      <Nodes>
        <NodeLine />
        <Node>
          <NodeIcon>
            <Server />
          </NodeIcon>

          <NodeTitle>Teleport Proxy</NodeTitle>
          <NodeHostname>{proxyAddress}</NodeHostname>
        </Node>

        <Node>
          <NodeIcon>
            <DesktopService />
          </NodeIcon>

          <NodeTitle>Desktop Service</NodeTitle>
          <NodeHostname>{result.hostname}</NodeHostname>
        </Node>
      </Nodes>
    </div>
  );
}
