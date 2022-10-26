// package: teleport.terminal.v1
// file: v1/service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as v1_access_request_pb from "../v1/access_request_pb";
import * as v1_app_pb from "../v1/app_pb";
import * as v1_auth_settings_pb from "../v1/auth_settings_pb";
import * as v1_cluster_pb from "../v1/cluster_pb";
import * as v1_database_pb from "../v1/database_pb";
import * as v1_gateway_pb from "../v1/gateway_pb";
import * as v1_kube_pb from "../v1/kube_pb";
import * as v1_server_pb from "../v1/server_pb";

export class RemoveClusterRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): RemoveClusterRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveClusterRequest): RemoveClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveClusterRequest;
    static deserializeBinaryFromReader(message: RemoveClusterRequest, reader: jspb.BinaryReader): RemoveClusterRequest;
}

export namespace RemoveClusterRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

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

export class LogoutRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): LogoutRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogoutRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LogoutRequest): LogoutRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogoutRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogoutRequest;
    static deserializeBinaryFromReader(message: LogoutRequest, reader: jspb.BinaryReader): LogoutRequest;
}

export namespace LogoutRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetAccessRequestRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetAccessRequestRequest;

    getAccessRequestId(): string;
    setAccessRequestId(value: string): GetAccessRequestRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccessRequestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccessRequestRequest): GetAccessRequestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccessRequestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccessRequestRequest;
    static deserializeBinaryFromReader(message: GetAccessRequestRequest, reader: jspb.BinaryReader): GetAccessRequestRequest;
}

export namespace GetAccessRequestRequest {
    export type AsObject = {
        clusterUri: string,
        accessRequestId: string,
    }
}

export class GetAccessRequestsRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetAccessRequestsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccessRequestsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccessRequestsRequest): GetAccessRequestsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccessRequestsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccessRequestsRequest;
    static deserializeBinaryFromReader(message: GetAccessRequestsRequest, reader: jspb.BinaryReader): GetAccessRequestsRequest;
}

export namespace GetAccessRequestsRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetAccessRequestResponse extends jspb.Message { 

    hasRequest(): boolean;
    clearRequest(): void;
    getRequest(): v1_access_request_pb.AccessRequest | undefined;
    setRequest(value?: v1_access_request_pb.AccessRequest): GetAccessRequestResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccessRequestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccessRequestResponse): GetAccessRequestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccessRequestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccessRequestResponse;
    static deserializeBinaryFromReader(message: GetAccessRequestResponse, reader: jspb.BinaryReader): GetAccessRequestResponse;
}

export namespace GetAccessRequestResponse {
    export type AsObject = {
        request?: v1_access_request_pb.AccessRequest.AsObject,
    }
}

export class GetAccessRequestsResponse extends jspb.Message { 
    clearRequestsList(): void;
    getRequestsList(): Array<v1_access_request_pb.AccessRequest>;
    setRequestsList(value: Array<v1_access_request_pb.AccessRequest>): GetAccessRequestsResponse;
    addRequests(value?: v1_access_request_pb.AccessRequest, index?: number): v1_access_request_pb.AccessRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccessRequestsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccessRequestsResponse): GetAccessRequestsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccessRequestsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccessRequestsResponse;
    static deserializeBinaryFromReader(message: GetAccessRequestsResponse, reader: jspb.BinaryReader): GetAccessRequestsResponse;
}

export namespace GetAccessRequestsResponse {
    export type AsObject = {
        requestsList: Array<v1_access_request_pb.AccessRequest.AsObject>,
    }
}

export class DeleteAccessRequestRequest extends jspb.Message { 
    getRootClusterUri(): string;
    setRootClusterUri(value: string): DeleteAccessRequestRequest;

    getAccessRequestId(): string;
    setAccessRequestId(value: string): DeleteAccessRequestRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteAccessRequestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteAccessRequestRequest): DeleteAccessRequestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteAccessRequestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteAccessRequestRequest;
    static deserializeBinaryFromReader(message: DeleteAccessRequestRequest, reader: jspb.BinaryReader): DeleteAccessRequestRequest;
}

export namespace DeleteAccessRequestRequest {
    export type AsObject = {
        rootClusterUri: string,
        accessRequestId: string,
    }
}

export class CreateAccessRequestRequest extends jspb.Message { 
    getRootClusterUri(): string;
    setRootClusterUri(value: string): CreateAccessRequestRequest;

