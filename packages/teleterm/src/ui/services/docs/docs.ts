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

import { Store, useStore } from 'shared/libs/stores';
import uris from 'teleterm/ui/uris';
import { Document } from 'teleterm/ui/types';
import { unique } from 'teleterm/ui/utils/uid';

type State = {
  location: string;
  docs: Document[];
};

export default class DocumentService extends Store<State> {
  state: State = {
    location: '/home',
    docs: [
      {
        uri: '/',
        kind: 'blank',
        title: 'Welcome',
      },
      {
        uri: '/home',
        kind: 'home',
        title: 'Home',
      },
    ],
  };

  // TODO (alex-kovoy): replace it with a proper route->doc registration mechanism
  open(uri: string) {
    const clusterMatch = uris.match(uri, uris.routes.cluster);
    const homeMatch = uris.match(uri, uris.routes.home);
    const srvMatch = uris.match(uri, uris.routes.clusterServers);
    const gwMatch = uris.match(uri, uris.routes.clusterGateways);
    const ptyMatch = uris.match(uri, uris.routes.ptys);
    const dbsMatch = uris.match(uri, {
      path: uris.routes.clusterDbs,
      exact: true,
    });

    const clusterUri = clusterMatch
      ? uris.getUriCluster(clusterMatch.params)
      : '';

    if (this.find(uri)) {
      // do nothing
    } else if (ptyMatch) {
      this.add({
        uri,
        title: 'dir/path',
        kind: 'terminal_shell',
      });
    } else if (homeMatch) {
      this.add({
        uri,
        title: 'Home',
        kind: 'home',
      });
    } else if (srvMatch) {
      this.add({
        uri,
        clusterUri,
        title: 'Servers',
        kind: 'servers',
      });
    } else if (dbsMatch) {
      this.add({
        uri,
        clusterUri,
        title: 'Databases',
        kind: 'dbs',
      });
    } else if (gwMatch) {
      this.add({
        uri,
        clusterUri,
        title: 'Gateway',
        kind: 'gateway',
      });
    } else {
      this.add({
        uri,
        title: 'not-found',
        kind: 'blank',
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

  isActive(uri: string) {
    const location = this.getLocation();
    return !!uris.match(location, uri);
  }

  add(doc: Document) {
    this.setState({
      docs: [...this.state.docs, doc],
    });
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

  useState() {
    return useStore(this).state;
  }

  addNewTerminalShellDocument() {
    const doc: Document = {
      uri: uris.getUriPty({ sid: unique() }),
      title: 'Terminal',
      kind: 'terminal_shell',
    };

    this.add(doc);

    return doc;
  }
}
