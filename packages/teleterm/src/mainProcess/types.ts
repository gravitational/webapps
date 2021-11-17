export type RuntimeSettings = {
  isDev: boolean;
  userDataDir: string;
  defaultShell: string;
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
