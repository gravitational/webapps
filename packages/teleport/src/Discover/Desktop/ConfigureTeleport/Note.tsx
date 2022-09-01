import React from 'react';
import styled from 'styled-components';

import { Text } from 'design';

export function Note() {
  return (
    <NoteContainer>
      <Text color="grey.200" mt={2}>
        This output is for illustrative purposes only
      </Text>
    </NoteContainer>
  );
}

const NoteContainer = styled.div`
  position: absolute;
  bottom: 6px;
  right: 10px;
`;
