import { useEffect } from 'react';

import { useAppContext } from 'teleterm/ui/appContextProvider';
import { useWorkspaceDocumentsService } from 'teleterm/ui/Documents';

export default function useDocumentBlank(doc) {
  const ctx = useAppContext();
  const documentsService = useWorkspaceDocumentsService();
  const localClusterUri =
    ctx.workspacesService.getActiveWorkspace()?.localClusterUri;

  const navigateToResources = (uri: string) => {
    if (localClusterUri) {
      const clusterDocument = documentsService.createClusterDocument({
        clusterUri: localClusterUri,
      });

      documentsService.add(clusterDocument);
      const activeDocument = documentsService.getActive();
      if (activeDocument) {
        documentsService.close(activeDocument.uri);
      }
      documentsService.open(clusterDocument.uri);
    }
  };

  return {
    ctx,
    navigateToResources,
    doc,
  };
}