    getReason(): string;
    setReason(value: string): CreateAccessRequestRequest;

    clearRolesList(): void;
    getRolesList(): Array<string>;
    setRolesList(value: Array<string>): CreateAccessRequestRequest;
    addRoles(value: string, index?: number): string;

    clearSuggestedReviewersList(): void;
    getSuggestedReviewersList(): Array<string>;
    setSuggestedReviewersList(value: Array<string>): CreateAccessRequestRequest;
    addSuggestedReviewers(value: string, index?: number): string;

    clearResourceIdsList(): void;
    getResourceIdsList(): Array<v1_access_request_pb.ResourceID>;
    setResourceIdsList(value: Array<v1_access_request_pb.ResourceID>): CreateAccessRequestRequest;
    addResourceIds(value?: v1_access_request_pb.ResourceID, index?: number): v1_access_request_pb.ResourceID;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAccessRequestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAccessRequestRequest): CreateAccessRequestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAccessRequestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAccessRequestRequest;
    static deserializeBinaryFromReader(message: CreateAccessRequestRequest, reader: jspb.BinaryReader): CreateAccessRequestRequest;
}

export namespace CreateAccessRequestRequest {
    export type AsObject = {
        rootClusterUri: string,
        reason: string,
        rolesList: Array<string>,
        suggestedReviewersList: Array<string>,
        resourceIdsList: Array<v1_access_request_pb.ResourceID.AsObject>,
    }
}

export class CreateAccessRequestResponse extends jspb.Message { 

    hasRequest(): boolean;
    clearRequest(): void;
    getRequest(): v1_access_request_pb.AccessRequest | undefined;
    setRequest(value?: v1_access_request_pb.AccessRequest): CreateAccessRequestResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAccessRequestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAccessRequestResponse): CreateAccessRequestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAccessRequestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAccessRequestResponse;
    static deserializeBinaryFromReader(message: CreateAccessRequestResponse, reader: jspb.BinaryReader): CreateAccessRequestResponse;
}

export namespace CreateAccessRequestResponse {
    export type AsObject = {
        request?: v1_access_request_pb.AccessRequest.AsObject,
    }
}

export class AssumeRoleRequest extends jspb.Message { 
    getRootClusterUri(): string;
    setRootClusterUri(value: string): AssumeRoleRequest;

    clearAccessRequestIdsList(): void;
    getAccessRequestIdsList(): Array<string>;
    setAccessRequestIdsList(value: Array<string>): AssumeRoleRequest;
    addAccessRequestIds(value: string, index?: number): string;

    clearDropRequestIdsList(): void;
    getDropRequestIdsList(): Array<string>;
    setDropRequestIdsList(value: Array<string>): AssumeRoleRequest;
    addDropRequestIds(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssumeRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AssumeRoleRequest): AssumeRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssumeRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssumeRoleRequest;
    static deserializeBinaryFromReader(message: AssumeRoleRequest, reader: jspb.BinaryReader): AssumeRoleRequest;
}

export namespace AssumeRoleRequest {
    export type AsObject = {
        rootClusterUri: string,
        accessRequestIdsList: Array<string>,
        dropRequestIdsList: Array<string>,
    }
}

export class GetRequestableRolesRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetRequestableRolesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRequestableRolesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRequestableRolesRequest): GetRequestableRolesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRequestableRolesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRequestableRolesRequest;
    static deserializeBinaryFromReader(message: GetRequestableRolesRequest, reader: jspb.BinaryReader): GetRequestableRolesRequest;
}

export namespace GetRequestableRolesRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetRequestableRolesResponse extends jspb.Message { 
    clearRolesList(): void;
    getRolesList(): Array<string>;
    setRolesList(value: Array<string>): GetRequestableRolesResponse;
    addRoles(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRequestableRolesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRequestableRolesResponse): GetRequestableRolesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRequestableRolesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRequestableRolesResponse;
    static deserializeBinaryFromReader(message: GetRequestableRolesResponse, reader: jspb.BinaryReader): GetRequestableRolesResponse;
}

export namespace GetRequestableRolesResponse {
    export type AsObject = {
        rolesList: Array<string>,
    }
}

export class ReviewAccessRequestRequest extends jspb.Message { 
    getRootClusterUri(): string;
    setRootClusterUri(value: string): ReviewAccessRequestRequest;

