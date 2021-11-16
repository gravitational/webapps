import ReactDOM from 'react-dom';
import React from 'react';
import Ui from './ui';
import { ElectronGlobals } from './types';
import AppContext from './ui/appContext';
import ServiceClusters from './ui/services/clusters';
import ServiceDocs from './ui/services/docs';
import ServiceModals from './ui/services/modals';
import ServiceTerminals from './ui/services/terminals';
import ServiceGlobalSearch from './ui/services/globalSearch';

const electronGlobals = window['electron'] as ElectronGlobals;
const appContext = new AppContext();

appContext.serviceGlobalSearch = new ServiceGlobalSearch();
appContext.serviceClusters = new ServiceClusters(electronGlobals.tshdClient);
appContext.serviceGlobalSearch.registerProvider(
  appContext.serviceClusters.searchProvider
);

appContext.serviceModals = new ServiceModals();
appContext.serviceDocs = new ServiceDocs();
appContext.serviceTerminals = new ServiceTerminals(
  electronGlobals.ptyServiceClient
);

appContext.mainProcessClient = electronGlobals.mainProcessClient;

// load
appContext.serviceClusters.fetchClusters();
appContext.serviceClusters.fetchGateways();

ReactDOM.render(<Ui ctx={appContext} />, document.getElementById('app'));
