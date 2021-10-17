// package: teleport.terminal.v1
// file: v1/service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as v1_cluster_pb from "../v1/cluster_pb";
import * as v1_auth_challenge_pb from "../v1/auth_challenge_pb";
import * as v1_database_pb from "../v1/database_pb";
import * as v1_gateway_pb from "../v1/gateway_pb";
import * as v1_server_pb from "../v1/server_pb";
import * as v1_auth_settings_pb from "../v1/auth_settings_pb";

export class GetClusterRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetClusterRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetClusterRequest): GetClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetClusterRequest;
    static deserializeBinaryFromReader(message: GetClusterRequest, reader: jspb.BinaryReader): GetClusterRequest;
}

export namespace GetClusterRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class CreateClusterRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): CreateClusterRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateClusterRequest): CreateClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateClusterRequest;
    static deserializeBinaryFromReader(message: CreateClusterRequest, reader: jspb.BinaryReader): CreateClusterRequest;
}

export namespace CreateClusterRequest {
    export type AsObject = {
        name: string,
    }
}

export class ListClustersRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListClustersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListClustersRequest): ListClustersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListClustersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListClustersRequest;
    static deserializeBinaryFromReader(message: ListClustersRequest, reader: jspb.BinaryReader): ListClustersRequest;
}

export namespace ListClustersRequest {
    export type AsObject = {
    }
}

export class ListClustersResponse extends jspb.Message { 
    clearClustersList(): void;
    getClustersList(): Array<v1_cluster_pb.Cluster>;
    setClustersList(value: Array<v1_cluster_pb.Cluster>): ListClustersResponse;
    addClusters(value?: v1_cluster_pb.Cluster, index?: number): v1_cluster_pb.Cluster;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListClustersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListClustersResponse): ListClustersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListClustersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListClustersResponse;
    static deserializeBinaryFromReader(message: ListClustersResponse, reader: jspb.BinaryReader): ListClustersResponse;
}

export namespace ListClustersResponse {
    export type AsObject = {
        clustersList: Array<v1_cluster_pb.Cluster.AsObject>,
    }
}

export class CreateClusterLoginChallengeRequest extends jspb.Message { 
    getClusterId(): string;
    setClusterId(value: string): CreateClusterLoginChallengeRequest;

    getLogin(): string;
    setLogin(value: string): CreateClusterLoginChallengeRequest;

    getPassword(): string;
    setPassword(value: string): CreateClusterLoginChallengeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateClusterLoginChallengeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateClusterLoginChallengeRequest): CreateClusterLoginChallengeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateClusterLoginChallengeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateClusterLoginChallengeRequest;
    static deserializeBinaryFromReader(message: CreateClusterLoginChallengeRequest, reader: jspb.BinaryReader): CreateClusterLoginChallengeRequest;
}

export namespace CreateClusterLoginChallengeRequest {
    export type AsObject = {
        clusterId: string,
        login: string,
        password: string,
    }
}

export class SolveClusterLoginChallengeResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SolveClusterLoginChallengeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SolveClusterLoginChallengeResponse): SolveClusterLoginChallengeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SolveClusterLoginChallengeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SolveClusterLoginChallengeResponse;
    static deserializeBinaryFromReader(message: SolveClusterLoginChallengeResponse, reader: jspb.BinaryReader): SolveClusterLoginChallengeResponse;
}

export namespace SolveClusterLoginChallengeResponse {
    export type AsObject = {
    }
}

export class ListDatabasesRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): ListDatabasesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListDatabasesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListDatabasesRequest): ListDatabasesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListDatabasesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListDatabasesRequest;
    static deserializeBinaryFromReader(message: ListDatabasesRequest, reader: jspb.BinaryReader): ListDatabasesRequest;
}

export namespace ListDatabasesRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class ListDatabasesResponse extends jspb.Message { 
    clearDatabasesList(): void;
    getDatabasesList(): Array<v1_database_pb.Database>;
    setDatabasesList(value: Array<v1_database_pb.Database>): ListDatabasesResponse;
    addDatabases(value?: v1_database_pb.Database, index?: number): v1_database_pb.Database;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListDatabasesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListDatabasesResponse): ListDatabasesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListDatabasesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListDatabasesResponse;
    static deserializeBinaryFromReader(message: ListDatabasesResponse, reader: jspb.BinaryReader): ListDatabasesResponse;
}