    getState(): string;
    setState(value: string): ReviewAccessRequestRequest;

    getReason(): string;
    setReason(value: string): ReviewAccessRequestRequest;

    clearRolesList(): void;
    getRolesList(): Array<string>;
    setRolesList(value: Array<string>): ReviewAccessRequestRequest;
    addRoles(value: string, index?: number): string;

    getAccessRequestId(): string;
    setAccessRequestId(value: string): ReviewAccessRequestRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReviewAccessRequestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReviewAccessRequestRequest): ReviewAccessRequestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReviewAccessRequestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReviewAccessRequestRequest;
    static deserializeBinaryFromReader(message: ReviewAccessRequestRequest, reader: jspb.BinaryReader): ReviewAccessRequestRequest;
}

export namespace ReviewAccessRequestRequest {
    export type AsObject = {
        rootClusterUri: string,
        state: string,
        reason: string,
        rolesList: Array<string>,
        accessRequestId: string,
    }
}

export class ReviewAccessRequestResponse extends jspb.Message { 

    hasRequest(): boolean;
    clearRequest(): void;
    getRequest(): v1_access_request_pb.AccessRequest | undefined;
    setRequest(value?: v1_access_request_pb.AccessRequest): ReviewAccessRequestResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReviewAccessRequestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReviewAccessRequestResponse): ReviewAccessRequestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReviewAccessRequestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReviewAccessRequestResponse;
    static deserializeBinaryFromReader(message: ReviewAccessRequestResponse, reader: jspb.BinaryReader): ReviewAccessRequestResponse;
}

export namespace ReviewAccessRequestResponse {
    export type AsObject = {
        request?: v1_access_request_pb.AccessRequest.AsObject,
    }
}

export class CredentialInfo extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): CredentialInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CredentialInfo.AsObject;
    static toObject(includeInstance: boolean, msg: CredentialInfo): CredentialInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CredentialInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CredentialInfo;
    static deserializeBinaryFromReader(message: CredentialInfo, reader: jspb.BinaryReader): CredentialInfo;
}

export namespace CredentialInfo {
    export type AsObject = {
        username: string,
    }
}

export class LoginPasswordlessResponse extends jspb.Message { 
    getPrompt(): PasswordlessPrompt;
    setPrompt(value: PasswordlessPrompt): LoginPasswordlessResponse;

    clearCredentialsList(): void;
    getCredentialsList(): Array<CredentialInfo>;
    setCredentialsList(value: Array<CredentialInfo>): LoginPasswordlessResponse;
    addCredentials(value?: CredentialInfo, index?: number): CredentialInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginPasswordlessResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginPasswordlessResponse): LoginPasswordlessResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginPasswordlessResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginPasswordlessResponse;
    static deserializeBinaryFromReader(message: LoginPasswordlessResponse, reader: jspb.BinaryReader): LoginPasswordlessResponse;
}

export namespace LoginPasswordlessResponse {
    export type AsObject = {
        prompt: PasswordlessPrompt,
        credentialsList: Array<CredentialInfo.AsObject>,
    }
}

export class LoginPasswordlessRequest extends jspb.Message { 

    hasInit(): boolean;
    clearInit(): void;
    getInit(): LoginPasswordlessRequest.LoginPasswordlessRequestInit | undefined;
    setInit(value?: LoginPasswordlessRequest.LoginPasswordlessRequestInit): LoginPasswordlessRequest;


    hasPin(): boolean;
    clearPin(): void;
    getPin(): LoginPasswordlessRequest.LoginPasswordlessPINResponse | undefined;
    setPin(value?: LoginPasswordlessRequest.LoginPasswordlessPINResponse): LoginPasswordlessRequest;


    hasCredential(): boolean;
    clearCredential(): void;
    getCredential(): LoginPasswordlessRequest.LoginPasswordlessCredentialResponse | undefined;
    setCredential(value?: LoginPasswordlessRequest.LoginPasswordlessCredentialResponse): LoginPasswordlessRequest;


    getRequestCase(): LoginPasswordlessRequest.RequestCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginPasswordlessRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginPasswordlessRequest): LoginPasswordlessRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginPasswordlessRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginPasswordlessRequest;
    static deserializeBinaryFromReader(message: LoginPasswordlessRequest, reader: jspb.BinaryReader): LoginPasswordlessRequest;
}

