// package: teleport.terminal.v1
// file: v1/cluster.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Cluster extends jspb.Message { 
    getUri(): string;
    setUri(value: string): Cluster;

    getName(): string;
    setName(value: string): Cluster;

    getConnected(): boolean;
    setConnected(value: boolean): Cluster;


    hasAcl(): boolean;
    clearAcl(): void;
    getAcl(): ClusterACL | undefined;
    setAcl(value?: ClusterACL): Cluster;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Cluster.AsObject;
    static toObject(includeInstance: boolean, msg: Cluster): Cluster.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Cluster, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Cluster;
    static deserializeBinaryFromReader(message: Cluster, reader: jspb.BinaryReader): Cluster;
}

export namespace Cluster {
    export type AsObject = {
        uri: string,
        name: string,
        connected: boolean,
        acl?: ClusterACL.AsObject,
    }
}

export class ClusterACL extends jspb.Message { 

    hasSessions(): boolean;
    clearSessions(): void;
    getSessions(): ResourceAccess | undefined;
    setSessions(value?: ResourceAccess): ClusterACL;


    hasAuthConnectors(): boolean;
    clearAuthConnectors(): void;
    getAuthConnectors(): ResourceAccess | undefined;
    setAuthConnectors(value?: ResourceAccess): ClusterACL;


    hasRoles(): boolean;
    clearRoles(): void;
    getRoles(): ResourceAccess | undefined;
    setRoles(value?: ResourceAccess): ClusterACL;


    hasUsers(): boolean;
    clearUsers(): void;
    getUsers(): ResourceAccess | undefined;
    setUsers(value?: ResourceAccess): ClusterACL;


    hasTrustedClusters(): boolean;
    clearTrustedClusters(): void;
    getTrustedClusters(): ResourceAccess | undefined;
    setTrustedClusters(value?: ResourceAccess): ClusterACL;


    hasEvents(): boolean;
    clearEvents(): void;
    getEvents(): ResourceAccess | undefined;
    setEvents(value?: ResourceAccess): ClusterACL;


    hasTokens(): boolean;
    clearTokens(): void;
    getTokens(): ResourceAccess | undefined;
    setTokens(value?: ResourceAccess): ClusterACL;


    hasServers(): boolean;
    clearServers(): void;
    getServers(): ResourceAccess | undefined;
    setServers(value?: ResourceAccess): ClusterACL;


    hasApps(): boolean;
    clearApps(): void;
    getApps(): ResourceAccess | undefined;
    setApps(value?: ResourceAccess): ClusterACL;


    hasDbs(): boolean;
    clearDbs(): void;
    getDbs(): ResourceAccess | undefined;
    setDbs(value?: ResourceAccess): ClusterACL;


    hasKubeservers(): boolean;
    clearKubeservers(): void;
    getKubeservers(): ResourceAccess | undefined;
    setKubeservers(value?: ResourceAccess): ClusterACL;

    clearSshLoginsList(): void;
    getSshLoginsList(): Array<string>;
    setSshLoginsList(value: Array<string>): ClusterACL;
    addSshLogins(value: string, index?: number): string;


    hasAccessRequests(): boolean;
    clearAccessRequests(): void;
    getAccessRequests(): ResourceAccess | undefined;
    setAccessRequests(value?: ResourceAccess): ClusterACL;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClusterACL.AsObject;
    static toObject(includeInstance: boolean, msg: ClusterACL): ClusterACL.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClusterACL, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClusterACL;
    static deserializeBinaryFromReader(message: ClusterACL, reader: jspb.BinaryReader): ClusterACL;
}

export namespace ClusterACL {
    export type AsObject = {
        sessions?: ResourceAccess.AsObject,
        authConnectors?: ResourceAccess.AsObject,
        roles?: ResourceAccess.AsObject,
        users?: ResourceAccess.AsObject,
        trustedClusters?: ResourceAccess.AsObject,
        events?: ResourceAccess.AsObject,
        tokens?: ResourceAccess.AsObject,
        servers?: ResourceAccess.AsObject,
        apps?: ResourceAccess.AsObject,
        dbs?: ResourceAccess.AsObject,
        kubeservers?: ResourceAccess.AsObject,
        sshLoginsList: Array<string>,
        accessRequests?: ResourceAccess.AsObject,
    }
}

export class ResourceAccess extends jspb.Message { 
    getList(): boolean;
    setList(value: boolean): ResourceAccess;

    getRead(): boolean;
    setRead(value: boolean): ResourceAccess;

    getEdit(): boolean;
    setEdit(value: boolean): ResourceAccess;

    getCreate(): boolean;
    setCreate(value: boolean): ResourceAccess;

    getDelete(): boolean;
    setDelete(value: boolean): ResourceAccess;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResourceAccess.AsObject;
    static toObject(includeInstance: boolean, msg: ResourceAccess): ResourceAccess.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResourceAccess, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResourceAccess;
    static deserializeBinaryFromReader(message: ResourceAccess, reader: jspb.BinaryReader): ResourceAccess;
}

export namespace ResourceAccess {
    export type AsObject = {
        list: boolean,
        read: boolean,
        edit: boolean,
        create: boolean,
        pb_delete: boolean,
    }
}
