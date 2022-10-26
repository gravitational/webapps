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
import { ClustersService } from 'teleterm/ui/services/clusters';
import { ModalsService } from 'teleterm/ui/services/modals';
import { TerminalsService } from 'teleterm/ui/services/terminals';
import { ConnectionTrackerService } from 'teleterm/ui/services/connectionTracker';
import { QuickInputService } from 'teleterm/ui/services/quickInput';
import { StatePersistenceService } from 'teleterm/ui/services/statePersistence';
import { KeyboardShortcutsService } from 'teleterm/ui/services/keyboardShortcuts';
import { WorkspacesService } from 'teleterm/ui/services/workspacesService/workspacesService';
import { NotificationsService } from 'teleterm/ui/services/notifications';
import { FileTransferService } from 'teleterm/ui/services/fileTransferClient';

import { CommandLauncher } from './commandLauncher';
import { IAppContext } from './types';

export default class AppContext implements IAppContext {
  clustersService: ClustersService;
  modalsService: ModalsService;
  notificationsService: NotificationsService;
  terminalsService: TerminalsService;
  keyboardShortcutsService: KeyboardShortcutsService;
  quickInputService: QuickInputService;
  statePersistenceService: StatePersistenceService;
  workspacesService: WorkspacesService;
  mainProcessClient: MainProcessClient;
  commandLauncher: CommandLauncher;
  connectionTracker: ConnectionTrackerService;
  fileTransferService: FileTransferService;

  constructor(config: ElectronGlobals) {
    const { tshClient, ptyServiceClient, mainProcessClient } = config;
    this.mainProcessClient = mainProcessClient;
    this.fileTransferService = new FileTransferService(tshClient);
    this.statePersistenceService = new StatePersistenceService(
      this.mainProcessClient.fileStorage
    );
    this.modalsService = new ModalsService();
    this.notificationsService = new NotificationsService();
    this.clustersService = new ClustersService(
      tshClient,
      this.mainProcessClient,
      this.notificationsService
    );
    this.workspacesService = new WorkspacesService(
      this.modalsService,
      this.clustersService,
      this.notificationsService,
      this.statePersistenceService
    );
    this.terminalsService = new TerminalsService(ptyServiceClient);

    this.keyboardShortcutsService = new KeyboardShortcutsService(
      this.mainProcessClient.getRuntimeSettings().platform,
      this.mainProcessClient.configService
    );

    this.commandLauncher = new CommandLauncher(this);

    this.quickInputService = new QuickInputService(
      this.commandLauncher,
      this.clustersService,
      this.workspacesService
    );

    this.connectionTracker = new ConnectionTrackerService(
      this.statePersistenceService,
      this.workspacesService,
      this.clustersService
    );
  }

  async init(): Promise<void> {
    await this.clustersService.syncRootClusters();
    this.workspacesService.restorePersistedState();
  }
}
