/*
Copyright 2019 Gravitational, Inc.

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

import React from 'react';
import { useStore, Store } from 'shared/libs/stores';
import { matchPath } from 'react-router';
import { tsh } from 'teleterm/ui/services/clusters/types';
import { IAppContext } from 'teleterm/ui/types';

type State = {
  navItems: ClusterNavItem[];
  navLocation: NavLocation;
  clusterUri: string;
  clusterName: string;
  connected: boolean;
  searchValue: string;
};

class ClusterContext extends Store<State> {
  clusterUri: string;
  cluster: tsh.Cluster;

  appCtx: IAppContext;

  state: State = {
    navItems: [],
    navLocation: '/resources/servers',
    clusterUri: '',
    clusterName: '',
    connected: false,
    searchValue: '',
  };

  login = () => {
    const { clusterUri } = this.state;
    this.appCtx.commandLauncher.executeCommand('cluster-login', { clusterUri });
  };

  connectServer = (serverUri: string) => {
    this.appCtx.commandLauncher.executeCommand('ssh', { serverUri });
  };

  connectDb = (dbUri: string) => {
    this.appCtx.commandLauncher.executeCommand('proxy-db', { dbUri });
  };

  sync = () => {
    this.appCtx.clustersService.syncRootCluster(this.state.clusterUri);
  };

  updateState = () => {
    const cluster = this.appCtx.clustersService.findCluster(this.clusterUri);
    if (cluster === this.cluster) {
      return;
    }

    this.cluster = cluster;
    this.state.connected = cluster.connected;
    this.state.clusterName = cluster.name;
    this.state.clusterUri = cluster.uri;
    this.state.navItems = getNavItems();
    this.setState(this.state);
  };

  constructor(clusterUri: string, appCtx: IAppContext) {
    super();
    this.clusterUri = clusterUri;
    this.appCtx = appCtx;
    this.appCtx.clustersService.subscribe(this.updateState);
    this.updateState();
  }

  dispose() {
    this.appCtx.clustersService.unsubscribe(this.updateState);
  }

  isLocationActive(location: NavLocation, exact = false) {
    return Boolean(
      matchPath(this.state.navLocation, {
        path: location,
        exact,
      })
    );
  }

  changeSearchValue = (searchValue: string) => {
    this.setState({ searchValue });
  };

  getServers() {
    return this.appCtx.clustersService.searchServers(this.state.clusterUri, {
      search: this.state.searchValue,
    });
  }

  getDbs() {
    return this.appCtx.clustersService.searchDbs(this.state.clusterUri, {
      search: this.state.searchValue,
    });
  }

  getKubes() {
    return this.appCtx.clustersService.searchKubes(this.state.clusterUri, {
      search: this.state.searchValue,
    });
  }

  getApps() {
    return this.appCtx.clustersService.searchApps(this.state.clusterUri, {
      search: this.state.searchValue,
    });
  }

  getSyncStatus() {
    return this.appCtx.clustersService.getClusterSyncStatus(
      this.state.clusterUri
    );
  }

  changeLocation(navLocation: NavLocation) {
    this.setState({
      navLocation,
    });
  }

  getNavItems() {
    return this.state.navItems;
  }

  useState() {
    return useStore(this).state;
  }
}

function getNavItems(): ClusterNavItem[] {
  return [
    {
      location: '/resources/',
      title: 'Resources',
    },
    {
      location: '/audit/',
      title: 'Audit/Monitoring',
    },
    {
      location: '/my-roles/',
      title: 'My Roles',
    },
  ];
}

const ClusterReactContext = React.createContext<ClusterContext>(null);

const ClusterContextProvider: React.FC<{ value: ClusterContext }> = props => {
  return <ClusterReactContext.Provider {...props} />;
};

const useClusterContext = () => {
  return React.useContext(ClusterReactContext);
};

export type ClusterNavItem = {
  location: NavLocation;
  title: string;
};

export type NavLocation =
  | '/audit/'
  | '/my-roles/'
  | '/resources/'
  | '/resources/databases'
  | '/resources/servers'
  | '/resources/apps'
  | '/resources/kubes';

export type ClusterTopNavItem = {
  navLocation: NavLocation;
  title: string;
};

export default ClusterContext;

export { ClusterContextProvider, ClusterReactContext, useClusterContext };
