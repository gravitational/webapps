import api from 'teleport/services/api';
import cfg from 'teleport/config';
import {
  makeResource,
  makeResourceList,
  KindGithubConnector,
  KindTrustedCluster,
  KindRole,
} from './';

class ResourceService {
  fetchTrustedClusters() {
    return api
      .get(cfg.getTrustedClustersUrl())
      .then(res => makeResourceList<KindTrustedCluster>(res));
  }

  fetchGithubConnectors() {
    return api
      .get(cfg.getGithubConnectorsUrl())
      .then(res => makeResourceList<KindGithubConnector>(res));
  }

  fetchRoles() {
    return api
      .get(cfg.getRolesUrl())
      .then(res => makeResourceList<KindRole>(res));
  }

  createTrustedCluster(content: string) {
    return api
      .post(cfg.getTrustedClustersUrl(), { content })
      .then(res => makeResource<KindTrustedCluster>(res));
  }

  createRole(content: string) {
    return api
      .post(cfg.getRolesUrl(), { content })
      .then(res => makeResource<KindRole>(res));
  }

  createGithubConnector(content: string) {
    return api
      .post(cfg.getGithubConnectorsUrl(), { content })
      .then(res => makeResource<KindGithubConnector>(res));
  }

  updateTrustedCluster(content: string) {
    return api
      .put(cfg.getTrustedClustersUrl(), { content })
      .then(res => makeResource<KindTrustedCluster>(res));
  }

  updateRole(content: string) {
    return api
      .put(cfg.getRolesUrl(), { content })
      .then(res => makeResource<KindRole>(res));
  }

  updateGithubConnector(content: string) {
    return api
      .put(cfg.getGithubConnectorsUrl(), { content })
      .then(res => makeResource<KindGithubConnector>(res));
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
