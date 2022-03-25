import { FetchStatus } from '../types';
import { State as TableState } from '../useTable';

export default function usePager({
  nextPage,
  prevPage,
  data = [],
  paginatedData = [],
  currentPage,
  pageSize,
  serverside,
  ...props
}: Props) {
  const currentPageData = paginatedData[currentPage] || [];
  const searchFrom = currentPage * pageSize;

  const from = data.indexOf(currentPageData[0], searchFrom);
  const to = data.lastIndexOf(
    currentPageData[currentPageData.length - 1],
    searchFrom + pageSize - 1
  );

  const count = serverside ? serverside.totalItemCount : data.length;
  const isNextDisabled = serverside
    ? serverside.totalItemCount <= data.length
    : to === data.length - 1;

  return {
    nextPage,
    prevPage,
    from,
    to,
    count,
    isPrevDisabled: currentPage === 0,
    isNextDisabled,
    serverside,
    ...props,
  };
}

export type Props = {
  nextPage: () => void;
  prevPage: () => void;
  data: any[];
  paginatedData: Array<Array<any>>;
  currentPage: number;
  pageSize: number;
  onFetchMore?: () => void;
  fetchStatus?: FetchStatus;
  serverside?: TableState<any>['state']['serverside'];
};

export type State = ReturnType<typeof usePager>;