export namespace ListDatabasesResponse {
    export type AsObject = {
        databasesList: Array<v1_database_pb.Database.AsObject>,
    }
}

export class CreateGatewayRequest extends jspb.Message { 
    getTargetUri(): string;
    setTargetUri(value: string): CreateGatewayRequest;

    getPort(): string;
    setPort(value: string): CreateGatewayRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateGatewayRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateGatewayRequest): CreateGatewayRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateGatewayRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateGatewayRequest;
    static deserializeBinaryFromReader(message: CreateGatewayRequest, reader: jspb.BinaryReader): CreateGatewayRequest;
}

export namespace CreateGatewayRequest {
    export type AsObject = {
        targetUri: string,
        port: string,
    }
}

export class ListGatewaysRequest extends jspb.Message { 
    clearClusterIdsList(): void;
    getClusterIdsList(): Array<string>;
    setClusterIdsList(value: Array<string>): ListGatewaysRequest;
    addClusterIds(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListGatewaysRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListGatewaysRequest): ListGatewaysRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListGatewaysRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListGatewaysRequest;
    static deserializeBinaryFromReader(message: ListGatewaysRequest, reader: jspb.BinaryReader): ListGatewaysRequest;
}

export namespace ListGatewaysRequest {
    export type AsObject = {
        clusterIdsList: Array<string>,
    }
}

export class ListGatewaysResponse extends jspb.Message { 
    clearGatewaysList(): void;
    getGatewaysList(): Array<v1_gateway_pb.Gateway>;
    setGatewaysList(value: Array<v1_gateway_pb.Gateway>): ListGatewaysResponse;
    addGateways(value?: v1_gateway_pb.Gateway, index?: number): v1_gateway_pb.Gateway;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListGatewaysResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListGatewaysResponse): ListGatewaysResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListGatewaysResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListGatewaysResponse;
    static deserializeBinaryFromReader(message: ListGatewaysResponse, reader: jspb.BinaryReader): ListGatewaysResponse;
}

export namespace ListGatewaysResponse {
    export type AsObject = {
        gatewaysList: Array<v1_gateway_pb.Gateway.AsObject>,
    }
}

export class DeleteGatewayRequest extends jspb.Message { 
    getGatewayUri(): string;
    setGatewayUri(value: string): DeleteGatewayRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteGatewayRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteGatewayRequest): DeleteGatewayRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteGatewayRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteGatewayRequest;
    static deserializeBinaryFromReader(message: DeleteGatewayRequest, reader: jspb.BinaryReader): DeleteGatewayRequest;
}

export namespace DeleteGatewayRequest {
    export type AsObject = {
        gatewayUri: string,
    }
}

export class ListServersRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): ListServersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListServersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListServersRequest): ListServersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListServersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListServersRequest;
    static deserializeBinaryFromReader(message: ListServersRequest, reader: jspb.BinaryReader): ListServersRequest;
}

export namespace ListServersRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class ListServersResponse extends jspb.Message { 
    clearServersList(): void;
    getServersList(): Array<v1_server_pb.Server>;
    setServersList(value: Array<v1_server_pb.Server>): ListServersResponse;
    addServers(value?: v1_server_pb.Server, index?: number): v1_server_pb.Server;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListServersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListServersResponse): ListServersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListServersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListServersResponse;
    static deserializeBinaryFromReader(message: ListServersResponse, reader: jspb.BinaryReader): ListServersResponse;
}

export namespace ListServersResponse {
    export type AsObject = {
        serversList: Array<v1_server_pb.Server.AsObject>,
    }
}

export class GetAuthSettingsRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetAuthSettingsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAuthSettingsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAuthSettingsRequest): GetAuthSettingsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAuthSettingsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAuthSettingsRequest;
    static deserializeBinaryFromReader(message: GetAuthSettingsRequest, reader: jspb.BinaryReader): GetAuthSettingsRequest;
}

export namespace GetAuthSettingsRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class EmptyResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyResponse): EmptyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyResponse;
    static deserializeBinaryFromReader(message: EmptyResponse, reader: jspb.BinaryReader): EmptyResponse;
}

export namespace EmptyResponse {
    export type AsObject = {
    }
}

