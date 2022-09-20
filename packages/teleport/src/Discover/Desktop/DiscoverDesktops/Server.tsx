import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 10px;
`;

const ServerItem = styled.div`
  width: 80px;
  height: 16px;
  padding: 0 7px;
  box-sizing: border-box;
  background: #f5e6fe;
  margin-bottom: 8px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const ServerItemLights = styled.div`
  display: flex;
  align-items: center;
`;

const blink = keyframes`
  46% {
    opacity: 1;
  }
  
  50% {
    opacity: 0;
  }

  54% {
    opacity: 1;
  }
`;

const blink2 = keyframes`
  27% {
    opacity: 1;
  }
  
  30% {
    opacity: 0;
  }

  33% {
    opacity: 1;
  }
`;

const blink3 = keyframes`
  68% {
    opacity: 1;
  }

  70% {
    opacity: 0;
  }

  72% {
    opacity: 1;
  }
`;

const ServerItemLight = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
`;

const ServerItemLightGreen = styled(ServerItemLight)`
  background: #31c842;
`;

const ServerItemLightGreen1 = styled(ServerItemLightGreen)`
  animation: ${blink} 8s step-start 0s infinite;
`;

const ServerItemLightGreen2 = styled(ServerItemLightGreen)`
  animation: ${blink2} 10s step-start 0s infinite;
`;

const ServerItemLightGreen3 = styled(ServerItemLightGreen)`
  animation: ${blink3} 12s step-start 0s infinite;
`;

const ServerItemLines = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  flex-direction: column;
`;

const ServerItemLine = styled.div`
  height: 3px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.4);
  margin-left: 5px;
  overflow: hidden;
`;

const ServerItemLinesTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

export function Server() {
  return (
    <Container>
      <ServerItem>
        <ServerItemLights>
          <ServerItemLightGreen1 />
        </ServerItemLights>
        <ServerItemLines>
          <ServerItemLinesTop>
            <ServerItemLine style={{ width: 5 }} />
            <ServerItemLine style={{ width: 30 }} />
          </ServerItemLinesTop>
          <ServerItemLine style={{ width: 20 }} />
        </ServerItemLines>
      </ServerItem>
      <ServerItem>
        <ServerItemLights>
          <ServerItemLightGreen2 />
        </ServerItemLights>
        <ServerItemLines>
          <ServerItemLinesTop>
            <ServerItemLine style={{ width: 5 }} />
            <ServerItemLine style={{ width: 30 }} />
          </ServerItemLinesTop>
          <ServerItemLine style={{ width: 20 }} />
        </ServerItemLines>
      </ServerItem>
      <ServerItem>
        <ServerItemLights>
          <ServerItemLightGreen3 />
        </ServerItemLights>
        <ServerItemLines>
          <ServerItemLinesTop>
            <ServerItemLine style={{ width: 5 }} />
            <ServerItemLine style={{ width: 30 }} />
          </ServerItemLinesTop>
          <ServerItemLine style={{ width: 20 }} />
        </ServerItemLines>
      </ServerItem>
    </Container>
  );
}
