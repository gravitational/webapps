import { tsh } from 'teleterm/ui/services/clusters/types';

type Base<T, R> = {
  kind: T;
  data: R;
};

export type ItemCluster = Base<'item.cluster', tsh.Cluster>;
export type ItemServer = Base<'item.server', tsh.Server>;
export type ItemDb = Base<'item.db', tsh.Database>;
export type ItemCmd = Base<
  'item.cmd',
  { name: string; displayName: string; description: string }
>;
export type ItemNewCluster = Base<
  'item.cluster-new',
  { displayName: string; uri?: string; description: string }
>;
export type Item = ItemNewCluster | ItemServer | ItemDb | ItemCluster | ItemCmd;
export type QuickInputPicker = {
  onFilter(value: string): Item[];
  onPick(item: Item): void;
};
