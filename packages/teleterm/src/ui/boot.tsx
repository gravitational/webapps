import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import { ElectronGlobals } from 'teleterm/types';
import App from 'teleterm/ui/App';
import AppContext from 'teleterm/ui/appContext';
import Logger, { initLogger } from 'teleterm/ui/logger';
import useAsync from 'teleterm/ui/useAsync';
import theme from 'teleterm/ui/ThemeProvider/theme';

const globals = window['electron'] as ElectronGlobals;
initLogger(globals);

const logger = new Logger('UI');
const appContext = new AppContext(globals);

window.addEventListener('error', event => {
  console.error(event.error.stack);
  logger.error(event.error.stack);
});

window.addEventListener('unhandledrejection', event => {
  logger.error(event.reason.stack);
});

ReactDOM.render(<AppLoader />, document.getElementById('app'));

function AppLoader() {
  const [{ status }, run] = useAsync(() => appContext.init());
  useEffect(() => {
    run();
  }, []);
  if (status === 'success' || status === 'error') {
    return <App ctx={appContext} />;
  }
  return (
    <div
      style={{
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.text.primary,
        left: 0,
        top: 0,
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        fontFamily: 'sans-serif',
      }}
    >
      Loading
    </div>
  );
}
