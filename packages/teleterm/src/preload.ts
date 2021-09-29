import { contextBridge, ipcRenderer } from 'electron';
import fs from 'fs';
import { TerminalServiceClient } from './services/tshd/js/teleport/terminal/v1/terminal_service_grpc_pb';
import { ListClustersRequest } from './services/tshd/js/teleport/terminal/v1/terminal_service_pb';
import grpc from '@grpc/grpc-js';

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
      /*eslint no-debugger: off*/
      const client = new TerminalServiceClient(
        '/home/alexey/go/src/github.com/gravitational/teleport/build/terminal.sock',
        grpc.credentials.createInsecure()
      );

      client.listClusters(new ListClustersRequest(), (err, data) => {
        console.log(data);
      });
    },
  },
});
