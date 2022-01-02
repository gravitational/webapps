import { readlink } from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import { RuntimeSettings } from 'teleterm/types';
import Logger from 'teleterm/logger';
import PtyProcess, { TermEventEnum } from './ptyProcess';
import { PtyCommand, PtyOptions, PtyServiceClient } from './types';

export default function createPtyService(
  settings: RuntimeSettings
): PtyServiceClient {
  const logger = new Logger('PTY Service');
  return {
    async getWorkingDirectory(pid: number): Promise<string> {
      try {
        switch (process.platform) {
          case 'darwin':
            const asyncExec = promisify(exec);
            // -a: join using AND instead of OR for the -p and -d options
            // -p: PID
            // -d: only include the file descriptor, cwd
            // -F: fields to output (the n character outputs 3 things, the last one is cwd)
            const { stdout, stderr } = await asyncExec(
              `lsof -a -p ${pid} -d cwd -F n`
            );
            if (stderr) {
              throw new Error(stderr);
            }
            return stdout.split('\n').filter(Boolean).reverse()[0].substring(1);
          case 'linux':
            const asyncReadlink = promisify(readlink);
            return await asyncReadlink(`/proc/${pid}/cwd`);
        }
      } catch (error) {
        logger.error(`Cannot read working directory for PID: ${pid}`, error);
        throw new Error(error);
      }
    },

    createPtyProcess(cmd: PtyCommand) {
      let options = buildOptions(settings, cmd);
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

        getPid() {
          return _ptyProcess.getPid();
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
      if (cmd.leafClusterId) {
        env['TELEPORT_CLUSTER'] = cmd.leafClusterId;
      }

      return {
        path: settings.tshd.binaryPath,
        args: [
          `--proxy=${cmd.rootClusterId}`,
          'ssh',
          `${cmd.login}@${cmd.serverId}`,
        ],
        env,
      };
    default:
  }

  throw Error(`Unknown pty command type: ${cmd.kind}`);
}
