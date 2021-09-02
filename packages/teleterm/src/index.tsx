import { hot } from 'react-hot-loader/root';
import React from 'react';
import ThemeProvider from 'design/ThemeProvider';
import CatchError from './components/CatchError';

const Index = ({ history }) => {
  return (
    <CatchError>
      <ThemeProvider>
        <div>FFFFFFFFFFfdfdFFFFFF</div>
      </ThemeProvider>
    </CatchError>
  );
};

export default hot(Index);
