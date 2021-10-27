export type PtyOptions = {};

export type PtyProcess = {
  write(data: string): void;
  resize(cols: number, rows: number): void;
  dispose(): void;
  onData(cb: (data: string) => void): void;
  start(cols: number, rows: number): void;
};

export type PtyManager = {
  createPtyProcess: (options: PtyOptions) => PtyProcess;
};
