import { ServerResource } from 'teleport/Discover/Server';
import { DatabaseResource } from 'teleport/Discover/Database';
import { KubernetesResource } from 'teleport/Discover/Kubernetes';
import { ApplicationResource } from 'teleport/Discover/Application';
import { DesktopResource } from 'teleport/Discover/Desktop';

import { Resource } from './flow';

export const resources: Resource[] = [
  ServerResource,
  DatabaseResource,
  KubernetesResource,
  ApplicationResource,
  DesktopResource,
];
