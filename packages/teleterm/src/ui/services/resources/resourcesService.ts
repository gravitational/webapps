import { ServerSideParams, TshClient } from 'teleterm/services/tshd/types';

export class ResourcesService {
  constructor(private tshClient: TshClient) {}

  fetchServers(params: ServerSideParams) {
    return this.tshClient.getServers(params);
  }
}
