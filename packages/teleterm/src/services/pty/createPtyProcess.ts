import * as types from './types';
import PtyProcess, { TermEventEnum } from './ptyProcess';

export default function createPtyProcess(options: types.PtyOptions) {
  let _ptyProcess = new PtyProcess(options);

  return {
    start(cols: number, rows: number) {
      _ptyProcess.start(cols, rows);
    },

    write(data: string) {
      _ptyProcess.send(data);
    },

    resize(cols: number, rows: number) {
      _ptyProcess.resize(cols, rows);
    },

    dispose() {
      _ptyProcess.dispose();
    },

    onData(cb: (data: string) => void) {
      _ptyProcess.addListener(TermEventEnum.DATA, cb);
    },

    onExit(cb: (ev: { exitCode: number; signal?: number }) => void) {
      _ptyProcess.addListener(TermEventEnum.EXIT, cb);
    },
  };
}
