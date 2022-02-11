import { ReactNode } from 'react';

export interface VirtualScrollProps<T> {
  rowHeight: number;
  keyProp: keyof T;
  childrenProp?: keyof T;
  items: T[];
  Node(props: {
    item: T;
    deepLevel: number;
    isExpanded: boolean;
    isLeaf: boolean;
    onToggle(): void;
  }): ReactNode;
}

export interface VirtualScrollItem<T> {
  item: T;
  deepLevel: number;
  parentKeys: string[];
  isLeaf: boolean;
}
