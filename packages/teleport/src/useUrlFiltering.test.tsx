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
import useUrlFiltering, { Filterable, State } from './useUrlFiltering';

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
  expect(hook.selectedLabels).toHaveLength(0);
  expect(hook.filteredData).toHaveLength(data.length);

  // Test add a filter.
  const option1 = {
    label: 'env: roles:prod+1,prod+2, prod+3',
    value: 'env: roles:prod+1,prod+2, prod+3',
    obj: { name: 'env', value: 'roles:prod+1,prod+2, prod+3' },
  };
  act(() => hook.apply([option1]));
  hook = result.current;

  // Test selected filters is updated.
  expect(hook.selectedLabels).toMatchObject([option1]);
  expect(hook.selectedLabels).toHaveLength(1);

  // Test data has been correctly filtered.
  expect(hook.filteredData).toHaveLength(2);

  // Test first data contains the filter.
  expect(hook.filteredData[0].tags).toContain(option1.label);
  expect(hook.filteredData[0].labels).toEqual(
    expect.arrayContaining([expect.objectContaining(option1.obj)])
  );

  // Test second data also contains the filter.
  expect(hook.filteredData[1].tags).toContain(option1.label);
  expect(hook.filteredData[1].labels).toEqual(
    expect.arrayContaining([expect.objectContaining(option1.obj)])
  );

  // Test selected filter has been correctly encoded into url.
  const encodedOption1 = {
    name: encodeURIComponent(option1.obj.name),
    value: encodeURIComponent(option1.obj.value),
  };
  let expectedURL = `/test?filter=label:${encodedOption1.name}=${encodedOption1.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);

  // Test adding another filter by toggle.
  const option2 = {
    label: 'country: South Korea',
    value: 'country: South Korea',
    obj: { name: 'country', value: 'South Korea' },
  };
  act(() => hook.toggleLabel(option2.obj));
  hook = result.current;

  // Test selected filters is updated.
  expect(hook.selectedLabels).toEqual(
    expect.arrayContaining([option1, option2])
  );
  expect(hook.selectedLabels).toHaveLength(2);

  // Test data has been correctly filtered.
  expect(hook.filteredData).toHaveLength(1);
  expect(hook.filteredData[0].tags).toEqual(
    expect.arrayContaining([option1.label, option2.label])
  );
  expect(hook.filteredData[0].labels).toEqual(
    expect.arrayContaining([expect.objectContaining(option2.obj)])
  );

  // Test url has been encoded correctly.
  const encodedOption2 = {
    name: encodeURIComponent(option2.obj.name),
    value: encodeURIComponent(option2.obj.value),
  };
  expectedURL = `/test?filter=label:${encodedOption1.name}=${encodedOption1.value}+label:${encodedOption2.name}=${encodedOption2.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);

  // Test removing a filter by toggling on a same label.
  act(() => hook.toggleLabel(option1.obj));
  hook = result.current;

  // Test removed label is not present.
  expect(hook.selectedLabels).toMatchObject([option2]);
  expect(hook.selectedLabels).toHaveLength(1);

  // Test data has been correctly filtered.
  expect(hook.filteredData).toHaveLength(1);
  expect(hook.filteredData[0].tags).toEqual(
    expect.arrayContaining([option2.label])
  );

  // Test url has been encoded correctly.
  expectedURL = `/test?filter=label:${encodedOption2.name}=${encodedOption2.value}`;
  expect(history.replace).toHaveBeenCalledWith(expectedURL);
});

describe('test decoding of urls', () => {
  const e = s => encodeURIComponent(s);

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
      name: 'no filter types',
      url: '/test?filter=',
      expect: [],
    },
    {
      name: 'blank label',
      url: '/test?filter=label:',
      expect: [],
    },
    {
      name: 'blank label with equal seperator',
      url: '/test?filter=label:=',
      expect: [],
    },
    {
      name: 'blank label with equal, plus seperator',
      url: '/test?filter=label:=+',
      expect: [],
    },
    {
      name: 'unknown filter type',
      url: `/test?filter=unknown:${e('a')}=${e('b')}`,
      expect: [],
    },
    {
      name: 'known with unknown filter type',
      url: `/test?filter=label:${e('a')}=${e('b')}+unknown:${e('a')}=${e('b')}`,
      expect: [],
    },
    {
      name: 'malformed label value (double seperator)',
      url: `/test?filter=label:${e('a')}=${e('b')}=c`,
      expect: [],
    },
    {
      name: 'missing equal seperator',
      url: `/test?filter=label:${e('a')}${e('b')}`,
      expect: [{ name: 'ab', value: '' }],
    },
    {
      name: 'pre equal seperator',
      url: `/test?filter=label:=${e('a')}${e('b')}`,
      expect: [{ name: '', value: 'ab' }],
    },
    {
      name: 'seperators in encoded label does not affect unencoded seperators',
      url: `/test?filter=label:${e('label:b=c')}=${e('=d+e+f')}`,
      expect: [{ name: 'label:b=c', value: '=d+e+f' }],
    },
    {
      name: 'valid url',
      url: `
       /test?filter=label:${e('a')}=${e('a')}+label:${e('b')}=${e('b')}+label:`,
      expect: [
        { name: 'a', value: 'a' },
        { name: 'b', value: 'b' },
      ],
    },
  ];

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
      const labels = hook.selectedLabels.map(o => o.obj);
      expect(labels).toMatchObject(tc.expect);
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
    labels: labels1,
  },
  {
    tags: labels2.map(makeLabelTag),
    labels: labels2,
  },
  {
    tags: labels3.map(makeLabelTag),
    labels: labels3,
  },
];
