export type PtyOptions = {
  env?: { [key: string]: string };
  path: string;
  args: string[];
  cwd?: string;
};

export type PtyProcess = {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  dispose(): void;
  onData(cb: (data: string) => void): void;
  onOpen(cb: () => void): void;
  start(cols: number, rows: number): void;
  onExit(cb: (ev: { exitCode: number; signal?: number }) => void);
  getPid(): number;
};

export type PtyServiceClient = {
  getWorkingDirectory(pid: number): Promise<string>;
  createPtyProcess: (cmd: PtyCommand) => PtyProcess;
};

export type PtyCommand =
  | TshLoginCommand
  | TshDbConnectCommand
  | NewShellCommand;

export type NewShellCommand = {
  kind: 'new-shell';
  cwd?: string;
};

export type TshLoginCommand = {
  kind: 'tsh-login';
  login: string;
  serverId: string;
  rootClusterId: string;
  leafClusterId?: string;
};

export type TshDbConnectCommand = {
  kind: 'tsh-db-connect';
  clusterId: string;
  login: string;
  serverId: string;
};
