import { FetchStatus, ServersideConfig } from './../types';

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

  const count = data.length;

  const isNextDisabled = serverside
    ? serverside.startKeys.at(-1) === ''
    : to === data.length - 1;

  const isPrevDisabled = serverside
    ? serverside.startKeys.length <= 2
    : currentPage === 0;

  return {
    nextPage,
    prevPage,
    from,
    to,
    count,
    isNextDisabled,
    isPrevDisabled,
    serverside,
    ...props,
  };
}

export type Props = {
  nextPage: () => void;
  prevPage: () => void;
  data: any[];
  paginatedData?: Array<Array<any>>;
  currentPage?: number;
  pageSize?: number;
  onFetchMore?: () => void;
  fetchStatus?: FetchStatus;
  serverside?: ServersideConfig;
};

export type State = ReturnType<typeof usePager>;
