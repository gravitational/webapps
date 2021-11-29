// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var v1_service_pb = require('../v1/service_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var v1_cluster_pb = require('../v1/cluster_pb.js');
var v1_database_pb = require('../v1/database_pb.js');
var v1_gateway_pb = require('../v1/gateway_pb.js');
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

function serialize_teleport_terminal_v1_DeleteGatewayRequest(arg) {
  if (!(arg instanceof v1_service_pb.DeleteGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.DeleteGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_DeleteGatewayRequest(buffer_arg) {
  return v1_service_pb.DeleteGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_teleport_terminal_v1_LoginRequest(arg) {
  if (!(arg instanceof v1_service_pb.LoginRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_LoginRequest(buffer_arg) {
  return v1_service_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TerminalServiceService = exports.TerminalServiceService = {
  // AddCluster
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
  // ListClusters
listClusters: {
    path: '/teleport.terminal.v1.TerminalService/ListClusters',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.ListClustersRequest,
    responseType: v1_service_pb.ListClustersResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListClustersRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListClustersRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListClustersResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListClustersResponse,
  },
  // GetAuthSettings
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
  // ListDatabases
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
  // CreateGateway
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
  // ListGateways
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
  // DeleteGateway
deleteGateway: {
    path: '/teleport.terminal.v1.TerminalService/DeleteGateway',
    requestStream: false,
    responseStream: false,
    requestType: v1_service_pb.DeleteGatewayRequest,
    responseType: v1_service_pb.EmptyResponse,
    requestSerialize: serialize_teleport_terminal_v1_DeleteGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_DeleteGatewayRequest,
    responseSerialize: serialize_teleport_terminal_v1_EmptyResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_EmptyResponse,
  },
  // ListServers
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
  // GetCluster
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
  // Login
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
};

exports.TerminalServiceClient = grpc.makeGenericClientConstructor(TerminalServiceService);
