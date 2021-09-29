// package: teleport.terminal.v1
// file: teleport/terminal/v1/terminal_service.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as teleport_terminal_v1_cluster_pb from "../../../teleport/terminal/v1/cluster_pb";
import * as teleport_terminal_v1_cluster_login_challenge_pb from "../../../teleport/terminal/v1/cluster_login_challenge_pb";
import * as teleport_terminal_v1_database_pb from "../../../teleport/terminal/v1/database_pb";
import * as teleport_terminal_v1_gateway_pb from "../../../teleport/terminal/v1/gateway_pb";
import * as teleport_terminal_v1_node_pb from "../../../teleport/terminal/v1/node_pb";

export class CreateClusterRequest extends jspb.Message {
  hasCluster(): boolean;
  clearCluster(): void;
  getCluster(): teleport_terminal_v1_cluster_pb.Cluster | undefined;
  setCluster(value?: teleport_terminal_v1_cluster_pb.Cluster): void;

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
    cluster?: teleport_terminal_v1_cluster_pb.Cluster.AsObject,
  }
}

export class ListClustersRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): void;

  getPageToken(): string;
  setPageToken(value: string): void;

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
    pageSize: number,
    pageToken: string,
  }
}

export class ListClustersResponse extends jspb.Message {
  clearClustersList(): void;
  getClustersList(): Array<teleport_terminal_v1_cluster_pb.Cluster>;
  setClustersList(value: Array<teleport_terminal_v1_cluster_pb.Cluster>): void;
  addClusters(value?: teleport_terminal_v1_cluster_pb.Cluster, index?: number): teleport_terminal_v1_cluster_pb.Cluster;

  getNextPageToken(): string;
  setNextPageToken(value: string): void;

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
    clustersList: Array<teleport_terminal_v1_cluster_pb.Cluster.AsObject>,
    nextPageToken: string,
  }
}

export class CreateClusterLoginChallengeRequest extends jspb.Message {
  getClusterId(): string;
  setClusterId(value: string): void;

  getLogin(): string;
  setLogin(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

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

export class SolveClusterLoginChallengeRequest extends jspb.Message {
  getClusterId(): string;
  setClusterId(value: string): void;

  getChallengeId(): string;
  setChallengeId(value: string): void;

  hasSolvedChallenge(): boolean;
  clearSolvedChallenge(): void;
  getSolvedChallenge(): teleport_terminal_v1_cluster_login_challenge_pb.SolvedClusterLoginChallenge | undefined;
  setSolvedChallenge(value?: teleport_terminal_v1_cluster_login_challenge_pb.SolvedClusterLoginChallenge): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SolveClusterLoginChallengeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SolveClusterLoginChallengeRequest): SolveClusterLoginChallengeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SolveClusterLoginChallengeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SolveClusterLoginChallengeRequest;
  static deserializeBinaryFromReader(message: SolveClusterLoginChallengeRequest, reader: jspb.BinaryReader): SolveClusterLoginChallengeRequest;
}

export namespace SolveClusterLoginChallengeRequest {
  export type AsObject = {
    clusterId: string,
    challengeId: string,
    solvedChallenge?: teleport_terminal_v1_cluster_login_challenge_pb.SolvedClusterLoginChallenge.AsObject,
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
  getPageSize(): number;
  setPageSize(value: number): void;

  getPageToken(): string;
  setPageToken(value: string): void;

  clearClusterIdsList(): void;
  getClusterIdsList(): Array<string>;
  setClusterIdsList(value: Array<string>): void;
  addClusterIds(value: string, index?: number): string;

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
    pageSize: number,
    pageToken: string,
    clusterIdsList: Array<string>,
  }
}

export class ListDatabasesResponse extends jspb.Message {
  clearDatabasesList(): void;
  getDatabasesList(): Array<teleport_terminal_v1_database_pb.Database>;
  setDatabasesList(value: Array<teleport_terminal_v1_database_pb.Database>): void;
  addDatabases(value?: teleport_terminal_v1_database_pb.Database, index?: number): teleport_terminal_v1_database_pb.Database;

