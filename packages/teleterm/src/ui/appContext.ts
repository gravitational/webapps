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

import { MainProcessClient, ElectronGlobals } from 'teleterm/types';
import ServiceClusters from 'teleterm/ui/services/clusters';
import ServiceModals from 'teleterm/ui/services/modals';
import ServiceDocs from 'teleterm/ui/services/docs';
import ServiceTerminals from 'teleterm/ui/services/terminals';
import ServiceGlobalSearch from 'teleterm/ui/services/globalSearch';
import ServiceQuickInput from 'teleterm/ui/services/quickInput';
import { KeyboardShortcutsService } from 'teleterm/ui/services/keyboardShortcuts';
import CommandLauncher from './commandLauncher';

export default class AppContext {
  serviceGlobalSearch: ServiceGlobalSearch;
  serviceClusters: ServiceClusters;
  serviceModals: ServiceModals;
  serviceDocs: ServiceDocs;
  serviceTerminals: ServiceTerminals;
  serviceKeyboardShortcuts: KeyboardShortcutsService;
  serviceQuickInput: ServiceQuickInput;
  mainProcessClient: MainProcessClient;
  commandLauncher: CommandLauncher;

  constructor(config: ElectronGlobals) {
    const { tshClient, ptyServiceClient, mainProcessClient } = config;

    this.mainProcessClient = mainProcessClient;
    this.serviceGlobalSearch = new ServiceGlobalSearch();
    this.serviceClusters = new ServiceClusters(tshClient);
    this.serviceGlobalSearch.registerProvider(
      this.serviceClusters.searchProvider
    );
    this.serviceModals = new ServiceModals();
    this.serviceDocs = new ServiceDocs();
    this.serviceTerminals = new ServiceTerminals(ptyServiceClient);
    this.serviceKeyboardShortcuts = new KeyboardShortcutsService(
      this.mainProcessClient.getRuntimeSettings().platform,
      this.mainProcessClient.configService
    );

    this.commandLauncher = new CommandLauncher(this);
    this.serviceQuickInput = new ServiceQuickInput(
      this.commandLauncher,
      this.serviceClusters
    );
  }

  async init() {
    await this.serviceClusters.syncClusters();
  }
}
