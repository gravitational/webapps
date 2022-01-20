import React from 'react';
import styled from 'styled-components';
import { Flex } from 'design';
import ProgressBar from './ProgressBar';
import { PlayerClient } from 'teleport/lib/tdp/playerClient';
import cfg from 'teleport/config';
import { getAccessToken, getHostName } from 'teleport/services/api';

export const DesktopPlayer = ({
  sid,
  clusterId,
}: {
  sid: string;
  clusterId: string;
}) => {
  console.log(
    cfg.api.desktopPlaybackWsAddr
      .replace(':fqdm', getHostName())
      .replace(':clusterId', clusterId)
      .replace(':sid', sid)
      .replace(':token', getAccessToken())
  );
  const playerClient = new PlayerClient(
    cfg.api.desktopPlaybackWsAddr
      .replace(':fqdm', getHostName())
      .replace(':clusterId', clusterId)
      .replace(':sid', sid)
      .replace(':token', getAccessToken())
  );

  playerClient.init();

  const state = {
    max: 500, // total time of the recording in ms
    min: 0, // the recording always starts at 0 ms
    current: 250, // the current time the playback is at
    time: '3:00', // the human readable time the playback is at
    isPlaying: false, // determines whether play or pause symbol is shown
    move: value => {
      console.log(value);
    },
    toggle: () => {
      console.log('toggled!');
    },
  };

  return (
    <StyledPlayer>
      <Flex flex="1" flexDirection="column" overflow="auto">
        Desktop Player
      </Flex>
      <ProgressBar {...state} />
    </StyledPlayer>
  );
};

const StyledPlayer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;
