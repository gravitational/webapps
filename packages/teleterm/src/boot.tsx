import ReactDOM from 'react-dom';
import React from 'react';
import Ui from './ui';
import { ElectronGlobals } from './types';
import AppContext from './ui/appContext';
import ServiceClusters from './ui/services/clusters';
import ServiceDocs from './ui/services/docs';
import ServiceModals from './ui/services/modals';
import ServiceTerminals from './ui/services/terminals';

const electronGlobals = window['electron'] as ElectronGlobals;
const appContext = new AppContext();

appContext.serviceClusters = new ServiceClusters(electronGlobals.tshdClient);
appContext.serviceModals = new ServiceModals();
appContext.serviceDocs = new ServiceDocs();
appContext.serviceTerminals = new ServiceTerminals(
  electronGlobals.ptyServiceClient
);
appContext.mainProcessClient = electronGlobals.mainProcessClient;

appContext.serviceClusters.fetchClusters();
appContext.serviceClusters.fetchGateways();

ReactDOM.render(<Ui ctx={appContext} />, document.getElementById('app'));
