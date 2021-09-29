// package: teleport.terminal.v1
// file: teleport/terminal/v1/cluster_login_challenge.proto

import * as jspb from "google-protobuf";

export class ClusterLoginChallenge extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClusterLoginChallenge.AsObject;
  static toObject(includeInstance: boolean, msg: ClusterLoginChallenge): ClusterLoginChallenge.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClusterLoginChallenge, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClusterLoginChallenge;
  static deserializeBinaryFromReader(message: ClusterLoginChallenge, reader: jspb.BinaryReader): ClusterLoginChallenge;
}

export namespace ClusterLoginChallenge {
  export type AsObject = {
    id: string,
  }
}

export class SolvedClusterLoginChallenge extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SolvedClusterLoginChallenge.AsObject;
  static toObject(includeInstance: boolean, msg: SolvedClusterLoginChallenge): SolvedClusterLoginChallenge.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SolvedClusterLoginChallenge, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SolvedClusterLoginChallenge;
  static deserializeBinaryFromReader(message: SolvedClusterLoginChallenge, reader: jspb.BinaryReader): SolvedClusterLoginChallenge;
}

export namespace SolvedClusterLoginChallenge {
  export type AsObject = {
  }
}

