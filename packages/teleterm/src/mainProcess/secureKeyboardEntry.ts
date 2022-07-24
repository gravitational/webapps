import { ipcRenderer } from 'electron';

export function setSecureKeyboardEntry(enabled): void {
  return ipcRenderer.send('set-secure-keyboard-entry', enabled);
}
