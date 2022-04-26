import { RuntimeSettings } from 'teleterm/types';
import PtyProcess, { TermEventEnum } from './ptyProcess';
import { PtyCommand, PtyOptions, PtyServiceClient } from './types';
import { resolveShellEnvCached } from './resolveShellEnv';

export default function createPtyService(
  settings: RuntimeSettings
): PtyServiceClient {
  return {
    async createPtyProcess(cmd: PtyCommand) {
      const options = await buildOptions(settings, cmd);
      const _ptyProcess = new PtyProcess(options);

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

        onOpen(cb: () => void) {
          _ptyProcess.addListener(TermEventEnum.OPEN, cb);
        },

        getStatus() {
          return _ptyProcess.getStatus();
        },

        getPid() {
          return _ptyProcess.getPid();
        },

        getCwd() {
          return _ptyProcess.getCwd();
        },

        onExit(cb: (ev: { exitCode: number; signal?: number }) => void) {
          _ptyProcess.addListener(TermEventEnum.EXIT, cb);
        },
      };
    },
  };
}

async function buildOptions(
  settings: RuntimeSettings,
  cmd: PtyCommand
): Promise<PtyOptions> {
  const env = {
    ...process.env,
    ...(await resolveShellEnvCached(settings.defaultShell)),
    TELEPORT_HOME: settings.tshd.homeDir,
    TELEPORT_CLUSTER: cmd.actualClusterName,
    TELEPORT_PROXY: cmd.proxyHost,
  };

  switch (cmd.kind) {
    case 'pty.shell':
      return {
        path: settings.defaultShell,
        args: [],
        cwd: cmd.cwd,
        env,
        initCommand: cmd.initCommand,
      };

    case 'pty.tsh-kube-login':
      return {
        //path: settings.tshd.binaryPath,
        path: settings.defaultShell,
        args: [
          `-c`,
          `${settings.tshd.binaryPath}`,
          `--proxy=${cmd.rootClusterId}`,
          `kube`,
          `login`,
          `${cmd.kubeId}`,
        ],
        env,
      };

    case 'pty.tsh-login':
      const loginHost = cmd.login
        ? `${cmd.login}@${cmd.serverId}`
        : cmd.serverId;

      return {
        path: settings.tshd.binaryPath,
        args: [`--proxy=${cmd.rootClusterId}`, 'ssh', loginHost],
        env,
      };
    default:
      throw Error(`Unknown pty command: ${cmd}`);
  }
}
