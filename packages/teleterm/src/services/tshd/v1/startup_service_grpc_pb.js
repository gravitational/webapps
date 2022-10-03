// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2022 Gravitational, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var v1_startup_service_pb = require('../v1/startup_service_pb.js');

function serialize_teleport_terminal_v1_ResolveTshdEventsServerAddressRequest(arg) {
  if (!(arg instanceof v1_startup_service_pb.ResolveTshdEventsServerAddressRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ResolveTshdEventsServerAddressRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ResolveTshdEventsServerAddressRequest(buffer_arg) {
  return v1_startup_service_pb.ResolveTshdEventsServerAddressRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_ResolveTshdEventsServerAddressResponse(arg) {
  if (!(arg instanceof v1_startup_service_pb.ResolveTshdEventsServerAddressResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.ResolveTshdEventsServerAddressResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_ResolveTshdEventsServerAddressResponse(buffer_arg) {
  return v1_startup_service_pb.ResolveTshdEventsServerAddressResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_WaitForTshdEventsClientRequest(arg) {
  if (!(arg instanceof v1_startup_service_pb.WaitForTshdEventsClientRequest)) {
    throw new Error('Expected argument of type teleport.terminal.v1.WaitForTshdEventsClientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_WaitForTshdEventsClientRequest(buffer_arg) {
  return v1_startup_service_pb.WaitForTshdEventsClientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_teleport_terminal_v1_WaitForTshdEventsClientResponse(arg) {
  if (!(arg instanceof v1_startup_service_pb.WaitForTshdEventsClientResponse)) {
    throw new Error('Expected argument of type teleport.terminal.v1.WaitForTshdEventsClientResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_teleport_terminal_v1_WaitForTshdEventsClientResponse(buffer_arg) {
  return v1_startup_service_pb.WaitForTshdEventsClientResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// StartupService is used by apiserver.APIServer to prepare the tshd events client on app startup,
// before any other call is made on the main TerminalService.
// This way the handler of TerminalService, daemon.Service, can use tshd events client without
// worrying that it might be nil.
//
// The details of this whole process are described in the doc comment for startuphandler.Handler.
// The general gist of it is that tshd daemon waits in a goroutine for the Electron app to send the
// tshd events server address through ResolveTshdEventsServerAddress. And then the Electron app
// sends another request to WaitForTshdEventsClient which returns a response as soon as
// apiserver.APIServer confirms that the client is ready.
var StartupServiceService = exports.StartupServiceService = {
  // ResolveTshdEventsServerAddress is called by the Electron app after it starts the tshd events
// server.
resolveTshdEventsServerAddress: {
    path: '/teleport.terminal.v1.StartupService/ResolveTshdEventsServerAddress',
    requestStream: false,
    responseStream: false,
    requestType: v1_startup_service_pb.ResolveTshdEventsServerAddressRequest,
    responseType: v1_startup_service_pb.ResolveTshdEventsServerAddressResponse,
    requestSerialize: serialize_teleport_terminal_v1_ResolveTshdEventsServerAddressRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_ResolveTshdEventsServerAddressRequest,
    responseSerialize: serialize_teleport_terminal_v1_ResolveTshdEventsServerAddressResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_ResolveTshdEventsServerAddressResponse,
  },
  // WaitForTshdEventsClient is called by the Electron app after ResolveTshdEventsServerAddress.
// This RPC blocks until the tsh daemon finishes setting up the client.
waitForTshdEventsClient: {
    path: '/teleport.terminal.v1.StartupService/WaitForTshdEventsClient',
    requestStream: false,
    responseStream: false,
    requestType: v1_startup_service_pb.WaitForTshdEventsClientRequest,
    responseType: v1_startup_service_pb.WaitForTshdEventsClientResponse,
    requestSerialize: serialize_teleport_terminal_v1_WaitForTshdEventsClientRequest,
    requestDeserialize: deserialize_teleport_terminal_v1_WaitForTshdEventsClientRequest,
    responseSerialize: serialize_teleport_terminal_v1_WaitForTshdEventsClientResponse,
    responseDeserialize: deserialize_teleport_terminal_v1_WaitForTshdEventsClientResponse,
  },
};

exports.StartupServiceClient = grpc.makeGenericClientConstructor(StartupServiceService);
