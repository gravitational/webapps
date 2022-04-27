import { ImmutableStore } from 'teleterm/ui/services/immutableStore';
import { Document, DocumentsService } from './documentsService';
import { useStore } from 'shared/libs/stores';
import { ModalsService } from 'teleterm/ui/services/modals';
import { ClustersService } from 'teleterm/ui/services/clusters';
import { StatePersistenceService } from 'teleterm/ui/services/statePersistence';
import { isEqual } from 'lodash';
import { NotificationsService } from 'teleterm/ui/services/notifications';

export interface WorkspacesState {
  rootClusterUri?: string;
  workspaces: Record<string, Workspace>;
}

export interface Workspace {
  localClusterUri: string;
  documents: Document[];
  location: string;
  previous?: {
    documents: Document[];
    location: string;
  };
}

export class WorkspacesService extends ImmutableStore<WorkspacesState> {
  private documentsServicesCache = new Map<string, DocumentsService>();
  state: WorkspacesState = {
    rootClusterUri: undefined,
    workspaces: {},
  };

  constructor(
    private modalsService: ModalsService,
    private clustersService: ClustersService,
    private notificationsService: NotificationsService,
    private statePersistenceService: StatePersistenceService
  ) {
    super();
  }

  getActiveWorkspace(): Workspace | undefined {
    return this.state.workspaces[this.state.rootClusterUri];
  }

  getRootClusterUri(): string | undefined {
    return this.state.rootClusterUri;
  }

  getWorkspaces(): Record<string, Workspace> {
    return this.state.workspaces;
  }

  getWorkspace(clusterUri): Workspace {
    return this.state.workspaces[clusterUri];
  }

  getActiveWorkspaceDocumentService(): DocumentsService | undefined {
    if (!this.state.rootClusterUri) {
      return;
    }
    return this.getWorkspaceDocumentService(this.state.rootClusterUri);
  }

  getWorkspacesDocumentsServices(): Array<{
    clusterUri: string;
    workspaceDocumentsService: DocumentsService;
  }> {
    return Object.entries(this.state.workspaces).map(([clusterUri]) => ({
      clusterUri,
      workspaceDocumentsService: this.getWorkspaceDocumentService(clusterUri),
    }));
  }

  setWorkspaceLocalClusterUri(
    clusterUri: string,
    localClusterUri: string
  ): void {
    this.setState(draftState => {
      draftState.workspaces[clusterUri].localClusterUri = localClusterUri;
    });
  }

  getWorkspaceDocumentService(
    clusterUri: string
  ): DocumentsService | undefined {
    if (!this.documentsServicesCache.has(clusterUri)) {
      this.documentsServicesCache.set(
        clusterUri,
        new DocumentsService(
          () => {
            return this.state.workspaces[clusterUri];
          },
          newState =>
            this.setState(draftState => {
              newState(draftState.workspaces[clusterUri]);
            })
        )
      );
    }

    return this.documentsServicesCache.get(clusterUri);
  }

  useState() {
    return useStore(this);
  }

  setState(nextState: (draftState: WorkspacesState) => WorkspacesState | void) {
    super.setState(nextState);
    this.statePersistenceService.saveWorkspaces(this.state);
  }

  setActiveWorkspace(clusterUri: string): Promise<void> {
    const setWorkspace = () => {
      this.setState(draftState => {
        if (!draftState.workspaces[clusterUri]) {
          const persistedWorkspace =
            this.statePersistenceService.getWorkspaces().workspaces[clusterUri];
          const defaultDocument = this.getWorkspaceDocumentService(
            clusterUri
          ).createClusterDocument({ clusterUri });

          draftState.workspaces[clusterUri] = {
            localClusterUri: persistedWorkspace?.localClusterUri || clusterUri,
            location: defaultDocument.uri,
            documents: [defaultDocument],
            previous: persistedWorkspace?.documents
              ? {
                  documents: persistedWorkspace.documents,
                  location: persistedWorkspace.location,
                }
              : undefined,
          };
        }
        draftState.rootClusterUri = clusterUri;
      });
    };

    // empty cluster URI - no cluster selected
    if (!clusterUri) {
      this.setState(draftState => {
        draftState.rootClusterUri = undefined;
      });
      return Promise.resolve();
    }

    const cluster = this.clustersService.findCluster(clusterUri);
    if (!cluster) {
      this.notificationsService.notifyError({
        title: 'Could not set cluster as active',
        description: `Cluster with URI ${clusterUri} does not exist`,
      });
      this.logger.warn(
        `Could not find cluster with uri ${clusterUri} when changing active cluster`
      );
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      if (cluster.connected) {
        setWorkspace();
        return resolve();
      }
      this.modalsService.openClusterConnectDialog({
        clusterUri: clusterUri,
        onCancel: () => {
          reject();
        },
        onSuccess: () => {
          setWorkspace();
          resolve();
        },
      });
    })
      .then(() => {
        return new Promise<void>(resolve => {
          if (!this.canReopenPreviousDocuments(this.getWorkspace(clusterUri))) {
            this.discardPreviousDocuments(clusterUri);
            return resolve();
          }
          this.modalsService.openDocumentsReopenDialog({
            onConfirm: () => {
              this.reopenPreviousDocuments(clusterUri);
              resolve();
            },
            onCancel: () => {
              this.discardPreviousDocuments(clusterUri);
              resolve();
            },
          });
        });
      })
      .catch(() => undefined); // catch ClusterConnectDialog cancellation
  }

  removeWorkspace(clusterUri: string): void {
    this.setState(draftState => {
      delete draftState.workspaces[clusterUri];
    });
  }

  getConnectedWorkspacesClustersUri(): string[] {
    return Object.keys(this.state.workspaces).filter(
      clusterUri => this.clustersService.findCluster(clusterUri)?.connected
    );
  }

  private reopenPreviousDocuments(clusterUri: string): void {
    this.setState(draftState => {
      const workspace = draftState.workspaces[clusterUri];
      workspace.documents = workspace.previous.documents;
      workspace.location = workspace.previous.location;
      workspace.previous = undefined;
    });
  }

  private discardPreviousDocuments(clusterUri: string): void {
    this.setState(draftState => {
      const workspace = draftState.workspaces[clusterUri];
      workspace.previous = undefined;
    });
  }

  private canReopenPreviousDocuments(workspace: Workspace): boolean {
    const removeUri = (documents: Document[]) =>
      documents.map(d => ({ ...d, uri: undefined }));

    return (
      workspace.previous &&
      workspace.previous.documents?.length &&
      !isEqual(
        removeUri(workspace.previous.documents),
        removeUri(workspace.documents)
      )
    );
  }
}
