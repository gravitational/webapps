import React from 'react';
import styled, { keyframes } from 'styled-components';

const ripple = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0),
    0 0 0 40px rgba(255, 255, 255, 0.18);
  }
  100% {
    box-shadow: 0 0 0 40px rgba(255, 255, 255, 0.18),
    0 0 0 40px rgba(204, 233, 251, 0);
  }
`;

const scale = keyframes`
  50% {
    transform: scale(1.15);
  }
  0%,
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 10px;
  justify-content: center;
  height: 82px;
`;

const Ripple = styled.div`
  animation: ${ripple} 1.5s linear infinite;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 10px));

  &::after {
    z-index: 0;
    border-radius: 50%;
    position: absolute;
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    background: rgba(34, 44, 89, 1);
    transform: scale(1);
  }
`;

const DesktopServiceItem = styled.div`
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

const DesktopServiceItemLights = styled.div`
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

const DesktopServiceItemLight = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
`;

const DesktopServiceItemLightGreen = styled(DesktopServiceItemLight)`
  background: #31c842;
`;

const DesktopServiceItemLightGreen1 = styled(DesktopServiceItemLightGreen)`
  animation: ${blink} 8s step-start 0s infinite;
`;

const DesktopServiceItemLightGreen2 = styled(DesktopServiceItemLightGreen)`
  animation: ${blink2} 10s step-start 0s infinite;
`;

const DesktopServiceItemLightGreen3 = styled(DesktopServiceItemLightGreen)`
  animation: ${blink3} 12s step-start 0s infinite;
`;

const DesktopServiceItemLines = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  flex-direction: column;
`;

const DesktopServiceItemLine = styled.div`
  height: 3px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.4);
  margin-left: 5px;
  overflow: hidden;
`;

const DesktopServiceItemLinesTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

export function DesktopService() {
  return (
    <Container>
      <Ripple />
      <DesktopServiceItem>
        <DesktopServiceItemLights>
          <DesktopServiceItemLightGreen1 />
        </DesktopServiceItemLights>
        <DesktopServiceItemLines>
          <DesktopServiceItemLinesTop>
            <DesktopServiceItemLine style={{ width: 5 }} />
            <DesktopServiceItemLine style={{ width: 30 }} />
          </DesktopServiceItemLinesTop>
          <DesktopServiceItemLine style={{ width: 20 }} />
        </DesktopServiceItemLines>
      </DesktopServiceItem>
    </Container>
  );
}
