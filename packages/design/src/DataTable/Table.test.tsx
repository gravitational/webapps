/**
 * Copyright 2020-2021 Gravitational, Inc.
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
import { within } from '@testing-library/react';

import { render, fireEvent, screen } from 'design/utils/testing';

import Table from './Table';
import { SortIndicator } from './Cells';

const data = [
  {
    hostname: 'host-a',
    addr: '192.168.7.1',
  },
  {
    hostname: 'host-b',
    addr: '192.168.7.2',
  },
  {
    hostname: 'host-c',
    addr: '192.168.7.3',
  },
  {
    hostname: 'host-d',
    addr: '192.168.7.4',
  },
  {
    hostname: 'host-3',
    addr: '192.168.7.4',
  },
];

const getTableRows = () => {
  const [header, ...rows] = screen.getAllByRole('row');
  return { header, rows };
};

describe('design/Table Simple', () => {
  const setup = () =>
    render(
      <Table
        data={data}
        columns={[
          {
            key: 'hostname',
            headerText: 'Hostname',
          },
          {
            key: 'addr',
            headerText: 'Address',
          },
        ]}
        emptyText="No Servers Found"
      />
    );

  test('there is one table element', () => {
    setup();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('each th tag text == header data', () => {
    setup();

    expect(screen.getByText('Hostname')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  test('number of tr tags in body == data.length', () => {
    setup();

    const { rows } = getTableRows();

    expect(rows).toHaveLength(data.length);
  });

  test('each td tag text == data texts', () => {
    setup();

    const { rows } = getTableRows();

    rows.forEach((row, index) => {
      expect(within(row).getByText(data[index].addr)).toBeInTheDocument();
      expect(within(row).getByText(data[index].hostname)).toBeInTheDocument();
    });
  });
});

describe('design/Table SortIndicator', () => {
  test('sort indicator defaults to sort vertical (neither ASC or DESC)', () => {
    render(<SortIndicator />);
    expect(screen.getByTitle('sort items')).toHaveClass(
      'icon-chevrons-expand-vertical'
    );
  });

  test('sort indicator respects sortDir prop set to ASC', () => {
    render(<SortIndicator sortDir={'ASC'} />);
    expect(screen.getByTitle('sort items asc')).toHaveClass('icon-chevron-up');
  });

  test('sort indicator respects sortDir prop set to DESC', () => {
    render(<SortIndicator sortDir={'DESC'} />);
    expect(screen.getByTitle('sort items desc')).toHaveClass(
      'icon-chevron-down'
    );
  });

  test('clicking on col headers changes direction', () => {
    render(
      <Table
        data={data}
        columns={[
          {
            key: 'hostname',
            headerText: 'Hostname',
            isSortable: true,
          },
          {
            key: 'addr',
            headerText: 'Address',
            isSortable: true,
          },
        ]}
        emptyText="No Servers Found"
      />
    );

    // Table initially sorts with "Hostname" ASC
    expect(
      within(screen.getByText('Hostname')).getByTitle('sort items asc')
    ).toBeInTheDocument();

    // b/c Table is initially sorted by "Hostname"
    // "Address" header starts with sort vertical (neither ASC or DESC)
    // on sort vertical, DESC is default
    fireEvent.click(screen.getByText('Hostname'));

    expect(
      within(screen.getByText('Address')).getByTitle('sort items')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Address'));

    expect(
      within(screen.getByText('Address')).getByTitle('sort items asc')
    ).toBeInTheDocument();
  });
});

test('"onSort" prop is respected', () => {
  const dummyFunc = jest.fn(() => -1);

  render(
    <Table
      data={data}
      columns={[
        {
          key: 'hostname',
          headerText: 'Hostname',
          onSort: dummyFunc,
          isSortable: true,
        },
      ]}
      emptyText="No Servers Found"
    />
  );

  expect(dummyFunc).toHaveReturnedWith(-1);
});

test('respects emptyText prop', () => {
  const targetText = 'No Servers Found';
  render(<Table data={[]} columns={[]} emptyText={targetText} />);
  const target = screen.getByText(targetText);

  expect(target).toHaveTextContent(targetText);
});

describe('sorting by field defined in key and altSortKey', () => {
  const sample = [
    {
      hostname: 'host-a',
      created: new Date('2022-07-15T15:34:33.256697813Z'),
      durationText: '1',
    },
    {
      hostname: 'host-b',
      created: new Date('2022-07-05T15:34:33.256697813Z'),
      durationText: '3',
    },
    {
      hostname: 'host-c',
      created: new Date('2022-07-10T15:34:33.256697813Z'),
      durationText: '2',
    },
  ];

  test('sort by key', () => {
    render(
      <Table
        data={sample}
        columns={[
          {
            key: 'durationText',
            headerText: 'duration',
            isSortable: true,
          },
        ]}
        emptyText=""
      />
    );

    const cells = screen.getAllByRole('cell');

    expect(cells[0]).toHaveTextContent('1');
    expect(cells[1]).toHaveTextContent('2');
    expect(cells[2]).toHaveTextContent('3');
  });

  test('sort by key with initialSort', () => {
    render(
      <Table
        data={sample}
        columns={[
          // first column
          {
            key: 'hostname',
            headerText: 'hostname',
            isSortable: true,
          },
          // second column
          {
            key: 'durationText',
            headerText: 'duration',
            isSortable: true,
          },
        ]}
        emptyText=""
        initialSort={{ key: 'durationText', dir: 'ASC' }}
      />
    );
    const { rows } = getTableRows();
    const cells = rows.map(row => within(row).getAllByRole('cell')[1]);

    expect(cells[0]).toHaveTextContent('1');
    expect(cells[1]).toHaveTextContent('2');
    expect(cells[2]).toHaveTextContent('3');
  });

  test('sort by altSortKey', () => {
    render(
      <Table
        data={sample}
        columns={[
          {
            key: 'durationText',
            altSortKey: 'created',
            headerText: 'duration',
            isSortable: true,
          },
        ]}
        emptyText=""
      />
    );

    const cells = screen.getAllByRole('cell');

    expect(cells[0]).toHaveTextContent('3');
    expect(cells[1]).toHaveTextContent('2');
    expect(cells[2]).toHaveTextContent('1');
  });

  test('sort by altSortKey with initialSort', () => {
    render(
      <Table
        data={sample}
        columns={[
          // first column
          {
            key: 'hostname',
            headerText: 'hostname',
            isSortable: true,
          },
          // second column
          {
            key: 'durationText',
            altSortKey: 'created',
            headerText: 'duration',
            isSortable: true,
          },
        ]}
        emptyText=""
        initialSort={{ altSortKey: 'created', dir: 'ASC' }}
      />
    );

    const { rows } = getTableRows();

    const cells = rows.map(row => within(row).getAllByRole('cell')[1]);

    expect(cells[0]).toHaveTextContent('3');
    expect(cells[1]).toHaveTextContent('2');
    expect(cells[2]).toHaveTextContent('1');
  });
});
