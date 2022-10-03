// package: teleport.terminal.v1
// file: v1/startup_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ResolveTshdEventsServerAddressRequest extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): ResolveTshdEventsServerAddressRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResolveTshdEventsServerAddressRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResolveTshdEventsServerAddressRequest): ResolveTshdEventsServerAddressRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResolveTshdEventsServerAddressRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResolveTshdEventsServerAddressRequest;
    static deserializeBinaryFromReader(message: ResolveTshdEventsServerAddressRequest, reader: jspb.BinaryReader): ResolveTshdEventsServerAddressRequest;
}

export namespace ResolveTshdEventsServerAddressRequest {
    export type AsObject = {
        address: string,
    }
}

export class ResolveTshdEventsServerAddressResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResolveTshdEventsServerAddressResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ResolveTshdEventsServerAddressResponse): ResolveTshdEventsServerAddressResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResolveTshdEventsServerAddressResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResolveTshdEventsServerAddressResponse;
    static deserializeBinaryFromReader(message: ResolveTshdEventsServerAddressResponse, reader: jspb.BinaryReader): ResolveTshdEventsServerAddressResponse;
}

export namespace ResolveTshdEventsServerAddressResponse {
    export type AsObject = {
    }
}

export class WaitForTshdEventsClientRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WaitForTshdEventsClientRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WaitForTshdEventsClientRequest): WaitForTshdEventsClientRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WaitForTshdEventsClientRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WaitForTshdEventsClientRequest;
    static deserializeBinaryFromReader(message: WaitForTshdEventsClientRequest, reader: jspb.BinaryReader): WaitForTshdEventsClientRequest;
}

export namespace WaitForTshdEventsClientRequest {
    export type AsObject = {
    }
}

export class WaitForTshdEventsClientResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WaitForTshdEventsClientResponse.AsObject;
    static toObject(includeInstance: boolean, msg: WaitForTshdEventsClientResponse): WaitForTshdEventsClientResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WaitForTshdEventsClientResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WaitForTshdEventsClientResponse;
    static deserializeBinaryFromReader(message: WaitForTshdEventsClientResponse, reader: jspb.BinaryReader): WaitForTshdEventsClientResponse;
}

export namespace WaitForTshdEventsClientResponse {
    export type AsObject = {
    }
}
