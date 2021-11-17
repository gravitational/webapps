import ReactDOM from 'react-dom';
import React from 'react';
import Ui from 'teleterm/ui';
import { ElectronGlobals } from 'teleterm/types';
import AppContext from 'teleterm/ui/appContext';

const electronGlobals = window['electron'] as ElectronGlobals;
const appContext = new AppContext(electronGlobals);

appContext.init();

ReactDOM.render(<Ui ctx={appContext} />, document.getElementById('app'));
