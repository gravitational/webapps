import React from 'react';
import styled from 'styled-components';

export default function Toggle({ isToggled, onToggle }: Props) {
  return (
    <StyledWrapper>
      <StyledInput checked={isToggled} onChange={() => onToggle()} />
      <StyledSlider />
    </StyledWrapper>
  );
}

type Props = {
  isToggled: boolean;
  onToggle: () => void;
};

const StyledWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledSlider = styled.div`
  width: 40px;
  height: 16px;
  border-radius: 16px;
  background: ${props => props.theme.colors.primary.light};
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: ${props => props.theme.colors.secondary.main};
  }
`;

const StyledInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  cursor: pointer;

  &:checked + ${StyledSlider} {
    background: ${props => props.theme.colors.primary.lighter};
    &:before {
      transform: translate(20px, -50%);
    }
  }
`;
