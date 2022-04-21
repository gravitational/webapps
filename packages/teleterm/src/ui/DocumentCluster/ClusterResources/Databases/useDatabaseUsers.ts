import { useAsync } from 'shared/hooks/useAsync';
import { useAppContext } from 'teleterm/ui/appContextProvider';

export function useDatabaseUsers(dbUri: string) {
  const { clustersService, notificationsService } = useAppContext();
  const [getUsersAttempt, getUsers] = useAsync(async () => {
    try {
      const dbUsers = await clustersService.getDbUsers(dbUri);
      return dbUsers.map(user => ({ login: user, url: '' }));
    } catch (e) {
      // Emitting a warning instead of error here because fetching those username suggestions is not
      // the most important part of the app.
      notificationsService.notifyWarning({
        title: 'Could not fetch database usernames',
        description: e.message,
      });

      throw e;
    }
  });

  return { getUsersAttempt, getUsers };
}
