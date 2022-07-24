import type {
  protocol as ElectronProtocol,
  ProtocolRequest,
  ProtocolResponse,
} from 'electron';
import * as path from 'path';
import fs from 'fs';

type CallbackType = (response: string | ProtocolResponse) => void;

function _disabledHandler(
  _request: ProtocolRequest,
  callback: CallbackType
): void {
  callback({ error: -3 });
}

export function installWebHandler({
  protocol,
}: {
  protocol: typeof ElectronProtocol;
}): void {
  protocol.interceptFileProtocol('about', _disabledHandler);
  protocol.interceptFileProtocol('content', _disabledHandler);
  protocol.interceptFileProtocol('chrome', _disabledHandler);
  protocol.interceptFileProtocol('cid', _disabledHandler);
  protocol.interceptFileProtocol('data', _disabledHandler);
  protocol.interceptFileProtocol('filesystem', _disabledHandler);
  protocol.interceptFileProtocol('ftp', _disabledHandler);
  protocol.interceptFileProtocol('gopher', _disabledHandler);
  protocol.interceptFileProtocol('javascript', _disabledHandler);
  protocol.interceptFileProtocol('mailto', _disabledHandler);
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

  // remove any extra characters in requsted file path
  const withoutQuerystring = eliminateAllAfterCharacter(withoutScheme, '?');
  const withoutHash = eliminateAllAfterCharacter(withoutQuerystring, '#');

  return withoutHash;
}

// intercept, clean, and validate the requested file path.
export function interceptFileProtocol({
  protocol,
  isWin,
  userDataPath,
  installPath,
  logger,
}) {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const target = path.normalize(urlToPath(request.url, { isWin }));
    const realPath = fs.existsSync(target) ? fs.realpathSync(target) : target;
    const properCasing = isWin ? realPath.toLowerCase() : realPath;
    if (
      !properCasing.startsWith(
        isWin ? userDataPath.toLowerCase() : userDataPath
      ) &&
      !properCasing.startsWith(isWin ? installPath.toLowerCase() : installPath)
    ) {
      logger.error(
        `Denying request to path '${realPath}' (userDataPath: '${userDataPath}', installPath: '${installPath}'`
      );
      return callback();
    }

    if (!path.isAbsolute(realPath)) {
      logger.error(`Denying request to non-absolute path '${realPath}'`);
      return callback();
    }

    return callback({
      path: realPath,
    });
  });
}
