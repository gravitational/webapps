import React from 'react';
import styled from 'styled-components';
import { Box } from 'design';
import SplitPane from 'shared/components/SplitPane';
import ThemeProvider from './ThemeProvider';
import CatchError from './components/CatchError';
import AppContextProvider from './appContextProvider';
import Navigator from './Navigator';
import AppContext from './appContext';
import TabHost from './TabHost';
import DialogHost from './DialogHost';

const App: React.FC<{ ctx: AppContext }> = ({ ctx }) => {
  return (
    <StyledApp>
      <CatchError>
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
            <DialogHost />
          </ThemeProvider>
        </AppContextProvider>
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
