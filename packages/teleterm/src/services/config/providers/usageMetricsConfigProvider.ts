import { ConfigServiceProvider } from 'teleterm/services/config';

export type UsageMetricsConfig = {
  enabled: boolean;
};

export const usageMetricsConfigProvider: ConfigServiceProvider<UsageMetricsConfig> =
  {
    getDefaults() {
      return {
        enabled: false,
      };
    },
  };
