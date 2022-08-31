import React from 'react';

import { Text } from 'design';

export const Header: React.FC = ({ children }) => (
  <Text my={1} fontSize="18px" bold>
    {children}
  </Text>
);

export const HeaderSubtitle: React.FC = ({ children }) => (
  <Text mb={5}>{children}</Text>
);
