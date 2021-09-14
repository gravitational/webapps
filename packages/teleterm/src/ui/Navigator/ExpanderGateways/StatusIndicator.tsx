import styled from 'styled-components';
import React from 'react';
import { Box } from 'design';

const StatusIndicator: React.FC<Props> = props => {
  const { status, ...styles } = props;
  return <StyledStatus title={status} $status={status} {...styles} />;
};

const StyledStatus = styled<Props>(Box)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  ${props => {
    const { $status, theme } = props;
    switch ($status as Status) {
      case 'disconnected':
        return {
          backgroundColor: theme.colors.grey[300],
          boxShadow: `0px 0px 8px 2px ${theme.colors.grey[300]}`,
        };
      case 'connected':
        return {
          backgroundColor: theme.colors.success,
          boxShadow: `0px 0px 8px 2px ${theme.colors.success}`,
        };
      default:
        return {
          backgroundColor: theme.colors.warning,
          boxShadow: `0px 0px 8px 2px ${theme.colors.warning}`,
        };
    }
  }}
`;

type Props = {
  status: Status;
  [key: string]: any;
};

type Status = 'connected' | 'disconnected';

export default StatusIndicator;
