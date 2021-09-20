export default function getConfig() {
  return {
    routes: {
      root: '/',
      home: '/home',
      gateways: '/gateways',
      cluster: '/clusters/:clusterId',
      clusterServers: '/clusters/:clusterId/servers',
      clusterApps: '/clusters/:clusterId/apps',
      clusterDbs: '/clusters/:clusterId/dbs',
    },
  };
}

export type Config = ReturnType<typeof getConfig>;
