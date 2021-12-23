import { useEffect, useState } from 'react';
import isMatch from 'design/utils/match';
import { displayDate } from 'shared/services/loc';
import { TableProps, TableColumn } from './types';
import paginateData from './paginateData';

export default function useTable<T>({
  data,
  columns,
  pagination,
  ...props
}: TableProps<T>) {
  const [state, setState] = useState(() => {
    const col = columns.find(column => column.isSortable);
    return {
      data: [],
      searchValue: '',
      sort: col
        ? {
            key: col.key as string,
            onSort: col?.onSort,
            dir: 'ASC' as SortDir,
          }
        : null,
      pagination: pagination
        ? {
            paginatedData: paginateData(data, pagination.pageSize),
            currentPage: 0,
            pagerPosition: pagination.pagerPosition || 'top',
            pageSize: pagination?.pageSize || 10,
            fetchMore: pagination?.fetchMore,
          }
        : null,
    };
  });

  const updateData = (sort: typeof state.sort, searchValue: string) => {
    const sortedAndFiltered = sortAndFilter(
      data,
      searchValue,
      sort,
      columns.map(column => column.key)
    );

    if (pagination) {
      setState({
        ...state,
        sort,
        searchValue,
        data: sortedAndFiltered,
        pagination: {
          ...state.pagination,
          currentPage: 0,
          paginatedData: paginateData(sortedAndFiltered, pagination.pageSize),
        },
      });
    } else {
      setState({
        ...state,
        sort,
        searchValue,
        data: sortedAndFiltered,
      });
    }
  };

  function onSort(column: TableColumn<any>) {
    updateData(
      {
        key: column.key,
        onSort: column?.onSort,
        dir: state.sort.dir === 'ASC' ? 'DESC' : 'ASC',
      },
      state.searchValue
    );
  }

  function setSearchValue(searchValue: string) {
    updateData(state.sort, searchValue);
  }

  function nextPage() {
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: state.pagination.currentPage + 1,
      },
    });
  }

  function prevPage() {
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: state.pagination.currentPage - 1,
      },
    });
  }

  useEffect(() => {
    updateData(state.sort, state.searchValue);
  }, [data]);

  return {
    state,
    columns,
    setState,
    setSearchValue,
    onSort,
    nextPage,
    prevPage,
    ...props,
  };
}

function sortAndFilter<T>(
  data: T[] = [],
  searchValue = '',
  sort: State<T>['state']['sort'],
  columnKeys: string[]
) {
  const output = data.filter(obj =>
    isMatch(obj, searchValue, {
      searchableProps: columnKeys,
      cb: searchAndFilterCb,
    })
  );

  if (sort) {
    if (sort.onSort) {
      output.sort((a, b) => sort.onSort(a[sort.key], b[sort.key]));
    } else {
      output.sort((a, b) => {
        const $a = a[sort.key];
        const $b = b[sort.key];

        if (typeof $a === 'string' && typeof $b === 'string') {
          return $b.localeCompare($a);
        }

        if ($a < $b) {
          return 1;
        }
        if ($a > $b) {
          return -1;
        }
        return 0;
      });
    }

    if (sort.dir === 'ASC') {
      output.reverse();
    }
  }

  return output;
}

function searchAndFilterCb(
  targetValue: any,
  searchValue: string,
  propName: string
) {
  if (propName === 'tags') {
    return targetValue.some(item => {
      return item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
    });
  }
  if (propName.toLocaleLowerCase().includes('date')) {
    return displayDate(targetValue).includes(searchValue);
  }
}

export type SortDir = 'ASC' | 'DESC';

export type State<T> = Omit<ReturnType<typeof useTable>, 'columns'> & {
  columns: TableColumn<T>[];
};
