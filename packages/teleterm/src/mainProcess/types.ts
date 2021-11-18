export type RuntimeSettings = {
  isDev: boolean;
  userDataDir: string;
  defaultShell: string;
  platform: NodeJS.Platform;
  tshd: {
    networkAddr: string;
    binaryPath: string;
    homeDir: string;
    flags: string[];
  };
};

export type MainProcessClient = {
  getRuntimeSettings(): RuntimeSettings;
  openContextMenu(): void;
};
