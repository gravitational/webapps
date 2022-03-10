import { MatchCallback } from 'design/utils/match';

export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  emptyText: string;
  pagination?: PaginationConfig;
  isSearchable?: boolean;
  searchableProps?: Extract<keyof T, string>[];
  initialSort?: InitialSort<T>;
  fetching?: FetchingConfig;
  showFirst?: (data: T[]) => T;
  className?: string;
  // searchDatePropName is the searchable prop name for a date (type Date) that
  // requires its value to be formatted as string 'yyyy-MM-dd' before a search match.
  searchDatePropName?: string;
  // searchDateTimePropName is the searchable prop name for a date (type Date)
  // that requires its value to be formatted as string 'yyyy-MM-dd HH:mm:ss'
  // before a search match.
  searchDateTimePropName?: string;
  // customSearchMatchers contains custom functions to run when search matching.
  // 'targetValue' prop will have to be upper cased for proper matching since
  // the root matcher will upper case the search value.
  customSearchMatchers?: MatchCallback<T>[];
  style?: React.CSSProperties;
};

type TableColumnBase<T> = {
  headerText?: string;
  render?: (row: T) => JSX.Element;
  isSortable?: boolean;
  onSort?: (a, b) => number;
};

export type PaginationConfig = {
  pageSize?: number;
  pagerPosition?: 'top' | 'bottom';
};

export type FetchingConfig = {
  onFetchMore: () => void;
  fetchStatus: FetchStatus;
};

// Makes it so either key or altKey is required
type TableColumnWithKey<T> = TableColumnBase<T> & {
  key: Extract<keyof T, string>;
  altKey?: never;
};

type TableColumnWithAltKey<T> = TableColumnBase<T> & {
  altKey: string;
  key?: never;
};

type InitialSort<T> = {
  key: Extract<keyof T, string>;
  dir: SortDir;
};

export type SortDir = 'ASC' | 'DESC';

export type FetchStatus = 'loading' | 'disabled' | '';

export type TableColumn<T> = TableColumnWithKey<T> | TableColumnWithAltKey<T>;
