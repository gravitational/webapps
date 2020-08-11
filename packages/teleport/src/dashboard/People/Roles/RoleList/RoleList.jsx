import React from 'react';
import { Cell, Column } from 'design/DataTable';
import Table from 'design/DataTable/Paged';
import { RoleNameCell, ActionCell } from './RoleListCells';

export default function RoleList({ items, onEdit, onDelete }) {
  items = items || [];
  return (
    <Table pageSize={20} data={items}>
      <Column header={<Cell>Name</Cell>} cell={<RoleNameCell />} />
      <Column
        header={<Cell />}
        cell={<ActionCell onEdit={onEdit} onDelete={onDelete} />}
      />
    </Table>
  );
}
