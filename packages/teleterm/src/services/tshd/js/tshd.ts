import { TerminalServiceClient } from 'teleterm/services/tshd/js/teleport/terminal/v1/terminal_service_grpc_pb';
import { ListClustersRequest } from 'teleterm/services/tshd/js/teleport/terminal/v1/terminal_service_pb';
import grpc from '@grpc/grpc-js';

const client = new TerminalServiceClient(
  '/home/alexey/go/src/github.com/gravitational/teleport/build/terminal.sock',
  grpc.credentials.createInsecure()
);

client.listClusters(new ListClustersRequest(), (err, data) => {
  console.log(data);
});
