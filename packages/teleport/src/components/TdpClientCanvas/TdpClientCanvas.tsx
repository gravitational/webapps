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
import React, { useEffect, useRef, CSSProperties } from 'react';
import { TdpClient, TdpClientEvent } from 'teleport/lib/tdp';
import { PngFrame, ClientScreenSpec } from 'teleport/lib/tdp/codec';

export default function TdpClientCanvas(props: Props) {
  const {
    tdpCli,
    tdpCliOnPngFrame,
    tdpCliOnTdpError,
    tdpCliOnWsClose,
    tdpCliOnWsOpen,
    tdpCliOnClientScreenSpec,
    onKeyDown,
    onKeyUp,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseWheelScroll,
    onContextMenu,
    style,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (tdpCli) {
      const canvas = canvasRef.current;
      // Make the canvas a focusable keyboard listener
      // https://stackoverflow.com/a/51267699/6277051
      // https://stackoverflow.com/a/16492878/6277051
      canvas.tabIndex = -1;
      canvas.style.outline = 'none';
      canvas.focus();

      const ctx = canvas.getContext('2d');

      // Buffered rendering logic
      var buffer: PngFrame[] = [];
      const renderBuffer = () => {
        if (buffer.length) {
          for (let i = 0; i < buffer.length; i++) {
            tdpCliOnPngFrame(ctx, buffer[i]);
          }
          buffer = [];
        }
        requestAnimationFrame(renderBuffer);
      };
      requestAnimationFrame(renderBuffer);

      tdpCli.on(TdpClientEvent.TDP_PNG_FRAME, (pngFrame: PngFrame) => {
        buffer.push(pngFrame);
      });

      tdpCli.on(
        TdpClientEvent.TDP_CLIENT_SCREEN_SPEC,
        (spec: ClientScreenSpec) => {
          tdpCliOnClientScreenSpec(canvas, spec);
        }
      );

      tdpCli.on(TdpClientEvent.TDP_ERROR, (err: Error) => {
        tdpCliOnTdpError(err);
      });

      tdpCli.on(TdpClientEvent.WS_CLOSE, () => {
        tdpCliOnWsClose();
      });

      tdpCli.on(TdpClientEvent.WS_OPEN, () => {
        tdpCliOnWsOpen();
      });

      // Initialize canvas, document, and window event listeners.

      // Prevent native context menu to not obscure remote context menu.
      const oncontextmenu = onContextMenu;
      canvas.oncontextmenu = oncontextmenu;

      // Mouse controls.
      const onmousemove = (e: MouseEvent) => {
        onMouseMove(tdpCli, canvas, e);
      };
      canvas.onmousemove = onmousemove;
      const onmousedown = (e: MouseEvent) => {
        onMouseDown(tdpCli, e);
      };
      canvas.onmousedown = onmousedown;
      const onmouseup = (e: MouseEvent) => {
        onMouseUp(tdpCli, e);
      };
      canvas.onmouseup = onmouseup;
      const onwheel = (e: WheelEvent) => {
        onMouseWheelScroll(tdpCli, e);
      };
      canvas.onwheel = onwheel;

      // Key controls.
      const onkeydown = (e: KeyboardEvent) => {
        onKeyDown(tdpCli, e);
      };
      canvas.onkeydown = onkeydown;
      const onkeyup = (e: KeyboardEvent) => {
        onKeyUp(tdpCli, e);
      };
      canvas.onkeyup = onkeyup;

      tdpCli.init();

      return () => {
        tdpCli.nuke();
        canvas.removeEventListener('contextmenu', oncontextmenu);
        canvas.removeEventListener('mousemove', onmousemove);
        canvas.removeEventListener('mousedown', onmousedown);
        canvas.removeEventListener('mouseup', onmouseup);
        canvas.removeEventListener('keydown', onkeydown);
        canvas.removeEventListener('keyup', onkeyup);
        canvas.removeEventListener('wheel', onwheel);
      };
    }
  }, [tdpCli]);

  return <canvas style={{ ...style }} ref={canvasRef} />;
}

export type Props = {
  tdpCli: TdpClient | null;
  tdpCliOnPngFrame: (ctx: CanvasRenderingContext2D, pngFrame: PngFrame) => void;
  tdpCliOnTdpError: (err: Error) => void;
  tdpCliOnWsClose: () => void;
  tdpCliOnWsOpen: () => void;
  tdpCliOnClientScreenSpec: (
    canvas: HTMLCanvasElement,
    spec: ClientScreenSpec
  ) => void;
  onKeyDown: (cli: TdpClient, e: KeyboardEvent) => void;
  onKeyUp: (cli: TdpClient, e: KeyboardEvent) => void;
  onMouseMove: (
    cli: TdpClient,
    canvas: HTMLCanvasElement,
    e: MouseEvent
  ) => void;
  onMouseDown: (cli: TdpClient, e: MouseEvent) => void;
  onMouseUp: (cli: TdpClient, e: MouseEvent) => void;
  onMouseWheelScroll: (cli: TdpClient, e: WheelEvent) => void;
  onContextMenu: () => void;
  style?: CSSProperties;
};
