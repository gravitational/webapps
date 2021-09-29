// package: teleport.terminal.v1
// file: teleport/terminal/v1/gateway.proto

import * as jspb from "google-protobuf";

export class Gateway extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getTargetCluster(): string;
  setTargetCluster(value: string): void;

  getTargetResource(): string;
  setTargetResource(value: string): void;

  getLocalAddress(): string;
  setLocalAddress(value: string): void;

  getAllowStreaming(): boolean;
  setAllowStreaming(value: boolean): void;

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
    id: string,
    name: string,
    targetCluster: string,
    targetResource: string,
    localAddress: string,
    allowStreaming: boolean,
  }
}

