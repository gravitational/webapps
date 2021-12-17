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

import { useStore } from 'shared/libs/stores';
import { GlobalSearchProvider, Result } from './types';
import { ImmutableStore } from '../immutableStore';

type State = {
  providers: GlobalSearchProvider[];
};

export default class GlobalSearchService extends ImmutableStore<State> {
  state = {
    providers: [],
  };

  search(value: string) {
    const results: Result[] = [];
    this.state.providers.forEach(p => {
      try {
        const providerResults = p.search(value) || [];
        results.push(...providerResults);
      } catch (err) {
        this.logger.error(err);
      }
    });

    return results;
  }

  registerProvider(provider: GlobalSearchProvider) {
    this.setState(draftState => {
      draftState.providers.push(provider);
    });
  }

  useState() {
    return useStore(this).state;
  }
}
