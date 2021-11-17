import ReactDOM from 'react-dom';
import React from 'react';
import Ui from 'teleterm/ui';
import { ElectronGlobals } from 'teleterm/types';
import AppContext from 'teleterm/ui/appContext';

const electronGlobals = window['electron'] as ElectronGlobals;
const appContext = new AppContext(electronGlobals);

appContext.init();

const globalLogger = electronGlobals.createLogger('Uncaught Error');

// global handler for uncaught errors
window.addEventListener('error', event => {
  globalLogger.error(event.error.stack);
});

// global handler for uncaught promise rejections
window.addEventListener('unhandledrejection', event => {
  globalLogger.error(event.reason.stack);
});

ReactDOM.render(<Ui ctx={appContext} />, document.getElementById('app'));
