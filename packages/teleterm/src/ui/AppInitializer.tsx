import React, { FC, useEffect } from 'react';
import { useAsync } from 'shared/hooks/useAsync';
import styled from 'styled-components';

import { useAppContext } from 'teleterm/ui/appContextProvider';

import type { ReactNode } from 'react';

export const AppInitializer: FC<Props> = props => {
  const ctx = useAppContext();
  const [state, init] = useAsync(() => ctx.init());

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (state.status === 'error') {
      ctx.notificationsService.notifyError(state.statusText);
    }
  }, [state]);

  if (state.status === 'success' || state.status === 'error') {
    return <>{props.children}</>;
  }

  return <Centered>Loading</Centered>;
};

type Props = {
  children: ReactNode | Element[];
};

const Centered = styled.div`
  margin: auto;
`;
