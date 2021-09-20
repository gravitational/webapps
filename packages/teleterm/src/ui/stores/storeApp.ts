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
import { Cluster } from './../../services/types';
import { Document } from './../types';

type State = {
  clusters: Cluster[];
  docs: Document[];
  activeModal: 'addCluster' | '';
  location: string;
};

export default class StoreApp extends Store<State> {
  state: State = {
    clusters: [],
    activeModal: '',
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

  setClusters(clusters: Cluster[]) {
    this.setState({ clusters });
  }

  async setLocation(location: string) {
    this.setState({ location });
  }

  async addDocument(doc: Document) {
    const item: Document = {
      uri: Math.floor(Math.random() * 100000) + '',
      ...doc,
    };

    this.setState({
      docs: [...this.state.docs, item],
    });

    return item;
  }

  updateDocument(uri: string, partialDoc: Partial<Document>) {
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

  filterDocuments(uri: string) {
    return this.state.docs.filter(i => i.uri !== uri);
  }

  getNextDocumentUri(uri: string) {
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

  findDocument(uri: string) {
    return this.state.docs.find(i => i.uri === uri);
  }

  findByUri(uri: string) {
    return this.state.docs.find(i => i.uri === encodeURI(uri));
  }

  getDocuments(): Document[] {
    return this.state.docs;
  }

  getClusters() {
    return this.state.clusters;
  }

  getLocation() {
    return this.state.location;
  }

  closeModal() {
    this.setState({ activeModal: '' });
  }
}