export class CreateAuthChallengeRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): CreateAuthChallengeRequest;

    getUser(): string;
    setUser(value: string): CreateAuthChallengeRequest;

    getPassword(): string;
    setPassword(value: string): CreateAuthChallengeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAuthChallengeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAuthChallengeRequest): CreateAuthChallengeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAuthChallengeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAuthChallengeRequest;
    static deserializeBinaryFromReader(message: CreateAuthChallengeRequest, reader: jspb.BinaryReader): CreateAuthChallengeRequest;
}

export namespace CreateAuthChallengeRequest {
    export type AsObject = {
        clusterUri: string,
        user: string,
        password: string,
    }
}

export class CreateAuthSSOChallengeRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): CreateAuthSSOChallengeRequest;

    getProviderName(): string;
    setProviderName(value: string): CreateAuthSSOChallengeRequest;

    getProviderType(): string;
    setProviderType(value: string): CreateAuthSSOChallengeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAuthSSOChallengeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAuthSSOChallengeRequest): CreateAuthSSOChallengeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAuthSSOChallengeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAuthSSOChallengeRequest;
    static deserializeBinaryFromReader(message: CreateAuthSSOChallengeRequest, reader: jspb.BinaryReader): CreateAuthSSOChallengeRequest;
}

export namespace CreateAuthSSOChallengeRequest {
    export type AsObject = {
        clusterUri: string,
        providerName: string,
        providerType: string,
    }
}

export class CreateAuthChallengeResponse extends jspb.Message { 

    hasU2f(): boolean;
    clearU2f(): void;
    getU2f(): v1_auth_challenge_pb.ChallengeU2F | undefined;
    setU2f(value?: v1_auth_challenge_pb.ChallengeU2F): CreateAuthChallengeResponse;


    hasOtp(): boolean;
    clearOtp(): void;
    getOtp(): v1_auth_challenge_pb.ChallengeTOTP | undefined;
    setOtp(value?: v1_auth_challenge_pb.ChallengeTOTP): CreateAuthChallengeResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAuthChallengeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAuthChallengeResponse): CreateAuthChallengeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAuthChallengeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAuthChallengeResponse;
    static deserializeBinaryFromReader(message: CreateAuthChallengeResponse, reader: jspb.BinaryReader): CreateAuthChallengeResponse;
}

export namespace CreateAuthChallengeResponse {
    export type AsObject = {
        u2f?: v1_auth_challenge_pb.ChallengeU2F.AsObject,
        otp?: v1_auth_challenge_pb.ChallengeTOTP.AsObject,
    }
}

export class SolveAuthChallengeRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): SolveAuthChallengeRequest;

    getChallengeId(): string;
    setChallengeId(value: string): SolveAuthChallengeRequest;

    getUser(): string;
    setUser(value: string): SolveAuthChallengeRequest;

    getPassword(): string;
    setPassword(value: string): SolveAuthChallengeRequest;


    hasUtf(): boolean;
    clearUtf(): void;
    getUtf(): v1_auth_challenge_pb.SolvedChallengeU2F | undefined;
    setUtf(value?: v1_auth_challenge_pb.SolvedChallengeU2F): SolveAuthChallengeRequest;


    hasTotp(): boolean;
    clearTotp(): void;
    getTotp(): v1_auth_challenge_pb.SolvedChallengeTOTP | undefined;
    setTotp(value?: v1_auth_challenge_pb.SolvedChallengeTOTP): SolveAuthChallengeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SolveAuthChallengeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SolveAuthChallengeRequest): SolveAuthChallengeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SolveAuthChallengeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SolveAuthChallengeRequest;
    static deserializeBinaryFromReader(message: SolveAuthChallengeRequest, reader: jspb.BinaryReader): SolveAuthChallengeRequest;
}

export namespace SolveAuthChallengeRequest {
    export type AsObject = {
        clusterUri: string,
        challengeId: string,
        user: string,
        password: string,
        utf?: v1_auth_challenge_pb.SolvedChallengeU2F.AsObject,
        totp?: v1_auth_challenge_pb.SolvedChallengeTOTP.AsObject,
    }
}

export class SolveAuthChallengeResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SolveAuthChallengeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SolveAuthChallengeResponse): SolveAuthChallengeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SolveAuthChallengeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SolveAuthChallengeResponse;
    static deserializeBinaryFromReader(message: SolveAuthChallengeResponse, reader: jspb.BinaryReader): SolveAuthChallengeResponse;
}

export namespace SolveAuthChallengeResponse {
    export type AsObject = {
    }
}
