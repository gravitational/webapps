import { useCallback } from 'react';

import { DocumentsService } from 'teleterm/ui/services/workspacesService';

export function useNewTabOpener({
  documentsService,
  localClusterUri,
}: {
  documentsService: DocumentsService;
  localClusterUri: string;
}) {
  const openClusterTab = useCallback(() => {
    if (localClusterUri) {
      const clusterDocument = documentsService.createBlankDocument({
        clusterUri: localClusterUri,
      });

      documentsService.add(clusterDocument);
      documentsService.open(clusterDocument.uri);
    }
  }, [documentsService, localClusterUri]);

  return { openClusterTab };
}
