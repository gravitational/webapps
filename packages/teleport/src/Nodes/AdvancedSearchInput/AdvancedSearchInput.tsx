import React from 'react';
import { ButtonPrimary } from 'design';
import { StyledPanel } from 'design/DataTable';
import InputSearch from 'design/DataTable/InputSearch';
import useAdvancedSearchInput, { State } from './useAdvancedSearchInput';

export default function Container() {
  const state = useAdvancedSearchInput();
  return <AdvancedSearchPanel {...state} />;
}

export function AdvancedSearchPanel({
  searchString,
  setSearchString,
  isAdvancedSearch,
  setIsAdvancedSearch,
  onSubmitSearch,
}: State) {
  setIsAdvancedSearch(true);
  return (
    <StyledPanel as="form" onSubmit={onSubmitSearch}>
      <InputSearch
        searchValue={searchString}
        setSearchValue={setSearchString}
      />
      <ButtonPrimary onClick={onSubmitSearch}>Search</ButtonPrimary>
    </StyledPanel>
  );
}
