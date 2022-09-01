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
  padding: 10px 20px 10px 15px;
  border-bottom: 2px solid ${p => (p.active ? '#8e00ff' : 'transparent')};
  cursor: pointer;
`;

const TabIcon = styled('span')`
  font-size: 14px;
  margin-right: 10px;
  position: relative;
  top: 1px;
`;
