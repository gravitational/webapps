import React from 'react';
export default function useServerSideSearchPanel(props: any) {
  const [isAdvancedSearch, setIsAdvancedSearch] =
    React.useState<boolean>(false);

  function onSearchSubmit(searchValue: string) {
    props.onSearchSubmit({
      search: isAdvancedSearch ? '' : searchValue,
      query: isAdvancedSearch ? searchValue : '',
    });
  }

  return {
    isAdvancedSearch,
    setIsAdvancedSearch,
    onSearchSubmit,
  };
}
