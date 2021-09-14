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
import { Document } from './../types';

interface State {
  items: Document[];
  active: string;
}

export default class StoreDocs extends Store<State> {
  state: State = {
    items: [],
    active: '-1',
  };

  constructor() {
    super();

    this.add({
      id: '-1',
      kind: 'blank',
      created: new Date(),
    });
  }

  makeActive(active: string) {
    this.setState({
      active,
    });
  }

  add(doc: Document) {
    const item: Document = {
      id: Math.floor(Math.random() * 100000) + '',
      ...doc,
    };

    this.setState({
      items: [...this.state.items, item],
    });

    return item;
  }

  update(id: string, partialDoc: Partial<Document>) {
    const items = this.state.items.map(doc => {
      if (doc.id === id) {
        return {
          ...doc,
          ...partialDoc,
        };
      }

      return doc;
    }) as Document[];

    this.setState({
      items,
    });
  }

  filter(id: string) {
    return this.state.items.filter(i => i.id !== id);
  }

  getNext(id: string) {
    const { items } = this.state;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        if (items.length > i + 1) {
          return items[i + 1].id;
        }

        if (items.length === i + 1 && i !== 0) {
          return items[i - 1].id;
        }
      }
    }

    return '-1';
  }

  find(id: string) {
    return this.state.items.find(i => i.id === id);
  }

  getDocuments(): Document[] {
    return this.state.items;
  }
}
