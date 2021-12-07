import PtyProcess, { TermEventEnum } from './ptyProcess';
import {
  PtyCommand,
  PtyOptions,
  PtyServiceClient,
} from './types';
import { RuntimeSettings } from 'teleterm/types';

export default function createPtyService(
  runtimeSettings: RuntimeSettings
): PtyServiceClient {
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

        getWorkingDirectory() {
          return _ptyProcess.getWorkingDirectory();
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
        path: settings.defaultShell,
        args: [],
        cwd: cmd.cwd,
        env,
      };

    case 'tsh-login':
      return {
        path: settings.tshd.binaryPath,
        args: [
          `--proxy=${cmd.clusterId}`,
          'ssh',
          `${cmd.login}@${cmd.serverId}`,
        ],
        env,
      };
    default:
  }

  throw Error(`Unknown pty command type: ${cmd.kind}`);
}
