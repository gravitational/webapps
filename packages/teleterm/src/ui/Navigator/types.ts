import { FC } from 'react';
import { ResourceKind } from 'teleterm/ui/types';

export interface NavItem {
  items: NavItem[];
  title: string;
  uri: string;
  status?: 'offline' | 'failed' | 'loading' | '';
  Icon: FC;
  kind: ResourceKind;
  group: boolean;
}
