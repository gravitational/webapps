import { FC } from 'react';

export interface NavItem {
  items: NavItem[];
  title: string;
  uri: string;
  Icon: FC;
  group: boolean;
}
