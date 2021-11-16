import * as uitypes from 'teleterm/ui/types';

type Base<T extends uitypes.ResourceKind, R> = {
  kind: T;
  data: R;
};

export type ResultServer = Base<'server', uitypes.Server>;

export type ResultServers = Base<'servers', uitypes.Cluster>;

export type ResultDb = Base<'db', uitypes.Database>;

export type ResultDbs = Base<'dbs', uitypes.Cluster>;

export type Result = ResultServer | ResultServers | ResultDb | ResultDbs;

export type GlobalSearchProvider = {
  search(value: string): Result[];
};
