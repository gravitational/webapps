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

import { Store, toImmutable } from 'nuclear-js';
import { SITE_RECEIVE_NAMESPACES } from './actionTypes';

export default Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    this.on(SITE_RECEIVE_NAMESPACES, receiveNamespaces);
  },
});

function receiveNamespaces(state, namespaceDataArray) {
  return toImmutable(namespaceDataArray);
}
