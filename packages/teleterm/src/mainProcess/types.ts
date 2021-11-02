export type ProcessConfig = {
  isDev: boolean;
  userDataDir: string;
  tshd: {
    networkAddr: string;
    binaryPath: string;
    homeDir: string;
    flags: string[];
  };
};

export type ProcessClient = {
  getConfig(): ProcessConfig;
};
