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
import { Cell } from 'design/DataTable';
import * as States from 'design/LabelState';

export function NameCell({ rowIndex, data }) {
  const { name } = data[rowIndex];
  return <Cell style={{ fontSize: '14px' }}>{name}</Cell>;
}

export function DesiredCell({ rowIndex, data }) {
  let { desired } = data[rowIndex];
  desired = desired || 'none';
  return <Cell>{desired}</Cell>;
}

export function StatusCell({ rowIndex, data }) {
  let { statusSucceeded, statusFailed, statusActive } = data[rowIndex];
  return (
    <Cell>
      {getSucceededStatus(statusSucceeded)}
      {getFailedStatus(statusFailed)}
      {getActiveStatus(statusActive)}
    </Cell>
  );
}

const getSucceededStatus = value =>
  value && <States.StateSuccess mr="2">Succeeded: {value}</States.StateSuccess>;
const getFailedStatus = value =>
  value && <States.StateDanger mr="2">Failed: {value}</States.StateDanger>;
const getActiveStatus = value =>
  value && <States.StateSuccess mr="2">Active: {value}</States.StateSuccess>;
