import React from 'react';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import { StatusIndicator } from './StatusIndicator';
import { Cross } from 'design/Icon';
import { Flex, Text } from 'design';
import { Connection } from 'teleterm/ui/services/connectionTracker';
import { ButtonIcon } from 'teleterm/ui/components/ButtonIcon';

export function ExpanderConnectionItem(props: ExpanderConnectionItemProps) {
  const offline = !props.item.connected;
  const color = !offline ? 'text.primary' : 'text.placeholder';

  return (
    <NavItem
      active={false}
      pl="35px"
      onClick={() => props.onOpen(props.item.id)}
      onContextMenu={() => props.onContextMenu(props.item.id)}
    >
      <StatusIndicator mr={2} connected={props.item.connected} />
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flex="1"
        width="100%"
        minWidth="0"
      >
        <Text typography="body1" color={color} title={props.item.title}>
          {props.item.title}
        </Text>
        {offline && (
          <ButtonIcon
            color="text.placeholder"
            title="Remove"
            mr={1}
            onClick={e => {
              e.stopPropagation();
              props.onRemove(props.item.id);
            }}
          >
            <Cross fontSize={12} />
          </ButtonIcon>
        )}
      </Flex>
    </NavItem>
  );
}

type ExpanderConnectionItemProps = {
  item: Connection;
  onOpen(id: string): void;
  onRemove(id: string): void;
  onContextMenu(id: string): void;
};
