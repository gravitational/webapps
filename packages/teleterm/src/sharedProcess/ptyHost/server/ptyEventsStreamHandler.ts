import { ServerDuplexStream } from '@grpc/grpc-js';
import {
  PtyClientEvent,
  PtyEventData,
  PtyEventExit,
  PtyEventOpen,
  PtyEventResize,
  PtyEventStart,
  PtyServerEvent,
} from '../../api/protogen/ptyHostService_pb';
import { PtyProcess } from '../server/ptyProcess';

export class PtyEventsStreamHandler {
  private readonly ptyId: string;

  constructor(
    private readonly stream: ServerDuplexStream<PtyClientEvent, PtyServerEvent>,
    private readonly ptyProcesses: Map<string, PtyProcess>
  ) {
    this.ptyId = stream.metadata.get('ptyId')[0].toString();
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
    const ptyProcess = this.getPtyProcess();
    ptyProcess.onData(data =>
      this.stream.write(
        new PtyServerEvent().setData(new PtyEventData().setMessage(data))
      )
    );
    ptyProcess.onOpen(() =>
      this.stream.write(new PtyServerEvent().setOpen(new PtyEventOpen()))
    );
    ptyProcess.onExit(({ exitCode, signal }) =>
      this.stream.write(
        new PtyServerEvent().setExit(
          new PtyEventExit().setExitCode(exitCode).setSignal(signal)
        )
      )
    );
    ptyProcess.start(event.getColumns(), event.getRows());
  }

  private handleDataEvent(event: PtyEventData): void {
    this.getPtyProcess()?.write(event.getMessage());
  }

  private handleResizeEvent(event: PtyEventResize): void {
    this.getPtyProcess()?.resize(event.getColumns(), event.getRows());
  }

  private handleStreamError(error: Error): void {
    console.error(error); //TODO(gzdunek) use proper logger
    this.cleanResources();
  }

  private handleStreamEnd(): void {
    this.cleanResources();
  }

  private cleanResources(): void {
    this.getPtyProcess()?.dispose();
    if (this.ptyId) {
      this.ptyProcesses.delete(this.ptyId);
    }
    this.stream.destroy();
    this.stream.removeAllListeners();
  }

  private getPtyProcess(): PtyProcess | undefined {
    return this.ptyProcesses.get(this.ptyId);
  }
}
