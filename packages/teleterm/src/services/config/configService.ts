import { merge, set as lodashSet, get as lodashGet, cloneDeep } from 'lodash';

import { FileStorage } from 'teleterm/services/fileStorage';

import { keyboardShortcutsConfigProvider } from './providers/keyboardShortcutsConfigProvider';
import { appearanceConfigProvider } from './providers/appearanceConfigProvider';
import {
  Config,
  ConfigGetter,
  ConfigRestorer,
  ConfigService,
  ConfigServiceProvider,
  ConfigSetter,
} from './types';

type ConfigServiceProviders = {
  readonly [Property in keyof Config]: ConfigServiceProvider<Config[Property]>;
};

export class ConfigServiceImpl implements ConfigService {
  private readonly defaultConfig: Config;
  private userConfig: Partial<Config>;
  private mergedConfig: Config;
  private version = '1';
  private configProviders: ConfigServiceProviders = {
    keyboardShortcuts: keyboardShortcutsConfigProvider,
    appearance: appearanceConfigProvider,
  };

  constructor(private appConfigFileStorage: FileStorage) {
    this.defaultConfig = this.getDefaultConfig();
    this.userConfig = this.readUserConfig();
    this.setConfigVersion();
    this.produceMergedConfig();
  }

  get: ConfigGetter = path => {
    return {
      value: lodashGet(this.mergedConfig, path),
      metadata: { isStored: !!lodashGet(this.userConfig, path) },
    };
  };

  set: ConfigSetter = (path, value) => {
    lodashSet(this.userConfig, path, value);
    this.storeUserConfig(this.userConfig);
    this.produceMergedConfig();
  };

  restoreDefault: ConfigRestorer = path => {
    lodashSet(this.userConfig, path, undefined);
  };

  private getDefaultConfig(): Config {
    return Object.entries(this.configProviders).reduce<Partial<Config>>(
      (partialConfig, [name, provider]) => {
        partialConfig[name] = merge({}, provider.getDefaults(process.platform));
        return partialConfig;
      },
      {}
    ) as Config;
  }

  private readUserConfig(): Partial<Config> {
    // TODO(gzdunek): validation
    return cloneDeep(this.appConfigFileStorage.get('config') || {});
  }

  private storeUserConfig(config: Partial<Config>): void {
    this.appConfigFileStorage.put('config', config);
  }

  private produceMergedConfig(): void {
    this.mergedConfig = merge({}, this.defaultConfig, this.userConfig);
  }

  // Sets the config version for future usage
  private setConfigVersion() {
    if (!this.appConfigFileStorage.get('version')) {
      this.appConfigFileStorage.put('version', this.version);
    }
  }
}