export namespace LoginPasswordlessRequest {
    export type AsObject = {
        init?: LoginPasswordlessRequest.LoginPasswordlessRequestInit.AsObject,
        pin?: LoginPasswordlessRequest.LoginPasswordlessPINResponse.AsObject,
        credential?: LoginPasswordlessRequest.LoginPasswordlessCredentialResponse.AsObject,
    }


    export class LoginPasswordlessRequestInit extends jspb.Message { 
        getClusterUri(): string;
        setClusterUri(value: string): LoginPasswordlessRequestInit;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): LoginPasswordlessRequestInit.AsObject;
        static toObject(includeInstance: boolean, msg: LoginPasswordlessRequestInit): LoginPasswordlessRequestInit.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: LoginPasswordlessRequestInit, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): LoginPasswordlessRequestInit;
        static deserializeBinaryFromReader(message: LoginPasswordlessRequestInit, reader: jspb.BinaryReader): LoginPasswordlessRequestInit;
    }

    export namespace LoginPasswordlessRequestInit {
        export type AsObject = {
            clusterUri: string,
        }
    }

    export class LoginPasswordlessPINResponse extends jspb.Message { 
        getPin(): string;
        setPin(value: string): LoginPasswordlessPINResponse;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): LoginPasswordlessPINResponse.AsObject;
        static toObject(includeInstance: boolean, msg: LoginPasswordlessPINResponse): LoginPasswordlessPINResponse.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: LoginPasswordlessPINResponse, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): LoginPasswordlessPINResponse;
        static deserializeBinaryFromReader(message: LoginPasswordlessPINResponse, reader: jspb.BinaryReader): LoginPasswordlessPINResponse;
    }

    export namespace LoginPasswordlessPINResponse {
        export type AsObject = {
            pin: string,
        }
    }

    export class LoginPasswordlessCredentialResponse extends jspb.Message { 
        getIndex(): number;
        setIndex(value: number): LoginPasswordlessCredentialResponse;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): LoginPasswordlessCredentialResponse.AsObject;
        static toObject(includeInstance: boolean, msg: LoginPasswordlessCredentialResponse): LoginPasswordlessCredentialResponse.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: LoginPasswordlessCredentialResponse, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): LoginPasswordlessCredentialResponse;
        static deserializeBinaryFromReader(message: LoginPasswordlessCredentialResponse, reader: jspb.BinaryReader): LoginPasswordlessCredentialResponse;
    }

    export namespace LoginPasswordlessCredentialResponse {
        export type AsObject = {
            index: number,
        }
    }


    export enum RequestCase {
        REQUEST_NOT_SET = 0,
    
    INIT = 1,

    PIN = 2,

    CREDENTIAL = 3,

    }

}

export class FileTransferRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): FileTransferRequest;

    getLogin(): string;
    setLogin(value: string): FileTransferRequest;

    getHostname(): string;
    setHostname(value: string): FileTransferRequest;

    getSource(): string;
    setSource(value: string): FileTransferRequest;

    getDestination(): string;
    setDestination(value: string): FileTransferRequest;

    getDirection(): FileTransferDirection;
    setDirection(value: FileTransferDirection): FileTransferRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileTransferRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FileTransferRequest): FileTransferRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileTransferRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileTransferRequest;
    static deserializeBinaryFromReader(message: FileTransferRequest, reader: jspb.BinaryReader): FileTransferRequest;
}

export namespace FileTransferRequest {
    export type AsObject = {
        clusterUri: string,
        login: string,
        hostname: string,
        source: string,
        destination: string,
        direction: FileTransferDirection,
    }
}

export class FileTransferProgress extends jspb.Message { 
    getPercentage(): number;
    setPercentage(value: number): FileTransferProgress;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileTransferProgress.AsObject;
    static toObject(includeInstance: boolean, msg: FileTransferProgress): FileTransferProgress.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileTransferProgress, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileTransferProgress;
    static deserializeBinaryFromReader(message: FileTransferProgress, reader: jspb.BinaryReader): FileTransferProgress;
}

export namespace FileTransferProgress {
    export type AsObject = {
        percentage: number,
    }
}

