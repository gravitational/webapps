/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import ReactDOM from 'react-dom';
import React from 'react';

import history from 'teleport/services/history';

import Teleport from './Teleport';
import TeleportContext from './teleportContext';
import cfg from './config';

import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from'@opentelemetry/semantic-conventions';
import { WebTracerProvider } from'@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from'@opentelemetry/instrumentation';
import { ConsoleSpanExporter, BatchSpanProcessor } from'@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from'@opentelemetry/exporter-trace-otlp-http';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { CompositePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { ZoneContextManager } from '@opentelemetry/context-zone';


// apply configuration received from the server
cfg.init(window['GRV_CONFIG']);

// use browser history
history.init();


// Optionally register automatic instrumentation libraries
registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new UserInteractionInstrumentation(),
    new XMLHttpRequestInstrumentation(),
    new FetchInstrumentation(),
  ],
});

const resource =
  Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "web-ui",
      [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
    })
  );

const provider = new WebTracerProvider({
    resource: resource,
});

provider.addSpanProcessor(new BatchSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({
  timeoutMillis: 15000,
  url: 'https://localhost:8080/v1/webapi/traces', // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  concurrencyLimit: 10, // an optional limit on pending requests
})));

provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [
      new B3Propagator(),
      new W3CTraceContextPropagator(),
    ],
  }),
});




const teleportContext = new TeleportContext();

ReactDOM.render(
  <Teleport history={history.original()} ctx={teleportContext} />,
  document.getElementById('app')
);
