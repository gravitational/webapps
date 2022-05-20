// package:
// file: ptyHostService.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';
import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';

export class PtyId extends jspb.Message {
  getId(): string;
  setId(value: string): PtyId;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyId.AsObject;
  static toObject(includeInstance: boolean, msg: PtyId): PtyId.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyId,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyId;
  static deserializeBinaryFromReader(
    message: PtyId,
    reader: jspb.BinaryReader
  ): PtyId;
}

export namespace PtyId {
  export type AsObject = {
    id: string;
  };
}

export class PtyCreate extends jspb.Message {
  getPath(): string;
  setPath(value: string): PtyCreate;
  clearArgsList(): void;
  getArgsList(): Array<string>;
  setArgsList(value: Array<string>): PtyCreate;
  addArgs(value: string, index?: number): string;
  getCwd(): string;
  setCwd(value: string): PtyCreate;

  hasInitCommand(): boolean;
  clearInitCommand(): void;
  getInitCommand(): string | undefined;
  setInitCommand(value: string): PtyCreate;

  hasEnv(): boolean;
  clearEnv(): void;
  getEnv(): google_protobuf_struct_pb.Struct | undefined;
  setEnv(value?: google_protobuf_struct_pb.Struct): PtyCreate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyCreate.AsObject;
  static toObject(includeInstance: boolean, msg: PtyCreate): PtyCreate.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyCreate,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyCreate;
  static deserializeBinaryFromReader(
    message: PtyCreate,
    reader: jspb.BinaryReader
  ): PtyCreate;
}

export namespace PtyCreate {
  export type AsObject = {
    path: string;
    argsList: Array<string>;
    cwd: string;
    initCommand?: string;
    env?: google_protobuf_struct_pb.Struct.AsObject;
  };
}

export class PtyClientEvent extends jspb.Message {
  hasStart(): boolean;
  clearStart(): void;
  getStart(): PtyEventStart | undefined;
  setStart(value?: PtyEventStart): PtyClientEvent;

  hasResize(): boolean;
  clearResize(): void;
  getResize(): PtyEventResize | undefined;
  setResize(value?: PtyEventResize): PtyClientEvent;

  hasData(): boolean;
  clearData(): void;
  getData(): PtyEventData | undefined;
  setData(value?: PtyEventData): PtyClientEvent;

  getEventCase(): PtyClientEvent.EventCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyClientEvent.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyClientEvent
  ): PtyClientEvent.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyClientEvent,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyClientEvent;
  static deserializeBinaryFromReader(
    message: PtyClientEvent,
    reader: jspb.BinaryReader
  ): PtyClientEvent;
}

export namespace PtyClientEvent {
  export type AsObject = {
    start?: PtyEventStart.AsObject;
    resize?: PtyEventResize.AsObject;
    data?: PtyEventData.AsObject;
  };

  export enum EventCase {
    EVENT_NOT_SET = 0,
    START = 2,
    RESIZE = 3,
    DATA = 4,
  }
}

export class PtyServerEvent extends jspb.Message {
  hasResize(): boolean;
  clearResize(): void;
  getResize(): PtyEventResize | undefined;
  setResize(value?: PtyEventResize): PtyServerEvent;

  hasData(): boolean;
  clearData(): void;
  getData(): PtyEventData | undefined;
  setData(value?: PtyEventData): PtyServerEvent;

  hasOpen(): boolean;
  clearOpen(): void;
  getOpen(): PtyEventOpen | undefined;
  setOpen(value?: PtyEventOpen): PtyServerEvent;

  hasExit(): boolean;
  clearExit(): void;
  getExit(): PtyEventExit | undefined;
  setExit(value?: PtyEventExit): PtyServerEvent;

  getEventCase(): PtyServerEvent.EventCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyServerEvent.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyServerEvent
  ): PtyServerEvent.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyServerEvent,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyServerEvent;
  static deserializeBinaryFromReader(
    message: PtyServerEvent,
    reader: jspb.BinaryReader
  ): PtyServerEvent;
}

export namespace PtyServerEvent {
  export type AsObject = {
    resize?: PtyEventResize.AsObject;
    data?: PtyEventData.AsObject;
    open?: PtyEventOpen.AsObject;
    exit?: PtyEventExit.AsObject;
  };

  export enum EventCase {
    EVENT_NOT_SET = 0,
    RESIZE = 1,
    DATA = 2,
    OPEN = 3,
    EXIT = 4,
  }
}

export class PtyEventStart extends jspb.Message {
  getColumns(): number;
  setColumns(value: number): PtyEventStart;
  getRows(): number;
  setRows(value: number): PtyEventStart;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyEventStart.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyEventStart
  ): PtyEventStart.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyEventStart,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyEventStart;
  static deserializeBinaryFromReader(
    message: PtyEventStart,
    reader: jspb.BinaryReader
  ): PtyEventStart;
}

export namespace PtyEventStart {
  export type AsObject = {
    columns: number;
    rows: number;
  };
}

export class PtyEventData extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): PtyEventData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyEventData.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyEventData
  ): PtyEventData.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyEventData,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyEventData;
  static deserializeBinaryFromReader(
    message: PtyEventData,
    reader: jspb.BinaryReader
  ): PtyEventData;
}

export namespace PtyEventData {
  export type AsObject = {
    message: string;
  };
}

export class PtyEventResize extends jspb.Message {
  getColumns(): number;
  setColumns(value: number): PtyEventResize;
  getRows(): number;
  setRows(value: number): PtyEventResize;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyEventResize.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyEventResize
  ): PtyEventResize.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyEventResize,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyEventResize;
  static deserializeBinaryFromReader(
    message: PtyEventResize,
    reader: jspb.BinaryReader
  ): PtyEventResize;
}

export namespace PtyEventResize {
  export type AsObject = {
    columns: number;
    rows: number;
  };
}

export class PtyEventOpen extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyEventOpen.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyEventOpen
  ): PtyEventOpen.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyEventOpen,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyEventOpen;
  static deserializeBinaryFromReader(
    message: PtyEventOpen,
    reader: jspb.BinaryReader
  ): PtyEventOpen;
}

export namespace PtyEventOpen {
  export type AsObject = {};
}

export class PtyEventExit extends jspb.Message {
  getExitCode(): number;
  setExitCode(value: number): PtyEventExit;

  hasSignal(): boolean;
  clearSignal(): void;
  getSignal(): number | undefined;
  setSignal(value: number): PtyEventExit;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyEventExit.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: PtyEventExit
  ): PtyEventExit.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyEventExit,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyEventExit;
  static deserializeBinaryFromReader(
    message: PtyEventExit,
    reader: jspb.BinaryReader
  ): PtyEventExit;
}

export namespace PtyEventExit {
  export type AsObject = {
    exitCode: number;
    signal?: number;
  };
}

export class PtyCwd extends jspb.Message {
  getCwd(): string;
  setCwd(value: string): PtyCwd;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PtyCwd.AsObject;
  static toObject(includeInstance: boolean, msg: PtyCwd): PtyCwd.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: PtyCwd,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): PtyCwd;
  static deserializeBinaryFromReader(
    message: PtyCwd,
    reader: jspb.BinaryReader
  ): PtyCwd;
}

export namespace PtyCwd {
  export type AsObject = {
    cwd: string;
  };
}
