# Teleport Connect

Teleport Connect (previously Teleport Terminal, package name `teleterm`) is a desktop application that allows easy access to Teleport resources.

## Usage

### The `--insecure` flag

Just like tsh, Connect supports the `--insecure` flag which skips the verification of the server
certificate and host name.

```
open -a "Teleport Connect" --args --insecure
```

or

```
/Applications/Teleport\ Connect.app/Contents/MacOS/Teleport\ Connect --insecure
```

## Building and packaging

Teleport Connect consists of two main components: the `tsh` tool and the Electron app. Our build
scripts assume that the `webapps` repo and the `teleport` repo are in the same folder.

To get started, first we need to build `tsh` that resides in the `teleport` repo.

Prepare Teleport repo:

```bash
## Clone Teleport repo
$ git clone https://github.com/gravitational/teleport.git
$ cd teleport
## Build tsh binary
$ make build/tsh
```

The build output can be found in the `/teleport/build` directory. The tsh binary will be packed
together with the Electron app.

Prepare Webapps repo

1. Make sure that your node version is v16 (current tls) https://nodejs.org/en/about/releases/
2. Clone and build `webapps` repository

```bash
$ git clone https://github.com/gravitational/webapps.git
$ cd webapps
$ yarn install
$ CONNECT_TSH_BIN_PATH=$PWD/../teleport/build/tsh yarn build-and-package-term
```

The installable file can be found in `/webapps/packages/teleterm/build/release/`

