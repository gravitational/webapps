/*
Copyright 2022 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useEffect, useState } from 'react';
import {
  decodeUrlQueryParam,
  ResourceUrlQueryParams,
} from 'teleport/getUrlQueryParams';
import encodeUrlQueryParams from 'teleport/encodeUrlQueryParams';

export default function useServersideSearchPanel(props: Props) {
  const { pathname, params, setParams, replaceHistory } = props;

  const [searchString, setSearchString] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  function onSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitSearch();
  }

  function submitSearch() {
    if (isAdvancedSearch) {
      setParams({
        ...params,
        search: null,
        query: searchString,
      });
    } else {
      setParams({
        ...params,
        query: null,
        search: searchString,
      });
    }
    replaceHistory(
      encodeUrlQueryParams(
        pathname,
        searchString,
        params.sort,
        isAdvancedSearch
      )
    );
  }

  // Populate search bar with existing query
  useEffect(() => {
    if (params.query) {
      setIsAdvancedSearch(true);
      setSearchString(decodeUrlQueryParam(params.query));
    } else if (params.search) {
      setIsAdvancedSearch(false);
      setSearchString(decodeUrlQueryParam(params.search));
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      submitSearch();
    }
    setIsInitialLoad(false);
  }, [params.sort]);

  return {
    searchString,
    setSearchString,
    isAdvancedSearch,
    setIsAdvancedSearch,
    onSubmitSearch,
    ...props,
  };
}

export type Props = {
  pathname: string;
  replaceHistory: (path: string) => void;
  params: ResourceUrlQueryParams;
  setParams: (params: ResourceUrlQueryParams) => void;
  from: number;
  to: number;
  count: number;
};

export type State = ReturnType<typeof useServersideSearchPanel>;
