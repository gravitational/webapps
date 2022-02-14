import { useState, useEffect } from 'react';

export function useClipboardReadWrite(
  isChrome: boolean
): ClipboardPermissionState {
  const [permission, setPermission] = useState<ClipboardPermissionState>({
    state: 'unknown',
  });

  const read = useClipboardRead(isChrome);
  const write = useClipboardWrite(isChrome);

  useEffect(() => {
    if (read.state === 'error') {
      setPermission(read);
    } else if (write.state === 'error') {
      setPermission(write);
    } else if (read.state === 'denied' || write.state === 'denied') {
      setPermission({ state: 'denied' });
    } else if (read.state === 'prompt' || write.state === 'prompt') {
      setPermission({ state: 'prompt' });
    } else if (read.state === 'granted' && write.state === 'granted') {
      setPermission({ state: 'granted' });
    } else {
      setPermission({ state: 'unknown' });
    }
  }, [read, write]);

  return permission;
}

function useClipboardRead(isChrome: boolean) {
  return useClipboardPermission(ClipboardPermisionType.Read, isChrome);
}

function useClipboardWrite(isChrome: boolean) {
  return useClipboardPermission(ClipboardPermisionType.Write, isChrome);
}

function useClipboardPermission(
  type: ClipboardPermisionType,
  isChrome: boolean
) {
  const permissionName = type as unknown as PermissionName;

  const [permission, setPermission] = useState<ClipboardPermissionState>({
    state: 'unknown',
  });

  const setOrPromptUser = () => {
    navigator.permissions.query({ name: permissionName }).then(result => {
      if (result.state === 'granted' || result.state === 'denied') {
        if (permission.state !== result.state) {
          setPermission({ state: result.state });
        }
      } else {
        // result.state === 'prompt';
        if (permission.state !== 'prompt') {
          setPermission({ state: 'prompt' });
          // return, because the setPermission above will trigger the useEffect below,
          // which will cause us to end up back in the parent else-clause but skip this if-clause.
          return;
        }
        // Force the prompt to appear for the user
        navigator.clipboard
          .readText()
          .then(() => {
            // readText's promise only resolves if permission is granted.
            setPermission({ state: 'granted' });
          })
          .catch(err => {
            if (err && err.name === 'NotAllowedError') {
              // NotAllowedError will be caught if the permission was 'denied' or remained 'prompt'.
              // Try again, which result in either setPermission('denied') or re-prompting the user.
              setOrPromptUser();
            } else {
              setPermission({ state: 'error', errorText: err.message });
            }
          });
      }
    });
  };

  useEffect(() => {
    if (isChrome) {
      setOrPromptUser();
    } else {
      setPermission({ state: 'unknown' });
    }
  }, [permission]);

  return permission;
}

enum ClipboardPermisionType {
  Read = 'clipboard-read',
  Write = 'clipboard-write',
}

type ClipboardPermissionState = {
  state: PermissionState | 'unknown' | 'error';
  errorText?: string;
};
