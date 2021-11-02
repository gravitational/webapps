export type PtyOptions = {
  env?: { [key: string]: string };
};

export type PtyProcess = {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  dispose(): void;
  onData(cb: (data: string) => void): void;
  start(cols: number, rows: number): void;
};

export type PtyServiceClient = {
  createPtyProcess: (options: PtyOptions) => PtyProcess;
};
