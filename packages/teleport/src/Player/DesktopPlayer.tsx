import React from 'react';
import styled from 'styled-components';
import { Indicator, Flex, Text, Box } from 'design';

export const DesktopPlayer = ({
  sid,
  clusterId,
}: {
  sid: string;
  clusterId: string;
}) => {
  return (
    <StyledPlayer>
      <Flex flex="1" flexDirection="column" overflow="auto">
        Desktop Player
      </Flex>
    </StyledPlayer>
  );
};

const StyledPlayer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;
