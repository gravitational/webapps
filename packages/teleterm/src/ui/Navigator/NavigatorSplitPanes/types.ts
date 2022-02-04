import { ReactNode } from 'react';

export interface NavigatorSplitPane {
  key: string;
  initiallyCollapsed?: boolean;
  /**
   * Initial size of expanded pane. Can be in %, px.
   */
  initialSize?: string;
  /**
   * Minimal size of expanded pane. Must be in px.
   */
  minSize: number;

  Header(props: NavigatorSplitPaneHeaderProps): ReactNode;

  Body: ReactNode;
}

export interface NavigatorSplitPaneHeaderProps {
  onToggle(): void;

  expanded: boolean;
}

export interface NavigatorSplitPanesOnChangeEvent {
  panes: Record<
    string,
    {
      size: string;
      collapsed: boolean;
    }
  >;
}
