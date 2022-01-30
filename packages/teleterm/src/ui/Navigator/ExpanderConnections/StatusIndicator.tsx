import styled from 'styled-components';
import React from 'react';
import { Box } from 'design';

export const StatusIndicator: React.FC<Props> = props => {
  const { connected, ...styles } = props;
  return <StyledStatus $connected={connected} {...styles} />;
};

const StyledStatus = styled<Props>(Box)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  ${props => {
    const { $connected, theme } = props;
    if ($connected) {
      return {
        backgroundColor: theme.colors.success,
        boxShadow: `0px 0px 8px 2px ${theme.colors.success}`,
      };
    }

    return {
      backgroundColor: theme.colors.grey[300],
      boxShadow: `0px 0px 8px 2px ${theme.colors.grey[300]}`,
    };
  }}
`;

type Props = {
  connected: boolean;
  [key: string]: any;
};
