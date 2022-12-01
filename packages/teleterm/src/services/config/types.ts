import { Platform } from '../../mainProcess/types';

import { KeyboardShortcutsConfig } from './providers/keyboardShortcutsConfigProvider';
import { AppearanceConfig } from './providers/appearanceConfigProvider';
import { UsageMetricsConfig } from './providers/usageMetricsConfigProvider';
import { FieldPath, FieldPathValue } from './fieldPath';

export interface Config {
  keyboardShortcuts: KeyboardShortcutsConfig;
  appearance: AppearanceConfig;
  usageMetrics: UsageMetricsConfig;
}

export interface ConfigServiceProvider<T extends Record<string, any>> {
  getDefaults(platform: Platform): T;
}

export interface ConfigService {
  get: ConfigGetter;
  set: ConfigSetter;
  restoreDefault: ConfigRestorer;
}

export type ConfigGetter = <Path extends FieldPath<Config>>(
  path: Path
) => ConfigValue<Path>;
export type ConfigSetter = <Path extends FieldPath<Config>>(
  path: Path,
  value: FieldPathValue<Config, Path>
) => void;

export type ConfigRestorer = <Path extends FieldPath<Config>>(
  path: Path
) => void;

export type ConfigValue<Path extends FieldPath<Config>> = {
  value: FieldPathValue<Config, Path>;
  metadata: { isStored: boolean };
};