export class LoginRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): LoginRequest;


    hasLocal(): boolean;
    clearLocal(): void;
    getLocal(): LoginRequest.LocalParams | undefined;
    setLocal(value?: LoginRequest.LocalParams): LoginRequest;


    hasSso(): boolean;
    clearSso(): void;
    getSso(): LoginRequest.SsoParams | undefined;
    setSso(value?: LoginRequest.SsoParams): LoginRequest;


    getParamsCase(): LoginRequest.ParamsCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        clusterUri: string,
        local?: LoginRequest.LocalParams.AsObject,
        sso?: LoginRequest.SsoParams.AsObject,
    }


    export class LocalParams extends jspb.Message { 
        getUser(): string;
        setUser(value: string): LocalParams;

        getPassword(): string;
        setPassword(value: string): LocalParams;

        getToken(): string;
        setToken(value: string): LocalParams;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): LocalParams.AsObject;
        static toObject(includeInstance: boolean, msg: LocalParams): LocalParams.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: LocalParams, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): LocalParams;
        static deserializeBinaryFromReader(message: LocalParams, reader: jspb.BinaryReader): LocalParams;
    }

    export namespace LocalParams {
        export type AsObject = {
            user: string,
            password: string,
            token: string,
        }
    }

    export class SsoParams extends jspb.Message { 
        getProviderType(): string;
        setProviderType(value: string): SsoParams;

        getProviderName(): string;
        setProviderName(value: string): SsoParams;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): SsoParams.AsObject;
        static toObject(includeInstance: boolean, msg: SsoParams): SsoParams.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: SsoParams, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): SsoParams;
        static deserializeBinaryFromReader(message: SsoParams, reader: jspb.BinaryReader): SsoParams;
    }

    export namespace SsoParams {
        export type AsObject = {
            providerType: string,
            providerName: string,
        }
    }


    export enum ParamsCase {
        PARAMS_NOT_SET = 0,
    
    LOCAL = 2,

    SSO = 3,

    }

}

export class AddClusterRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): AddClusterRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddClusterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddClusterRequest): AddClusterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddClusterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddClusterRequest;
    static deserializeBinaryFromReader(message: AddClusterRequest, reader: jspb.BinaryReader): AddClusterRequest;
}

export namespace AddClusterRequest {
    export type AsObject = {
        name: string,
    }
}

export class ListAppsRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): ListAppsRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListAppsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListAppsRequest): ListAppsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListAppsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListAppsRequest;
    static deserializeBinaryFromReader(message: ListAppsRequest, reader: jspb.BinaryReader): ListAppsRequest;
}

export namespace ListAppsRequest {
    export type AsObject = {
        clusterUri: string,
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

export class GetAllDatabasesRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetAllDatabasesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllDatabasesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllDatabasesRequest): GetAllDatabasesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllDatabasesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllDatabasesRequest;
    static deserializeBinaryFromReader(message: GetAllDatabasesRequest, reader: jspb.BinaryReader): GetAllDatabasesRequest;
}

export namespace GetAllDatabasesRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetDatabasesRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetDatabasesRequest;

    getLimit(): number;
    setLimit(value: number): GetDatabasesRequest;

    getStartKey(): string;
    setStartKey(value: string): GetDatabasesRequest;

    getSearch(): string;
    setSearch(value: string): GetDatabasesRequest;

    getQuery(): string;
    setQuery(value: string): GetDatabasesRequest;

    getSortBy(): string;
    setSortBy(value: string): GetDatabasesRequest;

    getSearchAsRoles(): string;
    setSearchAsRoles(value: string): GetDatabasesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetDatabasesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetDatabasesRequest): GetDatabasesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetDatabasesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetDatabasesRequest;
    static deserializeBinaryFromReader(message: GetDatabasesRequest, reader: jspb.BinaryReader): GetDatabasesRequest;
}

export namespace GetDatabasesRequest {
    export type AsObject = {
        clusterUri: string,
        limit: number,
        startKey: string,
        search: string,
        query: string,
        sortBy: string,
        searchAsRoles: string,
    }
}

export class ListLeafClustersRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): ListLeafClustersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListLeafClustersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListLeafClustersRequest): ListLeafClustersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListLeafClustersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListLeafClustersRequest;
    static deserializeBinaryFromReader(message: ListLeafClustersRequest, reader: jspb.BinaryReader): ListLeafClustersRequest;
}

