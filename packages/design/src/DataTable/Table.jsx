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
import Text from '../Text';
import { StyledTable, StyledEmptyIndicator } from './StyledTable';
import * as Icons from './../Icon/Icon';

/**
 * Sort indicator used by SortHeaderCell
 */
const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

class Table extends React.Component {
  renderHeader(children) {
    const { data } = this.props;
    const cells = children.map((item, index) => {
      return this.renderCell(item.props.header, {
        index,
        key: index,
        isHeader: true,
        data,
        ...item.props,
      });
    });

    return (
      <thead>
        <tr>{cells}</tr>
      </thead>
    );
  }

  renderBody(children) {
    const { data } = this.props;
    const rows = [];
    for (let i = 0; i < data.length; i++) {
      let cells = children.map((item, index) => {
        return this.renderCell(item.props.cell, {
          rowIndex: i,
          key: index,
          isHeader: false,
          data,
          ...item.props,
        });
      });

      rows.push(<tr key={i}>{cells}</tr>);
    }

    if (rows.length) {
      return <tbody>{rows}</tbody>;
    }

    return (
      <tfoot>
        <tr>
          <td colSpan={children ? children.length : 0}>
            <Text
              typography="paragraph"
              m="4"
              color="text.primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icons.Database mr="2" />
              No Data Available
            </Text>
          </td>
        </tr>
      </tfoot>
    );
  }

  renderCell(cell, cellProps) {
    if (React.isValidElement(cell)) {
      return React.cloneElement(cell, cellProps);
    }

    return null;
  }

  render() {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { data, children, ...rest } = this.props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const columns = [];
    React.Children.forEach(children, child => {
      if (child == null) {
        return;
      }

      if (!child.props._isColumn) {
        throw 'Should be Column';
      }

      columns.push(child);
    });

    return (
      <StyledTable {...rest}>
        {this.renderHeader(columns)}
        {this.renderBody(columns)}
      </StyledTable>
    );
  }
}

const SortIndicator = ({ sortDir }) => {
  if (sortDir === SortTypes.DESC) {
    return <Icons.SortDesc />;
  }

  if (sortDir === SortTypes.ASC) {
    return <Icons.SortAsc />;
  }

  return <Icons.Sort />;
};

class Column extends React.Component {
  static defaultProps = {
    _isColumn: true,
  };

  render() {
    return null;
  }
}

const Cell = props => {
  const { isHeader, children, align, style, className, title } = props;
  const childProps = {
    children,
    align,
    style,
    className,
    title,
  };

  if (isHeader) {
    return <th {...childProps} />;
  }

  return <td {...childProps} />;
};

const TextCell = props => {
  const { rowIndex, data, columnKey, ...rest } = props;
  return <Cell {...rest}>{data[rowIndex][columnKey]}</Cell>;
};

class SortHeaderCell extends React.Component {
  onSortChange = e => {
    e.preventDefault();
    if (!this.props.onSortChange) {
      return;
    }

    const { sortDir, columnKey } = this.props;

    // default
    let newDir = SortTypes.DESC;
    if (sortDir) {
      newDir = sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }

    this.props.onSortChange(columnKey, newDir);
  };

  render() {
    const { sortDir, title, ...props } = this.props;
    return (
      <Cell {...props}>
        <a onClick={this.onSortChange}>
          {title}
          <SortIndicator sortDir={sortDir} />
        </a>
      </Cell>
    );
  }
}

class EmptyIndicator extends React.Component {
  render() {
    const { children, title } = this.props;
    const noResults = title || 'No Results Found';
    return (
      <StyledEmptyIndicator>
        <Text typography="h1" color="text.primary">
          {noResults}
        </Text>
        {children && (
          <Text typography="paragraph" mt="3" color="text.primary">
            {children}
          </Text>
        )}
      </StyledEmptyIndicator>
    );
  }
}

export {
  Column,
  Table,
  Cell,
  TextCell,
  SortHeaderCell,
  SortIndicator,
  SortTypes,
  EmptyIndicator,
};
