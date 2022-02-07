## Teleport Terminal

Teleport Terminal is a desktop application that allows easy access to Teleport resources.

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
+------------------------------------------------|-|---------------------+
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
  |   (files)     |   |                   +------+-+-------------------+
  +-------^-------+   |                   |                            |
          ^           +-------------------+         tsh daemon         |
          |                               |          (golang)          |
          +<------------------------------+                            |
          |                               +-------------+--------------+
 +--------+-----------------+                           ^
 |         Terminal         |                           |
 |    Electron Main Process |                           |    GRPC API
 +-----------+--------------+                           | (domain socket)
             ^                                          |
             |                                          |
    IPC      |                                          |
 named pipes |                                          |
             v  Terminal UI (Electron Renderer Process) |
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
 |   -dbs                 | alexey@p14s:~/go/src/                       |
 |    mysql+prod          |                                             |
 |    mysql+test          |                                             |
 |  +cluster2             |                                             |
 |  +cluster3             |                                             |
 +------------------------+---------------------------------------------+
```

### Building

Prepare Teleport repo:
1. Switch to `/teleterm` branch
2. $ make

Prepare Webapps repo
1. Make sure that your node version is v16 (current tls) https://nodejs.org/en/about/releases/
2. Switch to `/teleterm` branch
3. yarn install
4. yarn build-term
5. yarn package

The installable file could be found in /webapps/packages/teleterm/build/release/


### Development

 Teleport Terminal consists of two main components: the `tsh` that runs in a deamon mode and the main app.

#### How to build tsh

1. Get Teleport source code and build it locally

```sh
# get the source code and build:
$ git clone https://github.com/gravitational/teleport.git
$ cd teleport
$ make
```

The build output could be found in the `/teleport/build` directory

```pro
build/
├── tctl
├── teleport
└── tsh     <--- will be packaged together with Electron app.
```

#### How to start local dev server.

1. Clone Gravitational [webapps repository](https://github.com/gravitational/webapps)

2. Start the server

```sh
$ cd webapps

## TELETERM_TSH_PATH is the environment variable that points to local tsh binary
$ TELETERM_TSH_PATH=$PWD/../teleport/build/tsh yarn start-term
```

This will start Teleport Terminal in development mode. To restart main process press `F6`.

### Tips


1. To rebuild and update `tsh` grpc proto files

```sh
$ cd teleport
$ make grpc
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
$ cd teleport
$ rm -rf ./../webapps/packages/teleterm/src/services/tshd/v1/ && cp -R lib/teleterm/api/protogen/js/v1/ ./../webapps/packages/teleterm/src/services/tshd/
```

