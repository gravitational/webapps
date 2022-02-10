/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Indicator } from 'design';
import { Failed } from 'design/CardError';
import useAttempt from 'shared/hooks/useAttemptNext';
import TeleportContext from './teleportContext';

// ReactContext is an instance of React context that is used to
// access TeleportContext instance from within the virtual DOM
const ReactContext = React.createContext<TeleportContext>(null);

export const TeleportContextProvider: React.FC<State> = props => {
  const { ctx, attempt } = props;

  if (attempt.status === 'failed') {
    return <Failed message={attempt.statusText} />;
  }

  if (attempt.status !== 'success') {
    return (
      <StyledIndicator>
        <Indicator />
      </StyledIndicator>
    );
  }
  return <ReactContext.Provider value={ctx} children={props.children} />;
};

const useTeleportContextProvider = (ctx: TeleportContext) => {
  const { attempt, run } = useAttempt('processing');
  useEffect(() => {
    run(() => ctx.init());
  }, [ctx]);

  return { ctx, attempt };
};

const StyledIndicator = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Container: React.FC<Props> = props => {
  const { ctx } = props;
  const state = useTeleportContextProvider(ctx);
  return (
    <TeleportContextProvider {...state}>
      {props.children}
    </TeleportContextProvider>
  );
};

export default Container;
export { ReactContext };

type Props = {
  ctx: TeleportContext;
};

type State = ReturnType<typeof useTeleportContextProvider>;
