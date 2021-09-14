import { History } from 'history';
import React from 'react';
import styled from 'styled-components';
import { Box } from 'design';
import SplitPane from 'shared/components/SplitPane';
import ThemeProvider from 'design/ThemeProvider';
import CatchError from './components/CatchError';
import AppContextProvider from './appContextProvider';
import Navigator from './Navigator';
import AppContext from './appContext';
import { Router } from 'teleport/components/Router';
import TabHost from './TabHost';

const App: React.FC<Props> = ({ history }) => {
  const [ctx] = React.useState(() => {
    return new AppContext();
  });

  React.useEffect(() => {
    ctx.init();
  }, [ctx]);

  return (
    <StyledApp>
      <CatchError>
        <Router history={history}>
          <AppContextProvider value={ctx}>
            <ThemeProvider>
              <SplitPane defaultSize="20%" flex="1" split="vertical">
                <Box flex="1" bg="primary.light">
                  <Navigator />
                </Box>
                <Box flex="1" style={{ position: 'relative' }}>
                  <TabHost />
                </Box>
              </SplitPane>
            </ThemeProvider>
          </AppContextProvider>
        </Router>
      </CatchError>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
`;

export type Props = {
  history: History;
};
