import React from 'react';
import { Box, ButtonPrimary } from 'design';

export default function NextButton({ next }: Props) {
  return (
    <Box>
      <ButtonPrimary onClick={next}>Next</ButtonPrimary>
    </Box>
  );
}

type Props = {
  next(): void;
};
