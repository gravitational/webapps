import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Box, ButtonPrimary, Text } from 'design';

import { DesktopItem } from 'teleport/Discover/Desktop/DiscoverDesktops/DesktopItem';
import { Header } from 'teleport/Discover/Shared';
import { State } from 'teleport/Discover/useDiscover';
import { ProxyDesktopServiceDiagram } from 'teleport/Discover/Desktop/DiscoverDesktops/ProxyDesktopServiceDiagram';
import { usePoll } from 'teleport/Discover/Desktop/ConnectTeleport/usePoll';
import { useTeleport } from 'teleport';
import useStickyClusterId from 'teleport/useStickyClusterId';
import { usePingTeleport, usePingTeleportResult } from 'teleport/Discover/Desktop/ConnectTeleport/PingTeleportContext';
import cfg from 'teleport/config';
import { NavLink } from 'teleport/components/Router';

const Desktops = styled.div`
  margin-top: 120px;
  margin-left: -40px;
  display: flex;
`;

const Buttons = styled.div`
  margin-top: 100px;
`;

const FoundDesktops = styled.div`
  margin-left: 75px;
  margin-top: -30px;
`;

const MAX_COUNT = 12;
const POLL_TIMEOUT = 1000 * 60 * 10; // 10 minutes
const POLL_INTERVAL = 1000 * 3; // 3 seconds

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
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
`;

const ViewLink = styled(NavLink)`
  background: #0091ea;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
  text-decoration: none;
  padding: 3px 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #4db2f0;
  }
`;

const TimedOutTitle = styled.div`
  color: #f50057;
  font-weight: bold;
  font-size: 16px;
`;

export function DiscoverDesktops(props: State) {
  const ctx = useTeleport();

  const desktopService = usePingTeleportResult();

  const [enabled, setEnabled] = useState(true);
  const { clusterId } = useStickyClusterId();
  const { timedOut, result } = usePoll(
    signal =>
      ctx.desktopService.fetchDesktops(clusterId, { limit: MAX_COUNT }, signal),
    POLL_TIMEOUT,
    enabled,
    POLL_INTERVAL
  );

  useEffect(() => {
    if (enabled && result && result.agents.length === MAX_COUNT) {
      setEnabled(false);
    }
  }, [enabled, result]);

  const desktops = [];
  if (result && result.agents) {
    const foundDesktops = result.agents.filter(
      desktop => desktop.host_addr === desktopService.name
    );

    const numberOfFoundDesktops = foundDesktops.length;
    if (foundDesktops.length) {
      for (const [index, desktop] of foundDesktops.entries()) {
        const os = desktop.labels.find(
          label => label.name === 'teleport.dev/os'
        ).value;
        const osVersion = desktop.labels.find(
          label => label.name === 'teleport.dev/os_version'
        ).value;

        desktops.push(
          <DesktopItem
            key={index}
            os={os}
            osVersion={osVersion}
            computerName={desktop.name}
            address={desktop.addr}
          />
        );

        if (numberOfFoundDesktops > 1) {
          let amount;
          let word = 'Desktops';
          if (numberOfFoundDesktops === 1) {
            word = 'Desktop';
          }

          if (numberOfFoundDesktops > 11) {
            amount = '10+';
          } else {
            amount = `${numberOfFoundDesktops - 1}`;
          }

          desktops.push(
            <ContentBox key="view-more">
              We've found {amount} more {word}.{' '}
              <ViewLink to={cfg.getDesktopsRoute(clusterId)}>
                View them all here
              </ViewLink>
            </ContentBox>
          );
        }
      }
    }
  }

  let content;
  if (timedOut) {
    content = (
      <ContentBox>
        <TimedOutTitle>Oh no!</TimedOutTitle> We could not find any Desktops.
        Connect Desktops to your Active Directory for Teleport to automatically
        discover them.
      </ContentBox>
    );
  } else {
    content = desktops;
  }

  return (
    <Box>
      <Header>Discover Desktops</Header>
      <Text>
        We're discovering Desktops that are already connected to your Active
        Directory.
      </Text>

      <Desktops>
        <ProxyDesktopServiceDiagram />

        <FoundDesktops>{content}</FoundDesktops>
      </Desktops>

      <Buttons>
        <ButtonPrimary width="165px" mr={3} onClick={() => props.nextStep()}>
          Finish
        </ButtonPrimary>
      </Buttons>
    </Box>
  );
}
