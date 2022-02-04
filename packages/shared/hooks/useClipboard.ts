import { useState, useEffect } from 'react';

const clipboardRead = 'clipboard-read';
const clipboardWrite = 'clipboard-write';
type ClipboardPermissionType = 'clipboard-read' | 'clipboard-write';
// PermissionState sans "prompt"
type DefinedPermissionState = 'denied' | 'granted';

function useClipboardPermission(
  state: DefinedPermissionState,
  type: ClipboardPermissionType
) {
  const [permission, setPermission] = useState<DefinedPermissionState>(state);

  useEffect(() => {
    const permissionName = type as PermissionName;
    navigator.permissions.query({ name: permissionName }).then(result => {
      if (result.state === 'granted') {
        setPermission(result.state);
      } else if (result.state === 'prompt') {
        const ensureDecision = () => {
          navigator.permissions.query({ name: permissionName }).then(result => {
            if (result.state === 'granted') {
              setPermission('granted');
            } else {
              setPermission('denied');
            }
          });
        };

        // Force the prompt to appear for the user
        navigator.clipboard.readText().then(() => {
          ensureDecision();
        });
      }
    });
  }, [permission]);

  return permission;
}

function useClipboardRead(state: DefinedPermissionState) {
  return useClipboardPermission(state, clipboardRead);
}

function useClipboardWrite(state: DefinedPermissionState) {
  return useClipboardPermission(state, clipboardWrite);
}

export function useClipboardFull(state: DefinedPermissionState) {
  const [permission, setPermission] = useState<DefinedPermissionState>(state);

  const read = useClipboardRead(state);
  const write = useClipboardWrite(state);

  useEffect(() => {
    if (read === 'granted' && write === 'granted') {
      setPermission('granted');
    } else {
      setPermission('denied');
    }
  }, [read, write]);

  return permission;
}