For more details on how Connect is built for different platforms, see the [Build
process](#build-process) section.

## Development

**Make sure to run `yarn build-native-deps-for-term` first** before attempting to launch the app in
development mode. That's because Electron is running its own version of Node. That command will
fetch or build native packages that were made for that specific version of Node.

```sh
$ cd webapps

$ yarn install
$ yarn build-native-deps-for-term
```

To launch `teleterm` in development mode:

```sh
$ cd webapps

$ yarn start-term

## By default, the dev version assumes that the tsh binary is at ../teleport/build/tsh.
## You can provide a different absolute path to a tsh binary though the CONNECT_TSH_BIN_PATH env var.
$ CONNECT_TSH_BIN_PATH=$PWD/../teleport/build/tsh yarn start-term
```

For a quick restart which restarts all processes and the `tsh` daemon, press `F6`.

### Generating tshd gRPC protobuf files

Rebulding them is needed only if you change any of the files in `/teleport/lib/teleterm/api/proto/`
dir.

1. To rebuild and update `tsh` grpc proto files

```sh
$ cd teleport
$ make grpc-teleterm
```

Resulting files both `nodejs` and `golang` can be found in `/teleport/lib/teleterm/api/protogen/` directory.

```pro
lib/teleterm/api/protogen/
├── golang
│   └── v1
│       ├── auth_challenge.pb.go
│       ├── auth_settings.pb.go
│       ├── ...
│       └── ...
└── js
    └── v1
        ├── service_grpc_pb.js
        ├── service_pb.d.ts
        └── ...
```

2. Update `nodejs` files by copying them to the `/webapps/packages/teleterm/src/services/tshd/` location

```sh
$ cd webapps
$ rm -rf ./packages/teleterm/src/services/tshd/v1/ && cp -R ../teleport/lib/teleterm/api/protogen/js/v1 ./packages/teleterm/src/services/tshd/v1
```

### Generating shared process gRPC protobuf files

Run `generate-grpc-shared` script from `teleterm/package.json`.
It generates protobuf files from `*.proto` files in `sharedProcess/api/proto`.
Resulting files can be found in `sharedProcess/api/protogen`.

## Build process

`yarn package-term` is ran as a part of `yarn build-and-package-term` and is responsible for
packaging the app code for distribution.

On all platforms, with the exception of production builds on macOS, the `CONNECT_TSH_BIN_PATH` env
var is used to provide the path to the tsh binary that will be included in the package.

See [Teleport Connect build
process](https://gravitational.slab.com/posts/teleport-connect-build-process-fu6da5ld) on Slab for
bulid process documentation that is specific to Gravitational.

### macOS

To make a fully-fledged build on macOS with Touch ID support, you need two things:

- a signed version of tsh.app
- an Apple Developer ID certificate in your Keychain

When running `yarn build-and-package-term`, you need to provide these environment variables:

- `APPLE_USERNAME`
- `APPLE_PASSWORD`
- `CONNECT_TSH_APP_PATH`
- `CSC_NAME` (optional, developer certificate ID)

The details behind those vars are described below.

#### tsh.app

Unlike other platforms, macOS needs the whole tsh.app to be bundled with Connect, not just the tsh
binary. This is in order to support Touch ID and provide access to the same Secure Enclave keys.
That is, if you add Touch ID as MFA through tsh, we want tsh.app bundled with Connect to have access
to the same keys.

Since Connect piggybacks on tsh for authn, this amounts to just copying a signed & notarized version
of tsh.app into `Teleport Connect.app/Contents/MacOS`. All interactions with Secure Enclave are done
through tsh at the moment, so Connect doesn't need to do anything extra, other than skipping signing
of tsh.app during the build process (as we expect it to be already signed).

The path to a signed version of tsh.app should be provided through the `CONNECT_TSH_APP_PATH` env
variable.

#### Signing & notarizing

Signing & notarizing is required if the application is supposed to be ran on devices other than the
one that packaged it. See [electron-builder's docs](https://www.electron.build/code-signing) for a
general overview and [Teleport Connect build
process](https://gravitational.slab.com/posts/teleport-connect-build-process-fu6da5ld) Slab page for
Gravitational-specific nuances.

For the most part, the device that's doing the signing & notarizing needs to have access to an Apple
Developer ID (certificate + private key). electron-builder should automatically discover it if
Keychain is unlocked. The `CSC_NAME` env var can be additionally provided to point electron-builder
towards the specific developer ID certificate/key we want to use, if multiple are available.
`CSC_NAME` can either be SHA-1 of the certificate or its name.

On top of that, you must provide env vars that will be used for notarization. `APPLE_USERNAME` must
be set to the account email address associated with the developer ID. `APPLE_PASSWORD` must be [an
app-specific password](https://support.apple.com/en-us/HT204397), not the account password.

## Architecture

### Resource lifecycle

The general approach is that a resource can become unavailable at any time due to a variety of
reasons: the resource going offline, the cluster going offline, the device running Connect going
offline, the cluster user losing access to the resource, just to name a few.

Connect must gracefully handle a resource becoming unavailable and make as few assumptions about
resource availability as possible.

### Diagram

```pro
                                                  +------------+
                                                  |            |
                                          +-------+---------+  |
                                          |                 |  |
                                          |    teleport     +--+
                                          |     clusters    |
                                          |                 |
                                          +------+-+--------+
                                                 ^ ^           External Network
+------------------------------------------------|-|--------------------------------------------------------------+
                                                 | |           Host OS
           Clients (psql)                        | |
              |                                  | |
              v                                  | |
     +--------+---------------+                  | |
     |                        |        SNI/ALPN  | | GRPC
  +--+----------------------+ |         routing  | |
  |                         | |                  | |
  |     local proxies       +-+                  | |
  |                         |                    | |
  +-------------------+-----+                    | |
                      ^                          | |
                      |                          | |
  +---------------+   | tls/tcp on localhost     | |
  |    local      |   |                          | |
  | user profile  |   |                          v v
  |   (files)     |   |                   +------+-+-------------------+        +-------------------------------+
  +-------^-------+   |                   |                            |        |                               |
          ^           +-------------------+         tsh daemon         |        |    Electron Shared Process    |
          |                               |          (golang)          |        |            (PTY)              |
          +<------------------------------+                            |        |                               |
                                          +-------------+--------------+        +-------------------------------+
 +--------+-----------------+                           ^                                       ^
 |         Terminal         |                           |                                       |
 |    Electron Main Process |                           |    GRPC API                           |   GRPC API
 +-----------+--------------+                           | (domain socket)                       |   (domain socket)
             ^                                          |                                       |
             |                                          |                                       |
    IPC      |                                          |        +------------------------------+
 named pipes |                                          |        |
             v  Terminal UI (Electron Renderer Process) |        |
 +-----------+------------+---------------------------------------------+
 | -gateways              | root@node1 × | k8s_c  × | rdp_win2 ×  |     |
 |   https://localhost:22 +---------------------------------------------+
 |   https://localhost:21 |                                             |
 +------------------------+ ./                                          |
 | -clusters              | ../                                         |
 |  -cluster1             | assets/                                     |
 |   +servers             | babel.config.js                             |
 |     node1              | build/                                      |
 |     node2              | src/                                        |
 |   -dbs                 |                                             |
 |    mysql+prod          |                                             |
 |    mysql+test          |                                             |
 |  +cluster2             |                                             |
 |  +cluster3             |                                             |
 +------------------------+---------------------------------------------+
```

### PTY communication overview (Renderer Process <=> Shared Process)

![PTY communication](docs/ptyCommunication.png)
