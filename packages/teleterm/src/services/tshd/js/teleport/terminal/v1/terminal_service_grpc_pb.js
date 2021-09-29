// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var teleport_terminal_v1_terminal_service_pb = require('../../../teleport/terminal/v1/terminal_service_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var teleport_terminal_v1_cluster_pb = require('../../../teleport/terminal/v1/cluster_pb.js');
var teleport_terminal_v1_cluster_login_challenge_pb = require('../../../teleport/terminal/v1/cluster_login_challenge_pb.js');
var teleport_terminal_v1_database_pb = require('../../../teleport/terminal/v1/database_pb.js');
var teleport_terminal_v1_gateway_pb = require('../../../teleport/terminal/v1/gateway_pb.js');
var teleport_terminal_v1_node_pb = require('../../../teleport/terminal/v1/node_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_Cluster(arg) {
  if (!(arg instanceof teleport_terminal_v1_cluster_pb.Cluster)) {
    throw new Error('Expected argument of type teleport.terminal.v1.Cluster');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_Cluster(buffer_arg) {
  return teleport_terminal_v1_cluster_pb.Cluster.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ClusterLoginChallenge(arg) {
  if (!(arg instanceof teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ClusterLoginChallenge');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ClusterLoginChallenge(buffer_arg) {
  return teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_CreateClusterLoginChallengeRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.CreateClusterLoginChallengeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_CreateClusterLoginChallengeRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_CreateClusterRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.CreateClusterRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.CreateClusterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_CreateClusterRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.CreateClusterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_CreateGatewayRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.CreateGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_CreateGatewayRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_DeleteGatewayRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.DeleteGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_DeleteGatewayRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_Gateway(arg) {
  if (!(arg instanceof teleport_terminal_v1_gateway_pb.Gateway)) {
    throw new Error('Expected argument of type teleport.terminal.v1.Gateway');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_Gateway(buffer_arg) {
  return teleport_terminal_v1_gateway_pb.Gateway.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListClustersRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListClustersRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListClustersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListClustersRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListClustersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListClustersResponse(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListClustersResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListClustersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListClustersResponse(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListClustersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListDatabasesRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListDatabasesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListDatabasesRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListDatabasesResponse(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListDatabasesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListDatabasesResponse(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListGatewaysRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListGatewaysRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListGatewaysRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListGatewaysResponse(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListGatewaysResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListGatewaysResponse(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListNodesRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListNodesRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListNodesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListNodesRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListNodesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ListNodesResponse(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.ListNodesResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ListNodesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ListNodesResponse(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.ListNodesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_SolveClusterLoginChallengeRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.SolveClusterLoginChallengeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_SolveClusterLoginChallengeRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_SolveClusterLoginChallengeResponse(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.SolveClusterLoginChallengeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_SolveClusterLoginChallengeResponse(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_StreamGatewayRequest(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.StreamGatewayRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_StreamGatewayRequest(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_StreamGatewayResponse(arg) {
  if (!(arg instanceof teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.StreamGatewayResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_StreamGatewayResponse(buffer_arg) {
  return teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Note: following Google API Style guide (mostly)
// https://cloud.google.com/apis/design/.
//
var TerminalServiceService = exports.TerminalServiceService = {
  // POST /clusters
createCluster: {
    path: '/teleport.terminal.v1.TerminalService/CreateCluster',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest,
    responseType: teleport_terminal_v1_cluster_pb.Cluster,
    requestSerialize: serialize_teleport_terminal_v1_CreateClusterRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_CreateClusterRequest,
    responseSerialize: serialize_teleport_terminal_v1_Cluster,
    responseDeserialize: deserialize_teleport_terminal_v1_Cluster,
  },
  // GET /clusters
listClusters: {
    path: '/teleport.terminal.v1.TerminalService/ListClusters',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.ListClustersRequest,
    responseType: teleport_terminal_v1_terminal_service_pb.ListClustersResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListClustersRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListClustersRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListClustersResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListClustersResponse,
  },
  // TODO(codingllama): Names may change!
// POST /clusters/{cluster_id}/loginChallenges
createClusterLoginChallenge: {
    path: '/teleport.terminal.v1.TerminalService/CreateClusterLoginChallenge',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest,
    responseType: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge,
    requestSerialize: serialize_teleport_terminal_v1_CreateClusterLoginChallengeRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_CreateClusterLoginChallengeRequest,
    responseSerialize: serialize_teleport_terminal_v1_ClusterLoginChallenge,
    responseDeserialize: deserialize_teleport_terminal_v1_ClusterLoginChallenge,
  },
  // POST /clusters/{cluster_id}/loginChallenges/{challenge_id}:solve
solveClusterLoginChallenge: {
    path: '/teleport.terminal.v1.TerminalService/SolveClusterLoginChallenge',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest,
    responseType: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse,
    requestSerialize: serialize_teleport_terminal_v1_SolveClusterLoginChallengeRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_SolveClusterLoginChallengeRequest,
    responseSerialize: serialize_teleport_terminal_v1_SolveClusterLoginChallengeResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_SolveClusterLoginChallengeResponse,
  },
  // GET /databases
// Requires login challenge to be solved beforehand.
listDatabases: {
    path: '/teleport.terminal.v1.TerminalService/ListDatabases',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest,
    responseType: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListDatabasesRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListDatabasesRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListDatabasesResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListDatabasesResponse,
  },
  // POST /gateways
createGateway: {
    path: '/teleport.terminal.v1.TerminalService/CreateGateway',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest,
    responseType: teleport_terminal_v1_gateway_pb.Gateway,
    requestSerialize: serialize_teleport_terminal_v1_CreateGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_CreateGatewayRequest,
    responseSerialize: serialize_teleport_terminal_v1_Gateway,
    responseDeserialize: deserialize_teleport_terminal_v1_Gateway,
  },
  // GET /gateways
listGateways: {
    path: '/teleport.terminal.v1.TerminalService/ListGateways',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest,
    responseType: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListGatewaysRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListGatewaysRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListGatewaysResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListGatewaysResponse,
  },
  // DELETE /gateways/{id}
deleteGateway: {
    path: '/teleport.terminal.v1.TerminalService/DeleteGateway',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_teleport_terminal_v1_DeleteGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_DeleteGatewayRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Streams input/output using a gateway.
// Requires the gateway to be created beforehand.
// This has no REST counterpart.
streamGateway: {
    path: '/teleport.terminal.v1.TerminalService/StreamGateway',
    requestStream: true,
    responseStream: true,
    requestType: teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest,
    responseType: teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse,
    requestSerialize: serialize_teleport_terminal_v1_StreamGatewayRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_StreamGatewayRequest,
    responseSerialize: serialize_teleport_terminal_v1_StreamGatewayResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_StreamGatewayResponse,
  },
  // GET /nodes
// Per Teleport nomenclature, a Node is an SSH-capable node.
// Requires login challenge to be solved beforehand.
listNodes: {
    path: '/teleport.terminal.v1.TerminalService/ListNodes',
    requestStream: false,
    responseStream: false,
    requestType: teleport_terminal_v1_terminal_service_pb.ListNodesRequest,
    responseType: teleport_terminal_v1_terminal_service_pb.ListNodesResponse,
    requestSerialize: serialize_teleport_terminal_v1_ListNodesRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ListNodesRequest,
    responseSerialize: serialize_teleport_terminal_v1_ListNodesResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ListNodesResponse,
  },
};

exports.TerminalServiceClient = grpc.makeGenericClientConstructor(TerminalServiceService);
