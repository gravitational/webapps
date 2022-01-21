import React, { useRef } from 'react';
import styled from 'styled-components';
import { Flex } from 'design';
import ProgressBar from './ProgressBar';
import { PlayerClient } from 'teleport/lib/tdp/playerClient';
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
  const playerClient = new PlayerClient(
    cfg.api.desktopPlaybackWsAddr
      .replace(':fqdm', getHostName())
      .replace(':clusterId', clusterId)
      .replace(':sid', sid)
      .replace(':token', getAccessToken())
  );

  const firstImageFragmentRef = useRef(true);

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
      <TdpClientCanvas
        tdpCli={playerClient}
        tdpCliOnImageFragment={(
          ctx: CanvasRenderingContext2D,
          data: ImageFragment
        ) => {
          if (firstImageFragmentRef.current) {
            ctx.canvas.width = ctx.canvas.clientWidth;
            ctx.canvas.height = ctx.canvas.clientHeight;
            firstImageFragmentRef.current = false;
          }
          ctx.drawImage(data.image, data.left, data.top);
        }}
        tdpCliOnTdpError={(err: Error) => {}} // TODO: we should show an error
        tdpCliOnWsClose={() => {}} // TODO: restart?
        tdpCliOnWsOpen={() => {}}
        onKeyDown={(cli: PlayerClient, e: KeyboardEvent) => {}} // TODO: make these nullable and modify TdpClientCanvas so as not to prevent defaults?
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
      <ProgressBar {...state} />
    </StyledPlayer>
  );
};

const StyledPlayer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
