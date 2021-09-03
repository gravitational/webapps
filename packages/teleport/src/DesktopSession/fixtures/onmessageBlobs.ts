/*
Copyright 2021 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// onMessageUint8Arrays is an array of objects (each representing a Uint8Array) that were saved by converting
// all the websocket messages to Uint8Array's and saving them as a big json list, when first connecting to a remote machine.
// Therefore when displayed sequentially via the DesktopSession client, they show what one would expect when a user connects
// and logs in over TDP.
import onMessageUint8Arrays from './windows.onmessage.ev.data.json';

// Convert the array of Uint8Arrays into an array of Blobs for use in simulating the websocket onmessage events.
// The blobs from onmessage(ev => ev.data) were saved as an array of objects, with each object representing a Uint8Array.
// E.g.
// [
//   { '0': 2, '1': 45 , ...},
//   { '0': 78, '1': 0 , ...},
//   ...
// ]
// needs to be converted into
// [
//   Uint8Array([2, 45, ...]),
//   Uint8Array([78, 0, ...]),
//   ...
// ]
const data = onMessageUint8Arrays as Array<{ index: string; value: number }>;
const blobArray: Blob[] = [];
data.forEach(obj => {
  let uint8array = new Uint8Array(Object.keys(obj).map(key => obj[key]));
  blobArray.push(new Blob([uint8array]));
});

export default blobArray;
