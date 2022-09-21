import { Box, Flex, Indicator } from 'design';
import styled from 'styled-components';
import { StyledArrowBtn } from 'design/DataTable/Pager/StyledPager';
import React from 'react';
import useNewRequest, { ResourceKind, State } from './useNewRequest';
import { StyledPanel } from 'design/DataTable/StyledTable';
import { space, width } from 'design/system';
import { CircleArrowLeft, CircleArrowRight } from 'design/Icon';
import { SearchPanel } from 'e-teleport/Workflow/NewRequest/SearchPanel';
import { ResourceList } from 'e-teleport/Workflow/NewRequest/ResourceList';

export default function Container() {
  const state = useNewRequest();
  return <NewRequest {...state} />;
}

const agentOptions: ResourceOption[] = [
  { value: 'role', label: 'Roles' },
  {
    value: 'node',
    label: 'Servers',
  },
  {
    value: 'db',
    label: 'Databases',
  },
];

function NewRequest({
  agentFilter,
  pageCount,
  updateQuery,
  updateSearch,
  selectedResource,
  customSort,
  attempt,
  fetchStatus,
  onAgentLabelClick,
  addedResources,
  addOrRemoveResource,
  updateResourceKind,
  prevPage,
  requestableRoles,
  nextPage,
  agents,
}: State) {
  const numAddedAgents =
    Object.keys(addedResources.node).length +
    Object.keys(addedResources.db).length +
    Object.keys(addedResources.app).length +
    Object.keys(addedResources.kube_cluster).length +
    Object.keys(addedResources.windows_desktop).length;

  const numAddedRoles = Object.keys(addedResources.role).length;
  function handleUpdateSelectedResource(kind: ResourceKind) {
    if (
      (kind === 'role' && numAddedAgents > 0) ||
      (kind !== 'role' && numAddedRoles > 0)
    ) {
      console.log('CANT DO IT');
    } else {
      updateResourceKind(kind);
    }
  }

  return (
    <Layout mx="auto" px={5} pt={3} height="100%" flexDirection="column">
      <StyledMain>
        <StyledNav mt={3} mb={3}>
          {agentOptions.map(agent => (
            <StyledNavButton
              key={agent.value}
              mr={6}
              active={selectedResource === agent.value}
              onClick={() => handleUpdateSelectedResource(agent.value)}
            >
              {agent.label}
            </StyledNavButton>
          ))}
        </StyledNav>
        {attempt.status === 'processing' && (
          <Box textAlign="center" m={10}>
            <Indicator delay="none" />
          </Box>
        )}
        {attempt.status !== 'processing' && (
          <>
            <SearchPanel
              updateQuery={updateQuery}
              updateSearch={updateSearch}
              pageCount={pageCount}
              filter={agentFilter}
              showSearchBar={true}
              disableSearch={fetchStatus === 'loading'}
            />
            <ResourceList
              agents={agents}
              selectedResource={selectedResource}
              customSort={customSort}
              onLabelClick={onAgentLabelClick}
              addedResources={addedResources}
              addOrRemoveResource={addOrRemoveResource}
              requestableRoles={requestableRoles}
              disableRows={fetchStatus === 'loading'}
            />
            <StyledPanel borderBottomLeftRadius={3} borderBottomRightRadius={3}>
              <Flex justifyContent="flex-end" width="100%">
                <Flex alignItems="center" mr={2}></Flex>
                <Flex>
                  <StyledArrowBtn
                    onClick={prevPage}
                    title="Previous page"
                    disabled={!prevPage || fetchStatus === 'loading'}
                    mx={0}
                  >
                    <CircleArrowLeft fontSize="3" />
                  </StyledArrowBtn>
                  <StyledArrowBtn
                    ml={0}
                    onClick={nextPage}
                    title="Next page"
                    disabled={!nextPage || fetchStatus === 'loading'}
                  >
                    <CircleArrowRight fontSize="3" />
                  </StyledArrowBtn>
                </Flex>
              </Flex>
            </StyledPanel>
          </>
        )}
      </StyledMain>
    </Layout>
  );
}

const Layout = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1248px;

  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;

const StyledNavButton = styled.button(props => {
  return {
    color: props.active
      ? props.theme.colors.light
      : props.theme.colors.text.secondary,
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '14px',
    position: 'relative',
    padding: '0',
    marginRight: '24px',
    textDecoration: 'none',
    fontWeight: props.active ? 700 : 400,
    outline: 'inherit',
    border: 'none',
    backgroundColor: 'inherit',
    flexShrink: '0',
    borderRadius: '4px',

    '&:hover, &:focus': {
      background: props.theme.colors.primary.main,
    },
    ...space(props),
    ...width(props),
  };
});

const StyledNav = styled(Flex)`
  min-width: 180px;
  overflow: auto;
`;

const StyledMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

type ResourceOption = {
  value: ResourceKind;
  label: string;
};
