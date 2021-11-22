export interface KeyboardShortcutEvent {
  type: KeyboardShortcutType;
}

export type KeyboardShortcutEventSubscriber = (
  event: KeyboardShortcutEvent
) => void;

export type KeyboardShortcutHandlers = Partial<
  Record<KeyboardShortcutType, () => void>
>;

export type KeyboardShortcutType =
  | 'tab-1'
  | 'tab-2'
  | 'tab-3'
  | 'tab-4'
  | 'tab-5'
  | 'tab-6'
  | 'tab-7'
  | 'tab-8'
  | 'tab-9'
  | 'focus-global-search';
