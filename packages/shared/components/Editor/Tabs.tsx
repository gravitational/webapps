import React from 'react';
import styled from 'styled-components';

import * as Icons from 'design/Icon';

interface TabsProps {
  items: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function Tabs(props: TabsProps) {
  const tabs = props.items.map((name, index) => (
    <Tab
      key={index}
      active={index === props.activeIndex}
      onClick={() => props.onSelect(index)}
    >
      <TabIcon>
        <Icons.Code />
      </TabIcon>
      {name}
    </Tab>
  ));

  return <TabsContainer>{tabs}</TabsContainer>;
}

export const TabsContainer = styled.div`
  background: #0a102c;
  display: flex;
`;

export const Tab = styled.div<{ active: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 20px 12px 15px;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 2px;
    height: 2px;
    left: 0;
    right: 0;
    background: ${p =>
      p.active
        ? 'linear-gradient(to right, #354aa4, #651f9b, #8e24aa)'
        : 'transparent'};
  }
`;

const TabIcon = styled('span')`
  font-size: 14px;
  margin-right: 10px;
  position: relative;
  top: 1px;
`;
