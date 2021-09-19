import { colors } from 'teleport/Console/colors';
import styled from 'styled-components';

export const ActionButton = styled.button`
  background: ${colors.dark};
  border: none;
  color: ${colors.light};
  cursor: pointer;
  font-size: 24px;
  height: 24px;
  outline: none;
  opacity: 0.87;
  padding: 0;
  text-align: center;
  transition: all 0.3s;
  width: 24px;

  &:hover {
    opacity: 1;

    .icon {
      color: ${colors.progressBarColor};
    }
  }

  .icon {
    height: 24px;
    width: 24px;
  }
`;
