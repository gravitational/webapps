import React, { useState } from 'react';
import Table from './Table';
import { LabelCell, DateCell } from './Cells';

export default {
  title: 'Design/DataTableNext',
};

export const Demo = () => {
  return (
    <Table<DummyDataType>
      columns={[
        { key: 'name', headerText: 'Name', isSortable: true },
        { key: 'desc', headerText: 'Description' },
        { key: 'amount', headerText: 'Amount', isSortable: true },
        {
          key: 'createdDate',
          headerText: 'Created Date',
          isSortable: true,
          onRender: row => <DateCell data={row.createdDate} />,
        },
        {
          key: 'removedDate',
          headerText: 'Removed Date',
          isSortable: true,
          onRender: row => <DateCell data={row.removedDate} />,
        },
        {
          key: 'tags',
          headerText: 'Labels',
          onRender: row => <LabelCell data={row.tags} />,
          isSortable: true,
          onSort: sortTagsByLength,
        },
      ]}
      data={data}
      emptyText={'No Dummy Data Found'}
      isSearchable
    />
  );
};

export const PagedDemo = () => {
  const [allData, setAllData] = useState(data);

  return (
    <Table<DummyDataType>
      columns={[
        { key: 'name', headerText: 'Name', isSortable: true },
        { key: 'desc', headerText: 'Description' },
        { key: 'amount', headerText: 'Amount', isSortable: true },
        {
          key: 'createdDate',
          headerText: 'Created Date',
          isSortable: true,
          onRender: row => <DateCell data={row.createdDate} />,
        },
        {
          key: 'removedDate',
          headerText: 'Removed Date',
          isSortable: true,
          onRender: row => <DateCell data={row.removedDate} />,
        },
        {
          key: 'tags',
          headerText: 'Labels',
          onRender: row => <LabelCell data={row.tags} />,
          isSortable: true,
          onSort: sortTagsByLength,
        },
      ]}
      pagination={{
        pageSize: 10,
        pagerPosition: 'top',
        fetchMore: () => setAllData([...allData, ...extraData, ...data]),
      }}
      data={allData}
      emptyText={'No Dummy Data Found'}
      isSearchable
    />
  );
};

function sortTagsByLength(a: DummyDataType['tags'], b: DummyDataType['tags']) {
  if (a.length < b.length) {
    return 1;
  } else if (a.length > b.length) {
    return -1;
  } else {
    return 0;
  }
}

const data: DummyDataType[] = [
  {
    name: 'a-test',
    desc: 'this is a test',
    amount: 1,
    createdDate: new Date(1636467176000),
    removedDate: new Date(1636423403000),
    tags: ['test1: test1', 'mama: papa', 'test2: test2'],
  },
  {
    name: 'b-test',
    desc: 'this is b test',
    amount: 55,
    createdDate: new Date(1635367176000),
    removedDate: new Date(1635323403000),
    tags: ['test3: test3', 'mama: papa', 'test4: test4', 'test5: test5'],
  },
  {
    name: 'd-test',
    desc: 'this is another item',
    amount: 14141,
    createdDate: new Date(1635467176000),
    removedDate: new Date(1635423403000),
    tags: ['test6: test6', 'mama: papa'],
  },
  {
    name: 'c-test',
    desc: 'yet another item',
    amount: -50,
    createdDate: new Date(1635364176),
    removedDate: new Date(1635322403),
    tags: ['test7: test7'],
  },
  {
    name: 'e-test',
    desc: 'and another',
    amount: -20,
    createdDate: new Date(1635364176),
    removedDate: new Date(1635322403),
    tags: ['test8: test8'],
  },
];

const extraData: DummyDataType[] = [
  {
    name: 'f-test',
    desc: 'this is f test',
    amount: 1,
    createdDate: new Date(1636467176000),
    removedDate: new Date(1636423403000),
    tags: ['test9: test9', 'mama: papa', 'test2: test2'],
  },
  {
    name: 'g-test',
    desc: 'this is g test',
    amount: 55,
    createdDate: new Date(1635367176000),
    removedDate: new Date(1635323403000),
    tags: ['test10: test10', 'mama: papa', 'test4: test4', 'test5: test5'],
  },
  {
    name: 'h-test',
    desc: 'this is another item',
    amount: 14141,
    createdDate: new Date(1635467176000),
    removedDate: new Date(1635423403000),
    tags: ['test11: test11', 'mama: papa'],
  },
  {
    name: 'i-test',
    desc: 'yet another item',
    amount: -50,
    createdDate: new Date(1635364176),
    removedDate: new Date(1635322403),
    tags: ['test12: test12'],
  },
  {
    name: 'j-test',
    desc: 'and another',
    amount: -20,
    createdDate: new Date(1635364176),
    removedDate: new Date(1635322403),
    tags: ['test13: test13'],
  },
];

type DummyDataType = {
  name: string;
  desc: string;
  amount: number;
  createdDate: Date;
  removedDate: Date;
  tags: string[];
};
