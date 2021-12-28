export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  emptyText: string;
  pagination?: PaginationConfig;
  isSearchable?: boolean;
};

export type TableColumn<T> = {
  key: Extract<keyof T, string>;
  altKey?: string;
  headerText?: string;
  onRender?: (row: T) => JSX.Element;
  isSortable?: boolean;
  sortType?: 'string' | 'number' | 'boolean' | 'auto';
  onSort?: (a, b) => 1 | -1 | 0;
};

type PaginationConfig = {
  pageSize: number;
  pagerPosition?: 'top' | 'bottom';
  fetchMore?: () => void;
};
