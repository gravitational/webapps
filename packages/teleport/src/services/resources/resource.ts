import { parse as yamlParse } from 'yaml';
import api from 'teleport/services/api';
import cfg from 'teleport/config';

import { makeResource, makeResourceList } from './';

class ResourceService {
  fetchTrustedClusters() {
    return api
      .get(cfg.getTrustedClustersUrl())
      .then(res => makeResourceList<'trusted_cluster'>(res));
  }

  fetchGithubConnectors() {
    return api
      .get(cfg.getGithubConnectorsUrl())
      .then(res => makeResourceList<'github'>(res));
  }

  fetchRoles() {
    return api
      .get(cfg.getRolesUrl())
      .then(res => makeResourceList<'role'>(res));
  }

  createTrustedCluster(content: string) {
    return api
      .post(cfg.getTrustedClustersUrl(), { content })
      .then(res => makeResource<'trusted_cluster'>(res));
  }

  createRole(content: string) {
    return api
      .post(cfg.getRolesUrl(), { content })
      .then(res => makeResource<'role'>(res));
  }

  createGithubConnector(content: string) {
    return api
      .post(cfg.getGithubConnectorsUrl(), { content })
      .then(res => makeResource<'github'>(res));
  }

  validateResourceUpdate(content: string, previousName: string) {
    let resource: any = {};
    try {
      resource = yamlParse(content);
    } catch (e) {
      // error if the resource definition is not YAML
      return Promise.reject(new Error('resource definition is not a valid YAML'));
    }

    const newName = resource?.metadata?.name;
    if (!newName) {
      // error if the resource doesn't have a name
      return Promise.reject(new Error('resource name in "metadata.name" is not found'));
    }

    if (newName !== previousName) {
      // error if the user tried to change the resource name
      return Promise.reject(new Error('resource renaming is not supported, please create a different resource and then delete this one'));
    }

    return Promise.resolve();
  }

  updateTrustedCluster(content: string, previousName: string) {
    return this.validateResourceUpdate(content, previousName)
      .then(_ => api.put(cfg.getTrustedClustersUrl(), { content }))
      .then(res => makeResource<'trusted_cluster'>(res));
  }

  updateRole(content: string, previousName: string) {
    return this.validateResourceUpdate(content, previousName)
      .then(_ => api.put(cfg.getRolesUrl(), { content }))
      .then(res => makeResource<'role'>(res));
  }

  updateGithubConnector(content: string, previousName: string) {
    return this.validateResourceUpdate(content, previousName)
      .then(_ => api.put(cfg.getGithubConnectorsUrl(), { content }))
      .then(res => makeResource<'github'>(res));
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
