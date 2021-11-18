import { useEffect } from '@gravitational/shared/hooks';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import {
  KeyboardShortcutEvent,
  KeyboardShortcutEventSubscriber,
  KeyboardShortcutType,
} from './types';

export function useKeyboardShortcut(
  handler:
    | ((shortcutEvent: KeyboardShortcutEvent) => void)
    | Partial<Record<KeyboardShortcutType, () => void>>
) {
  const { serviceKeyboardShortcuts } = useAppContext();

  useEffect(() => {
    const handleShortcutEvent: KeyboardShortcutEventSubscriber = event => {
      if (typeof handler === 'function') {
        handler(event);
      } else {
        handler[event.type]?.();
      }
    };

    serviceKeyboardShortcuts.subscribeToEvents(handleShortcutEvent);
    return () =>
      serviceKeyboardShortcuts.unsubscribeFromEvents(handleShortcutEvent);
  }, [handler]);
}
