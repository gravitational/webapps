// package: teleport.terminal.v1
// file: teleport/terminal/v1/terminal_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as teleport_terminal_v1_terminal_service_pb from "../../../teleport/terminal/v1/terminal_service_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as teleport_terminal_v1_cluster_pb from "../../../teleport/terminal/v1/cluster_pb";
import * as teleport_terminal_v1_cluster_login_challenge_pb from "../../../teleport/terminal/v1/cluster_login_challenge_pb";
import * as teleport_terminal_v1_database_pb from "../../../teleport/terminal/v1/database_pb";
import * as teleport_terminal_v1_gateway_pb from "../../../teleport/terminal/v1/gateway_pb";
import * as teleport_terminal_v1_node_pb from "../../../teleport/terminal/v1/node_pb";

interface ITerminalServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createCluster: ITerminalServiceService_ICreateCluster;
    listClusters: ITerminalServiceService_IListClusters;
    createClusterLoginChallenge: ITerminalServiceService_ICreateClusterLoginChallenge;
    solveClusterLoginChallenge: ITerminalServiceService_ISolveClusterLoginChallenge;
    listDatabases: ITerminalServiceService_IListDatabases;
    createGateway: ITerminalServiceService_ICreateGateway;
    listGateways: ITerminalServiceService_IListGateways;
    deleteGateway: ITerminalServiceService_IDeleteGateway;
    streamGateway: ITerminalServiceService_IStreamGateway;
    listNodes: ITerminalServiceService_IListNodes;
}

interface ITerminalServiceService_ICreateCluster extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, teleport_terminal_v1_cluster_pb.Cluster> {
    path: "/teleport.terminal.v1.TerminalService/CreateCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.CreateClusterRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.CreateClusterRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_cluster_pb.Cluster>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_cluster_pb.Cluster>;
}
interface ITerminalServiceService_IListClusters extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.ListClustersRequest, teleport_terminal_v1_terminal_service_pb.ListClustersResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListClusters";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListClustersRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListClustersRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListClustersResponse>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListClustersResponse>;
}
interface ITerminalServiceService_ICreateClusterLoginChallenge extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge> {
    path: "/teleport.terminal.v1.TerminalService/CreateClusterLoginChallenge";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge>;
}
interface ITerminalServiceService_ISolveClusterLoginChallenge extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse> {
    path: "/teleport.terminal.v1.TerminalService/SolveClusterLoginChallenge";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse>;
}
interface ITerminalServiceService_IListDatabases extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListDatabases";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse>;
}
interface ITerminalServiceService_ICreateGateway extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, teleport_terminal_v1_gateway_pb.Gateway> {
    path: "/teleport.terminal.v1.TerminalService/CreateGateway";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_gateway_pb.Gateway>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_gateway_pb.Gateway>;
}
interface ITerminalServiceService_IListGateways extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListGateways";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse>;
}
interface ITerminalServiceService_IDeleteGateway extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, google_protobuf_empty_pb.Empty> {
    path: "/teleport.terminal.v1.TerminalService/DeleteGateway";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest>;
    responseSerialize: grpc.serialize<google_protobuf_empty_pb.Empty>;
    responseDeserialize: grpc.deserialize<google_protobuf_empty_pb.Empty>;
}
interface ITerminalServiceService_IStreamGateway extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse> {
    path: "/teleport.terminal.v1.TerminalService/StreamGateway";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
}
interface ITerminalServiceService_IListNodes extends grpc.MethodDefinition<teleport_terminal_v1_terminal_service_pb.ListNodesRequest, teleport_terminal_v1_terminal_service_pb.ListNodesResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListNodes";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListNodesRequest>;
    requestDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListNodesRequest>;
    responseSerialize: grpc.serialize<teleport_terminal_v1_terminal_service_pb.ListNodesResponse>;
    responseDeserialize: grpc.deserialize<teleport_terminal_v1_terminal_service_pb.ListNodesResponse>;
}

export const TerminalServiceService: ITerminalServiceService;

