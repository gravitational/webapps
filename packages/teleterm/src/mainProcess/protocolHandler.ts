import { protocol } from 'electron';
import { fileURLToPath } from 'node:url';
import * as path from 'path';
import fs from 'fs';
import Logger from 'teleterm/logger';

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

const logger = new Logger('WebHandlerProtection');

// intercept, clean, and validate the requested file path.
export function enableWebHandlerProtection({
  installPath,
}: {
  installPath: string;
}) {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const target = path.normalize(fileURLToPath(request.url));
    const realPath = fs.existsSync(target) ? fs.realpathSync(target) : target;

    if (!path.isAbsolute(realPath)) {
      logger.error(`Denying request to non-absolute path '${realPath}'`);
      return callback({ error: -3 });
    }

    if (!realPath.startsWith(installPath)) {
      logger.error(
        `Denying request to path '${realPath}' (Not in installPath: '${installPath}'`
      );
      return callback({ error: -3 });
    }

    return callback({
      path: realPath,
    });
  });

  disabledSchemes.forEach(scheme => {
    protocol.interceptFileProtocol(scheme, (_request, callback) => {
      logger.error(`Denying request: Invalid scheme (${scheme})`);
      callback({ error: -3 });
    });
  });
}
