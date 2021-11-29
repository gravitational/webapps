// package: teleport.terminal.v1
// file: v1/service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as v1_service_pb from "../v1/service_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as v1_cluster_pb from "../v1/cluster_pb";
import * as v1_database_pb from "../v1/database_pb";
import * as v1_gateway_pb from "../v1/gateway_pb";
import * as v1_server_pb from "../v1/server_pb";
import * as v1_auth_settings_pb from "../v1/auth_settings_pb";

interface ITerminalServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    addCluster: ITerminalServiceService_IAddCluster;
    listClusters: ITerminalServiceService_IListClusters;
    getAuthSettings: ITerminalServiceService_IGetAuthSettings;
    listDatabases: ITerminalServiceService_IListDatabases;
    createGateway: ITerminalServiceService_ICreateGateway;
    listGateways: ITerminalServiceService_IListGateways;
    deleteGateway: ITerminalServiceService_IDeleteGateway;
    listServers: ITerminalServiceService_IListServers;
    getCluster: ITerminalServiceService_IGetCluster;
    login: ITerminalServiceService_ILogin;
}

interface ITerminalServiceService_IAddCluster extends grpc.MethodDefinition<v1_service_pb.AddClusterRequest, v1_cluster_pb.Cluster> {
    path: "/teleport.terminal.v1.TerminalService/AddCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.AddClusterRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.AddClusterRequest>;
    responseSerialize: grpc.serialize<v1_cluster_pb.Cluster>;
    responseDeserialize: grpc.deserialize<v1_cluster_pb.Cluster>;
}
interface ITerminalServiceService_IListClusters extends grpc.MethodDefinition<v1_service_pb.ListClustersRequest, v1_service_pb.ListClustersResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListClusters";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.ListClustersRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.ListClustersRequest>;
    responseSerialize: grpc.serialize<v1_service_pb.ListClustersResponse>;
    responseDeserialize: grpc.deserialize<v1_service_pb.ListClustersResponse>;
}
interface ITerminalServiceService_IGetAuthSettings extends grpc.MethodDefinition<v1_service_pb.GetAuthSettingsRequest, v1_auth_settings_pb.AuthSettings> {
    path: "/teleport.terminal.v1.TerminalService/GetAuthSettings";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.GetAuthSettingsRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.GetAuthSettingsRequest>;
    responseSerialize: grpc.serialize<v1_auth_settings_pb.AuthSettings>;
    responseDeserialize: grpc.deserialize<v1_auth_settings_pb.AuthSettings>;
}
interface ITerminalServiceService_IListDatabases extends grpc.MethodDefinition<v1_service_pb.ListDatabasesRequest, v1_service_pb.ListDatabasesResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListDatabases";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.ListDatabasesRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.ListDatabasesRequest>;
    responseSerialize: grpc.serialize<v1_service_pb.ListDatabasesResponse>;
    responseDeserialize: grpc.deserialize<v1_service_pb.ListDatabasesResponse>;
}
interface ITerminalServiceService_ICreateGateway extends grpc.MethodDefinition<v1_service_pb.CreateGatewayRequest, v1_gateway_pb.Gateway> {
    path: "/teleport.terminal.v1.TerminalService/CreateGateway";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.CreateGatewayRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.CreateGatewayRequest>;
    responseSerialize: grpc.serialize<v1_gateway_pb.Gateway>;
    responseDeserialize: grpc.deserialize<v1_gateway_pb.Gateway>;
}
interface ITerminalServiceService_IListGateways extends grpc.MethodDefinition<v1_service_pb.ListGatewaysRequest, v1_service_pb.ListGatewaysResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListGateways";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.ListGatewaysRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.ListGatewaysRequest>;
    responseSerialize: grpc.serialize<v1_service_pb.ListGatewaysResponse>;
    responseDeserialize: grpc.deserialize<v1_service_pb.ListGatewaysResponse>;
}
interface ITerminalServiceService_IDeleteGateway extends grpc.MethodDefinition<v1_service_pb.DeleteGatewayRequest, v1_service_pb.EmptyResponse> {
    path: "/teleport.terminal.v1.TerminalService/DeleteGateway";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.DeleteGatewayRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.DeleteGatewayRequest>;
    responseSerialize: grpc.serialize<v1_service_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<v1_service_pb.EmptyResponse>;
}
interface ITerminalServiceService_IListServers extends grpc.MethodDefinition<v1_service_pb.ListServersRequest, v1_service_pb.ListServersResponse> {
    path: "/teleport.terminal.v1.TerminalService/ListServers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.ListServersRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.ListServersRequest>;
    responseSerialize: grpc.serialize<v1_service_pb.ListServersResponse>;
    responseDeserialize: grpc.deserialize<v1_service_pb.ListServersResponse>;
}
interface ITerminalServiceService_IGetCluster extends grpc.MethodDefinition<v1_service_pb.GetClusterRequest, v1_cluster_pb.Cluster> {
    path: "/teleport.terminal.v1.TerminalService/GetCluster";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.GetClusterRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.GetClusterRequest>;
    responseSerialize: grpc.serialize<v1_cluster_pb.Cluster>;
    responseDeserialize: grpc.deserialize<v1_cluster_pb.Cluster>;
}
interface ITerminalServiceService_ILogin extends grpc.MethodDefinition<v1_service_pb.LoginRequest, v1_service_pb.EmptyResponse> {
    path: "/teleport.terminal.v1.TerminalService/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_service_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<v1_service_pb.LoginRequest>;
    responseSerialize: grpc.serialize<v1_service_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<v1_service_pb.EmptyResponse>;
}

