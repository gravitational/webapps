import {
  PtyClientEvent,
  PtyEventData,
  PtyEventResize,
  PtyEventStart,
  PtyId,
  PtyServerEvent,
} from '../../api/protogen/ptyHostService_pb';
import { PtyHostClient } from '../../api/protogen/ptyHostService_grpc_pb';
import { PtyProcess } from '../types';
import { Metadata } from '@grpc/grpc-js';

export function createPtyProcessClient(
  client: PtyHostClient,
  ptyId: string
): PtyProcess {
  const metadata = new Metadata();
  metadata.set('ptyId', ptyId);
  const stream = client.exchangeEvents(metadata);

  function writeOrThrow(event: PtyClientEvent) {
    return stream.write(event, (error: Error | undefined) => {
      if (error) {
        throw error;
      }
    });
  }

  return {
    start(columns: number, rows: number): void {
      writeOrThrow(
        new PtyClientEvent().setStart(
          new PtyEventStart().setColumns(columns).setRows(rows)
        )
      );
    },

    write(data: string): void {
      writeOrThrow(
        new PtyClientEvent().setData(new PtyEventData().setMessage(data))
      );
    },

    onData(callback: (data: string) => void): void {
      stream.addListener('data', (event: PtyServerEvent) => {
        if (event.hasData()) {
          callback(event.getData().getMessage());
        }
      });
    },

    onOpen(callback: () => void): void {
      stream.addListener('data', (event: PtyServerEvent) => {
        if (event.hasOpen()) {
          callback();
        }
      });
    },

    onExit(
      callback: (reason: { exitCode: number; signal?: number }) => void
    ): void {
      stream.addListener('data', (event: PtyServerEvent) => {
        if (event.hasExit()) {
          callback(event.getExit().toObject());
        }
      });
    },

    dispose(): void {
      stream.end();
      stream.removeAllListeners();
    },

    resize(columns: number, rows: number): void {
      writeOrThrow(
        new PtyClientEvent().setResize(
          new PtyEventResize().setColumns(columns).setRows(rows)
        )
      );
    },

    getCwd(): Promise<string> {
      return new Promise((resolve, reject) => {
        client.getCwd(new PtyId().setId(ptyId), (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.toObject().cwd);
          }
        });
      });
    },
  };
}
