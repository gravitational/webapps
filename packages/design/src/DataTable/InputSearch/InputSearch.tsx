import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { height, space, color } from 'design/system';

export default function InputSearch({
  searchValue,
  setSearchValue,
  children,
}: Props) {
  return (
    <Wrapper>
      <StyledInput
        placeholder="SEARCH..."
        px={3}
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
      {children}
    </Wrapper>
  );
}

type Props = {
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  children?: JSX.Element;
};

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  min-width: 200px;
  border-radius: 200px;
  height: 32px;
  background: ${props => props.theme.colors.primary.dark};
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  box-sizing: border-box;
  height: 100%;
  font-size: 12px;
  width: 100%;
  transition: all 0.2s;
  ${color}
  ${space}
  ${height}
  ${fromTheme};
`;

function fromTheme(props) {
  return {
    color: props.theme.colors.text.primary,
    background: props.theme.colors.primary.dark,

    '&: hover, &:focus, &:active': {
      background: props.theme.colors.primary.main,
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, .24)',
      color: props.theme.colors.text.primary,
    },
    '&::placeholder': {
      color: props.theme.colors.text.placeholder,
      fontSize: props.theme.fontSizes[1],
    },
  };
}
