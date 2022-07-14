import ReactDOM from 'react-dom';
import React from 'react';
import { ElectronGlobals } from 'teleterm/types';
import { App, FailedApp } from 'teleterm/ui/App';
import AppContext from 'teleterm/ui/appContext';
import Logger from 'teleterm/logger';

async function boot(): Promise<void> {
  try {
    const globals = await getElectronGlobals();
    Logger.init(globals.loggerService);

    const logger = new Logger('UI');
    const appContext = new AppContext(globals);

    window.addEventListener('error', event => {
      console.error(event.error.stack);
      logger.error(event.error.stack);
    });

    window.addEventListener('unhandledrejection', event => {
      logger.error(event.reason.stack);
    });

    renderApp(<App ctx={appContext} />);
  } catch (e) {
    renderApp(<FailedApp message={e.toString()} />);
  }
}

async function getElectronGlobals(): Promise<ElectronGlobals> {
  const globals = await window['electron'];
  if (globals instanceof Error) {
    throw globals;
  }
  return globals;
}

function renderApp(content: React.ReactNode): void {
  ReactDOM.render(content, document.getElementById('app'));
}

boot();
