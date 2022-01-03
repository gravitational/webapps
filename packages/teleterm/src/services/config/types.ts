import { Platform } from '../../mainProcess/types';
import { KeyboardShortcutsConfig } from './providers/keyboardShortcutsConfigProvider';

export interface Config {
  keyboardShortcuts: KeyboardShortcutsConfig;
}

export interface ConfigServiceProvider<
  T extends Record<string, number | string | boolean>
  > {
  getDefaults(platform: Platform): T;
}

export interface ConfigService {
  get(): Config;
  update(newConfig: Partial<Config>): void;
}
