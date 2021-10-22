// package: teleport.terminal.v1
// file: v1/gateway.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Gateway extends jspb.Message { 
    getUri(): string;
    setUri(value: string): Gateway;

    getResourceName(): string;
    setResourceName(value: string): Gateway;

    getLocalAddress(): string;
    setLocalAddress(value: string): Gateway;

    getLocalPort(): string;
    setLocalPort(value: string): Gateway;

    getProtocol(): string;
    setProtocol(value: string): Gateway;

    getHostId(): string;
    setHostId(value: string): Gateway;

    getClusterId(): string;
    setClusterId(value: string): Gateway;

    getCaCertPath(): string;
    setCaCertPath(value: string): Gateway;

    getDbCertPath(): string;
    setDbCertPath(value: string): Gateway;

    getKeyPath(): string;
    setKeyPath(value: string): Gateway;

    getStatus(): Gateway.GatewayStatus;
    setStatus(value: Gateway.GatewayStatus): Gateway;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Gateway.AsObject;
    static toObject(includeInstance: boolean, msg: Gateway): Gateway.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Gateway, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Gateway;
    static deserializeBinaryFromReader(message: Gateway, reader: jspb.BinaryReader): Gateway;
}

export namespace Gateway {
    export type AsObject = {
        uri: string,
        resourceName: string,
        localAddress: string,
        localPort: string,
        protocol: string,
        hostId: string,
        clusterId: string,
        caCertPath: string,
        dbCertPath: string,
        keyPath: string,
        status: Gateway.GatewayStatus,
    }

    export enum GatewayStatus {
    CONNECTED = 0,
    DISCONNECTED = 1,
    }

}
