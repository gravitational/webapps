/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Flex,
  ButtonPrimary,
  ButtonSecondary,
  Text,
  Box,
  Indicator,
} from 'design';
import TopNavUserMenu from 'design/TopNav/TopNavUserMenu';
import { Danger } from 'design/Alert';
import * as Icons from 'design/Icon';
import useAttempt from 'shared/hooks/useAttemptNext';
import { MenuItem, MenuItemIcon } from 'shared/components/MenuAction';
import cfg from 'teleport/config';
import { useDiscoverContext } from './discoverContextProvider';

// agentStepTitles defines the titles per steps defined by enum `AgentStep`.
//
// We use the enum `AgentStep` numerical values to access the list's value,
// so this list's order and length must be equal to the enum.
const agentStepTitles: string[] = [
  'Requirement Gathering',
  'Teleport Installation',
  'Agent Initiation',
  'Role Configuration',
  'Connect Resource',
  'Test Resource',
];

// agentViews defines the list of components required per AgentKind per steps
// defined by enum `AgentStep`.
//
// We use the enum `AgentStep` numerical values to access the list's value,
// so the list's order and length must be equal to the enum.
const agentViews: Record<AgentKind, AgentStepComponent[]> = {
  node: [RequirementGatheringNode, TeleportInstallation, AgentInitiation],
  app: [RequirementGathering, TeleportInstallation, AgentInitiation],
};

