import { useState } from 'react';
import { useLocation, useHistory } from 'react-router';

export default function useAdvancedSearchInput() {
  const [searchString, setSearchString] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    history.replace(
      encodeUrlQueryParams(pathname, searchString, isAdvancedSearch)
    );
  }

  return {
    searchString,
    setSearchString,
    isAdvancedSearch,
    setIsAdvancedSearch,
    onSubmitSearch,
  };
}

export type State = ReturnType<typeof useAdvancedSearchInput>;

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
  const beautifiedQuery = encodedQuery.replaceAll('%20', '+');

  return `${pathname}?${
    isAdvancedSearch ? ADVANCED_SEARCH_PARAM : SIMPLE_SEARCH_PARAM
  }${beautifiedQuery}`;
}
