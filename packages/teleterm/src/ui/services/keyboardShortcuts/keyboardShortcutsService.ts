import { Store } from 'shared/libs/stores';
import {
  defaultMacShortcuts,
  defaultLinuxShortcuts,
} from './defaultKeyboardShortcuts';
import {
  KeyboardShortcutEvent,
  KeyboardShortcutEventSubscriber,
  KeyboardShortcutType,
} from './types';
import { Platform } from 'teleterm/mainProcess/types';

type State = {
  shortcuts: Partial<Record<KeyboardShortcutType, string>>;
};

export class KeyboardShortcutsService extends Store<State> {
  private eventsSubscribers = new Set<KeyboardShortcutEventSubscriber>();
  private keysToShortcuts = new Map<string, KeyboardShortcutType>();

  constructor(private platform: Platform) {
    super();

    this.state = { shortcuts: {} };
    switch (this.platform) {
      case 'darwin':
        this.updateShortcuts(defaultMacShortcuts);
        break;
      case 'linux':
        this.updateShortcuts(defaultLinuxShortcuts);
    }

    this.attachKeydownHandler();
  }

  updateShortcuts(
    newShortcuts: Partial<Record<KeyboardShortcutType, string>>
  ): void {
    this.setState({
      shortcuts: { ...this.state.shortcuts, ...newShortcuts },
    });
    this.recalculateKeysToShortcuts();
  }

  subscribeToEvents(subscriber: KeyboardShortcutEventSubscriber): void {
    this.eventsSubscribers.add(subscriber);
  }

  unsubscribeFromEvents(subscriber: KeyboardShortcutEventSubscriber): void {
    this.eventsSubscribers.delete(subscriber);
  }

  private attachKeydownHandler(): void {
    const handleKeydown = (event: KeyboardEvent): void => {
      const shortcutType = this.getShortcut(event);
      if (!shortcutType) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      this.notifyEventsSubscribers({ type: shortcutType });
    };

    window.addEventListener('keydown', handleKeydown, {
      capture: true,
    });
  }

  private getShortcut(event: KeyboardEvent): KeyboardShortcutType | undefined {
    const key = [
      ...this.getPlatformModifierKeys(event),
      event.key.toUpperCase(),
    ]
      .filter(Boolean)
      .join('-');

    return this.keysToShortcuts.get(key);
  }

  private getPlatformModifierKeys(event: KeyboardEvent): string[] {
    switch (this.platform) {
      case 'darwin':
        return [
          event.metaKey && 'Command',
          event.ctrlKey && 'Control',
          event.altKey && 'Option',
          event.shiftKey && 'Shift',
        ];
      default:
        return [
          event.ctrlKey && 'Ctrl',
          event.altKey && 'Alt',
          event.shiftKey && 'Shift',
        ];
    }
  }

  /**
   * Inverts shortcuts-keys pairs to allow accessing shortcut by a key
   */
  private recalculateKeysToShortcuts(): void {
    this.keysToShortcuts.clear();
    Object.entries(this.state.shortcuts).forEach(([shortcutType, key]) => {
      this.keysToShortcuts.set(key, shortcutType as KeyboardShortcutType);
    });
  }

  private notifyEventsSubscribers(event: KeyboardShortcutEvent): void {
    this.eventsSubscribers.forEach(subscriber => subscriber(event));
  }
}
