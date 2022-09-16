import React from 'react';
import styled from 'styled-components';

import { Box, ButtonPrimary, Text } from 'design';

import { DesktopItem } from 'teleport/Discover/Desktop/DiscoverDesktops/DesktopItem';
import { Header } from 'teleport/Discover/Shared';
import { State } from 'teleport/Discover/useDiscover';
import { ProxyDesktopServiceDiagram } from 'teleport/Discover/Desktop/DiscoverDesktops/ProxyDesktopServiceDiagram';
import { usePoll } from 'teleport/Discover/Desktop/ConnectTeleport/usePoll';
import { useTeleport } from 'teleport';
import useStickyClusterId from 'teleport/useStickyClusterId';
import { usePingTeleport } from 'teleport/Discover/Desktop/ConnectTeleport/PingTeleportContext';

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

export function DiscoverDesktops(props: State) {
  const ctx = useTeleport();

  const desktopService = {
    hostname: 'windows-service.teleport.dev',
    addr: 'remote.windows_desktop.proxy.teleport.cluster.local',
    labels: [
      {
        name: 'teleport.internal/resource-id',
        value: 'f8e383d9-f9ea-4001-95c2-1c3238066c33',
      },
    ],
  };

  const { clusterId } = useStickyClusterId();
  const { result } = usePoll(
    signal =>
      ctx.desktopService.fetchDesktops(clusterId, { limit: 100 }, signal),
    10000000,
    true,
    1000
  );

  const desktops = [];
  if (result && result.agents) {
    const foundDesktops = result.agents
      .filter((desktop) => desktop.host_addr === desktopService.addr);

    if (foundDesktops.length) {
      for (const [index, desktop] of foundDesktops.entries()) {
        const os = desktop.labels.find((label) => label.name === 'teleport.dev/os').value;
        const osVersion = desktop.labels.find((label) => label.name === 'teleport.dev/os_version').value;
        const computerName = desktop.labels.find((label) => label.name === 'teleport.dev/computer_name').value;

        desktops.push(
          <DesktopItem
            key={index}
            os={os}
            osVersion={osVersion}
            computerName={computerName}
            address={desktop.addr}
          />
        );
      }
    }
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

        <FoundDesktops>
          {desktops}
        </FoundDesktops>
      </Desktops>

      <Buttons>
        <ButtonPrimary width="165px" mr={3} onClick={() => props.nextStep()}>
          Finish
        </ButtonPrimary>
      </Buttons>
    </Box>
  );
}