export const TerminalServiceService: ITerminalServiceService;

export interface ITerminalServiceServer {
    addCluster: grpc.handleUnaryCall<v1_service_pb.AddClusterRequest, v1_cluster_pb.Cluster>;
    listClusters: grpc.handleUnaryCall<v1_service_pb.ListClustersRequest, v1_service_pb.ListClustersResponse>;
    getAuthSettings: grpc.handleUnaryCall<v1_service_pb.GetAuthSettingsRequest, v1_auth_settings_pb.AuthSettings>;
    listDatabases: grpc.handleUnaryCall<v1_service_pb.ListDatabasesRequest, v1_service_pb.ListDatabasesResponse>;
    createGateway: grpc.handleUnaryCall<v1_service_pb.CreateGatewayRequest, v1_gateway_pb.Gateway>;
    listGateways: grpc.handleUnaryCall<v1_service_pb.ListGatewaysRequest, v1_service_pb.ListGatewaysResponse>;
    deleteGateway: grpc.handleUnaryCall<v1_service_pb.DeleteGatewayRequest, v1_service_pb.EmptyResponse>;
    listServers: grpc.handleUnaryCall<v1_service_pb.ListServersRequest, v1_service_pb.ListServersResponse>;
    getCluster: grpc.handleUnaryCall<v1_service_pb.GetClusterRequest, v1_cluster_pb.Cluster>;
    login: grpc.handleUnaryCall<v1_service_pb.LoginRequest, v1_service_pb.EmptyResponse>;
}

