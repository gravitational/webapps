import React from 'react';
import styled from 'styled-components';
import { Text, Box, Flex, Link } from 'design';
import ClusterSearch from 'teleterm/ui/DocumentCluster/ClusterResources/ClusterSearch';
import { StyledPanel } from 'design/DataTable';
import Toggle from 'teleport/components/Toggle';
import Tooltip from '../Tooltip';

const GUIDE_URL =
  'https://goteleport.com/docs/setup/reference/predicate-language/#resource-filtering';

export function ServerSideSearchPanel({
  isAdvancedSearch,
  setIsAdvancedSearch,
}: Props) {
  function onToggle() {
    setIsAdvancedSearch(!isAdvancedSearch);
  }
  return (
    <StyledPanel
      as="form"
      onSubmit={() => console.log('onSubmit')}
      borderTopLeftRadius={3}
      borderTopRightRadius={3}
    >
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Flex style={{ width: '70%' }} alignItems="center">
          <Box width="100%" mr={3}>
            <ClusterSearch onChange={val => console.log('onChange', val)}>
              <ToggleWrapper>
                <Toggle isToggled={isAdvancedSearch} onToggle={onToggle} />
                <Text typography="paragraph2">Advanced</Text>
              </ToggleWrapper>
            </ClusterSearch>
          </Box>
          <Tooltip>
            <PredicateDoc />
          </Tooltip>
        </Flex>
      </Flex>
    </StyledPanel>
  );
}

export const PredicateDoc = () => (
  <>
    <Text typography="paragraph2">
      Advanced search allows you to perform more sophisticated searches using
      the predicate language. The language supports the basic operators:{' '}
      <Text as="span" bold>
        <code>==</code>{' '}
      </Text>
      ,{' '}
      <Text as="span" bold>
        <code>!=</code>
      </Text>
      ,{' '}
      <Text as="span" bold>
        <code>&&</code>
      </Text>
      , and{' '}
      <Text as="span" bold>
        <code>||</code>
      </Text>
    </Text>
    <Text typography="h4" mt={2} mb={1}>
      Usage Examples
    </Text>
    <Text typography="paragraph2">
      Label Matching:{' '}
      <Text ml={1} as="span" bold>
        <code>labels["key"] == "value" && labels["key2"] != "value2"</code>{' '}
      </Text>
      <br />
      Fuzzy Searching:{' '}
      <Text ml={1} as="span" bold>
        <code>search("foo", "bar", "some phrase")</code>
      </Text>
      <br />
      Combination:{' '}
      <Text ml={1} as="span" bold>
        <code>labels["key1"] == "value1" && search("foo")</code>
      </Text>
    </Text>
    <Text typography="paragraph2" mt={2}>
      Check out our{' '}
      <Link href={GUIDE_URL} target="_blank">
        predicate language guide
      </Link>{' '}
      for a more in-depth explanation of the language.
    </Text>
  </>
);

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 16px;
  padding-left: 16px;
  width: 120px;
`;

type Props = {
  isAdvancedSearch: boolean;
  setIsAdvancedSearch: (boolean) => void;
};
