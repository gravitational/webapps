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
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import renderHook, { act } from 'design/utils/renderHook';
import { Label } from 'teleport/types';
import useUrlFiltering, { Filterable, State } from './useUrlFiltering';

test('filtering data and applying labels', () => {
  const history = createMemoryHistory({ initialEntries: ['/test'] });
  jest.spyOn(history, 'replace');

  let result;
  act(() => {
    result = renderHook(() => useUrlFiltering(data), {
      wrapper: Wrapper,
      wrapperProps: { history },
    });
  });

  let hook: State = result.current;

  // Test initial values.
  expect(hook.labels).toHaveLength(0);
  expect(hook.result).toHaveLength(data.length);

  // Test add a label.
  act(() => hook.applyLabels([label1]));
  hook = result.current;

  // Test selected labels is updated.
  expect(hook.labels).toMatchObject([label1]);
  expect(hook.labels).toHaveLength(1);

  // Test data has been correctly filtered.
  expect(hook.result).toHaveLength(2);
  expect(hook.result[0].labels).toContainEqual(label1);
  expect(hook.result[1].labels).toContainEqual(label1);

  // Test selected label has been correctly encoded into url.
  let expectedURL = `/test?q=l=${encodedLabel1.name}:${encodedLabel1.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);
  jest.clearAllMocks();

  // Test applying multiple labels.
  const label2 = { name: 'country', value: 'South Korea' };
  act(() => hook.applyLabels([label1, label2]));
  hook = result.current;

  // Test selected labels is updated.
  expect(hook.labels).toEqual(expect.arrayContaining([label1, label2]));
  expect(hook.labels).toHaveLength(2);

  // Test data has been correctly filtered.
  expect(hook.result).toHaveLength(1);
  expect(hook.result[0].labels).toEqual(
    expect.arrayContaining([label1, label2])
  );

  // Test url has been encoded correctly.
  expectedURL = `/test?q=l=${encodedLabel1.name}:${encodedLabel1.value}+l=${encodedLabel2.name}:${encodedLabel2.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);

  // Test empty array.
  act(() => hook.applyLabels([]));
  hook = result.current;

  expect(hook.labels).toHaveLength(0);
  expect(hook.result).toHaveLength(data.length);
  expect(history.replace).toHaveBeenCalledWith(`/test`);
});

test('label toggling', () => {
  const baseUrl = `/test?q=l=${encodedLabel1.name}:${encodedLabel1.value}+l=${encodedLabel2.name}:${encodedLabel2.value}`;
  const history = createMemoryHistory({ initialEntries: [baseUrl] });
  jest.spyOn(history, 'replace');

  let result;
  act(() => {
    result = renderHook(() => useUrlFiltering(data), {
      wrapper: Wrapper,
      wrapperProps: { history },
    });
  });

  let hook: State = result.current;

  // Test initial values.
  expect(hook.labels).toHaveLength(2);
  expect(hook.labels).toEqual(expect.arrayContaining([label1, label2]));
  expect(hook.result).toHaveLength(1);
  expect(hook.result[0].labels).toEqual(
    expect.arrayContaining([label1, label2])
  );

  // Test toggling existing label (delete).
  act(() => hook.toggleLabel(label2));
  hook = result.current;

  // Test existing label is removed.
  expect(hook.labels).toEqual(expect.arrayContaining([label1]));
  expect(hook.labels).toHaveLength(1);

  // Test url has been updated correctly.
  let expectedURL = `/test?q=l=${encodedLabel1.name}:${encodedLabel1.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);

  // Test toggling new label (add).
  act(() => hook.toggleLabel(label2));
  hook = result.current;

  // Test new label is added.
  expect(hook.labels).toEqual(expect.arrayContaining([label1, label2]));
  expect(hook.labels).toHaveLength(2);

  // Test url has been updated correctly.
  expect(history.replace).toHaveBeenCalledWith(baseUrl);
});

describe('test decoding of urls', () => {
  const enc = s => encodeURIComponent(s);

  const tests: {
    name: string;
    url: string;
    expect: Label[];
  }[] = [
    {
      name: 'no filter param',
      url: '/test?',
      expect: [],
    },
    {
      name: 'no filters',
      url: '/test?q=',
      expect: [],
    },
    {
      name: 'blank label',
      url: '/test?q=l=',
      expect: [],
    },
    {
      name: 'blank label with colon delimiter',
      url: '/test?q=l=:',
      expect: [],
    },
    {
      name: 'blank label with plus delimiter',
      url: '/test?q=l=+',
      expect: [],
    },
    {
      name: 'blank label with all delimiters',
      url: '/test?q=l=:+',
      expect: [],
    },
    {
      name: 'unknown filter type',
      url: `/test?q=unknown=${enc('k')}:${enc('v')}`,
      expect: [],
    },
    {
      name: 'malformed label value (double delimiter)',
      url: `/test?q=l=${enc('k')}:${enc('v')}:extra`,
      expect: [],
    },
    {
      name: 'skip unknown filter identifier',
      url: `/test?q=l=${enc('k')}:${enc('v')}+unkwn=${enc('k2')}:${enc('v2')}`,
      expect: [{ name: 'k', value: 'v' }],
    },
    {
      name: 'missing label delimiter',
      url: `/test?q=l=${enc('k')}${enc('v')}`,
      expect: [{ name: 'kv', value: '' }],
    },
    {
      name: 'pre label delimiter',
      url: `/test?q=l=:${enc('k')}${enc('v')}`,
      expect: [{ name: '', value: 'kv' }],
    },
    {
      name: 'delimiters in encoded label does not affect unencoded delimiters',
      url: `/test?q=l=${enc('l=b:c')}:${enc(':d+e+f')}`,
      expect: [{ name: 'l=b:c', value: ':d+e+f' }],
    },
    {
      name: 'valid query',
      url: `
       /test?q=l=${enc('k')}:${enc('v')}+l=${enc('k2')}:${enc('v2')}`,
      expect: [
        { name: 'k', value: 'v' },
        { name: 'k2', value: 'v2' },
      ],
    },
    {
      name: 'ignore blank label identifiers',
      url: `
       /test?q=l=${enc('k')}:${enc('v')}+l=${enc('k2')}:${enc('v2')}+l=+l=`,
      expect: [
        { name: 'k', value: 'v' },
        { name: 'k2', value: 'v2' },
      ],
    },
  ];

  // eslint-disable-next-line jest/require-hook
  tests.forEach(tc => {
    test(`${tc.name}`, () => {
      let result;
      act(() => {
        result = renderHook(() => useUrlFiltering(data), {
          wrapper: Wrapper,
          wrapperProps: {
            history: createMemoryHistory({ initialEntries: [tc.url] }),
          },
        });
      });

      let hook: State = result.current;
      expect(hook.labels).toMatchObject(tc.expect);
    });
  });
});

function Wrapper(props: any) {
  return <Router history={props.history}>{props.children}</Router>;
}

const label1: Label = { name: 'env', value: 'roles:prod+1,prod+2, prod+3' };
const label2: Label = { name: 'country', value: 'South Korea' };
const label3: Label = { name: 'no', value: 'match' };
const data: Filterable[] = [
  { labels: [label1] },
  { labels: [label1, label2] },
  { labels: [label3] },
];

const encodedLabel1 = {
  name: encodeURIComponent(label1.name),
  value: encodeURIComponent(label1.value),
};

const encodedLabel2 = {
  name: encodeURIComponent(label2.name),
  value: encodeURIComponent(label2.value),
};
