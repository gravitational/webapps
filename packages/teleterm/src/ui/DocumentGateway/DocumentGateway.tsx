/*
Copyright 2019 Gravitational, Inc.

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

import React from 'react';
import {
  Text,
  Flex,
  Box,
  ButtonPrimary,
  ButtonSecondary,
  Link,
  Indicator,
} from 'design';
import Document from 'teleterm/ui/Document';
import * as Alerts from 'design/Alert';
import * as types from 'teleterm/ui/services/workspacesService';
import LinearProgress from 'teleterm/ui/components/LinearProgress';
import useDocumentGateway, { State } from './useDocumentGateway';
import { MenuLogin } from 'shared/components/MenuLogin';
import { MenuLoginThemeProvider } from 'teleterm/ui/ThemeProvider';

type Props = {
  visible: boolean;
  doc: types.DocumentGateway;
};

export default function Container(props: Props) {
  const { doc, visible } = props;
  const state = useDocumentGateway(doc);
  return (
    <Document visible={visible}>
      <DocumentGateway {...state} />
    </Document>
  );
}

export function DocumentGateway(props: State) {
  const {
    gateway,
    connected,
    connectAttempt,
    disconnect,
    reconnect,
    runCliCommand,
    changeDbName,
    changeDbNameAttempt,
  } = props;

  const isLoading = changeDbNameAttempt.status === 'processing';

  if (!connected) {
    const statusDescription =
      connectAttempt.status === 'processing' ? 'being set up' : 'offline';

    return (
      <Flex flexDirection="column" mx="auto" alignItems="center" mt={100}>
        <Text
          typography="h5"
          color="text.primary"
          style={{ position: 'relative' }}
        >
          The database connection is {statusDescription}
          {connectAttempt.status === 'processing' && <LinearProgress />}
        </Text>
        {connectAttempt.status === 'error' && (
          <Alerts.Danger>{connectAttempt.statusText}</Alerts.Danger>
        )}
        <ButtonPrimary
          mt={4}
          width="100px"
          onClick={reconnect}
          disabled={connectAttempt.status === 'processing'}
        >
          Reconnect
        </ButtonPrimary>
      </Flex>
    );
  }

  return (
    <Box maxWidth="1024px" mx="auto" mt="4" px="5">
      <Flex justifyContent="space-between" mb="4">
        <Text typography="h3" color="text.secondary">
          Database Connection
        </Text>
        <ButtonSecondary size="small" onClick={disconnect}>
          Close Connection
        </ButtonSecondary>
      </Flex>
      <Text bold>Connect with CLI</Text>
      <CliCommand
        cliCommand={gateway.cliCommand}
        isLoading={isLoading}
        onRun={runCliCommand}
      />
      <Flex justifyContent="end">
        <MenuLoginThemeProvider>
          <MenuLogin
            disabled={isLoading}
            placeholder="Enter database name"
            required={false}
            buttonText="SET DATABASE NAME"
            getLoginItems={() => []}
            onSelect={(_, dbName) => changeDbName(dbName)}
            transformOrigin={transformOrigin}
            anchorOrigin={anchorOrigin}
            info="The name will persist for this connection"
          />
        </MenuLoginThemeProvider>
      </Flex>
      {changeDbNameAttempt.status === 'error' && (
        <Alerts.Danger>
          Could not change the database name: {changeDbNameAttempt.statusText}
        </Alerts.Danger>
      )}
      <Text bold mt={3}>
        Connect with GUI
      </Text>
      <Text>
        To connect with a GUI database client, see our{' '}
        <Link
          href="https://goteleport.com/docs/database-access/guides/gui-clients/"
          target="_blank"
        >
          documentation
        </Link>{' '}
        for instructions.
      </Text>
    </Box>
  );
}

function CliCommand({
  cliCommand,
  onRun,
  isLoading,
}: {
  cliCommand: string;
  onRun(): void;
  isLoading: boolean;
}) {
  return (
    <Flex
      p="2"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={2}
      bg={'primary.dark'}
      mb={2}
    >
      <Flex
        mr="2"
        color={isLoading ? 'text.secondary' : 'text.primary'}
        width="100%"
        css={`
          overflow: auto;
          white-space: pre;
          word-break: break-all;
          font-size: 12px;
          font-family: ${props => props.theme.fonts.mono};
        `}
      >
        <Box mr="1">{`$`}</Box>
        <span>{cliCommand}</span>
        {isLoading && (
          <Indicator
            fontSize="14px"
            css={`
              display: inline;
              margin: auto 0 auto auto;
            `}
          />
        )}
      </Flex>
      <ButtonPrimary
        onClick={onRun}
        disabled={isLoading}
        css={`
          max-width: 48px;
          width: 100%;
          padding: 4px 8px;
          min-height: 10px;
          font-size: 10px;
        `}
      >
        Run
      </ButtonPrimary>
    </Flex>
  );
}

const transformOrigin = {
  vertical: 'top',
  horizontal: 'right',
};
const anchorOrigin = {
  vertical: 'center',
  horizontal: 'right',
};
