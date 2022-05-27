import {} from 'teleterm/ui/services/workspacesService/documentsService';
import { routing } from 'teleterm/ui/uri';
import AppContext from 'teleterm/ui/appContext';

export async function retryWithRelogin<T>(
  appContext: AppContext,
  originatingDocumentUri: string,
  resourceUri: string,
  actionToRepeat: () => Promise<T>
): Promise<T> {
  let retryableErrorFromActionToRepeat: Error;
  try {
    return await actionToRepeat();
  } catch (error) {
    // TODO(ravicious): Replace this with actual check on metadata.
    const isRetryable =
      error instanceof Error &&
      (error.message.includes('ssh: handshake failed') ||
        error.message.includes('ssh: cert has expired'));

    if (isRetryable) {
      retryableErrorFromActionToRepeat = error;
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
    throw retryableErrorFromActionToRepeat;
  }

  const rootClusterUri = routing.ensureRootClusterUri(resourceUri);

  try {
    await login(appContext, rootClusterUri);
  } catch (error) {
    // In case the user canceled the login attempt, retry the original call anyway in case the cert
    // was refreshed externally, for example through tsh.
    const isRetryable = error instanceof LoginAttemptCanceledError;

    if (!isRetryable) {
      throw error;
    }
  }

  return await actionToRepeat();
}

class LoginAttemptCanceledError extends Error {}

function login(appContext: AppContext, rootClusterUri: string): Promise<void> {
  return new Promise((resolve, reject) => {
    appContext.modalsService.openClusterConnectDialog({
      clusterUri: rootClusterUri,
      onSuccess: () => resolve(),
      onCancel: () => reject(new LoginAttemptCanceledError()),
    });
  });
}
