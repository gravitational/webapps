import React from 'react';
import styled from 'styled-components';
import { Text, Box, Flex, Link } from 'design';
import { Magnifier } from 'design/Icon';
import { StyledPanel } from 'design/DataTable';
import Toggle from 'teleport/components/Toggle';
import { space, color, height } from 'styled-system';
import useServerSideSearchPanel from 'teleterm/ui/components/ServerSideSearchPanel/useServerSideSearchPanel';

import Tooltip from '../Tooltip';

const GUIDE_URL =
  'https://goteleport.com/docs/setup/reference/predicate-language/#resource-filtering';

export default function Container(props: Props) {
  const state = useServerSideSearchPanel(props);
  return <ServerSideSearchPanel {...state} />;
}

function ServerSideSearchPanel({
  isAdvancedSearch,
  setIsAdvancedSearch,
  onSearchSubmit,
}: Props) {
  const ref = React.useRef<HTMLInputElement>();

  const onToggle = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit(ref.current?.value);
  };

  return (
    <StyledPanel
      as="form"
      onSubmit={handleSearchSubmit}
      borderTopLeftRadius={3}
      borderTopRightRadius={3}
    >
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Flex style={{ width: '70%' }} alignItems="center">
          <Box width="100%" mr={3}>
            <Wrapper>
              <Magnifier ml="3" />
              <StyledInput ref={ref} placeholder="SEARCH..." px={3} />
              <ToggleWrapper>
                <Toggle isToggled={isAdvancedSearch} onToggle={onToggle} />
                <Text typography="paragraph2">Advanced</Text>
              </ToggleWrapper>
            </Wrapper>
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

const Wrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 100%;
  border-radius: 200px;
  height: 32px;
  background: ${props => props.theme.colors.primary.dark};
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  box-sizing: border-box;
  height: 100%;
  font-size: 12px;
  width: 100%;
  transition: all 0.2s;
  ${color}
  ${space}
  ${height}
  ${fromTheme};
`;

function fromTheme(props) {
  return {
    color: props.theme.colors.text.primary,
    background: props.theme.colors.primary.dark,

    '&: hover, &:focus, &:active': {
      background: props.theme.colors.primary.main,
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, .24)',
      color: props.theme.colors.text.primary,
    },
    '&::placeholder': {
      color: props.theme.colors.text.placeholder,
      fontSize: props.theme.fontSizes[1],
    },
  };
}

type Props = {
  isAdvancedSearch?: boolean;
  setIsAdvancedSearch?: (boolean) => void;
  onSearchSubmit?: (string) => void;
};
