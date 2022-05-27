import {} from 'teleterm/ui/services/workspacesService/documentsService';
import { routing } from 'teleterm/ui/uri';
import AppContext from 'teleterm/ui/appContext';

export async function retryWithRelogin<T>(
  appContext: AppContext,
  originatingDocumentUri: string,
  resourceUri: string,
  actionToRetry: () => Promise<T>
): Promise<T> {
  let retryableErrorFromActionToRetry: Error;
  try {
    return await actionToRetry();
  } catch (error) {
    // TODO(ravicious): Replace this with actual check on metadata.
    const isRetryable =
      error instanceof Error &&
      (error.message.includes('ssh: handshake failed') ||
        error.message.includes('ssh: cert has expired'));

    if (isRetryable) {
      retryableErrorFromActionToRetry = error;
    } else {
      throw error;
    }
  }

  const isDocumentStillActive = appContext.workspacesService.isDocumentActive(
    originatingDocumentUri
  );

  if (!isDocumentStillActive) {
    // The error is retryable, but the user is no longer looking at the relevant UI, for example
    // they switched to a different document or a different workspace completely.
    //
    // Since it might take a few seconds before the execution gets to this point, the user might no
    // longer remember what their intent was, thus showing them a login modal can be disorienting.
    //
    // In that situation, let's just not attempt to relogin and instead let's surface the original
    // error.
    throw retryableErrorFromActionToRetry;
  }

  const rootClusterUri = routing.ensureRootClusterUri(resourceUri);

  await login(appContext, rootClusterUri);

  return await actionToRetry();
}

// Notice that we don't differentiate between onSuccess and onCancel. In both cases, we're going to
// retry the action anyway in case the cert was refreshed externally before the modal was closed,
// for example through tsh login.
function login(appContext: AppContext, rootClusterUri: string): Promise<void> {
  return new Promise(resolve => {
    appContext.modalsService.openClusterConnectDialog({
      clusterUri: rootClusterUri,
      onSuccess: () => resolve(),
      onCancel: () => resolve(),
    });
  });
}
