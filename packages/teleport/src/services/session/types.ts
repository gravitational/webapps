/*
Copyright 2019-2022 Gravitational, Inc.

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

export interface Participant {
  user: string;
}

export interface Session {
  kind: SessionKind;
  sid: string;
  namespace: string;
  login: string;
  created: Date;
  durationText: string;
  serverId: string;
  clusterId: string;
  parties: Participant[];
  addr: string;
  // resourceName depending on the "kind" field, is the name
  // of resource that the session is running in:
  //  - ssh: is referring to the hostname
  //  - k8s: is referring to the kubernetes cluster name
  resourceName: string;
}

export type ParticipantList = Record<string, Participant[]>;

export type SessionKind = 'ssh' | 'k8s';
