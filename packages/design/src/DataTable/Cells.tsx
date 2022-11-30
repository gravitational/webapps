import React from 'react';

import { displayDate } from 'shared/services/loc';

import { Label } from 'design';
import * as Icons from 'design/Icon';

import {
  ServersideProps,
  SortDir,
  TableColumn,
  LabelDescription,
} from './types';
import { LabelContent, LabelWrapper } from './StyledTable';

export const Cell = props => <td children={props.children} {...props} />;

export function SortHeaderCell<T>({
  column,
  serversideProps,
  dir,
  text,
  onClick,
}: SortHeaderCellProps<T>) {
  function handleServersideClick() {
    serversideProps.setSort({
      dir: serversideProps.sort?.dir === 'ASC' ? 'DESC' : 'ASC',
      fieldName: column.key,
    });
  }

  if (serversideProps) {
    return (
      <th>
        <a onClick={handleServersideClick}>
          {text}
          <SortIndicator
            sortDir={
              serversideProps.sort?.fieldName === column.key
                ? serversideProps.sort.dir
                : null
            }
          />
        </a>
      </th>
    );
  }

  return (
    <th>
      <a onClick={onClick}>
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
    return <Icons.SortDesc title="sort items desc" />;
  }

  if (sortDir === 'ASC') {
    return <Icons.SortAsc title="sort items asc" />;
  }

  return <Icons.Sort title="sort items" />;
}

export const TextCell = ({ data }) => <Cell>{`${data || ''}`}</Cell>;

export const LabelCell = ({ data }: { data: string[] }) =>
  renderLabelCell(data);

export const DateCell = ({ data }: { data: Date }) => (
  <Cell>{displayDate(data)}</Cell>
);

const TextEllipsisLabelContent = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  let displayText = text;
  const isLonger = text.length > maxLength;

  if (isLonger) {
    displayText = text.substring(0, 100);
  }

  return (
    <LabelContent title={text} dots={isLonger}>
      {displayText}
    </LabelContent>
  );
};

const renderLabelCell = (labels: string[] = []) => {
  const $labels = labels.map(label => (
    <Label mr="1" key={label} kind="secondary">
      <TextEllipsisLabelContent text={label} maxLength={100} />
    </Label>
  ));

  return (
    <Cell>
      <LabelWrapper>{$labels}</LabelWrapper>
    </Cell>
  );
};

export const ClickableLabelCell = ({
  labels,
  onClick,
}: {
  labels: LabelDescription[];
  onClick: (label: LabelDescription) => void;
}) => {
  const $labels = labels.map((label, index) => {
    const labelText = `${label.name}: ${label.value}`;

    return (
      <Label
        onClick={() => onClick(label)}
        key={`${label.name}${label.value}${index}`}
        mr="1"
        kind="secondary"
        css={`
          cursor: pointer;
        `}
      >
        <TextEllipsisLabelContent text={labelText} maxLength={100} />
      </Label>
    );
  });

  return (
    <Cell>
      <LabelWrapper>{$labels}</LabelWrapper>
    </Cell>
  );
};

type SortHeaderCellProps<T> = {
  column: TableColumn<T>;
  serversideProps: ServersideProps;
  text: string;
  dir: SortDir;
  onClick: () => void;
};
