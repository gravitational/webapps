// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2021 Gravitational, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var v1_service_pb = require('../v1/service_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var v1_cluster_pb = require('../v1/cluster_pb.js');
var v1_database_pb = require('../v1/database_pb.js');
var v1_gateway_pb = require('../v1/gateway_pb.js');
var v1_kube_pb = require('../v1/kube_pb.js');
var v1_app_pb = require('../v1/app_pb.js');
var v1_server_pb = require('../v1/server_pb.js');
var v1_auth_settings_pb = require('../v1/auth_settings_pb.js');

function serialize_teleport_terminal_v1_AddClusterRequest(arg) {
  if (!(arg instanceof v1_service_pb.AddClusterRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.AddClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_AddClusterRequest(buffer_arg) {
  return v1_service_pb.AddClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_AuthSettings(arg) {
  if (!(arg instanceof v1_auth_settings_pb.AuthSettings)) {
    throw new Error('Expected argument of type teleport.terminal.v1.AuthSettings');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_AuthSettings(buffer_arg) {
  return v1_auth_settings_pb.AuthSettings.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_Cluster(arg) {
  if (!(arg instanceof v1_cluster_pb.Cluster)) {
    throw new Error('Expected argument of type teleport.terminal.v1.Cluster');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_Cluster(buffer_arg) {
  return v1_cluster_pb.Cluster.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_CreateGatewayRequest(arg) {
  if (!(arg instanceof v1_service_pb.CreateGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.CreateGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_CreateGatewayRequest(buffer_arg) {
  return v1_service_pb.CreateGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_EmptyResponse(arg) {
  if (!(arg instanceof v1_service_pb.EmptyResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.EmptyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_EmptyResponse(buffer_arg) {
  return v1_service_pb.EmptyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_Gateway(arg) {
  if (!(arg instanceof v1_gateway_pb.Gateway)) {
    throw new Error('Expected argument of type teleport.terminal.v1.Gateway');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_Gateway(buffer_arg) {
  return v1_gateway_pb.Gateway.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_GetAuthSettingsRequest(arg) {
  if (!(arg instanceof v1_service_pb.GetAuthSettingsRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.GetAuthSettingsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_GetAuthSettingsRequest(buffer_arg) {
  return v1_service_pb.GetAuthSettingsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_GetClusterRequest(arg) {
  if (!(arg instanceof v1_service_pb.GetClusterRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.GetClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_GetClusterRequest(buffer_arg) {
  return v1_service_pb.GetClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListAppsRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListAppsRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListAppsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListAppsRequest(buffer_arg) {
  return v1_service_pb.ListAppsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListAppsResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListAppsResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListAppsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListAppsResponse(buffer_arg) {
  return v1_service_pb.ListAppsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListClustersRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListClustersRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListClustersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListClustersRequest(buffer_arg) {
  return v1_service_pb.ListClustersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListClustersResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListClustersResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListClustersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListClustersResponse(buffer_arg) {
  return v1_service_pb.ListClustersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListDatabaseUsersRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListDatabaseUsersRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListDatabaseUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListDatabaseUsersRequest(buffer_arg) {
  return v1_service_pb.ListDatabaseUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListDatabaseUsersResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListDatabaseUsersResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListDatabaseUsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListDatabaseUsersResponse(buffer_arg) {
  return v1_service_pb.ListDatabaseUsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListDatabasesRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListDatabasesRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListDatabasesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListDatabasesRequest(buffer_arg) {
  return v1_service_pb.ListDatabasesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListDatabasesResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListDatabasesResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListDatabasesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListDatabasesResponse(buffer_arg) {
  return v1_service_pb.ListDatabasesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListGatewaysRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListGatewaysRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListGatewaysRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListGatewaysRequest(buffer_arg) {
  return v1_service_pb.ListGatewaysRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListGatewaysResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListGatewaysResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListGatewaysResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListGatewaysResponse(buffer_arg) {
  return v1_service_pb.ListGatewaysResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListKubesRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListKubesRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListKubesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListKubesRequest(buffer_arg) {
  return v1_service_pb.ListKubesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListKubesResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListKubesResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListKubesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListKubesResponse(buffer_arg) {
  return v1_service_pb.ListKubesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListLeafClustersRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListLeafClustersRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListLeafClustersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListLeafClustersRequest(buffer_arg) {
  return v1_service_pb.ListLeafClustersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListServersRequest(arg) {
  if (!(arg instanceof v1_service_pb.ListServersRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListServersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListServersRequest(buffer_arg) {
  return v1_service_pb.ListServersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListServersResponse(arg) {
  if (!(arg instanceof v1_service_pb.ListServersResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListServersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListServersResponse(buffer_arg) {
  return v1_service_pb.ListServersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_LoginPasswordlessRequest(arg) {
  if (!(arg instanceof v1_service_pb.LoginPasswordlessRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.LoginPasswordlessRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_LoginPasswordlessRequest(buffer_arg) {
  return v1_service_pb.LoginPasswordlessRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_LoginPasswordlessResponse(arg) {
  if (!(arg instanceof v1_service_pb.LoginPasswordlessResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.LoginPasswordlessResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_LoginPasswordlessResponse(buffer_arg) {
  return v1_service_pb.LoginPasswordlessResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_LoginRequest(arg) {
  if (!(arg instanceof v1_service_pb.LoginRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_LoginRequest(buffer_arg) {
  return v1_service_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_LogoutRequest(arg) {
  if (!(arg instanceof v1_service_pb.LogoutRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.LogoutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_LogoutRequest(buffer_arg) {
  return v1_service_pb.LogoutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_RemoveClusterRequest(arg) {
  if (!(arg instanceof v1_service_pb.RemoveClusterRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.RemoveClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_RemoveClusterRequest(buffer_arg) {
  return v1_service_pb.RemoveClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_RemoveGatewayRequest(arg) {
  if (!(arg instanceof v1_service_pb.RemoveGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.RemoveGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_RemoveGatewayRequest(buffer_arg) {
  return v1_service_pb.RemoveGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_RestartGatewayRequest(arg) {
  if (!(arg instanceof v1_service_pb.RestartGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.RestartGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_RestartGatewayRequest(buffer_arg) {
  return v1_service_pb.RestartGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_SetGatewayLocalPortRequest(arg) {
  if (!(arg instanceof v1_service_pb.SetGatewayLocalPortRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.SetGatewayLocalPortRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_SetGatewayLocalPortRequest(buffer_arg) {
  return v1_service_pb.SetGatewayLocalPortRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_SetGatewayTargetSubresourceNameRequest(arg) {
  if (!(arg instanceof v1_service_pb.SetGatewayTargetSubresourceNameRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.SetGatewayTargetSubresourceNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_SetGatewayTargetSubresourceNameRequest(buffer_arg) {
  return v1_service_pb.SetGatewayTargetSubresourceNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// TerminalService describes Teleterm service
var TerminalServiceService = exports.TerminalServiceService = {
  // ListRootClusters lists root clusters
listRootClusters: {
    path: '/teleport.terminal.v1.TerminalService/ListRootClusters',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListClustersRequest,
    responseType: v1_service_pb.ListClustersResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListClustersRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListClustersRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListClustersResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListClustersResponse,
  },
  // ListLeafClusters lists leaf clusters
listLeafClusters: {
    path: '/teleport.terminal.v1.TerminalService/ListLeafClusters',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListLeafClustersRequest,
    responseType: v1_service_pb.ListClustersResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListLeafClustersRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListLeafClustersRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListClustersResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListClustersResponse,
  },
  // ListDatabases lists databases
listDatabases: {
    path: '/teleport.terminal.v1.TerminalService/ListDatabases',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListDatabasesRequest,
    responseType: v1_service_pb.ListDatabasesResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListDatabasesRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListDatabasesRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListDatabasesResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListDatabasesResponse,
  },
  // ListDatabaseUsers lists allowed users for the given database based on the role set.
listDatabaseUsers: {
    path: '/teleport.terminal.v1.TerminalService/ListDatabaseUsers',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListDatabaseUsersRequest,
    responseType: v1_service_pb.ListDatabaseUsersResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListDatabaseUsersRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListDatabaseUsersRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListDatabaseUsersResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListDatabaseUsersResponse,
  },
  // ListServers lists servers
listServers: {
    path: '/teleport.terminal.v1.TerminalService/ListServers',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListServersRequest,
    responseType: v1_service_pb.ListServersResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListServersRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListServersRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListServersResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListServersResponse,
  },
  // ListKubes list kubes
listKubes: {
    path: '/teleport.terminal.v1.TerminalService/ListKubes',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListKubesRequest,
    responseType: v1_service_pb.ListKubesResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListKubesRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListKubesRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListKubesResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListKubesResponse,
  },
  // ListApps list apps
listApps: {
    path: '/teleport.terminal.v1.TerminalService/ListApps',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListAppsRequest,
    responseType: v1_service_pb.ListAppsResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListAppsRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListAppsRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListAppsResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListAppsResponse,
  },
  // AddCluster adds a cluster to profile
addCluster: {
    path: '/teleport.terminal.v1.TerminalService/AddCluster',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.AddClusterRequest,
    responseType: v1_cluster_pb.Cluster,
    requestSerialize: serialize_teleport_terminal_v1_AddClusterRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_AddClusterRequest,
    responseSerialize: serialize_teleport_terminal_v1_Cluster,
    responseDeserialize: deserialize_teleport_terminal_v1_Cluster,
  },
  // RemoveCluster removes a cluster from profile
removeCluster: {
    path: '/teleport.terminal.v1.TerminalService/RemoveCluster',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.RemoveClusterRequest,
    responseType: v1_service_pb.EmptyResponse,
    requestSerialize: serialize_teleport_terminal_v1_RemoveClusterRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_RemoveClusterRequest,
    responseSerialize: serialize_teleport_terminal_v1_EmptyResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_EmptyResponse,
  },
  // ListGateways lists gateways
listGateways: {
    path: '/teleport.terminal.v1.TerminalService/ListGateways',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListGatewaysRequest,
    responseType: v1_service_pb.ListGatewaysResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListGatewaysRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListGatewaysRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListGatewaysResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListGatewaysResponse,
  },
  // CreateGateway creates a gateway
createGateway: {
    path: '/teleport.terminal.v1.TerminalService/CreateGateway',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.CreateGatewayRequest,
    responseType: v1_gateway_pb.Gateway,
    requestSerialize: serialize_teleport_terminal_v1_CreateGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_CreateGatewayRequest,
    responseSerialize: serialize_teleport_terminal_v1_Gateway,
    responseDeserialize: deserialize_teleport_terminal_v1_Gateway,
  },
  // RemoveGateway removes a gateway
removeGateway: {
    path: '/teleport.terminal.v1.TerminalService/RemoveGateway',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.RemoveGatewayRequest,
    responseType: v1_service_pb.EmptyResponse,
    requestSerialize: serialize_teleport_terminal_v1_RemoveGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_RemoveGatewayRequest,
    responseSerialize: serialize_teleport_terminal_v1_EmptyResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_EmptyResponse,
  },
  // RestartGateway stops a gateway and starts a new with identical parameters, keeping the
// original URI. A temporary workaround until it's possible to refresh certs in a running
// database proxy.
restartGateway: {
    path: '/teleport.terminal.v1.TerminalService/RestartGateway',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.RestartGatewayRequest,
    responseType: v1_service_pb.EmptyResponse,
    requestSerialize: serialize_teleport_terminal_v1_RestartGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_RestartGatewayRequest,
    responseSerialize: serialize_teleport_terminal_v1_EmptyResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_EmptyResponse,
  },
  // SetGatewayTargetSubresourceName changes the TargetSubresourceName field of gateway.Gateway
// and returns the updated version of gateway.Gateway.
//
// In Connect this is used to update the db name of a db connection along with the CLI command.
setGatewayTargetSubresourceName: {
    path: '/teleport.terminal.v1.TerminalService/SetGatewayTargetSubresourceName',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.SetGatewayTargetSubresourceNameRequest,
    responseType: v1_gateway_pb.Gateway,
    requestSerialize: serialize_teleport_terminal_v1_SetGatewayTargetSubresourceNameRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_SetGatewayTargetSubresourceNameRequest,
    responseSerialize: serialize_teleport_terminal_v1_Gateway,
    responseDeserialize: deserialize_teleport_terminal_v1_Gateway,
  },
  // SetGatewayLocalPort starts a new gateway on the new port, stops the old gateway and then
// assigns the URI of the old gateway to the new one. It does so without fetching a new db cert.
setGatewayLocalPort: {
    path: '/teleport.terminal.v1.TerminalService/SetGatewayLocalPort',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.SetGatewayLocalPortRequest,
    responseType: v1_gateway_pb.Gateway,
    requestSerialize: serialize_teleport_terminal_v1_SetGatewayLocalPortRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_SetGatewayLocalPortRequest,
    responseSerialize: serialize_teleport_terminal_v1_Gateway,
    responseDeserialize: deserialize_teleport_terminal_v1_Gateway,
  },
  // GetAuthSettings returns cluster auth settigns
getAuthSettings: {
    path: '/teleport.terminal.v1.TerminalService/GetAuthSettings',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.GetAuthSettingsRequest,
    responseType: v1_auth_settings_pb.AuthSettings,
    requestSerialize: serialize_teleport_terminal_v1_GetAuthSettingsRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_GetAuthSettingsRequest,
    responseSerialize: serialize_teleport_terminal_v1_AuthSettings,
    responseDeserialize: deserialize_teleport_terminal_v1_AuthSettings,
  },
  // GetCluster returns a cluster
getCluster: {
    path: '/teleport.terminal.v1.TerminalService/GetCluster',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.GetClusterRequest,
    responseType: v1_cluster_pb.Cluster,
    requestSerialize: serialize_teleport_terminal_v1_GetClusterRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_GetClusterRequest,
    responseSerialize: serialize_teleport_terminal_v1_Cluster,
    responseDeserialize: deserialize_teleport_terminal_v1_Cluster,
  },
  // Login logs in a user to a cluster
login: {
    path: '/teleport.terminal.v1.TerminalService/Login',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.LoginRequest,
    responseType: v1_service_pb.EmptyResponse,
    requestSerialize: serialize_teleport_terminal_v1_LoginRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_LoginRequest,
    responseSerialize: serialize_teleport_terminal_v1_EmptyResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_EmptyResponse,
  },
  // LoginPasswordless logs in a user to a cluster passwordlessly.
//
// The RPC is streaming both ways and the message sequence example for hardware keys are:
// (-> means client-to-server, <- means server-to-client)
//
// Hardware keys:
// -> Init
// <- Send PasswordlessPrompt enum TAP to choose a device
// -> Receive TAP device response
// <- Send PasswordlessPrompt enum PIN
// -> Receive PIN response
// <- Send PasswordlessPrompt enum RETAP to confirm
// -> Receive RETAP device response
// <- Send list of usernames associated with device
// -> Receive the index number associated with the selected username in list
// <- End
loginPasswordless: {
    path: '/teleport.terminal.v1.TerminalService/LoginPasswordless',
    requestStream: true,
    responseStream: true,
    requestType: v1_service_pb.LoginPasswordlessRequest,
    responseType: v1_service_pb.LoginPasswordlessResponse,
    requestSerialize: serialize_teleport_terminal_v1_LoginPasswordlessRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_LoginPasswordlessRequest,
    responseSerialize: serialize_teleport_terminal_v1_LoginPasswordlessResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_LoginPasswordlessResponse,
  },
  // ClusterLogin logs out a user from cluster
logout: {
    path: '/teleport.terminal.v1.TerminalService/Logout',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.LogoutRequest,
    responseType: v1_service_pb.EmptyResponse,
    requestSerialize: serialize_teleport_terminal_v1_LogoutRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_LogoutRequest,
    responseSerialize: serialize_teleport_terminal_v1_EmptyResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_EmptyResponse,
  },
};

exports.TerminalServiceClient = grpc.makeGenericClientConstructor(TerminalServiceService);