  getNextPageToken(): string;
  setNextPageToken(value: string): void;

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
    databasesList: Array<teleport_terminal_v1_database_pb.Database.AsObject>,
    nextPageToken: string,
  }
}

export class CreateGatewayRequest extends jspb.Message {
  getClusterId(): string;
  setClusterId(value: string): void;

  hasGateway(): boolean;
  clearGateway(): void;
  getGateway(): teleport_terminal_v1_gateway_pb.Gateway | undefined;
  setGateway(value?: teleport_terminal_v1_gateway_pb.Gateway): void;

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
    clusterId: string,
    gateway?: teleport_terminal_v1_gateway_pb.Gateway.AsObject,
  }
}

export class ListGatewaysRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): void;

  getPageToken(): string;
  setPageToken(value: string): void;

  clearClusterIdsList(): void;
  getClusterIdsList(): Array<string>;
  setClusterIdsList(value: Array<string>): void;
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
    pageSize: number,
    pageToken: string,
    clusterIdsList: Array<string>,
  }
}

export class ListGatewaysResponse extends jspb.Message {
  clearGatewaysList(): void;
  getGatewaysList(): Array<teleport_terminal_v1_gateway_pb.Gateway>;
  setGatewaysList(value: Array<teleport_terminal_v1_gateway_pb.Gateway>): void;
  addGateways(value?: teleport_terminal_v1_gateway_pb.Gateway, index?: number): teleport_terminal_v1_gateway_pb.Gateway;

  getNextPageToken(): string;
  setNextPageToken(value: string): void;

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
    gatewaysList: Array<teleport_terminal_v1_gateway_pb.Gateway.AsObject>,
    nextPageToken: string,
  }
}

export class DeleteGatewayRequest extends jspb.Message {
  getGatewayId(): string;
  setGatewayId(value: string): void;

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
    gatewayId: string,
  }
}

export class ListNodesRequest extends jspb.Message {
  getPageSize(): number;
  setPageSize(value: number): void;

  getPageToken(): string;
  setPageToken(value: string): void;

  clearClusterIdsList(): void;
  getClusterIdsList(): Array<string>;
  setClusterIdsList(value: Array<string>): void;
  addClusterIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListNodesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListNodesRequest): ListNodesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListNodesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListNodesRequest;
  static deserializeBinaryFromReader(message: ListNodesRequest, reader: jspb.BinaryReader): ListNodesRequest;
}

export namespace ListNodesRequest {
  export type AsObject = {
    pageSize: number,
    pageToken: string,
    clusterIdsList: Array<string>,
  }
}

export class ListNodesResponse extends jspb.Message {
  clearNodesList(): void;
  getNodesList(): Array<teleport_terminal_v1_node_pb.Node>;
  setNodesList(value: Array<teleport_terminal_v1_node_pb.Node>): void;
  addNodes(value?: teleport_terminal_v1_node_pb.Node, index?: number): teleport_terminal_v1_node_pb.Node;

  getNextPageToken(): string;
  setNextPageToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListNodesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListNodesResponse): ListNodesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListNodesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListNodesResponse;
  static deserializeBinaryFromReader(message: ListNodesResponse, reader: jspb.BinaryReader): ListNodesResponse;
}

export namespace ListNodesResponse {
  export type AsObject = {
    nodesList: Array<teleport_terminal_v1_node_pb.Node.AsObject>,
    nextPageToken: string,
  }
}

export class StreamGatewayRequest extends jspb.Message {
  getGatewayId(): string;
  setGatewayId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamGatewayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamGatewayRequest): StreamGatewayRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamGatewayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamGatewayRequest;
  static deserializeBinaryFromReader(message: StreamGatewayRequest, reader: jspb.BinaryReader): StreamGatewayRequest;
}

export namespace StreamGatewayRequest {
  export type AsObject = {
    gatewayId: string,
  }
}

export class StreamGatewayResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamGatewayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StreamGatewayResponse): StreamGatewayResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamGatewayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamGatewayResponse;
  static deserializeBinaryFromReader(message: StreamGatewayResponse, reader: jspb.BinaryReader): StreamGatewayResponse;
}

export namespace StreamGatewayResponse {
  export type AsObject = {
  }
}

