import React from 'react';
import styled, { keyframes } from 'styled-components';

import background from './background.svg';
import logo from './logo.svg';

import { Fingerprint } from 'teleport/components/FormLogin/Fingerprint';
import { ChevronRight } from 'teleport/components/FormLogin/ChevronRight';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #000c1f;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  --rotate: 132deg;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: url(${background}) 0% 0% / cover;
`;

const Logo = styled.div`
  background: url(${logo}) no-repeat;
  background-size: contain;
  width: 110px;
  height: 110px;
  position: relative;
  z-index: 3;
`;

const color = keyframes`
  0% {
    fill: #7233d0;
  }

  100% {
    fill: white;
  }
`;

const FingerPrintDescription = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 15px;
  transition: 0.2s color cubic-bezier(0.4,0,0.2,1);
`;

const FingerPrintContainer = styled.div`
  background: linear-gradient(to right, white 0%, white 50%, #6734c8, #7233d0);
  background-size: 1200px 200px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 12px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s all cubic-bezier(0.4,0,0.2,1);
  
  &:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-0.25em);
  }
`;

const ChevronContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 10px;
  
  svg {
    width: 24px;
    height: 24px;
    
    path {
      fill: #7233d0;
    }
  }
`;

const FingerPrintIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  
  svg {
    width: 40px;
    height: 40px;
    
    path {
      fill: #7233d0;
    }
  }
`;

const Header = styled.div`
  height: 199px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Other = styled.div`
  position: relative;
  z-index: 3;
`;

const Content = styled.div`
  margin-bottom: 30px;
`;

const FingerPrintTitle = styled.div`
  font-size: 18px;
  display: flex;
`;

const FingerPrintInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

interface TouchIDProps {
  onLogin: () => void;
}

export function TouchID(props: TouchIDProps) {
  return (
    <Container>
      <BackgroundContainer/>
      <Header>
        <Logo />
      </Header>
      <Content>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Title>Sign into Teleport</Title>

          <FingerPrintContainer onClick={() => props.onLogin()}>
            <FingerPrintIcon>
              <Fingerprint />
            </FingerPrintIcon>
            <FingerPrintInfo>
              <FingerPrintTitle>
                Passwordless
              </FingerPrintTitle>
              <FingerPrintDescription>
                Follow the prompt from your browser
              </FingerPrintDescription>
            </FingerPrintInfo>
            <ChevronContainer>
              <ChevronRight />
            </ChevronContainer>
          </FingerPrintContainer>
        </div>
      </Content>
      <Other>
        Other sign-in options
      </Other>
    </Container>
  );
}
