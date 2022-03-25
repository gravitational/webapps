export default function getResourceUrlQueryParams(searchPath: string) {
  const searchParams = new URLSearchParams(searchPath);
  const query = searchParams.get('query');
  const search = searchParams.get('search');

  return {
    query,
    search,
  };
}

export function decodeUrlQueryParam(param: string) {
  const decodedQuery = decodeURIComponent(param);
  const beautifiedDecodedQuery = decodedQuery.replaceAll('+', ' ');
  return beautifiedDecodedQuery;
}
