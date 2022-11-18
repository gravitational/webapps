import React from 'react';
import { ClickableLabelCellProps, ClickableLabelCell } from 'design/DataTable';

// Displays labels in the form of clickable elements. Hides teleport internal labels
export const TeleportLabelCell = ({
  labels,
  ...props
}: ClickableLabelCellProps) => (
  <ClickableLabelCell
    {...props}
    labels={labels.filter(({ name }) => !name.startsWith('teleport.internal'))}
  />
);