export interface ITerminalServiceClient {
    addCluster(request: v1_service_pb.AddClusterRequest, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    addCluster(request: v1_service_pb.AddClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    addCluster(request: v1_service_pb.AddClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    listClusters(request: v1_service_pb.ListClustersRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    listClusters(request: v1_service_pb.ListClustersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    listClusters(request: v1_service_pb.ListClustersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    getAuthSettings(request: v1_service_pb.GetAuthSettingsRequest, callback: (error: grpc.ServiceError | null, response: v1_auth_settings_pb.AuthSettings) => void): grpc.ClientUnaryCall;
    getAuthSettings(request: v1_service_pb.GetAuthSettingsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_auth_settings_pb.AuthSettings) => void): grpc.ClientUnaryCall;
    getAuthSettings(request: v1_service_pb.GetAuthSettingsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_auth_settings_pb.AuthSettings) => void): grpc.ClientUnaryCall;
    listDatabases(request: v1_service_pb.ListDatabasesRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    listDatabases(request: v1_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    listDatabases(request: v1_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    createGateway(request: v1_service_pb.CreateGatewayRequest, callback: (error: grpc.ServiceError | null, response: v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    createGateway(request: v1_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    createGateway(request: v1_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    listGateways(request: v1_service_pb.ListGatewaysRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    listGateways(request: v1_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    listGateways(request: v1_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    deleteGateway(request: v1_service_pb.DeleteGatewayRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    deleteGateway(request: v1_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    deleteGateway(request: v1_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    listServers(request: v1_service_pb.ListServersRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListServersResponse) => void): grpc.ClientUnaryCall;
    listServers(request: v1_service_pb.ListServersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListServersResponse) => void): grpc.ClientUnaryCall;
    listServers(request: v1_service_pb.ListServersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListServersResponse) => void): grpc.ClientUnaryCall;
    getCluster(request: v1_service_pb.GetClusterRequest, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    getCluster(request: v1_service_pb.GetClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    getCluster(request: v1_service_pb.GetClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    login(request: v1_service_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    login(request: v1_service_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    login(request: v1_service_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
}

export class TerminalServiceClient extends grpc.Client implements ITerminalServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public addCluster(request: v1_service_pb.AddClusterRequest, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public addCluster(request: v1_service_pb.AddClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public addCluster(request: v1_service_pb.AddClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public listClusters(request: v1_service_pb.ListClustersRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    public listClusters(request: v1_service_pb.ListClustersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    public listClusters(request: v1_service_pb.ListClustersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListClustersResponse) => void): grpc.ClientUnaryCall;
    public getAuthSettings(request: v1_service_pb.GetAuthSettingsRequest, callback: (error: grpc.ServiceError | null, response: v1_auth_settings_pb.AuthSettings) => void): grpc.ClientUnaryCall;
    public getAuthSettings(request: v1_service_pb.GetAuthSettingsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_auth_settings_pb.AuthSettings) => void): grpc.ClientUnaryCall;
    public getAuthSettings(request: v1_service_pb.GetAuthSettingsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_auth_settings_pb.AuthSettings) => void): grpc.ClientUnaryCall;
    public listDatabases(request: v1_service_pb.ListDatabasesRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    public listDatabases(request: v1_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    public listDatabases(request: v1_service_pb.ListDatabasesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListDatabasesResponse) => void): grpc.ClientUnaryCall;
    public createGateway(request: v1_service_pb.CreateGatewayRequest, callback: (error: grpc.ServiceError | null, response: v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    public createGateway(request: v1_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    public createGateway(request: v1_service_pb.CreateGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_gateway_pb.Gateway) => void): grpc.ClientUnaryCall;
    public listGateways(request: v1_service_pb.ListGatewaysRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    public listGateways(request: v1_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    public listGateways(request: v1_service_pb.ListGatewaysRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListGatewaysResponse) => void): grpc.ClientUnaryCall;
    public deleteGateway(request: v1_service_pb.DeleteGatewayRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public deleteGateway(request: v1_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public deleteGateway(request: v1_service_pb.DeleteGatewayRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public listServers(request: v1_service_pb.ListServersRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListServersResponse) => void): grpc.ClientUnaryCall;
    public listServers(request: v1_service_pb.ListServersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListServersResponse) => void): grpc.ClientUnaryCall;
    public listServers(request: v1_service_pb.ListServersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.ListServersResponse) => void): grpc.ClientUnaryCall;
    public getCluster(request: v1_service_pb.GetClusterRequest, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public getCluster(request: v1_service_pb.GetClusterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public getCluster(request: v1_service_pb.GetClusterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_cluster_pb.Cluster) => void): grpc.ClientUnaryCall;
    public login(request: v1_service_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public login(request: v1_service_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public login(request: v1_service_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_service_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
}
