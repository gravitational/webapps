import { ServerDuplexStream } from '@grpc/grpc-js';
import {
  PtyClientEvent,
  PtyEventData,
  PtyEventExit,
  PtyEventOpen,
  PtyEventResize,
  PtyEventStart,
  PtyServerEvent,
} from '../api/protogen/ptyHostService_pb';
import Logger from 'teleterm/logger';
import { PtyProcess } from './ptyProcess';

export class PtyEventsStreamHandler {
  private readonly ptyId: string;
  private readonly ptyProcess: PtyProcess;
  private readonly logger: Logger;

  constructor(
    private readonly stream: ServerDuplexStream<PtyClientEvent, PtyServerEvent>,
    private readonly ptyProcesses: Map<string, PtyProcess>
  ) {
    this.ptyId = stream.metadata.get('ptyId')[0].toString();
    this.ptyProcess = ptyProcesses.get(this.ptyId);
    this.logger = new Logger(`PtyEventsStreamHandler (id: ${this.ptyId})`);

    stream.addListener('data', event => this.handleStreamData(event));
    stream.addListener('error', event => this.handleStreamError(event));
    stream.addListener('end', () => this.handleStreamEnd());
  }

  private handleStreamData(event: PtyClientEvent): void {
    switch (event.getEventCase()) {
      case PtyClientEvent.EventCase.START:
        return this.handleStartEvent(event.getStart());
      case PtyClientEvent.EventCase.DATA:
        return this.handleDataEvent(event.getData());
      case PtyClientEvent.EventCase.RESIZE:
        return this.handleResizeEvent(event.getResize());
    }
  }

  private handleStartEvent(event: PtyEventStart): void {
    this.ptyProcess.onData(data =>
      this.stream.write(
        new PtyServerEvent().setData(new PtyEventData().setMessage(data))
      )
    );
    this.ptyProcess.onOpen(() =>
      this.stream.write(new PtyServerEvent().setOpen(new PtyEventOpen()))
    );
    this.ptyProcess.onExit(({ exitCode, signal }) =>
      this.stream.write(
        new PtyServerEvent().setExit(
          new PtyEventExit().setExitCode(exitCode).setSignal(signal)
        )
      )
    );
    this.ptyProcess.start(event.getColumns(), event.getRows());
    this.logger.info(`stream has started`);
  }

  private handleDataEvent(event: PtyEventData): void {
    this.ptyProcess.write(event.getMessage());
  }

  private handleResizeEvent(event: PtyEventResize): void {
    this.ptyProcess.resize(event.getColumns(), event.getRows());
  }

  private handleStreamError(error: Error): void {
    this.logger.error(`stream has ended with error`, error);
    this.cleanResources();
  }

  private handleStreamEnd(): void {
    this.logger.info(`stream has ended`);
    this.cleanResources();
  }

  private cleanResources(): void {
    this.ptyProcess.dispose();
    if (this.ptyId) {
      this.ptyProcesses.delete(this.ptyId);
    }
    this.stream.destroy();
    this.stream.removeAllListeners();
  }
}
