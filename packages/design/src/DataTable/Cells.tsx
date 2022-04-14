import React from 'react';
import { Label } from 'design';
import * as Icons from 'design/Icon';
import { displayDate } from 'shared/services/loc';
import { ServersideConfig, SortDir, TableColumn } from './types';

export const Cell = props => <td children={props.children} {...props} />;

export function SortHeaderCell<T>({
  column,
  serverside,
  dir,
  text,
  onClick,
}: SortHeaderCellProps<T>) {
  function handleClick() {
    if (serverside?.sort) {
      serverside.setSort({
        dir: serverside.sort.dir === 'ASC' ? 'DESC' : 'ASC',
        fieldName: column.key,
      });
    } else {
      onClick();
    }
  }

  if (serverside?.sort) {
    return (
      <th>
        <a onClick={handleClick}>
          {text}
          <SortIndicator
            sortDir={
              serverside.sort.fieldName === column.key
                ? serverside.sort.dir
                : null
            }
          />
        </a>
      </th>
    );
  }

  return (
    <th>
      <a onClick={handleClick}>
        {text}
        <SortIndicator sortDir={dir} />
      </a>
    </th>
  );
}

export function SortIndicator<T>({
  sortDir,
}: {
  sortDir?: SortHeaderCellProps<T>['dir'];
}) {
  if (sortDir === 'DESC') {
    return <Icons.SortDesc />;
  }

  if (sortDir === 'ASC') {
    return <Icons.SortAsc />;
  }

  return <Icons.Sort />;
}

export const TextCell = ({ data }) => <Cell>{`${data || ''}`}</Cell>;

export const LabelCell = ({ data }: { data: string[] }) =>
  renderLabelCell(data);

export const DateCell = ({ data }: { data: Date }) => (
  <Cell>{displayDate(data)}</Cell>
);

const renderLabelCell = (labels: string[] = []) => {
  const $labels = labels.map(label => (
    <Label mb="1" mr="1" key={label} kind="secondary">
      {label}
    </Label>
  ));

  return <Cell>{$labels}</Cell>;
};

type SortHeaderCellProps<T> = {
  column: TableColumn<T>;
  serverside: ServersideConfig;
  text: string;
  dir: SortDir;
  onClick: () => void;
};
