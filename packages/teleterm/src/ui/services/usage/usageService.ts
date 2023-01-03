/**
 * Copyright 2022 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ClusterOrResourceUri, ClusterUri, routing } from 'teleterm/ui/uri';
import {
  Cluster,
  ReportUsageEventRequest,
  TshClient,
} from 'teleterm/services/tshd/types';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import { ConfigService } from 'teleterm/services/config';
import Logger from 'teleterm/logger';

type RawPrehogEvent = Omit<
  ReportUsageEventRequest['prehogEvent'],
  'distinctId' | 'timestamp'
>;

export class UsageService {
  private logger = new Logger('UsageService');

  constructor(
    private tshClient: TshClient,
    private configService: ConfigService,
    private findCluster: (clusterUri: ClusterUri) => Cluster,
    private runtimeSettings: RuntimeSettings
  ) {}

  captureLogin(uri: ClusterOrResourceUri): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    const { arch, platform, osVersion, connectVersion, dev } =
      this.runtimeSettings;
    return this.reportEvent(clusterProperties.authClusterId, {
      userLogin: {
        clusterName: clusterProperties.clusterName,
        userName: clusterProperties.userName,
        arch,
        os: platform,
        osVersion,
        connectVersion: dev ? `${connectVersion}-dev` : connectVersion,
      },
    });
  }

  captureProtocolRun(
    uri: ClusterOrResourceUri,
    protocol: 'ssh' | 'kube' | 'db'
  ): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportEvent(clusterProperties.authClusterId, {
      protocolUse: {
        clusterName: clusterProperties.clusterName,
        userName: clusterProperties.userName,
        protocol,
      },
    });
  }

  captureAccessRequestCreate(
    uri: ClusterOrResourceUri,
    kind: 'role' | 'resource'
  ): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportEvent(clusterProperties.authClusterId, {
      accessRequestCreate: {
        clusterName: clusterProperties.clusterName,
        userName: clusterProperties.userName,
        kind,
      },
    });
  }

  captureAccessRequestReview(uri: ClusterOrResourceUri): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportEvent(clusterProperties.authClusterId, {
      accessRequestReview: {
        clusterName: clusterProperties.clusterName,
        userName: clusterProperties.userName,
      },
    });
  }

  captureAccessRequestAssumeRole(uri: ClusterOrResourceUri): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportEvent(clusterProperties.authClusterId, {
      accessRequestAssumeRole: {
        clusterName: clusterProperties.clusterName,
        userName: clusterProperties.userName,
      },
    });
  }

  captureFileTransferRun(
    uri: ClusterOrResourceUri,
    direction: 'download' | 'upload'
  ): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportEvent(clusterProperties.authClusterId, {
      fileTransferRun: {
        clusterName: clusterProperties.clusterName,
        userName: clusterProperties.userName,
        direction,
      },
    });
  }

  captureUserJobRoleUpdate(jobRole: string): Promise<void> {
    return this.reportNonAnonymizableEvent({
      userJobRoleUpdate: {
        jobRole,
      },
    });
  }

  private reportNonAnonymizableEvent(event: RawPrehogEvent): Promise<void> {
    return this.reportEvent('', event);
  }

  private reportEvent(
    authClusterId: string,
    rawPrehogEvent: RawPrehogEvent
  ): Promise<void> {
    const isCollectingUsageMetricsEnabled = this.configService.get(
      'usageMetrics.enabled'
    ).value;

    if (!isCollectingUsageMetricsEnabled) {
      return;
    }

    return this.tshClient.reportUsageEvent({
      authClusterId,
      prehogEvent: {
        distinctId: this.runtimeSettings.installationId,
        timestamp: new Date(),
        ...rawPrehogEvent,
      },
    });
  }

  private getClusterProperties(uri: ClusterOrResourceUri) {
    const rootClusterUri = routing.ensureRootClusterUri(uri);
    const cluster = this.findCluster(rootClusterUri);
    if (!(cluster && cluster.loggedInUser)) {
      // TODO: add check for authClusterId
      this.logger.warn(`Missing cluster data for ${uri}, skipping event`);
      return;
    }

    return {
      authClusterId: '', // TODO: add real ID
      clusterName: cluster.name,
      userName: cluster.loggedInUser.name,
    };
  }
}
