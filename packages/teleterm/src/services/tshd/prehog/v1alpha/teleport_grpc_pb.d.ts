// package: prehog.v1alpha
// file: prehog/v1alpha/teleport.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as prehog_v1alpha_teleport_pb from "../../prehog/v1alpha/teleport_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface ITeleportReportingServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    submitEvent: ITeleportReportingServiceService_ISubmitEvent;
}

interface ITeleportReportingServiceService_ISubmitEvent extends grpc.MethodDefinition<prehog_v1alpha_teleport_pb.SubmitEventRequest, prehog_v1alpha_teleport_pb.SubmitEventResponse> {
    path: "/prehog.v1alpha.TeleportReportingService/SubmitEvent";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<prehog_v1alpha_teleport_pb.SubmitEventRequest>;
    requestDeserialize: grpc.deserialize<prehog_v1alpha_teleport_pb.SubmitEventRequest>;
    responseSerialize: grpc.serialize<prehog_v1alpha_teleport_pb.SubmitEventResponse>;
    responseDeserialize: grpc.deserialize<prehog_v1alpha_teleport_pb.SubmitEventResponse>;
}

export const TeleportReportingServiceService: ITeleportReportingServiceService;

export interface ITeleportReportingServiceServer {
    submitEvent: grpc.handleUnaryCall<prehog_v1alpha_teleport_pb.SubmitEventRequest, prehog_v1alpha_teleport_pb.SubmitEventResponse>;
}

export interface ITeleportReportingServiceClient {
    submitEvent(request: prehog_v1alpha_teleport_pb.SubmitEventRequest, callback: (error: grpc.ServiceError | null, response: prehog_v1alpha_teleport_pb.SubmitEventResponse) => void): grpc.ClientUnaryCall;
    submitEvent(request: prehog_v1alpha_teleport_pb.SubmitEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: prehog_v1alpha_teleport_pb.SubmitEventResponse) => void): grpc.ClientUnaryCall;
    submitEvent(request: prehog_v1alpha_teleport_pb.SubmitEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: prehog_v1alpha_teleport_pb.SubmitEventResponse) => void): grpc.ClientUnaryCall;
}

export class TeleportReportingServiceClient extends grpc.Client implements ITeleportReportingServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public submitEvent(request: prehog_v1alpha_teleport_pb.SubmitEventRequest, callback: (error: grpc.ServiceError | null, response: prehog_v1alpha_teleport_pb.SubmitEventResponse) => void): grpc.ClientUnaryCall;
    public submitEvent(request: prehog_v1alpha_teleport_pb.SubmitEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: prehog_v1alpha_teleport_pb.SubmitEventResponse) => void): grpc.ClientUnaryCall;
    public submitEvent(request: prehog_v1alpha_teleport_pb.SubmitEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: prehog_v1alpha_teleport_pb.SubmitEventResponse) => void): grpc.ClientUnaryCall;
}
