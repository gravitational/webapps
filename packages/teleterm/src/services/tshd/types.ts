import apiCluster from './v1/cluster_pb';
import apiDb from './v1/database_pb';
import apigateway from './v1/gateway_pb';
import apiServer from './v1/server_pb';

export type Server = apiServer.Server.AsObject;
export type Gateway = apigateway.Gateway.AsObject;
export type Database = apiDb.Database.AsObject;
export type Cluster = apiCluster.Cluster.AsObject;
