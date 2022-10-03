// package: teleport.terminal.v1
// file: v1/startup_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as v1_startup_service_pb from "../v1/startup_service_pb";

interface IStartupServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    resolveTshdEventsServerAddress: IStartupServiceService_IResolveTshdEventsServerAddress;
    waitForTshdEventsClient: IStartupServiceService_IWaitForTshdEventsClient;
}

interface IStartupServiceService_IResolveTshdEventsServerAddress extends grpc.MethodDefinition<v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, v1_startup_service_pb.ResolveTshdEventsServerAddressResponse> {
    path: "/teleport.terminal.v1.StartupService/ResolveTshdEventsServerAddress";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_startup_service_pb.ResolveTshdEventsServerAddressRequest>;
    requestDeserialize: grpc.deserialize<v1_startup_service_pb.ResolveTshdEventsServerAddressRequest>;
    responseSerialize: grpc.serialize<v1_startup_service_pb.ResolveTshdEventsServerAddressResponse>;
    responseDeserialize: grpc.deserialize<v1_startup_service_pb.ResolveTshdEventsServerAddressResponse>;
}
interface IStartupServiceService_IWaitForTshdEventsClient extends grpc.MethodDefinition<v1_startup_service_pb.WaitForTshdEventsClientRequest, v1_startup_service_pb.WaitForTshdEventsClientResponse> {
    path: "/teleport.terminal.v1.StartupService/WaitForTshdEventsClient";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<v1_startup_service_pb.WaitForTshdEventsClientRequest>;
    requestDeserialize: grpc.deserialize<v1_startup_service_pb.WaitForTshdEventsClientRequest>;
    responseSerialize: grpc.serialize<v1_startup_service_pb.WaitForTshdEventsClientResponse>;
    responseDeserialize: grpc.deserialize<v1_startup_service_pb.WaitForTshdEventsClientResponse>;
}

export const StartupServiceService: IStartupServiceService;

export interface IStartupServiceServer {
    resolveTshdEventsServerAddress: grpc.handleUnaryCall<v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, v1_startup_service_pb.ResolveTshdEventsServerAddressResponse>;
    waitForTshdEventsClient: grpc.handleUnaryCall<v1_startup_service_pb.WaitForTshdEventsClientRequest, v1_startup_service_pb.WaitForTshdEventsClientResponse>;
}

export interface IStartupServiceClient {
    resolveTshdEventsServerAddress(request: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse) => void): grpc.ClientUnaryCall;
    resolveTshdEventsServerAddress(request: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse) => void): grpc.ClientUnaryCall;
    resolveTshdEventsServerAddress(request: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse) => void): grpc.ClientUnaryCall;
    waitForTshdEventsClient(request: v1_startup_service_pb.WaitForTshdEventsClientRequest, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.WaitForTshdEventsClientResponse) => void): grpc.ClientUnaryCall;
    waitForTshdEventsClient(request: v1_startup_service_pb.WaitForTshdEventsClientRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.WaitForTshdEventsClientResponse) => void): grpc.ClientUnaryCall;
    waitForTshdEventsClient(request: v1_startup_service_pb.WaitForTshdEventsClientRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.WaitForTshdEventsClientResponse) => void): grpc.ClientUnaryCall;
}

export class StartupServiceClient extends grpc.Client implements IStartupServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public resolveTshdEventsServerAddress(request: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse) => void): grpc.ClientUnaryCall;
    public resolveTshdEventsServerAddress(request: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse) => void): grpc.ClientUnaryCall;
    public resolveTshdEventsServerAddress(request: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse) => void): grpc.ClientUnaryCall;
    public waitForTshdEventsClient(request: v1_startup_service_pb.WaitForTshdEventsClientRequest, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.WaitForTshdEventsClientResponse) => void): grpc.ClientUnaryCall;
    public waitForTshdEventsClient(request: v1_startup_service_pb.WaitForTshdEventsClientRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.WaitForTshdEventsClientResponse) => void): grpc.ClientUnaryCall;
    public waitForTshdEventsClient(request: v1_startup_service_pb.WaitForTshdEventsClientRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: v1_startup_service_pb.WaitForTshdEventsClientResponse) => void): grpc.ClientUnaryCall;
}