export interface ITerminalServiceServer {
    createCluster: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, teleport_terminal_v1_cluster_pb.Cluster>;
    listClusters: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.ListClustersRequest, teleport_terminal_v1_terminal_service_pb.ListClustersResponse>;
    createClusterLoginChallenge: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge>;
    solveClusterLoginChallenge: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse>;
    listDatabases: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse>;
    createGateway: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, teleport_terminal_v1_gateway_pb.Gateway>;
    listGateways: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse>;
    deleteGateway: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, google_protobuf_empty_pb.Empty>;
    streamGateway: grpc.handleBidiStreamingCall<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    listNodes: grpc.handleUnaryCall<teleport_terminal_v1_terminal_service_pb.ListNodesRequest, teleport_terminal_v1_terminal_service_pb.ListNodesResponse>;
}

export interface ITerminalServiceClient {
    createCluster(request: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    createCluster(request: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    createCluster(request: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    listClusters(request: teleport_terminal_v1_terminal_service_pb.ListClustersRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    listClusters(request: teleport_terminal_v1_terminal_service_pb.ListClustersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    listClusters(request: teleport_terminal_v1_terminal_service_pb.ListClustersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    createClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge) => void): grpc.ClientUnaryCall;
    createClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge) => void): grpc.ClientUnaryCall;
    createClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge) => void): grpc.ClientUnaryCall;
    solveClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse) => void): grpc.ClientUnaryCall;
    solveClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse) => void): grpc.ClientUnaryCall;
    solveClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse) => void): grpc.ClientUnaryCall;
    listDatabases(request: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    listDatabases(request: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    listDatabases(request: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    createGateway(request: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    createGateway(request: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    createGateway(request: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    listGateways(request: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    listGateways(request: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    listGateways(request: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    deleteGateway(request: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteGateway(request: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    deleteGateway(request: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    streamGateway(): grpc.ClientDuplexStream<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    streamGateway(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    streamGateway(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    listNodes(request: teleport_terminal_v1_terminal_service_pb.ListNodesRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListNodesResponse) => void): grpc.ClientUnaryCall;
    listNodes(request: teleport_terminal_v1_terminal_service_pb.ListNodesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListNodesResponse) => void): grpc.ClientUnaryCall;
    listNodes(request: teleport_terminal_v1_terminal_service_pb.ListNodesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListNodesResponse) => void): grpc.ClientUnaryCall;
}

export class TerminalServiceClient extends grpc.Client implements ITerminalServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createCluster(request: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public createCluster(request: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public createCluster(request: teleport_terminal_v1_terminal_service_pb.CreateClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public listClusters(request: teleport_terminal_v1_terminal_service_pb.ListClustersRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    public listClusters(request: teleport_terminal_v1_terminal_service_pb.ListClustersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    public listClusters(request: teleport_terminal_v1_terminal_service_pb.ListClustersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    public createClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge) => void): grpc.ClientUnaryCall;
    public createClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge) => void): grpc.ClientUnaryCall;
    public createClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.CreateClusterLoginChallengeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_cluster_login_challenge_pb.ClusterLoginChallenge) => void): grpc.ClientUnaryCall;
    public solveClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse) => void): grpc.ClientUnaryCall;
    public solveClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse) => void): grpc.ClientUnaryCall;
    public solveClusterLoginChallenge(request: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.SolveClusterLoginChallengeResponse) => void): grpc.ClientUnaryCall;
    public listDatabases(request: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    public listDatabases(request: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    public listDatabases(request: teleport_terminal_v1_terminal_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    public createGateway(request: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    public createGateway(request: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    public createGateway(request: teleport_terminal_v1_terminal_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    public listGateways(request: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    public listGateways(request: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    public listGateways(request: teleport_terminal_v1_terminal_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    public deleteGateway(request: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteGateway(request: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public deleteGateway(request: teleport_terminal_v1_terminal_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: google_protobuf_empty_pb.Empty) => void): grpc.ClientUnaryCall;
    public streamGateway(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    public streamGateway(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<teleport_terminal_v1_terminal_service_pb.StreamGatewayRequest, teleport_terminal_v1_terminal_service_pb.StreamGatewayResponse>;
    public listNodes(request: teleport_terminal_v1_terminal_service_pb.ListNodesRequest, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListNodesResponse) => void): grpc.ClientUnaryCall;
    public listNodes(request: teleport_terminal_v1_terminal_service_pb.ListNodesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListNodesResponse) => void): grpc.ClientUnaryCall;
    public listNodes(request: teleport_terminal_v1_terminal_service_pb.ListNodesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: teleport_terminal_v1_terminal_service_pb.ListNodesResponse) => void): grpc.ClientUnaryCall;
}
