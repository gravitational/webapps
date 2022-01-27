import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { PlayerClient, PlayerClientEvent } from 'teleport/lib/tdp/playerClient';
import cfg from 'teleport/config';
import { getAccessToken, getHostName } from 'teleport/services/api';
import TdpClientCanvas from 'teleport/components/TdpClientCanvas';
import { ImageFragment } from 'teleport/lib/tdp/client';

export const DesktopPlayer = ({
  sid,
  clusterId,
}: {
  sid: string;
  clusterId: string;
}) => {
  const { playerClient, tdpCliOnImageFragment } = useDesktopPlayer({
    sid,
    clusterId,
  });
  return (
    <StyledPlayer>
      <TdpClientCanvas
        tdpCli={playerClient}
        tdpCliOnImageFragment={tdpCliOnImageFragment}
        tdpCliOnTdpError={(err: Error) => {}} // TODO: we should show an error
        tdpCliOnWsClose={() => {}}
        tdpCliOnWsOpen={() => {}}
        onKeyDown={(cli: PlayerClient, e: KeyboardEvent) => {}}
        onKeyUp={(cli: PlayerClient, e: KeyboardEvent) => {}}
        onMouseMove={(
          cli: PlayerClient,
          canvas: HTMLCanvasElement,
          e: MouseEvent
        ) => {}}
        onMouseDown={(cli: PlayerClient, e: MouseEvent) => {}}
        onMouseUp={(cli: PlayerClient, e: MouseEvent) => {}}
        onMouseWheelScroll={(cli: PlayerClient, e: WheelEvent) => {}}
        // overflow: 'hidden' is needed to prevent the canvas from outgrowing the container due to some weird css flex idiosyncracy.
        // See https://gaurav5430.medium.com/css-flex-positioning-gotchas-child-expands-to-more-than-the-width-allowed-by-the-parent-799c37428dd6.
        style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}
      />
      <ProgressBarDesktop playerClient={playerClient} />
    </StyledPlayer>
  );
};

export const ProgressBarDesktop = (props: { playerClient: PlayerClient }) => {
  const { playerClient } = props;

  const [state, setState] = useState({
    max: 500, // TODO: total time of the recording in ms
    min: 0, // TODO: the recording always starts at 0 ms
    current: 0, // TODO: the current time the playback is at
    time: '-:--', // TODO: the human readable time the playback is at
    isPlaying: true, // determines whether play or pause symbol is shown
    move: value => {
      console.log(value);
    },
    toggle: () => {
      // emits PlayerClientEvent.TOGGLE_PLAY_PAUSE
      playerClient.togglePlayPause();
    },
  });

  playerClient.on(PlayerClientEvent.TOGGLE_PLAY_PAUSE, () => {
    setState({
      ...state,
      isPlaying: !state.isPlaying,
    });
  });

  return <ProgressBar {...state} />;
};

const useDesktopPlayer = ({
  sid,
  clusterId,
}: {
  sid: string;
  clusterId: string;
}) => {
  const playerClient = new PlayerClient(
    cfg.api.desktopPlaybackWsAddr
      .replace(':fqdm', getHostName())
      .replace(':clusterId', clusterId)
      .replace(':sid', sid)
      .replace(':token', getAccessToken())
  );

  const firstImageFragmentRef = useRef(true);

  const tdpCliOnImageFragment = (
    ctx: CanvasRenderingContext2D,
    data: ImageFragment
  ) => {
    if (firstImageFragmentRef.current) {
      ctx.canvas.width = ctx.canvas.clientWidth;
      ctx.canvas.height = ctx.canvas.clientHeight;
      firstImageFragmentRef.current = false;
    }
    ctx.drawImage(data.image, data.left, data.top);
  };

  return {
    playerClient,
    tdpCliOnImageFragment,
  };
};

const StyledPlayer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
