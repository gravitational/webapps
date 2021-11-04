export type PtyOptions = {
  env?: { [key: string]: string };
  path: string;
  args: string[];
};

export type PtyProcess = {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  dispose(): void;
  onData(cb: (data: string) => void): void;
  start(cols: number, rows: number): void;
};

export type PtyServiceClient = {
  createPtyProcess: (cmd: PtyCommand) => PtyProcess;
};

export type PtyCommand =
  | TshLoginCommand
  | TshDbConnectCommand
  | NewShellCommand;

export type NewShellCommand = {
  kind: 'new-shell';
};

export type TshLoginCommand = {
  kind: 'tsh-login';
  clusterId: string;
  login: string;
  serverId: string;
};

export type TshDbConnectCommand = {
  kind: 'tsh-db-connect';
  clusterId: string;
  login: string;
  serverId: string;
};
