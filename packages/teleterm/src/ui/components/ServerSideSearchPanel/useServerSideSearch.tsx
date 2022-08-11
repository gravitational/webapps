import React from 'react';
export default function useServerSideSearch() {
  const [isAdvancedSearch, setIsAdvancedSearch] =
    React.useState<boolean>(false);

  return {
    isAdvancedSearch,
    setIsAdvancedSearch,
  };
}
