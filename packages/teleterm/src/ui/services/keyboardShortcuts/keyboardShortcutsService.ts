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

type State = {
  shortcuts: Partial<Record<KeyboardShortcutType, string>>;
};

export class KeyboardShortcutsService extends Store<State> {
  private eventsSubscribers: KeyboardShortcutEventSubscriber[] = [];
  private keysToShortcuts = new Map<string, KeyboardShortcutType>();

  constructor(private platform: NodeJS.Platform) {
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
    this.eventsSubscribers.push(subscriber);
  }

  unsubscribeFromEvents(subscriber: KeyboardShortcutEventSubscriber): void {
    const index = this.eventsSubscribers.indexOf(subscriber);
    if (index > -1) {
      this.eventsSubscribers.splice(index, 1);
    }
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
      capture: true
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
    Object.entries(this.state.shortcuts).forEach(([shortcutType, key]) => {
      this.keysToShortcuts.set(key, shortcutType as KeyboardShortcutType);
    });
  }

  private notifyEventsSubscribers(event: KeyboardShortcutEvent): void {
    this.eventsSubscribers.forEach(subscriber => subscriber(event));
  }
}
