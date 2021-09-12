import { contextBridge, ipcRenderer } from 'electron';
import fs from 'fs';
var net = require('net');

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

    create() {
      // This server listens on a Unix socket at /var/run/mysocket
      var unixServer = net.createServer(function(client) {
        // Do something with the client connection
      });
      unixServer.listen('./mysocket');

      // This server listens on TCP/IP port 1234
      var tcpServer = net.createServer(function(client) {
        // Do something with the client connection
      });
      tcpServer.listen(1234);
    },
  },
});
