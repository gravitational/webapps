import { ServerSideParams, TshClient } from 'teleterm/services/tshd/types';

export class ResourcesService {
  constructor(private tshClient: TshClient) {}

  async fetchServers(params: ServerSideParams) {
    return await this.tshClient.getServers(params);
  }
}
