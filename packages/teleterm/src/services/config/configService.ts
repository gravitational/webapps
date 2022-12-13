import { z } from 'zod';

import { FileStorage } from 'teleterm/services/fileStorage';
import { Platform } from 'teleterm/mainProcess/types';

import { createConfigStore } from './configStore';

const appConfigSchema = z.object({
  'keymap.tab-1': z.string(),
  'keymap.tab-2': z.string(),
  'keymap.tab-3': z.string(),
  'keymap.tab-4': z.string(),
  'keymap.tab-5': z.string(),
  'keymap.tab-6': z.string(),
  'keymap.tab-7': z.string(),
  'keymap.tab-8': z.string(),
  'keymap.tab-9': z.string(),
  'keymap.tab-close': z.string(),
  'keymap.tab-new': z.string(),
  'keymap.tab-previous': z.string(),
  'keymap.tab-next': z.string(),
  'keymap.toggle-connections': z.string(),
  'keymap.toggle-clusters': z.string(),
  'keymap.toggle-identity': z.string(),
  'keymap.open-quick-input': z.string(),
  sansSerifFontFamily: z.string(),
  monoFontFamily: z.string(),
  usageMetricsEnabled: z.boolean(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

/**
 * Modifier keys must be defined in the following order:
 * Command-Control-Option-Shift for macOS
 * Ctrl-Alt-Shift for other platforms
 */
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
  | 'tab-close'
  | 'tab-new'
  | 'tab-previous'
  | 'tab-next'
  | 'open-quick-input'
  | 'toggle-connections'
  | 'toggle-clusters'
  | 'toggle-identity';

export type KeyboardShortcutsConfig = Record<KeyboardShortcutType, string>;
const getKeymap = (platform: Platform) => {
  switch (platform) {
    case 'win32':
      return {
        'tab-1': 'Ctrl-1',
        'tab-2': 'Ctrl-2',
        'tab-3': 'Ctrl-3',
        'tab-4': 'Ctrl-4',
        'tab-5': 'Ctrl-5',
        'tab-6': 'Ctrl-6',
        'tab-7': 'Ctrl-7',
        'tab-8': 'Ctrl-8',
        'tab-9': 'Ctrl-9',
        'tab-close': 'Ctrl-W',
        'tab-new': 'Ctrl-T',
        'tab-previous': 'Ctrl-Shift-Tab',
        'tab-next': 'Ctrl-Tab',
        'open-quick-input': 'Ctrl-K',
        'toggle-connections': 'Ctrl-P',
        'toggle-clusters': 'Ctrl-E',
        'toggle-identity': 'Ctrl-I',
      };
    case 'linux':
      return {
        'tab-1': 'Alt-1',
        'tab-2': 'Alt-2',
        'tab-3': 'Alt-3',
        'tab-4': 'Alt-4',
        'tab-5': 'Alt-5',
        'tab-6': 'Alt-6',
        'tab-7': 'Alt-7',
        'tab-8': 'Alt-8',
        'tab-9': 'Alt-9',
        'tab-close': 'Ctrl-W',
        'tab-new': 'Ctrl-T',
        'tab-previous': 'Ctrl-Shift-Tab',
        'tab-next': 'Ctrl-Tab',
        'open-quick-input': 'Ctrl-K',
        'toggle-connections': 'Ctrl-P',
        'toggle-clusters': 'Ctrl-E',
        'toggle-identity': 'Ctrl-I',
      };
    case 'darwin':
      return {
        'tab-1': 'Command-1',
        'tab-2': 'Command-2',
        'tab-3': 'Command-3',
        'tab-4': 'Command-4',
        'tab-5': 'Command-5',
        'tab-6': 'Command-6',
        'tab-7': 'Command-7',
        'tab-8': 'Command-8',
        'tab-9': 'Command-9',
        'tab-close': 'Command-W',
        'tab-new': 'Command-T',
        'tab-previous': 'Control-Shift-Tab',
        'tab-next': 'Control-Tab',
        'open-quick-input': 'Command-K',
        'toggle-connections': 'Command-P',
        'toggle-clusters': 'Command-E',
        'toggle-identity': 'Command-I',
      };
  }
};

function getFonts(platform: Platform) {
  switch (platform) {
    case 'win32':
      return {
        sansSerif: "system-ui, 'Segoe WPC', 'Segoe UI', sans-serif",
        mono: "'Consolas', 'Courier New', monospace",
      };
    case 'linux':
      return {
        sansSerif: "system-ui, 'Ubuntu', 'Droid Sans', sans-serif",
        mono: "'Droid Sans Mono', 'Courier New', monospace, 'Droid Sans Fallback'",
      };
    case 'darwin':
      return {
        sansSerif: '-apple-system, BlinkMacSystemFont, sans-serif',
        mono: "Menlo, Monaco, 'Courier New', monospace",
      };
  }
}

export function createConfigService(
  appConfigFileStorage: FileStorage,
  platform: Platform
) {
  const keymap = getKeymap(platform);
  const fonts = getFonts(platform);

  // Defaults could be provided in the schema using .default(), but currently
  // there is no way to remove them during parsing (so returned data that is
  // saved to the file would contain all the properties).
  // Come back to it when this is resolved https://github.com/colinhacks/zod/issues/1593
  const defaults: AppConfig = {
    'keymap.tab-1': keymap['tab-1'],
    'keymap.tab-2': keymap['tab-2'],
    'keymap.tab-3': keymap['tab-3'],
    'keymap.tab-4': keymap['tab-4'],
    'keymap.tab-5': keymap['tab-5'],
    'keymap.tab-6': keymap['tab-6'],
    'keymap.tab-7': keymap['tab-7'],
    'keymap.tab-8': keymap['tab-8'],
    'keymap.tab-9': keymap['tab-9'],
    'keymap.open-quick-input': keymap['open-quick-input'],
    'keymap.toggle-connections': keymap['toggle-connections'],
    'keymap.toggle-clusters': keymap['toggle-clusters'],
    'keymap.tab-close': keymap['tab-close'],
    'keymap.tab-new': keymap['tab-new'],
    'keymap.tab-next': keymap['tab-next'],
    'keymap.tab-previous': keymap['tab-previous'],
    'keymap.toggle-identity': keymap['toggle-identity'],
    monoFontFamily: fonts.mono,
    sansSerifFontFamily: fonts.sansSerif,
    usageMetricsEnabled: false,
  };

  return createConfigStore(appConfigSchema, defaults, appConfigFileStorage);
}

export type ConfigService = ReturnType<typeof createConfigService>;
