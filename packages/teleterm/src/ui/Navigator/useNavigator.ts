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

import { useMemo } from 'react';
import * as Icons from 'design/Icon';

export default function useNavigator() {
  const items = useMemo(() => makeItems(), []);

  return {
    items,
  };
}

function makeItems() {
  const items = [
    {
      items: [] as Item[],
      route: '',
      exact: false,
      title: 'terminal',
      Icon: Icons.Cli,
    },
    {
      items: [] as Item[],
      route: '',
      exact: false,
      title: 'gateways',
      Icon: Icons.Cli,
    },
    {
      items: [] as Item[],
      route: '',
      exact: false,
      title: 'clusters',
      Icon: Icons.Cli,
    },
  ];

  return items;
}

export interface Item {
  items: Item[];
  route: string;
  exact?: boolean;
  title: string;
  Icon: any;
}
