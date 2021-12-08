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
import { Label, makeLabelTag } from 'teleport/services/resources';
import useUrlFiltering, { Filterable, State } from './useUrlLabelFiltering';

test('filter flow: init, add, add onLabelClick, delete onLabelClick', () => {
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

  // Test add a filter.
  const label1 = { name: 'env', value: 'roles:prod+1,prod+2, prod+3' };
  act(() => hook.apply([label1]));
  hook = result.current;

  // Test selected filters is updated.
  expect(hook.labels).toMatchObject([label1]);
  expect(hook.labels).toHaveLength(1);

  // Test data has been correctly filtered.
  expect(hook.result).toHaveLength(2);

  // Test list of filtered data contains the filter.
  expect(hook.result[0].tags).toContain(makeLabelTag(label1));
  expect(hook.result[1].tags).toContain(makeLabelTag(label1));

  // Test selected filter has been correctly encoded into url.
  const encodedOption1 = {
    name: encodeURIComponent(label1.name),
    value: encodeURIComponent(label1.value),
  };
  let expectedURL = `/test?q=l=${encodedOption1.name}:${encodedOption1.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);
  jest.clearAllMocks();

  // Test adding multiple filters.
  const label2 = { name: 'country', value: 'South Korea' };
  act(() => hook.apply([label1, label2]));
  hook = result.current;

  // Test selected filters is updated.
  expect(hook.labels).toEqual(expect.arrayContaining([label1, label2]));
  expect(hook.labels).toHaveLength(2);

  // Test data has been correctly filtered.
  expect(hook.result).toHaveLength(1);
  expect(hook.result[0].tags).toEqual(
    expect.arrayContaining([makeLabelTag(label1), makeLabelTag(label2)])
  );

  // Test url has been encoded correctly.
  const encodedOption2 = {
    name: encodeURIComponent(label2.name),
    value: encodeURIComponent(label2.value),
  };
  expectedURL = `/test?q=l=${encodedOption1.name}:${encodedOption1.value}+l=${encodedOption2.name}:${encodedOption2.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);

  // Test empty array.
  act(() => hook.apply([]));
  hook = result.current;

  expect(hook.labels).toHaveLength(0);
  expect(hook.result).toHaveLength(data.length);
  expect(history.replace).toHaveBeenCalledWith(`/test`);
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
      url: `/test?q=unknown=${enc('a')}:${enc('b')}`,
      expect: [],
    },
    {
      name: 'known with unknown filter type',
      url: `/test?q=l=${enc('a')}:${enc('b')}+unknown=${enc('a')}:${enc('b')}`,
      expect: [],
    },
    {
      name: 'malformed label value (double delimiter)',
      url: `/test?q=l=${enc('a')}:${enc('b')}:c`,
      expect: [],
    },
    {
      name: 'missing label delimiter',
      url: `/test?q=l=${enc('a')}${enc('b')}`,
      expect: [{ name: 'ab', value: '' }],
    },
    {
      name: 'pre label delimiter',
      url: `/test?q=l=:${enc('a')}${enc('b')}`,
      expect: [{ name: '', value: 'ab' }],
    },
    {
      name: 'delimiters in encoded label does not affect unencoded delimiters',
      url: `/test?q=l=${enc('l=b:c')}:${enc(':d+e+f')}`,
      expect: [{ name: 'l=b:c', value: ':d+e+f' }],
    },
    {
      name: 'valid url',
      url: `
       /test?q=l=${enc('k')}:${enc('v')}+l=${enc('k2')}:${enc('v2')}`,
      expect: [
        { name: 'k', value: 'v' },
        { name: 'k2', value: 'v2' },
      ],
    },
    {
      name: 'valid url with blank label identifiers',
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

const labels1: Label[] = [
  { name: 'env', value: 'roles:prod+1,prod+2, prod+3' },
];

const labels2: Label[] = [
  { name: 'env', value: 'roles:prod+1,prod+2, prod+3' },
  { name: 'country', value: 'South Korea' },
];

const labels3: Label[] = [{ name: 'no', value: 'match' }];

const data: Filterable[] = [
  {
    tags: labels1.map(makeLabelTag),
  },
  {
    tags: labels2.map(makeLabelTag),
  },
  {
    tags: labels3.map(makeLabelTag),
  },
];
