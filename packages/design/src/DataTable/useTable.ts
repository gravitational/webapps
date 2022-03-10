import { useEffect, useState } from 'react';
import isMatch from 'design/utils/match';
import { displayDate, displayDateTime } from 'shared/services/loc';
import paginateData from './Pager/paginateData';
import { TableProps, TableColumn } from './types';

export default function useTable<T>({
  data,
  columns,
  pagination,
  showFirst,
  searchableProps,
  ...props
}: TableProps<T>) {
  const [state, setState] = useState(() => {
    // Finds the first sortable column to use for the initial sorting
    const col = props.initialSort
      ? columns.find(column => column.key === props.initialSort.key)
      : columns.find(column => column.isSortable);

    return {
      data: [] as T[],
      searchValue: '',
      sort: col
        ? {
            key: col.key as string,
            onSort: col.onSort,
            dir: props.initialSort?.dir || 'ASC',
          }
        : null,
      pagination: pagination
        ? {
            paginatedData: paginateData(data, pagination.pageSize),
            currentPage: 0,
            pagerPosition: pagination.pagerPosition || 'top',
            pageSize: pagination.pageSize || 10,
          }
        : null,
    };
  });

  const updateData = (sort: typeof state.sort, searchValue: string) => {
    const sortedAndFiltered = sortAndFilter(
      data,
      searchValue,
      sort,
      searchableProps ||
        columns.filter(column => column.key).map(column => column.key),
      showFirst
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
        onSort: column.onSort,
        dir: state.sort?.dir === 'ASC' ? 'DESC' : 'ASC',
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
  searchableProps: (keyof T)[],
  showFirst?: TableProps<T>['showFirst']
) {
  const output = data.filter(obj =>
    isMatch(obj, searchValue, {
      searchableProps,
      cb: searchAndFilterCb,
    })
  );
  if (sort) {
    if (sort.onSort) {
      output.sort((a, b) => sort.onSort(a[sort.key], b[sort.key]));
    } else {
      output.sort((a, b) => {
        const aValue = a[sort.key];
        const bValue = b[sort.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue, undefined, { numeric: true });
        }

        return aValue - bValue;
      });
    }

    if (sort.dir === 'DESC') {
      output.reverse();
    }
  }

  if (showFirst) {
    const index = output.indexOf(showFirst(data));
    if (index !== -1) {
      const item = output[index];
      output.splice(index, 1);
      output.unshift(item);
    }
  }

  return output;
}

function searchAndFilterCb<T>(
  targetValue: any,
  searchValue: string,
  propName: keyof T & string
) {
  const propNameLowerCased = propName.toLocaleLowerCase();
  const searchValueLowerCased = searchValue.toLocaleLowerCase();

  let targetValueArr = targetValue;

  if (!Array.isArray(targetValue)) {
    targetValueArr = [targetValue];
  }

  return targetValueArr.some(item => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      for (const key in item) {
        if (item[key].toLocaleLowerCase().includes(searchValueLowerCased)) {
          return true;
        }
      }
    } else if (propNameLowerCased.includes('date')) {
      return displayDate(item).includes(searchValueLowerCased);
    } else if (propNameLowerCased.includes('time')) {
      return displayDateTime(item).includes(searchValueLowerCased);
    } else if (typeof item === 'boolean') {
      return propNameLowerCased.includes(searchValueLowerCased) && item;
    } else {
      return item
        .toString()
        .toLocaleLowerCase()
        .includes(searchValueLowerCased);
    }
  });
}

export type State<T> = Omit<
  ReturnType<typeof useTable>,
  'columns' | 'initialSort'
> & {
  columns: TableColumn<T>[];
  className?: string;
};
