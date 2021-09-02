const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

console.log('PRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRREFD');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    read() {
      return fs.readFileSync('./mama.json');
    },

    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
