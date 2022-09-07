import styled from 'design/styled';

import { ButtonText } from 'design';

export const ButtonBlueText = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.link};
  font-weight: normal;
  padding-left: 0;
  font-size: inherit;
  min-height: auto;
`;
