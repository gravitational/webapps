import { tsh, KindTsh } from 'teleterm/ui/services/clusters/types';

type Base<T extends KindTsh, R> = {
  kind: T;
  data: R;
};

export type ResultServer = Base<'tsh.server', tsh.Server>;
export type ResultDb = Base<'tsh.db', tsh.Database>;
export type Result = ResultServer | ResultDb;

export type GlobalSearchProvider = {
  search(value: string): Result[];
};
