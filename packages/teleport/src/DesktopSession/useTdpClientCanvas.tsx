/*
Copyright 2021 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Attempt } from 'shared/hooks/useAttemptNext';
import { NotificationItem } from 'shared/components/Notification';

import { getPlatform } from 'design/theme/utils';

import { TdpClient, ButtonState, ScrollAxis } from 'teleport/lib/tdp';
import { ClipboardData, PngFrame } from 'teleport/lib/tdp/codec';
import { getAccessToken, getHostName } from 'teleport/services/api';
import cfg from 'teleport/config';
import { Sha256Digest } from 'teleport/lib/util';

import { TopBarHeight } from './TopBar';

declare global {
  interface Navigator {
    userAgentData?: { platform: any };
  }
}

export default function useTdpClientCanvas(props: Props) {
  const {
    username,
    desktopName,
    clusterId,
    setTdpConnection,
    setWsConnection,
    setClipboardSharingEnabled,
    setDirectorySharingState,
    clipboardSharingEnabled,
    setWarnings,
  } = props;
  const [tdpClient, setTdpClient] = useState<TdpClient | null>(null);
  const initialTdpConnectionSucceeded = useRef(false);
  const encoder = useRef(new TextEncoder());
  const latestClipboardDigest = useRef('');

  useEffect(() => {
    const { width, height } = getDisplaySize();

    const addr = cfg.api.desktopWsAddr
      .replace(':fqdn', getHostName())
      .replace(':clusterId', clusterId)
      .replace(':desktopName', desktopName)
      .replace(':token', getAccessToken())
      .replace(':username', username)
      .replace(':width', width.toString())
      .replace(':height', height.toString());

    setTdpClient(new TdpClient(addr));
  }, [clusterId, username, desktopName]);

  const syncCanvasSizeToDisplaySize = (canvas: HTMLCanvasElement) => {
    const { width, height } = getDisplaySize();

    canvas.width = width;
    canvas.height = height;
  };

  // Default TdpClientEvent.TDP_PNG_FRAME handler (buffered)
  const onPngFrame = (ctx: CanvasRenderingContext2D, pngFrame: PngFrame) => {
    // The first image fragment we see signals a successful tdp connection.
    if (!initialTdpConnectionSucceeded.current) {
      syncCanvasSizeToDisplaySize(ctx.canvas);
      setTdpConnection({ status: 'success' });
      initialTdpConnectionSucceeded.current = true;
    }
    ctx.drawImage(pngFrame.data, pngFrame.left, pngFrame.top);
  };

  // Default TdpClientEvent.TDP_CLIPBOARD_DATA handler.
  const onClipboardData = async (clipboardData: ClipboardData) => {
    if (clipboardSharingEnabled && document.hasFocus() && clipboardData.data) {
      navigator.clipboard.writeText(clipboardData.data);
      let digest = await Sha256Digest(clipboardData.data, encoder.current);
      latestClipboardDigest.current = digest;
    }
  };

  // Default TdpClientEvent.TDP_ERROR and TdpClientEvent.CLIENT_ERROR handler
  const onTdpError = (error: Error) => {
    setDirectorySharingState(prevState => ({
      ...prevState,
      isSharing: false,
    }));
    setClipboardSharingEnabled(false);
    setTdpConnection({
      status: 'failed',
      statusText: error.message,
    });
  };

  // Default TdpClientEvent.TDP_WARNING and TdpClientEvent.CLIENT_WARNING handler
  const onTdpWarning = (warning: string) => {
    setWarnings(prevState => {
      return [
        ...prevState,
        {
          content: warning,
          severity: 'warn',
          id: crypto.randomUUID(),
        },
      ];
    });
  };

  const onWsClose = () => {
    setWsConnection('closed');
  };

  const onWsOpen = () => {
    setWsConnection('open');
  };

  const { isMac } = getPlatform();
  /**
   * On MacOS Edge/Chrome/Safari, each physical CapsLock DOWN-UP registers
   * as either a single DOWN or single UP, with DOWN corresponding to
   * "CapsLock on" and UP to "CapsLock off". On MacOS Firefox, it always
   * registers as a DOWN.
   *
   * On Windows and Linux, all browsers treat CapsLock like a normal key.
   *
   * The remote Windows machine also treats CapsLock like a normal key, and
   * expects a DOWN-UP whenever it's pressed.
   */
  const handleCapsLock = (cli: TdpClient, e: KeyboardEvent): boolean => {
    if (e.code === 'CapsLock' && isMac) {
      cli.sendKeyboardInput(e.code, ButtonState.DOWN);
      cli.sendKeyboardInput(e.code, ButtonState.UP);
      return true;
    }
    return false;
  };

  const onKeyDown = (cli: TdpClient, e: KeyboardEvent) => {
    e.preventDefault();
    if (handleCapsLock(cli, e)) return;
    cli.sendKeyboardInput(e.code, ButtonState.DOWN);

    // The key codes in the if clause below are those that have been empirically determined not
    // to count as transient activation events. According to the documentation, a keydown for
    // the Esc key and any "shortcut key reserved by the user agent" don't count as activation
    // events: https://developer.mozilla.org/en-US/docs/Web/Security/User_activation.
    if (
      e.code !== 'MetaRight' &&
      e.code !== 'MetaLeft' &&
      e.code !== 'AltRight' &&
      e.code !== 'AltLeft'
    ) {
      // Opportunistically sync local clipboard to remote while
      // transient user activation is in effect.
      // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText#security
      sendLocalClipboardToRemote(cli);
    }
  };

  const onKeyUp = (cli: TdpClient, e: KeyboardEvent) => {
    e.preventDefault();
    if (handleCapsLock(cli, e)) return;

    cli.sendKeyboardInput(e.code, ButtonState.UP);
  };

  const onMouseMove = (
    cli: TdpClient,
    canvas: HTMLCanvasElement,
    e: MouseEvent
  ) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cli.sendMouseMove(x, y);
  };

  const onMouseDown = (cli: TdpClient, e: MouseEvent) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      cli.sendMouseButton(e.button, ButtonState.DOWN);
    }

    // Opportunistically sync local clipboard to remote while
    // transient user activation is in effect.
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText#security
    sendLocalClipboardToRemote(cli);
  };

  const onMouseUp = (cli: TdpClient, e: MouseEvent) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      cli.sendMouseButton(e.button, ButtonState.UP);
    }
  };

  const onMouseWheelScroll = (cli: TdpClient, e: WheelEvent) => {
    e.preventDefault();
    // We only support pixel scroll events, not line or page events.
    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
    if (e.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
      if (e.deltaX) {
        cli.sendMouseWheelScroll(ScrollAxis.HORIZONTAL, -e.deltaX);
      }
      if (e.deltaY) {
        cli.sendMouseWheelScroll(ScrollAxis.VERTICAL, -e.deltaY);
      }
    }
  };

  // Block browser context menu so as not to obscure the context menu
  // on the remote machine.
  const onContextMenu = () => false;

  const sendLocalClipboardToRemote = (cli: TdpClient) => {
    // We must check that the DOM is focused or navigator.clipboard.readText throws an error.
    if (clipboardSharingEnabled && document.hasFocus()) {
      navigator.clipboard.readText().then(text => {
        Sha256Digest(text, encoder.current).then(digest => {
          if (text && digest !== latestClipboardDigest.current) {
            cli.sendClipboardData({
              data: text,
            });
            latestClipboardDigest.current = digest;
          }
        });
      });
    }
  };

  return {
    tdpClient,
    onPngFrame,
    onTdpError,
    onClipboardData,
    onWsClose,
    onWsOpen,
    onKeyDown,
    onKeyUp,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseWheelScroll,
    onContextMenu,
    onTdpWarning,
  };
}

// Calculates the size (in pixels) of the display.
// Since we want to maximize the display size for the user, this is simply
// the full width of the screen and the full height sans top bar.
function getDisplaySize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight - TopBarHeight,
  };
}

type Props = {
  username: string;
  desktopName: string;
  clusterId: string;
  setTdpConnection: Dispatch<SetStateAction<Attempt>>;
  setWsConnection: Dispatch<SetStateAction<'open' | 'closed'>>;
  setClipboardSharingEnabled: Dispatch<SetStateAction<boolean>>;
  setDirectorySharingState: Dispatch<
    SetStateAction<{
      canShare: boolean;
      isSharing: boolean;
    }>
  >;
  clipboardSharingEnabled: boolean;
  setWarnings: Dispatch<SetStateAction<NotificationItem[]>>;
};
