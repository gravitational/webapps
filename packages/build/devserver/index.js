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

const uri = require('url');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('http-proxy').createProxyServer();
const modifyIndexHtmlMiddleware = require('./modifyResponse');
const initCompiler = require('./initCompiler');

// parse target URL
const argv = require('optimist')
  .usage('Usage: $0 -target [url] -config [config]')
  .demand(['target', 'config']).argv;

const urlObj = uri.parse(argv.target);
const webpackConfig = require(argv.config);

if (!urlObj.host) {
  console.error('invalid URL: ' + argv.target);
  return;
}

const PROXY_TARGET = urlObj.host;
const ROOT = '/web';
const PORT = 8080;

// init webpack compiler
const compiler = initCompiler({ webpackConfig });
compiler.callWhenReady(function() {
  console.log(
    '\x1b[32m',
    `Dev Server is up and running: https://localhost:${PORT}/web/`,
    '\x1b[0m'
  );
});

function getTargetOptions() {
  return {
    target: 'https://' + PROXY_TARGET,
    secure: false,
    changeOrigin: true,
    xfwd: true,
  };
}

const devServer = new WebpackDevServer(
  {
    proxy: {
      // teleport APIs
      '/web/grafana/*': getTargetOptions(),
      '/web/config.*': getTargetOptions(),
      '/pack/v1/*': getTargetOptions(),
      '/portalapi/*': getTargetOptions(),
      '/portal*': getTargetOptions(),
      '/proxy/*': getTargetOptions(),
      '/v1/*': getTargetOptions(),
      '/app/*': getTargetOptions(),
      '/sites/v1/*': getTargetOptions(),
      '/api/*': getTargetOptions(),
      '/proto.TickService/*': getTargetOptions(),
    },
    static: {
      serveIndex: false,
      publicPath: ROOT + '/app',
    },
    server: {
      type: 'https',
    },
    host: '0.0.0.0',
    port: PORT,
    allowedHosts: 'all',
    client: {
      overlay: false,
    },
    devMiddleware: {
      stats: 'minimal',
    },
    hot: true,
    headers: { 'X-Custom-Header': 'yes' },
  },
  compiler.webpackCompiler
);

// serveIndexHtml proxies all requests skipped by webpack-dev-server to
// targeted server, these are requests to index.html (app entry point)
function serveIndexHtml(req, res) {
  // prevent gzip compression so it's easier for us to parse the original response
  // to retrieve tokens (csrf and access tokens)
  if (req.headers['accept-encoding']) {
    req.headers['accept-encoding'] = req.headers['accept-encoding']
      .replace('gzip, ', '')
      .replace(', gzip,', ',')
      .replace('gzip', '');
  }

  function handleRequest() {
    proxy.web(req, res, getTargetOptions());
  }

  if (!compiler.isLocalIndexHtmlReady()) {
    compiler.callWhenReady(handleRequest);
  } else {
    handleRequest();
  }
}

devServer.start().then(() => {
  devServer.app.use(modifyIndexHtmlMiddleware(compiler));
  devServer.app.get('/*', serveIndexHtml);
  devServer.server.on('upgrade', (req, socket) => {
    if (req.url === '/ws') {  // webpack WS
      return;
    }
    console.log('proxying ws', req.url);
    proxy.ws(req, socket, {
      target: 'wss://' + PROXY_TARGET,
      secure: false,
    });
  });
});
