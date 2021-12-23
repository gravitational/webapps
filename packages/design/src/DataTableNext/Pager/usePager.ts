export default function usePager({
  nextPage,
  prevPage,
  data = [],
  paginatedData = [],
  currentPage,
  pageSize,
  fetchMore,
}: Props) {
  const currentPageData = paginatedData[currentPage];
  const searchFrom = currentPage * pageSize;

  const from = data.indexOf(currentPageData[0], searchFrom);
  const to = data.lastIndexOf(
    currentPageData[currentPageData.length - 1],
    searchFrom + pageSize - 1
  );

  return {
    nextPage,
    prevPage,
    from,
    to,
    count: data.length,
    isPrevDisabled: currentPage === 0,
    isNextDisabled: to === data.length - 1,
    fetchMore,
  };
}

export type Props = {
  nextPage: () => void;
  prevPage: () => void;
  data: any[];
  paginatedData: Array<Array<any>>;
  currentPage: number;
  pageSize: number;
  fetchMore: () => void;
};

export type State = ReturnType<typeof usePager>;
