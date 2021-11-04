import PtyProcess, { TermEventEnum } from './ptyProcess';
import { PtyOptions, PtyCommand } from './types';
import { RuntimeSettings } from 'teleterm/types';

export default function createPtyService(settings: RuntimeSettings) {
  const runtimeSettings = settings;
  return {
    createPtyProcess(cmd: PtyCommand) {
      let options = buildOptions(runtimeSettings, cmd);
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

function buildOptions(settings: RuntimeSettings, cmd: PtyCommand): PtyOptions {
  const env = {
    TELEPORT_HOME: settings.tshd.homeDir,
  };

  switch (cmd.kind) {
    case 'new-shell':
      return {
        path: 'bash',
        args: [],
        env,
      };

    case 'tsh-login':
      return {
        path: settings.tshd.binaryPath,
        args: [
          `--proxy=${cmd.clusterId}`,
          'ssh',
          `${cmd.login}@${cmd.clusterId}`,
        ],
        env,
      };
    default:
  }

  throw Error(`Unknown pty command type: ${cmd.kind}`);
}
