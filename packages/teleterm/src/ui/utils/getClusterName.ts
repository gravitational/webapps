import { Cluster } from 'teleterm/services/tshd/types';

export function getClusterName(cluster?: Cluster): string {
  return cluster?.name;
}