export namespace ListLeafClustersRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetAllDatabasesResponse extends jspb.Message { 
    clearDatabasesList(): void;
    getDatabasesList(): Array<v1_database_pb.Database>;
    setDatabasesList(value: Array<v1_database_pb.Database>): GetAllDatabasesResponse;
    addDatabases(value?: v1_database_pb.Database, index?: number): v1_database_pb.Database;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllDatabasesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllDatabasesResponse): GetAllDatabasesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllDatabasesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllDatabasesResponse;
    static deserializeBinaryFromReader(message: GetAllDatabasesResponse, reader: jspb.BinaryReader): GetAllDatabasesResponse;
}

export namespace GetAllDatabasesResponse {
    export type AsObject = {
        databasesList: Array<v1_database_pb.Database.AsObject>,
    }
}

export class ListDatabaseUsersRequest extends jspb.Message { 
    getDbUri(): string;
    setDbUri(value: string): ListDatabaseUsersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListDatabaseUsersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListDatabaseUsersRequest): ListDatabaseUsersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListDatabaseUsersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListDatabaseUsersRequest;
    static deserializeBinaryFromReader(message: ListDatabaseUsersRequest, reader: jspb.BinaryReader): ListDatabaseUsersRequest;
}

export namespace ListDatabaseUsersRequest {
    export type AsObject = {
        dbUri: string,
    }
}

export class ListDatabaseUsersResponse extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<string>;
    setUsersList(value: Array<string>): ListDatabaseUsersResponse;
    addUsers(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListDatabaseUsersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListDatabaseUsersResponse): ListDatabaseUsersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListDatabaseUsersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListDatabaseUsersResponse;
    static deserializeBinaryFromReader(message: ListDatabaseUsersResponse, reader: jspb.BinaryReader): ListDatabaseUsersResponse;
}

export namespace ListDatabaseUsersResponse {
    export type AsObject = {
        usersList: Array<string>,
    }
}

export class CreateGatewayRequest extends jspb.Message { 
    getTargetUri(): string;
    setTargetUri(value: string): CreateGatewayRequest;

    getTargetUser(): string;
    setTargetUser(value: string): CreateGatewayRequest;

    getLocalPort(): string;
    setLocalPort(value: string): CreateGatewayRequest;

    getTargetSubresourceName(): string;
    setTargetSubresourceName(value: string): CreateGatewayRequest;


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
        targetUser: string,
        localPort: string,
        targetSubresourceName: string,
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

export class RemoveGatewayRequest extends jspb.Message { 
    getGatewayUri(): string;
    setGatewayUri(value: string): RemoveGatewayRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveGatewayRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveGatewayRequest): RemoveGatewayRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveGatewayRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveGatewayRequest;
    static deserializeBinaryFromReader(message: RemoveGatewayRequest, reader: jspb.BinaryReader): RemoveGatewayRequest;
}

export namespace RemoveGatewayRequest {
    export type AsObject = {
        gatewayUri: string,
    }
}

export class RestartGatewayRequest extends jspb.Message { 
    getGatewayUri(): string;
    setGatewayUri(value: string): RestartGatewayRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RestartGatewayRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RestartGatewayRequest): RestartGatewayRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RestartGatewayRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RestartGatewayRequest;
    static deserializeBinaryFromReader(message: RestartGatewayRequest, reader: jspb.BinaryReader): RestartGatewayRequest;
}

export namespace RestartGatewayRequest {
    export type AsObject = {
        gatewayUri: string,
    }
}

export class SetGatewayTargetSubresourceNameRequest extends jspb.Message { 
    getGatewayUri(): string;
    setGatewayUri(value: string): SetGatewayTargetSubresourceNameRequest;

    getTargetSubresourceName(): string;
    setTargetSubresourceName(value: string): SetGatewayTargetSubresourceNameRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetGatewayTargetSubresourceNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetGatewayTargetSubresourceNameRequest): SetGatewayTargetSubresourceNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetGatewayTargetSubresourceNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetGatewayTargetSubresourceNameRequest;
    static deserializeBinaryFromReader(message: SetGatewayTargetSubresourceNameRequest, reader: jspb.BinaryReader): SetGatewayTargetSubresourceNameRequest;
}

export namespace SetGatewayTargetSubresourceNameRequest {
    export type AsObject = {
        gatewayUri: string,
        targetSubresourceName: string,
    }
}

