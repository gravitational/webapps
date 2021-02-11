import api from 'teleport/services/api';
import cfg from 'teleport/config';
import { makeResource, makeResourceList } from './';

class ResourceService {
  fetchTrustedClusters() {
    return api.get(cfg.getTrustedClustersUrl()).then(makeResourceList);
  }

  fetchGithubConnectors() {
    return api.get(cfg.getGithubConnectorsUrl()).then(makeResourceList);
  }

  fetchRoles() {
    return api.get(cfg.getRolesUrl()).then(makeResourceList);
  }

  createTrustedCluster(content: string) {
    return api
      .post(cfg.getTrustedClustersUrl(), { content })
      .then(makeResource);
  }

  createRole(content: string) {
    return api.post(cfg.getRolesUrl(), { content }).then(makeResource);
  }

  createGithubConnector(content: string) {
    return api
      .post(cfg.getGithubConnectorsUrl(), { content })
      .then(makeResource);
  }

  updateTrustedCluster(content: string) {
    return api.put(cfg.getTrustedClustersUrl(), { content }).then(makeResource);
  }

  updateRole(content: string) {
    return api.put(cfg.getRolesUrl(), { content }).then(makeResource);
  }

  updateGithubConnector(content: string) {
    return api
      .put(cfg.getGithubConnectorsUrl(), { content })
      .then(makeResource);
  }

  deleteTrustedCluster(name: string) {
    return api.delete(cfg.getTrustedClustersUrl(name));
  }

  deleteRole(name: string) {
    return api.delete(cfg.getRolesUrl(name));
  }

  deleteGithubConnector(name: string) {
    return api.delete(cfg.getGithubConnectorsUrl(name));
  }
}

export default ResourceService;
