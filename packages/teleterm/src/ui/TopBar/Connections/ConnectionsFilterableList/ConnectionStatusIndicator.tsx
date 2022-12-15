import styled from 'styled-components';

import { Box } from 'design';

import { margin } from 'design/system';

import type { MarginProps } from 'design/system';

interface ConnectionStatusIndicatorBaseProps {
  connected: boolean;
}

type ConnectionStatusIndicatorProps = ConnectionStatusIndicatorBaseProps &
  MarginProps;

export const ConnectionStatusIndicator = styled(
  Box
)<ConnectionStatusIndicatorProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  ${margin}

  ${props => {
    const { connected, theme } = props;
    const backgroundColor = connected
      ? theme.colors.success
      : theme.colors.grey[300];
    return {
      backgroundColor,
    };
  }}
`;
