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

import { Store } from 'shared/libs/stores';
import { NavItemCluster } from '../types';
import { Cluster } from './../../services/types';
import * as Icons from 'design/Icon';

const defaultState = {
  clusterItems: [] as NavItemCluster[],
};

export default class StoreNav extends Store<typeof defaultState> {
  state = {
    ...defaultState,
  };

  setClusterItems(clusters: Cluster[]) {
    const clusterItems = clusters.map(cluster => ({
      title: cluster.name,
      Icon: Icons.Clusters,
      id: cluster.uri,
    }));

    this.setState({ clusterItems });
  }

  getState() {
    return this.state;
  }
}

export type Item = {
  items: Item[];
  title: string;
  id: string;
  kind: 'cluster';
};