export class SetGatewayLocalPortRequest extends jspb.Message { 
    getGatewayUri(): string;
    setGatewayUri(value: string): SetGatewayLocalPortRequest;

    getLocalPort(): string;
    setLocalPort(value: string): SetGatewayLocalPortRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetGatewayLocalPortRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetGatewayLocalPortRequest): SetGatewayLocalPortRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetGatewayLocalPortRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetGatewayLocalPortRequest;
    static deserializeBinaryFromReader(message: SetGatewayLocalPortRequest, reader: jspb.BinaryReader): SetGatewayLocalPortRequest;
}

export namespace SetGatewayLocalPortRequest {
    export type AsObject = {
        gatewayUri: string,
        localPort: string,
    }
}

export class GetAllServersRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetAllServersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllServersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllServersRequest): GetAllServersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllServersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllServersRequest;
    static deserializeBinaryFromReader(message: GetAllServersRequest, reader: jspb.BinaryReader): GetAllServersRequest;
}

export namespace GetAllServersRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetAllServersResponse extends jspb.Message { 
    clearServersList(): void;
    getServersList(): Array<v1_server_pb.Server>;
    setServersList(value: Array<v1_server_pb.Server>): GetAllServersResponse;
    addServers(value?: v1_server_pb.Server, index?: number): v1_server_pb.Server;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllServersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllServersResponse): GetAllServersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllServersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllServersResponse;
    static deserializeBinaryFromReader(message: GetAllServersResponse, reader: jspb.BinaryReader): GetAllServersResponse;
}

export namespace GetAllServersResponse {
    export type AsObject = {
        serversList: Array<v1_server_pb.Server.AsObject>,
    }
}

export class GetServersRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetServersRequest;

    getLimit(): number;
    setLimit(value: number): GetServersRequest;

    getStartKey(): string;
    setStartKey(value: string): GetServersRequest;

    getSearch(): string;
    setSearch(value: string): GetServersRequest;

    getQuery(): string;
    setQuery(value: string): GetServersRequest;

    getSortBy(): string;
    setSortBy(value: string): GetServersRequest;

    getSearchAsRoles(): string;
    setSearchAsRoles(value: string): GetServersRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetServersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetServersRequest): GetServersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetServersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetServersRequest;
    static deserializeBinaryFromReader(message: GetServersRequest, reader: jspb.BinaryReader): GetServersRequest;
}

export namespace GetServersRequest {
    export type AsObject = {
        clusterUri: string,
        limit: number,
        startKey: string,
        search: string,
        query: string,
        sortBy: string,
        searchAsRoles: string,
    }
}

export class GetServersResponse extends jspb.Message { 
    clearAgentsList(): void;
    getAgentsList(): Array<v1_server_pb.Server>;
    setAgentsList(value: Array<v1_server_pb.Server>): GetServersResponse;
    addAgents(value?: v1_server_pb.Server, index?: number): v1_server_pb.Server;

    getTotalCount(): number;
    setTotalCount(value: number): GetServersResponse;

    getStartKey(): string;
    setStartKey(value: string): GetServersResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetServersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetServersResponse): GetServersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetServersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetServersResponse;
    static deserializeBinaryFromReader(message: GetServersResponse, reader: jspb.BinaryReader): GetServersResponse;
}

export namespace GetServersResponse {
    export type AsObject = {
        agentsList: Array<v1_server_pb.Server.AsObject>,
        totalCount: number,
        startKey: string,
    }
}

export class GetDatabasesResponse extends jspb.Message { 
    clearAgentsList(): void;
    getAgentsList(): Array<v1_database_pb.Database>;
    setAgentsList(value: Array<v1_database_pb.Database>): GetDatabasesResponse;
    addAgents(value?: v1_database_pb.Database, index?: number): v1_database_pb.Database;

    getTotalCount(): number;
    setTotalCount(value: number): GetDatabasesResponse;

    getStartKey(): string;
    setStartKey(value: string): GetDatabasesResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetDatabasesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetDatabasesResponse): GetDatabasesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetDatabasesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetDatabasesResponse;
    static deserializeBinaryFromReader(message: GetDatabasesResponse, reader: jspb.BinaryReader): GetDatabasesResponse;
}

export namespace GetDatabasesResponse {
    export type AsObject = {
        agentsList: Array<v1_database_pb.Database.AsObject>,
        totalCount: number,
        startKey: string,
    }
}