export function Discover() {
  const discoverCtx = useDiscoverContext();

  const [user, setUser] = React.useState('');
  const [currentStep, setCurrentStep] = React.useState<AgentStep>(0);
  const [agentKind, setAgentKind] = React.useState<AgentKind>();
  const [agentMeta, setAgentMeta] = React.useState<AgentMeta>();

  const { attempt: initAttempt, run: initRun } = useAttempt('processing');

  function onSelectResource(kind: AgentKind) {
    setAgentKind(kind);
  }

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  function updateResourceMeta(meta: AgentMeta) {
    setAgentMeta(meta);
  }

  React.useEffect(() => {
    initRun(() =>
      discoverCtx.userService.fetchUserContext().then(c => setUser(c.username))
    );
  }, []);

  let AgentComponent;
  if (agentKind) {
    AgentComponent = agentViews[agentKind][currentStep];
  }

  return (
    <MainContainer>
      {initAttempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {initAttempt.status === 'failed' && (
        <Danger>{initAttempt.statusText}</Danger>
      )}
      {initAttempt.status === 'success' && (
        <>
          <TopBar onLogout={discoverCtx.logout} user={user} />
          <Flex p={5} alignItems="flex-start">
            <SideNavAgentConnect currentStep={currentStep} />
            <Box width="100%" height="100%" minWidth="0">
              {currentStep === AgentStep.RequirementGather && (
                <SelectAgent onClick={onSelectResource} agentKind={agentKind} />
              )}
              {AgentComponent && (
                <AgentComponent
                  nextStep={nextStep}
                  prevStep={prevStep}
                  updateResourceMeta={updateResourceMeta}
                />
              )}
            </Box>
          </Flex>
        </>
      )}
    </MainContainer>
  );
}

function TopBar(props: { onLogout: VoidFunction; user: string }) {
  const [open, setOpen] = React.useState(false);

  function showMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function logout() {
    closeMenu();
    props.onLogout();
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      height="56px"
      pl={5}
      borderColor="primary.main"
      border="1px solid"
    >
      <Text typography="h4" bold>
        Getting Started
      </Text>
      <TopNavUserMenu
        menuListCss={() => `
          width: 250px;
        `}
        open={open}
        onShow={showMenu}
        onClose={closeMenu}
        user={props.user}
      >
        <MenuItem as={NavLink} to={cfg.routes.root}>
          <MenuItemIcon as={Icons.Home} mr="2" />
          Dashboard
        </MenuItem>
        <MenuItem>
          <ButtonPrimary my={3} block onClick={logout}>
            Sign Out
          </ButtonPrimary>
        </MenuItem>
      </TopNavUserMenu>
    </Flex>
  );
}

function SelectAgent(props) {
  return (
    <Box width="700px">
      <Text mb={4} typography="h4" bold>
        Connect a Resource
      </Text>
      <Text mb={2} bold>
        Select Resource Type
      </Text>
      <Flex
        alignItems="center"
        css={`
          margin: 0 auto;
        `}
      >
        <AgentButton
          as="button"
          onClick={() => props.onClick('node')}
          disabled={props.agentKind === 'node'}
        >
          <Icons.Apple fontSize="50px" my={2} />
          <Text typography="h6" bold mt={1}>
            Server
          </Text>
        </AgentButton>
        <AgentButton
          as="button"
          onClick={() => props.onClick('app')}
          disabled={props.agentKind === 'app'}
        >
          <Icons.Apple fontSize="50px" my={2} />
          <Text typography="h6" bold mt={1}>
            Application
          </Text>
        </AgentButton>
      </Flex>
    </Box>
  );
}

function SideNavAgentConnect({ currentStep }) {
  return (
    <SideNavContainer>
      <Box mb={4}>
        <Flex alignItems="center">
          <Flex
            borderRadius={5}
            alignItems="center"
            justifyContent="center"
            bg="secondary.main"
            height="30px"
            width="30px"
            mr={2}
          >
            <Icons.Database />
          </Flex>
          <Text bold>Resource Connection</Text>
        </Flex>
        <Box ml={4} mt={4}>
          {agentStepTitles.map((step, index) => {
            let className = '';
            if (currentStep > index) {
              className = 'checked';
            } else if (currentStep === index) {
              className = 'active';
            }

            return (
              <StepsContainer className={className} key={step}>
                <Bullet />
                {step}
              </StepsContainer>
            );
          })}
        </Box>
      </Box>
    </SideNavContainer>
  );
}

function RequirementGathering(props: AgentStepProps) {
  return (
    <Box mt={5}>
      <Text mb={2} bold>
        General Requirement Gathering
      </Text>
      <Box width={500}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        lacinia tellus non velit porttitor, congue pretium quam luctus. Quisque
        varius mi non purus consectetur, et dignissim odio cursus. Cras
        tristique quis urna eget vehicula. Sed vehicula aliquam magna, in rutrum
        nisl. Maecenas velit nisi, aliquam nec felis sed, ultricies euismod
        tellus. Ut vel sem eget nisi tristique ullamcorper vel eget augue. Sed
        imperdiet volutpat nisi vel mollis. Duis pulvinar, mauris sit amet
        euismod dapibus, nibh felis dapibus ipsum, sit amet facilisis velit
        nulla non risus. Aenean varius quam nulla. Sed a sem sagittis, gravida
        ipsum quis, fringilla turpis.
      </Box>
      <ButtonPrimary width="182px" onClick={props.nextStep} mt={3}>
        Proceed
      </ButtonPrimary>
    </Box>
  );
}

function RequirementGatheringNode(props: AgentStepProps) {
  return (
    <Box mt={5}>
      <Text mb={2} bold>
        General Requirement Gathering Specific to Nodes
      </Text>
      <Box width={500}>Node stuff</Box>
      <ButtonPrimary width="182px" onClick={props.nextStep} mt={3}>
        Proceed
      </ButtonPrimary>
    </Box>
  );
}

function TeleportInstallation(props: AgentStepProps) {
  return (
    <Box mt={5}>
      <Text mb={2} bold>
        General Teleport Installation
      </Text>
      <Box width={500}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        lacinia tellus non velit porttitor, congue pretium quam luctus.
      </Box>
      <ButtonSecondary mr={3} width="165px" onClick={props.prevStep} mt={3}>
        Back
      </ButtonSecondary>
      <ButtonPrimary width="182px" onClick={props.nextStep} mt={3}>
        Proceed
      </ButtonPrimary>
    </Box>
  );
}

function AgentInitiation(props: AgentStepProps) {
  return (
    <Box mt={5}>
      <Text mb={2} bold>
        General Agent Installation
      </Text>
      <Box width={500}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        lacinia tellus non velit porttitor, congue pretium quam luctus. Quisque
        varius mi non purus consectetur, et dignissim odio cursus. Cras
        tristique quis urna eget vehicula. Sed vehicula aliquam magna, in rutrum
        nisl. Maecenas velit nisi, aliquam nec felis sed, ultricies euismod
        tellus. Ut vel sem eget nisi tristique ullamcorper vel eget augue. Sed
        imperdiet volutpat nisi vel mollis. Duis pulvinar, mauris sit amet
        euismod dapibus, nibh felis dapibus ipsum, sit amet facilisis velit
        nulla non risus. Aenean varius quam nulla. Sed a sem sagittis, gravida
        ipsum quis, fringilla turpis.
      </Box>
      <Box width={500}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        lacinia tellus non velit porttitor, congue pretium quam luctus. Quisque
        varius mi non purus consectetur, et dignissim odio cursus.
      </Box>
      <ButtonSecondary mr={3} width="165px" onClick={props.prevStep}>
        Back
      </ButtonSecondary>
    </Box>
  );
}

const Bullet = styled.span`
  height: 14px;
  width: 14px;
  border: 1px solid #9b9b9b;
  border-radius: 50%;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepsContainer = styled(Text)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 8px;

  &.active,
  &.checked {
    color: inherit;
  }

  &.active ${Bullet}, &.checked ${Bullet} {
    border-color: ${props => props.theme.colors.secondary.main};
    background: ${props => props.theme.colors.secondary.main};
  }

  &.active ${Bullet} {
    :before {
      content: '';
      height: 8px;
      width: 8px;
      border-radius: 50%;
      border: 2px solid ${props => props.theme.colors.primary.main};
    }
  }

  &.checked ${Bullet} {
    :before {
      content: '✓'; // TODO (anyone): check if this is valid
    }
  }
`;

const SideNavContainer = styled.nav`
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primary.light};
  width: 300px;
  padding: 24px;
  margin-right: 30px;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  min-width: 1000px;
`;

const AgentButton = styled(Flex)(
  props => `
  align-items: center;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 4px;
  width: 160px;
  border: none;
  padding: 24px 32px;
  margin-right: 16px;
  margin-bottom: 16px;
  background-color: ${props.theme.colors.primary.light};
  &:disabled {
    border: 2px solid ${props.theme.colors.secondary.main};
    background: ${props.theme.colors.primary.lighter};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.56);
  }
  &:hover {
    background: ${props.theme.colors.primary.lighter};
  }
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  text-align: center;
`
);

type AgentStepProps = {
  // nextStep increments the `currentStep` to go to the next step.
  nextStep(): void;
  // prevStep decrements the `currentStep` to go to the prev step.
  prevStep(): void;
  // updateResourceMeta updates the data as needed as we move through the step.
  updateResourceMeta(meta: AgentMeta): void;
};

type AgentStepComponent = (props: AgentStepProps) => JSX.Element;

// TODO (anyone): might need this to mimic the type token endpoint expects
type AgentKind = 'app' | 'node';

// AgentStep defines the order of steps in `connecting a agent (resource)`
// that all agent kinds should share.
//
// The numerical enum value is used to determine which step the user is currently in,
// which is also used as the `index value` to access array's values
// for `agentStepTitles` and `agentViews`.
enum AgentStep {
  RequirementGather = 0,
  TeleportInstall,
  AgentInit,
  RoleConfig,
  ConnectResource,
  TestResource,
}

// NodeMeta describes the fields that may be provided or required by user
// when connecting a node.
type NodeMeta = {
  awsAccountId?: string;
  awsArn?: string;
};

// AppMeta describes the fields that may be provided or required by user
// when connecting a app.
type AppMeta = {
  name: string;
  publicAddr: string;
};

type AgentMeta = NodeMeta | AppMeta;
