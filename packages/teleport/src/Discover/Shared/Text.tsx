import { Box, Text } from 'design';

import styled from 'styled-components';

export const TextIcon = styled(Text)`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 8px;
  }
`;

export const TextBox = styled(Box)`
  width: 100%;
  margin-top: 32px;
  border-radius: 8px;
  background-color: ${p => p.theme.colors.primary.light};
  padding: 24px;
`;
