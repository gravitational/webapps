import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import history from 'teleport/services/history';
import getResourceUrlQueryParams, {
  decodeUrlQueryParam,
} from 'teleport/getUrlQueryParams';

export default function useServersideSearchPanel(props: Props) {
  const location = useLocation();

  const [searchString, setSearchString] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    history.replace(
      encodeUrlQueryParams(location.pathname, searchString, isAdvancedSearch)
    );
  }

  // Populate search bar with existing query
  useEffect(() => {
    const params = getResourceUrlQueryParams(location.search);
    if (params.query) {
      setIsAdvancedSearch(true);
      setSearchString(decodeUrlQueryParam(params.query));
    } else if (params.search) {
      setIsAdvancedSearch(false);
      setSearchString(decodeUrlQueryParam(params.search));
    }
  }, [location]);

  return {
    searchString,
    setSearchString,
    isAdvancedSearch,
    setIsAdvancedSearch,
    onSubmitSearch,
    ...props,
  };
}

const ADVANCED_SEARCH_PARAM = 'query=';
const SIMPLE_SEARCH_PARAM = 'search=';

function encodeUrlQueryParams(
  pathname: string,
  searchString: string,
  isAdvancedSearch: boolean
) {
  if (!searchString.length) {
    return pathname;
  }

  const encodedQuery = encodeURIComponent(searchString);
  console.log('ENCODED: ' + encodedQuery);
  const beautifiedQuery = !isAdvancedSearch
    ? encodedQuery.replaceAll('%20', '+')
    : encodedQuery;

  return `${pathname}?${
    isAdvancedSearch ? ADVANCED_SEARCH_PARAM : SIMPLE_SEARCH_PARAM
  }${beautifiedQuery}`;
}

export type Props = {
  itemCountText: string;
};

export type State = ReturnType<typeof useServersideSearchPanel>;
