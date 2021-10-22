import ReactDOM from 'react-dom';
import React from 'react';
import Ui from './ui';
import { ElectronGlobals } from './types';
import AppContext from './ui/appContext';
import ServiceClusters from './ui/services/clusters';
import ServiceDocs from './ui/services/docs';
import ServiceCommands from './ui/services/commands';

const electronGlobals = window['electron'] as ElectronGlobals;
const appContext = new AppContext();

appContext.serviceClusters = new ServiceClusters(electronGlobals.tshClient);
appContext.serviceCommands = new ServiceCommands();
appContext.serviceDocs = new ServiceDocs();

appContext.serviceClusters.fetchClusters();
appContext.serviceClusters.fetchGateways();

ReactDOM.render(<Ui ctx={appContext} />, document.getElementById('app'));
