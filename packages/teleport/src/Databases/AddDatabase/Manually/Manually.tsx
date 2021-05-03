/**
 * Copyright 2021 Gravitational, Inc.
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

import React, { useState } from 'react';
import { Text, Box, ButtonSecondary, Link } from 'design';
import styled from 'styled-components';
import { DialogContent, DialogFooter } from 'design/Dialog';
import cfg from 'teleport/config';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import Select, { Option } from 'shared/components/Select';
import * as links from 'teleport/services/links';

export default function Manually({ user, version, onClose }) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const [dbOptions] = useState<Option<DbOption>[]>(() =>
    options.map(dbOption => {
      return {
        value: dbOption,
        label: dbOption.label,
      };
    })
  );

  const [selectedDbOption, setSelectedDpOption] = useState<Option<DbOption>>(
    dbOptions[0]
  );

  return (
    <>
      <DialogContent minHeight="240px" flex="0 0 auto">
        <Box>
          <Box mb={4}>
            <Text bold as="span">
              Step 1
            </Text>{' '}
            - Download Teleport package to your computer
            <Box>
              <Link href={links.getMacOS(version)} target="_blank" mr="2">
                MacOS
              </Link>
              <Link href={links.getLinux64(version)} target="_blank" mr="2">
                Linux 64-bit
              </Link>
              <Link href={links.getLinux32(version)} target="_blank">
                Linux 32-bit
              </Link>
            </Box>
          </Box>
          <Box mb={4}>
            <Text bold as="span">
              Step 2
            </Text>
            {' - Login to Teleport'}
            <TextSelectCopy
              mt="2"
              text={`tsh login --proxy=${host} --auth=${cfg.getAuthType()} --user=${user}`}
            />
          </Box>
          <Box mb={4}>
            <Text bold as="span">
              Step 3
            </Text>
            {' - Generate a join token'}
            <TextSelectCopy mt="2" text="tctl tokens add --type=db" />
          </Box>
          <Box mb={4}>
            <Text bold as="span">
              Step 4
            </Text>
            {` - Select the database type and protocol to use`}
            <StyledSelect width="500px">
              <Select
                value={selectedDbOption}
                onChange={(o: Option<DbOption>) => setSelectedDpOption(o)}
                options={dbOptions}
                width="230px"
                isSearchable={true}
              />
            </StyledSelect>
          </Box>
          <Box mb={4}>
            <Text bold as="span">
              Step 5
            </Text>
            {' - Start the Teleport agent with the following parameters'}
            <TextSelectCopy
              mt="2"
              text={`${generateDbStartCmd(
                { ...selectedDbOption.value },
                host
              )}`}
            />
          </Box>
          <Box>
            <Text bold as="span"></Text>
            {`* Note: For a self-hosted Teleport version, you may need to update DNS and obtain a TLS certificate for this application.
            Learn more about database access `}
            <Link
              href={'https://goteleport.com/docs/database-access/'}
              target="_blank"
              mr="2"
            >
              here
            </Link>
          </Box>
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </>
  );
}

export const generateDbStartCmd = ({ type, protocol }, host) => {
  const baseCommand = `teleport start --roles=db --token=[generated-join-token] --auth-server=${host} --db-name=[db-name] --db-protocol=${protocol} --db-uri=[uri]`;
  switch (type) {
    case 'self-hosted':
      return baseCommand;
    case 'rds':
      return baseCommand + ' --db-aws-region=[region]';
    case 'redshift':
      return (
        baseCommand +
        ' --db-aws-region=[region] --db-aws-redshift-cluster-id=[cluster-id]'
      );
    case 'gcp':
      return (
        baseCommand +
        ' --db-ca-cert=[instance-ca-filepath] --db-gcp-project-id=[project-id] --db-gcp-instance-id=[instance-id]'
      );
  }
};

const options: DbOption[] = [
  {
    type: 'self-hosted',
    protocol: 'postgres',
    label: 'Self-hosted PostgreSQL',
  },
  {
    type: 'redshift',
    protocol: 'postgres',
    label: 'Redshift PostgreSQL',
  },
  {
    type: 'gcp',
    protocol: 'postgres',
    label: 'Cloud SQL PostgreSQL',
  },
  {
    type: 'rds',
    protocol: 'postgres',
    label: 'RDS PostgreSQL',
  },
  {
    type: 'redshift',
    protocol: 'mysql',
    label: 'Redshift MySQL',
  },
  {
    type: 'gcp',
    protocol: 'mysql',
    label: 'Cloud SQL MySQL',
  },
  {
    type: 'rds',
    protocol: 'mysql',
    label: 'RDS MySQL',
  },
  {
    type: 'self-hosted',
    protocol: 'mysql',
    label: 'Self-hosted MySQL',
  },
];

type DbOption = {
  type: string;
  protocol: string;
  label: string;
};

const StyledSelect = styled(Box)(
  ({ theme }) => `
  .react-select__control,
  .react-select__control--is-focused {
    border-color: #FFF;
    height: 34px;
    min-height: 34px;
    margin-top: 7px;
  }

  .react-select__option {
    padding: 4px 12px;
  }
  .react-select__option--is-focused,
  .react-select__option--is-focused:active {
    background-color: ${theme.colors.grey[50]};
  }

  .react-select__menu {
    margin-top: 0px;
    font-size: 14px;
  }

  react-select__menu-list {
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__value-container{
    height: 30px;
    padding: 0 8px;
  }

  .react-select__option--is-selected {
    background-color: inherit;
    color: inherit;
  }

  .react-select__option--is-focused {
    background-color: #cfd8dc;
    color: inherit;
  }

  .react-select__single-value{
    padding: 0 4px !important;
    margin: 0 !important;
    color: white;
    font-size: 14px;
  }

  .react-select__dropdown-indicator{
    padding: 4px 8px;
    color: ${theme.colors.text.secondary};
  }

  input {
    font-family: ${theme.font};
    font-size: 14px;
    height: 26px;
  }

  .react-select__input {
    color: white;
    height: 20px;
    font-size: 14px;
    font-family: ${theme.font};
  }

  .react-select__control {
    border-radius: 4px;
    border-color: rgba(255, 255, 255, 0.24);
    background-color: ${theme.colors.primary.light};
    color: ${theme.colors.text.secondary};

    &:focus, &:active {
      background-color: ${theme.colors.primary.lighter};
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.24);
      background-color: ${theme.colors.primary.lighter};
      .react-select__dropdown-indicator{
        color: ${theme.colors.text.primary};
      }
    }
  }

  .react-select__control--is-focused {
    background-color: ${theme.colors.primary.lighter};
    border-color: transparent;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: none;
    border-color: rgba(255, 255, 255, 0.24);

    .react-select__dropdown-indicator{
      color: ${theme.colors.text.secondary};
    }
  }

  .react-select__menu {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`
);