export class GetAllKubesRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetAllKubesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllKubesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllKubesRequest): GetAllKubesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllKubesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllKubesRequest;
    static deserializeBinaryFromReader(message: GetAllKubesRequest, reader: jspb.BinaryReader): GetAllKubesRequest;
}

export namespace GetAllKubesRequest {
    export type AsObject = {
        clusterUri: string,
    }
}

export class GetAllKubesResponse extends jspb.Message { 
    clearKubesList(): void;
    getKubesList(): Array<v1_kube_pb.Kube>;
    setKubesList(value: Array<v1_kube_pb.Kube>): GetAllKubesResponse;
    addKubes(value?: v1_kube_pb.Kube, index?: number): v1_kube_pb.Kube;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllKubesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAllKubesResponse): GetAllKubesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAllKubesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAllKubesResponse;
    static deserializeBinaryFromReader(message: GetAllKubesResponse, reader: jspb.BinaryReader): GetAllKubesResponse;
}

export namespace GetAllKubesResponse {
    export type AsObject = {
        kubesList: Array<v1_kube_pb.Kube.AsObject>,
    }
}

export class GetKubesRequest extends jspb.Message { 
    getClusterUri(): string;
    setClusterUri(value: string): GetKubesRequest;

    getLimit(): number;
    setLimit(value: number): GetKubesRequest;

    getStartKey(): string;
    setStartKey(value: string): GetKubesRequest;

    getSearch(): string;
    setSearch(value: string): GetKubesRequest;

    getQuery(): string;
    setQuery(value: string): GetKubesRequest;

    getSortBy(): string;
    setSortBy(value: string): GetKubesRequest;

    getSearchAsRoles(): string;
    setSearchAsRoles(value: string): GetKubesRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetKubesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetKubesRequest): GetKubesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetKubesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetKubesRequest;
    static deserializeBinaryFromReader(message: GetKubesRequest, reader: jspb.BinaryReader): GetKubesRequest;
}

export namespace GetKubesRequest {
    export type AsObject = {
        clusterUri: string,
        limit: number,
        startKey: string,
        search: string,
        query: string,
        sortBy: string,
        searchAsRoles: string,
    }
}

export class GetKubesResponse extends jspb.Message { 
    clearAgentsList(): void;
    getAgentsList(): Array<v1_kube_pb.Kube>;
    setAgentsList(value: Array<v1_kube_pb.Kube>): GetKubesResponse;
    addAgents(value?: v1_kube_pb.Kube, index?: number): v1_kube_pb.Kube;

    getTotalCount(): number;
    setTotalCount(value: number): GetKubesResponse;

    getStartKey(): string;
    setStartKey(value: string): GetKubesResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetKubesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetKubesResponse): GetKubesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetKubesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetKubesResponse;
    static deserializeBinaryFromReader(message: GetKubesResponse, reader: jspb.BinaryReader): GetKubesResponse;
}

export namespace GetKubesResponse {
    export type AsObject = {
        agentsList: Array<v1_kube_pb.Kube.AsObject>,
        totalCount: number,
        startKey: string,
    }
}

export class ListAppsResponse extends jspb.Message { 
    clearAppsList(): void;
    getAppsList(): Array<v1_app_pb.App>;
    setAppsList(value: Array<v1_app_pb.App>): ListAppsResponse;
    addApps(value?: v1_app_pb.App, index?: number): v1_app_pb.App;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListAppsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListAppsResponse): ListAppsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListAppsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListAppsResponse;
    static deserializeBinaryFromReader(message: ListAppsResponse, reader: jspb.BinaryReader): ListAppsResponse;
}

export namespace ListAppsResponse {
    export type AsObject = {
        appsList: Array<v1_app_pb.App.AsObject>,
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

export enum PasswordlessPrompt {
    PASSWORDLESS_PROMPT_UNSPECIFIED = 0,
    PASSWORDLESS_PROMPT_PIN = 1,
    PASSWORDLESS_PROMPT_TAP = 2,
    PASSWORDLESS_PROMPT_CREDENTIAL = 3,
}

export enum FileTransferDirection {
    FILE_TRANSFER_DIRECTION_UNSPECIFIED = 0,
    FILE_TRANSFER_DIRECTION_DOWNLOAD = 1,
    FILE_TRANSFER_DIRECTION_UPLOAD = 2,
}
