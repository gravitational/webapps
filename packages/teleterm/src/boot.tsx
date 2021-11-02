import ReactDOM from 'react-dom';
import React from 'react';
import Ui from './ui';
import { ElectronGlobals } from './types';
import AppContext from './ui/appContext';
import ServiceClusters from './ui/services/clusters';
import ServiceDocs from './ui/services/docs';
import ServiceCommands from './ui/services/commands';
import ServicePty from './ui/services/pty';

const electronGlobals = window['electron'] as ElectronGlobals;
const appContext = new AppContext();

//fdf
appContext.serviceClusters = new ServiceClusters(electronGlobals.tshdClient);
appContext.serviceCommands = new ServiceCommands();
appContext.serviceDocs = new ServiceDocs();
appContext.servicePty = new ServicePty(electronGlobals.ptyServiceClient);

appContext.serviceClusters.fetchClusters();
appContext.serviceClusters.fetchGateways();

ReactDOM.render(<Ui ctx={appContext} />, document.getElementById('app'));
