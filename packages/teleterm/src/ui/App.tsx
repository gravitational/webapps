import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { Box } from 'design';
import SplitPane from 'shared/components/SplitPane';
import CatchError from './components/CatchError';
import Navigator from './Navigator';
import TabHost from './TabHost';
import ModalsHost from './ModalsHost';
import QuickInput from './QuickInput';
import AppContextProvider from './appContextProvider';
import AppContext from './appContext';
import ThemeProvider from './ThemeProvider';

const App: React.FC<{ ctx: AppContext }> = ({ ctx }) => {
  return (
    <StyledApp>
      <CatchError>
        <DndProvider backend={HTML5Backend}>
          <AppContextProvider value={ctx}>
            <ThemeProvider>
              <QuickInput />
              <SplitPane defaultSize="20%" flex="1" split="vertical">
                <Box flex="1" bg="primary.light">
                  <Navigator />
                </Box>
                <Box flex="1" style={{ position: 'relative' }}>
                  <TabHost />
                </Box>
              </SplitPane>
              <ModalsHost />
            </ThemeProvider>
          </AppContextProvider>
        </DndProvider>
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
  flex-direction: column;
`;
