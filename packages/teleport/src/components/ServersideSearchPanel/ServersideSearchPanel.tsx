import React from 'react';
import styled from 'styled-components';
import { Text, Box } from 'design';
import { StyledPanel } from 'design/DataTable';
import InputSearch from 'design/DataTable/InputSearch';
import Toggle from 'teleport/components/Toggle';
import useServersideSearchPanel, {
  State,
  Props,
} from './useServerSideSearchPanel';

export default function Container(props: Props) {
  const state = useServersideSearchPanel(props);
  return <ServersideSearchPanel {...state} />;
}

export function ServersideSearchPanel({
  searchString,
  setSearchString,
  isAdvancedSearch,
  setIsAdvancedSearch,
  onSubmitSearch,
}: State) {
  function onToggle() {
    setIsAdvancedSearch(!isAdvancedSearch);
  }

  return (
    <StyledPanel
      as="form"
      onSubmit={onSubmitSearch}
      borderTopLeftRadius={3}
      borderTopRightRadius={3}
    >
      <Box width="500px">
        <InputSearch
          searchValue={searchString}
          setSearchValue={setSearchString}
        >
          <ToggleWrapper>
            <Text typography="paragraph2" mr={1}>
              {isAdvancedSearch ? 'Advanced' : 'Simple'}
            </Text>
            <Toggle isToggled={isAdvancedSearch} onToggle={onToggle} />
          </ToggleWrapper>
        </InputSearch>
      </Box>
    </StyledPanel>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 8px;
  padding-left: 8px;
  width: 160px;
`;
