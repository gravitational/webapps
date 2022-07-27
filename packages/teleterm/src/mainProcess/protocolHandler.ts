import type { protocol as ElectronProtocol } from 'electron';
import * as path from 'path';
import fs from 'fs';

import { Logger } from 'teleterm/types';

const disabledSchemes = [
  'about',
  'content',
  'chrome',
  'cid',
  'data',
  'filesystem',
  'ftp',
  'gopher',
  'javascript',
  'mailto',
];

export function installWebHandler({
  protocol,
  logger,
}: {
  protocol: typeof ElectronProtocol;
  logger: Logger;
}): void {
  disabledSchemes.forEach(scheme => {
    protocol.interceptFileProtocol(scheme, (_request, callback) => {
      logger.error(`Denying request: Invalid scheme (${scheme})`);
      callback({ error: -3 });
    });
  });
}

function eliminateAllAfterCharacter(string, character) {
  const index = string.indexOf(character);
  if (index < 0) {
    return string;
  }

  return string.slice(0, index);
}

function urlToPath(targetUrl, { isWin }) {
  const decoded = decodeURIComponent(targetUrl);
  const withoutScheme = decoded.slice(isWin ? 8 : 7);
  // Windows: file:///C:/path/to/file
  // unix: file:///path/to/file

  // remove any extra characters in requsted file path
  const withoutQuerystring = eliminateAllAfterCharacter(withoutScheme, '?');
  const withoutHash = eliminateAllAfterCharacter(withoutQuerystring, '#');

  return withoutHash;
}

// intercept, clean, and validate the requested file path.
export function interceptFileProtocol({
  protocol,
  isWin,
  installPath,
  logger,
}) {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const target = path.normalize(urlToPath(request.url, { isWin }));
    const realPath = fs.existsSync(target) ? fs.realpathSync(target) : target;

    if (!path.isAbsolute(realPath)) {
      logger.error(`Denying request to non-absolute path '${realPath}'`);
      return callback({ error: -3 });
    }

    if (!realPath.startsWith(installPath)) {
      logger.error(
        `Denying request to path '${realPath}' (installPath: '${installPath}'`
      );
      return callback({ error: -3 });
    }

    return callback({
      path: realPath,
    });
  });
}
