import React from 'react';
import { Box, ButtonPrimary } from 'design';

export default function NextButton({ next, label = 'Next' }: Props) {
  return (
    <Box>
      <ButtonPrimary onClick={next} block={true}>
        {label}
      </ButtonPrimary>
    </Box>
  );
}

type Props = {
  next(): void;
  label?: string;
};
