import PtyProcess, { TermEventEnum } from './ptyProcess';
import { PtyOptions, PtyCommand } from './types';

export default function createPtyService(homeDir: string) {
  return {
    createPtyProcess(cmd: PtyCommand) {
      let options = buildOptions(cmd);

      options.env['TELEPORT_HOME'] = homeDir;

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
    },
  };
}

function buildOptions(cmd: PtyCommand): PtyOptions {
  switch (cmd.kind) {
    case 'new-shell':
      return {
        path: 'bash',
        args: [],
        env: {},
      };

    case 'tsh-login':
      return {
        path:
          '/home/alexey/go/src/github.com/gravitational/teleport/e/build/tsh',
        args: [
          `--proxy=${cmd.clusterId}`,
          'ssh',
          `${cmd.login}@${cmd.clusterId}`,
        ],
        env: {},
      };
    default:
  }

  throw Error(`Unknown pty command type: ${cmd.kind}`);
}
