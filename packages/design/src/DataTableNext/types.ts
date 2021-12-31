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
  render?: (row: T) => JSX.Element;
  isSortable?: boolean;
  onSort?: (a, b) => number;
};

export type PaginationConfig = {
  pageSize?: number;
  pagerPosition?: 'top' | 'bottom';
  onFetchMore?: () => void;
  fetchStatus?: 'loading' | 'disabled' | '';
};
