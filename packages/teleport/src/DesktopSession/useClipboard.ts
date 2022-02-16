import { useState, useEffect } from 'react';

export function useClipboardReadWrite(
  shouldSetOrPrompt: boolean
): ClipboardPermissionStatus {
  const [permission, setPermission] = useState<ClipboardPermissionStatus>({
    state: 'unknown',
  });

  const read = useClipboardRead(shouldSetOrPrompt);
  const write = useClipboardWrite(shouldSetOrPrompt);

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

function useClipboardRead(shouldSetOrPrompt: boolean) {
  return useClipboardPermission(
    ClipboardPermissionType.Read,
    shouldSetOrPrompt
  );
}

function useClipboardWrite(shouldSetOrPrompt: boolean) {
  return useClipboardPermission(
    ClipboardPermissionType.Write,
    shouldSetOrPrompt
  );
}

// If shouldSetOrPrompt is set to false, then {state: 'unknown'} will simply be returned.
// This is desireable so that useClipboardPermission can always be used unconditionally as a hook,
// even in cases where we don't want to check/prompt-for the premission i.e. if the user isn't using
// a Chromium based browser.
function useClipboardPermission(
  readOrWrite: ClipboardPermissionType,
  shouldSetOrPrompt: boolean
) {
  const permissionName = readOrWrite as unknown as PermissionName;

  const [permission, setPermission] = useState<ClipboardPermissionStatus>({
    state: 'unknown',
  });

  const setPermissionOrPromptUser = () => {
    navigator.permissions.query({ name: permissionName }).then(perm => {
      if (perm.state === 'granted' || perm.state === 'denied') {
        if (permission.state !== perm.state) {
          setPermission({ state: perm.state });
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
              setPermissionOrPromptUser();
            } else {
              setPermission({ state: 'error', errorText: err.message });
            }
          });
      }
    });
  };

  useEffect(() => {
    if (shouldSetOrPrompt) {
      setPermissionOrPromptUser();
    } else {
      setPermission({ state: 'unknown' });
    }
  }, [permission]);

  return permission;
}

enum ClipboardPermissionType {
  Read = 'clipboard-read',
  Write = 'clipboard-write',
}

type ClipboardPermissionStatus = {
  state: PermissionState | 'unknown' | 'error';
  errorText?: string;
};
