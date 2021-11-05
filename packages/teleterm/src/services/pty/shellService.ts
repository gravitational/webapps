import childProcess from 'child_process';
import { readFile } from 'fs/promises';
import { Logger } from 'shared/libs/logger';

export async function getDefaultShell(): Promise<string> {
  const { platform } = process;
  const logger = new Logger('Shell Service');

  try {
    const shell = await getDefaultShellForPlatform(platform);
    if (!shell) {
      throw new Error('Platform shell type is empty');
    }
    return shell;
  } catch (error) {
    const fallbackShell = 'bash';

    logger.error(
      `Failed to read ${platform} platform default shell, using fallback: ${fallbackShell}.\n`,
      error
    );

    return fallbackShell;
  }
}

function getDefaultShellForPlatform(
  platform: string
): Promise<string | undefined> {
  switch (platform) {
    case 'darwin':
      return getMacDefaultShell();
    case 'linux':
      return getLinuxDefaultShell();
  }
}

function getMacDefaultShell(): Promise<string | undefined> {
  return new Promise((resolve, reject) =>
    childProcess.exec(
      '/usr/bin/dscl . -read ~/ UserShell',
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            response
              .toString()
              .split(' ')[1]
              ?.trim()
          );
        }
      }
    )
  );
}

async function getLinuxDefaultShell(): Promise<string | undefined> {
  return (await readFile('/etc/passwd', { encoding: 'utf-8' }))
    .split('\n')
    .find(line => line.startsWith(`${process.env.LOGNAME}:`));
}
