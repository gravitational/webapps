import { SortType } from './components/ServersideSearchPanel/useServerSideSearchPanel';

export default function getResourceUrlQueryParams(
  searchPath: string
): ResourceUrlQueryParams {
  const searchParams = new URLSearchParams(searchPath);
  const query = searchParams.get('query');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');

  return {
    query,
    search,
    sort: sort
      ? ({
          fieldName: sort.split(':')[0],
          dir: sort.split(':')[1].toUpperCase(),
        } as SortType)
      : null,
  };
}

export function decodeUrlQueryParam(param: string) {
  const decodedQuery = decodeURIComponent(param);
  const beautifiedDecodedQuery = decodedQuery.replaceAll('+', ' ');
  return beautifiedDecodedQuery;
}

export type ResourceUrlQueryParams = {
  query?: string;
  search?: string;
  sort?: SortType;
};
