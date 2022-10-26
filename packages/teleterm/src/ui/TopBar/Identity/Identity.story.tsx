import React, { useRef, useEffect } from 'react';

import Flex from 'design/Flex';

import * as tshd from 'teleterm/services/tshd/types';

import { Identity, IdentityHandler, IdentityProps } from './Identity';

export default {
  title: 'Teleterm/Identity',
};

const makeTitle = (userWithClusterName: string) => userWithClusterName;

const OpenedIdentity = (props: IdentityProps) => {
  const ref = useRef<IdentityHandler>();
  useEffect(() => {
    if (ref.current) {
      ref.current.togglePopover();
    }
  }, [ref.current]);

  return (
    <Flex justifyContent="end" height="40px">
      <Identity ref={ref} {...props} />
    </Flex>
  );
};

export function NoRootClusters() {
  return (
    <OpenedIdentity
      makeTitle={makeTitle}
      activeRootCluster={undefined}
      rootClusters={[]}
      changeRootCluster={() => Promise.resolve()}
      logout={() => {}}
      addCluster={() => {}}
    />
  );
}

export function OneClusterWithNoActiveCluster() {
  const identityRootCluster = {
    active: false,
    clusterName: 'teleport-localhost',
    userName: '',
    uri: '/clusters/localhost',
    connected: false,
    isSyncing: false,
  };

  return (
    <OpenedIdentity
      makeTitle={makeTitle}
      activeRootCluster={undefined}
      rootClusters={[identityRootCluster]}
      changeRootCluster={() => Promise.resolve()}
      logout={() => {}}
      addCluster={() => {}}
    />
  );
}

export function OneClusterWithActiveCluster() {
  const identityRootCluster = {
    active: true,
    clusterName: 'Teleport-Localhost',
    userName: 'alice',
    uri: '/clusters/localhost',
    connected: true,
    isSyncing: false,
  };

  const cluster: tshd.Cluster = {
    uri: '/clusters/localhost',
    name: 'teleport-localhost',
    proxyHost: 'localhost:3080',
    connected: true,
    leaf: false,
    loggedInUser: {
      activeRequestsList: [],
      name: 'alice',
      rolesList: ['access', 'editor'],
      sshLoginsList: ['root'],
    },
  };

  return (
    <OpenedIdentity
      makeTitle={makeTitle}
      activeRootCluster={cluster}
      rootClusters={[identityRootCluster]}
      changeRootCluster={() => Promise.resolve()}
      logout={() => {}}
      addCluster={() => {}}
    />
  );
}

export function ManyClustersWithNoActiveCluster() {
  const identityRootCluster1 = {
    active: false,
    clusterName: 'orange',
    userName: 'bob',
    uri: '/clusters/orange',
    connected: true,
    isSyncing: false,
  };
  const identityRootCluster2 = {
    active: false,
    clusterName: 'violet',
    userName: 'sammy',
    uri: '/clusters/violet',
    connected: true,
    isSyncing: true,
  };
  const identityRootCluster3 = {
    active: false,
    clusterName: 'green',
    userName: '',
    uri: '/clusters/green',
    connected: true,
    isSyncing: false,
  };

  return (
    <OpenedIdentity
      makeTitle={makeTitle}
      activeRootCluster={undefined}
      rootClusters={[
        identityRootCluster1,
        identityRootCluster2,
        identityRootCluster3,
      ]}
      changeRootCluster={() => Promise.resolve()}
      logout={() => {}}
      addCluster={() => {}}
    />
  );
}

export function ManyClustersWithActiveCluster() {
  const identityRootCluster1 = {
    active: false,
    clusterName: 'orange',
    userName: 'bob',
    uri: '/clusters/orange',
    connected: true,
    isSyncing: true,
  };
  const identityRootCluster2 = {
    active: true,
    clusterName: 'violet',
    userName: 'sammy',
    uri: '/clusters/violet',
    connected: true,
    isSyncing: false,
  };
  const identityRootCluster3 = {
    active: false,
    clusterName: 'green',
    userName: '',
    uri: '/clusters/green',
    connected: true,
    isSyncing: false,
  };

  const activeIdentityRootCluster = identityRootCluster2;
  const activeCluster: tshd.Cluster = {
    uri: activeIdentityRootCluster.uri,
    name: activeIdentityRootCluster.clusterName,
    proxyHost: 'localhost:3080',
    connected: true,
    leaf: false,
    loggedInUser: {
      activeRequestsList: [],
      name: activeIdentityRootCluster.userName,
      rolesList: ['access', 'editor'],
      sshLoginsList: ['root'],
    },
  };

  return (
    <OpenedIdentity
      makeTitle={makeTitle}
      activeRootCluster={activeCluster}
      rootClusters={[
        identityRootCluster1,
        identityRootCluster2,
        identityRootCluster3,
      ]}
      changeRootCluster={() => Promise.resolve()}
      logout={() => {}}
      addCluster={() => {}}
    />
  );
}

export function LongNamesWithManyRoles() {
  const identityRootCluster1 = {
    active: false,
    clusterName: 'orange',
    userName: 'bob',
    uri: '/clusters/orange',
    connected: true,
    isSyncing: true,
  };
  const identityRootCluster2 = {
    active: true,
    clusterName: 'psv-eindhoven-eredivisie-production-lorem-ipsum',
    userName: 'ruud-van-nistelrooy-van-der-sar',
    uri: '/clusters/psv',
    connected: true,
    isSyncing: false,
  };
  const identityRootCluster3 = {
    active: false,
    clusterName: 'green',
    userName: '',
    uri: '/clusters/green',
    connected: true,
    isSyncing: false,
  };

  const activeIdentityRootCluster = identityRootCluster2;
  const activeCluster: tshd.Cluster = {
    uri: activeIdentityRootCluster.uri,
    name: activeIdentityRootCluster.clusterName,
    proxyHost: 'localhost:3080',
    connected: true,
    leaf: false,
    loggedInUser: {
      activeRequestsList: [],
      name: activeIdentityRootCluster.userName,
      rolesList: [
        'circle-mark-app-access',
        'grafana-lite-app-access',
        'grafana-gold-app-access',
        'release-lion-app-access',
        'release-fox-app-access',
        'sales-center-lorem-app-access',
        'sales-center-ipsum-db-access',
        'sales-center-shop-app-access',
        'sales-center-floor-db-access',
      ],
      sshLoginsList: ['root'],
    },
  };

  return (
    <OpenedIdentity
      makeTitle={makeTitle}
      activeRootCluster={activeCluster}
      rootClusters={[
        identityRootCluster1,
        identityRootCluster2,
        identityRootCluster3,
      ]}
      changeRootCluster={() => Promise.resolve()}
      logout={() => {}}
      addCluster={() => {}}
    />
  );
}
