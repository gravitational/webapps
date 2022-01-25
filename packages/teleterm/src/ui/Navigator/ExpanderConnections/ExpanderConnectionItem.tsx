import React from 'react';
import NavItem from 'teleterm/ui/Navigator/NavItem';
import { StatusIndicator } from './StatusIndicator';
import { Cross } from 'design/Icon';
import { ConnectionItem } from './types';
import { ButtonIcon, Flex, Text } from 'design';

export function ExpanderConnectionItem(props: ExpanderConnectionItemProps) {
  const offline = props.item.status === 'disconnected';
  const color = !offline ? 'text.primary' : 'text.placeholder';

  return (
    <NavItem pl={5} item={props.item} onClick={props.onOpen}>
      <StatusIndicator mr={3} status={props.item.status} />
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
            onClick={e => {
              e.stopPropagation();
              props.onRemove();
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
  item: ConnectionItem;
  onOpen(): void;
  onRemove(): void;
};
