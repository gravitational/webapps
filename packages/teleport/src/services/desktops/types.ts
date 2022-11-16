/*
Copyright 2021-2022 Gravitational, Inc.

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

import { AgentLabel, AgentQueryMeta } from 'teleport/services/resources';

// Desktop is a remote desktop.
export type Desktop = {
  // OS is the os of this desktop.
  os: 'windows' | 'linux' | 'darwin';
  // Name is name (uuid) of the windows desktop.
  name: string;
  // Addr is the network address the desktop can be reached at.
  addr: string;
  // Labels.
  labels: AgentLabel[];

  host_id?: string;
  host_addr?: string;
};

export type DesktopsResponse = AgentQueryMeta & {
  desktops: Desktop[];
};
// DesktopService is a Windows Desktop Service.
export type WindowsDesktopService = {
  // Name is name (uuid) of the windows desktop service.
  name: string;
  // Hostname is the hostname of the windows desktop service.
  hostname: string;
  // Addr is the network address the desktop service can be reached at.
  addr: string;
  // Labels.
  labels: AgentLabel[];
};

export type WindowsDesktopServicesResponse = {
  desktopServices: WindowsDesktopService[];
  startKey?: string;
  totalCount?: number;
};
