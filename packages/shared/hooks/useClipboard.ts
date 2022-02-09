import { useState, useEffect } from 'react';

const clipboardRead = 'clipboard-read';
const clipboardWrite = 'clipboard-write';
type ClipboardPermissionType = 'clipboard-read' | 'clipboard-write';

function useClipboardPermission(
  promptUser = true,
  initialState: PermissionState,
  type: ClipboardPermissionType
) {
  const permissionName = type as PermissionName;

  const [permission, setPermission] = useState<PermissionState>(initialState);

  const setOnly = () => {
    navigator.permissions
      .query({ name: permissionName })
      .then(result => setPermission(result.state));
  };

  const setOrPromptUser = () => {
    navigator.permissions.query({ name: permissionName }).then(result => {
      if (result.state === 'granted' || result.state === 'denied') {
        setPermission(result.state);
      } else {
        // result.state === 'pending';
        // Force the prompt to appear for the user
        navigator.clipboard
          .readText()
          .then(() => {
            // readText's promise only resolves if permission is granted.
            setPermission('granted');
          })
          .catch(err => {
            if (err && err.name === 'NotAllowedError') {
              // NotAllowedError will be caught if the permission was 'denied' or remained 'prompt'.
              // Try again, which result in either setPermission('denied') or re-prompting the user.
              setOrPromptUser();
            } else {
              throw err;
            }
          });
      }
    });
  };

  useEffect(() => {
    if (promptUser) {
      setOrPromptUser();
    } else {
      setOnly();
    }
  }, [permission]);

  return permission;
}

function useClipboardRead(promptUser = true, initialState: PermissionState) {
  return useClipboardPermission(promptUser, initialState, clipboardRead);
}

function useClipboardWrite(promptUser = true, initialState: PermissionState) {
  return useClipboardPermission(promptUser, initialState, clipboardWrite);
}

export function useClipboardRW(
  promptUser = true,
  initialState: PermissionState = 'prompt'
) {
  const [permission, setPermission] = useState<PermissionState>(initialState);

  const read = useClipboardRead(promptUser, initialState);
  const write = useClipboardWrite(promptUser, initialState);

  useEffect(() => {
    if (read === 'prompt' || write === 'prompt') {
      setPermission('prompt');
    } else if (read === 'granted' && write === 'granted') {
      setPermission('granted');
    } else {
      setPermission('denied');
    }
  }, [read, write]);

  return permission;
}
