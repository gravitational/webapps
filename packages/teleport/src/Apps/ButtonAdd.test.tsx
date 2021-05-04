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

import React from 'react';
import { render, screen } from 'design/utils/testing';
import ButtonAdd from './ButtonAdd';

test('renders add application button', () => {
  render(
    <ButtonAdd isEnterprise={true} isLeafCluster={false} canCreate={true} />
  );
  const btnText = screen.getByText(/Add application/i);
  const title = screen.getByTitle(/Add an application to the root cluster/i);

  expect(btnText).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(btnText.closest('button')).not.toBeDisabled();
});

test('renders view documentation button', () => {
  render(
    <ButtonAdd isEnterprise={false} isLeafCluster={true} canCreate={true} />
  );
  const btnText = screen.getByText(/view documentation/i);

  expect(btnText).toBeInTheDocument();
});

test('renders disabled add application button', () => {
  render(
    <ButtonAdd isEnterprise={true} isLeafCluster={true} canCreate={true} />
  );
  const btnText = screen.getByText(/add application/i);
  const title = screen.getByTitle(
    /Adding an application to a leaf cluster is not supported/i
  );

  expect(btnText).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(btnText.closest('button')).toBeDisabled();
});
