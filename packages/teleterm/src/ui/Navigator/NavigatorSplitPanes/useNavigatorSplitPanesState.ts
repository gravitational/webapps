import { MutableRefObject, useState } from 'react';
import { NavigatorSplitPane } from './types';

export function useNavigatorSplitPanesState(
  panes: NavigatorSplitPane[],
  rootContainerRef: MutableRefObject<HTMLElement>
) {
  function generateCollapseInitialState(): Record<string, boolean> {
    return panes.reduce((collapseState, pane) => {
      collapseState[pane.key] =
        pane.initiallyCollapsed === undefined ? false : pane.initiallyCollapsed;
      return collapseState;
    }, {});
  }

  const [collapseState, setCollapseState] = useState<Record<string, boolean>>(
    generateCollapseInitialState()
  );

  function getMinYToResize(): number {
    const firstPaneMinHeight = panes[0].minSize;
    return (
      rootContainerRef.current.getBoundingClientRect().top + firstPaneMinHeight
    );
  }

  function getMaxYToResize(): number {
    const secondPaneMinHeight = panes[1].minSize;
    return (
      rootContainerRef.current.getBoundingClientRect().bottom -
      secondPaneMinHeight
    );
  }

  function isCollapsed(index: number): boolean {
    return collapseState[panes[index].key];
  }

  function isLast(index: number): boolean {
    return index === panes.length - 1;
  }

  function isDraggingDisabled(index: number): boolean {
    if (index + 1 >= panes.length) {
      return true;
    }

    return isCollapsed(index) || isCollapsed(index + 1);
  }

  function handleToggle(key: string): void {
    setCollapseState(collapseState => ({
      ...collapseState,
      [key]: !collapseState[key],
    }));
  }

  return {
    collapseState,
    isCollapsed,
    isLast,
    handleToggle,
    getMinYToResize,
    getMaxYToResize,
    isDraggingDisabled,
  };
}
