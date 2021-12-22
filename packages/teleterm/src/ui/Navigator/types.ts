import { FC } from 'react';

export interface NavItem {
  items: NavItem[];
  title: string;
  uri: string;
  status?: 'offline' | 'failed' | 'loading' | '';
  Icon: FC;
  kind: string;
  group: boolean;
}
