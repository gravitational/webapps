import * as types from 'teleterm/services/pty/types';

export default class PtyService {
  ptyProvider: types.PtyServiceClient;

  constructor(ptyProvider: types.PtyServiceClient) {
    this.ptyProvider = ptyProvider;
  }

  createPtyProcess(cmd: types.PtyCommand) {
    return this.ptyProvider.createPtyProcess(cmd);
  }
}

/*

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// References to the same file (works both for gzip and brotli):
// `'use`, `andom`, and `rict'`
// References to the brotli default dictionary:
// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

let customAlphabet = (alphabet, size) => {
  return () => {
    let id = ''
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size
    while (i--) {
      // `| 0` is more compact and faster than `Math.floor()`.
      id += alphabet[(Math.random() * alphabet.length) | 0]
    }
    return id
  }
}

let nanoid = (size = 21) => {
  let id = ''
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}

module.exports = { nanoid, customAlphabet }

*/
