import { tsh } from 'teleterm/ui/services/clusters/types';
import { ResourceKind } from 'teleterm/ui/types';

type Base<T extends ResourceKind, R> = {
  kind: T;
  data: R;
};

export type ResultServer = Base<'server', tsh.Server>;

export type ResultServers = Base<'servers', tsh.Cluster>;

export type ResultDb = Base<'db', tsh.Database>;

export type ResultDbs = Base<'dbs', tsh.Cluster>;

export type Result = ResultServer | ResultServers | ResultDb | ResultDbs;

export type GlobalSearchProvider = {
  search(value: string): Result[];
};
