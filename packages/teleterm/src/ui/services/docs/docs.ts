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

import { matchPath, generatePath } from 'react-router';
import { Store, useStore } from 'shared/libs/stores';
import getConfig from 'teleterm/ui/getConfig';
import { Document, UriParams } from 'teleterm/ui/types';

type State = {
  location: string;
  docs: Document[];
};

export default class DocumentService extends Store<State> {
  cfg = getConfig();

  state: State = {
    location: '/home',
    docs: [
      {
        uri: '/',
        kind: 'blank',
        title: 'Welcome',
        created: new Date(),
      },
      {
        uri: '/home',
        kind: 'home',
        title: 'Home',
        created: new Date(),
      },
    ],
  };

  open(uri: string) {
    const homeMatch = matchPath<UriParams>(uri, this.cfg.routes.home);
    const srvMatch = matchPath<UriParams>(uri, this.cfg.routes.clusterServers);
    const dbsMatch = matchPath<UriParams>(uri, this.cfg.routes.clusterDbs);

    if (this.find(uri)) {
      // do nothing
    } else if (homeMatch) {
      this.add({
        uri,
        title: 'Home',
        kind: 'home',
        created: new Date(),
      });
    } else if (srvMatch) {
      this.add({
        uri,
        clusterId: srvMatch.params.clusterId,
        title: 'Servers',
        kind: 'servers',
        created: new Date(),
      });
    } else if (dbsMatch) {
      this.add({
        uri,
        clusterId: dbsMatch.params.clusterId,
        title: 'Databases',
        kind: 'dbs',
        created: new Date(),
      });
    } else {
      this.add({
        uri,
        title: 'not-found',
        kind: 'blank',
        created: new Date(),
      });
    }

    this.setLocation(uri);
  }

  getDocuments() {
    return this.state.docs;
  }

  getDocument(url: string) {
    return this.find(url);
  }

  getActive() {
    return this.find(this.getLocation());
  }

  getLocation() {
    return this.state.location;
  }

  close({ uri }: { uri: string }) {
    const nextUri = this.getNextUri(uri);
    const docs = this.state.docs.filter(i => i.uri !== uri);
    this.setState({ docs, location: nextUri });
  }

  match(uri: string) {
    const location = this.getLocation();
    return !!matchPath<UriParams>(location, uri);
  }

  getUriServer(params: UriParams) {
    return generatePath(this.cfg.routes.clusterServers, { ...params });
  }

  getUriDb(params: UriParams) {
    return generatePath(this.cfg.routes.clusterDbs, { ...params });
  }

  getUriApps(params: UriParams) {
    return generatePath(this.cfg.routes.clusterApps, { ...params });
  }

  add(doc: Document) {
    const item: Document = {
      uri: Math.floor(Math.random() * 100000) + '',
      ...doc,
    };

    this.setState({
      docs: [...this.state.docs, item],
    });

    return item;
  }

  update(uri: string, partialDoc: Partial<Document>) {
    const docs = this.state.docs.map(doc => {
      if (doc.uri === uri) {
        return {
          ...doc,
          ...partialDoc,
        };
      }

      return doc;
    }) as Document[];

    this.setState({ docs });
  }

  filter(uri: string) {
    return this.state.docs.filter(i => i.uri !== uri);
  }

  getNextUri(uri: string) {
    const { docs } = this.state;
    for (let i = 0; i < this.state.docs.length; i++) {
      if (docs[i].uri === uri) {
        if (docs.length > i + 1) {
          return docs[i + 1].uri;
        }

        if (docs.length === i + 1 && i !== 0) {
          return docs[i - 1].uri;
        }
      }
    }

    return '/';
  }

  find(uri: string) {
    return this.state.docs.find(i => i.uri === uri);
  }

  setLocation(location: string) {
    this.setState({ location });
  }

  useSubscription() {
    return useStore(this).state;
  }
}
