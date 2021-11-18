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

import uris from 'teleterm/ui/uris';
import ServiceClusters from 'teleterm/ui/services/clusters';
import ServiceModals from 'teleterm/ui/services/modals';
import ServiceDocs from 'teleterm/ui/services/docs';
import ServiceTerminals from 'teleterm/ui/services/terminals';
import ServiceGlobalSearch from 'teleterm/ui/services/globalSearch';
import * as types from 'teleterm/types';
import { KeyboardShortcutsService } from 'teleterm/ui/services/keyboardShortcuts';

export type Config = types.ElectronGlobals;

export default class AppContext {
  serviceGlobalSearch: ServiceGlobalSearch;
  serviceClusters: ServiceClusters;
  serviceModals: ServiceModals;
  serviceDocs: ServiceDocs;
  serviceTerminals: ServiceTerminals;
  mainProcessClient: types.MainProcessClient;
  serviceKeyboardShortcuts: KeyboardShortcutsService;

  uris = uris;

  constructor(config: Config) {
    this.mainProcessClient = config.mainProcessClient;
    this.serviceGlobalSearch = new ServiceGlobalSearch();
    this.serviceClusters = new ServiceClusters(config.tshdClient);
    this.serviceGlobalSearch.registerProvider(
      this.serviceClusters.searchProvider
    );

    this.serviceModals = new ServiceModals();
    this.serviceDocs = new ServiceDocs();
    this.serviceTerminals = new ServiceTerminals(config.ptyServiceClient);
    this.serviceKeyboardShortcuts = new KeyboardShortcutsService(
      this.mainProcessClient.getRuntimeSettings().platform
    );
  }

  async init() {
    await this.serviceClusters.fetchClusters();
    await this.serviceClusters.fetchGateways();
  }
}
