import React from 'react';
import { ExpanderHeader, ExpanderHeaderProps } from './Expander';
import { Flex } from 'design';
import styled from 'styled-components';

const AccordingContext = React.createContext<AccordingContextState>(null);

export const ContextualExpander: React.FC = props => {
  const [expanded, setExpanded] = React.useState(true);
  const [header, ...children] = React.Children.toArray(props.children);
  const toggle = () => setExpanded(!expanded);

  return (
    <AccordingContext.Provider value={{ expanded, toggle }}>
      {header}
      {children}
    </AccordingContext.Provider>
  );
};

export const ContextualExpanderHeader: React.FC<
  ContextualExpanderHeaderProps
> = props => {
  const { children, ...otherProps } = props;
  const ctx = React.useContext(AccordingContext);

  return (
    <ExpanderHeader
      {...otherProps}
      expanded={ctx.expanded}
      onToggle={ctx.toggle}
    >
      {children}
    </ExpanderHeader>
  );
};

export const ContextualExpanderContent = styled(Flex)(props => {
  const ctx = React.useContext(AccordingContext);
  return {
    display: ctx.expanded ? 'block' : 'none',
    color: props.theme.colors.text.secondary,
    flexDirection: 'column',
  };
});

type AccordingContextState = {
  expanded: boolean;
  toggle(): void;
};

type ContextualExpanderHeaderProps = Omit<
  ExpanderHeaderProps,
  'onToggle' | 'expanded'
>;
