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
  ReportEventRequest,
  TshClient,
} from 'teleterm/services/tshd/types';
import { RuntimeSettings } from 'teleterm/mainProcess/types';
import { ConfigService } from 'teleterm/services/config';
import Logger from 'teleterm/logger';

export class UsageEventService {
  private logger = new Logger('UsageEventService');

  constructor(
    private tshClient: TshClient,
    private configService: ConfigService,
    private findCluster: (clusterUri: ClusterUri) => Cluster,
    private runtimeSettings: RuntimeSettings
  ) {}

  captureLogin(uri: ClusterOrResourceUri): Promise<void> {
    const clusterParams = this.getClusterProperties(uri);
    if (!clusterParams) {
      return;
    }
    return this.reportUsageEvent({
      loginEvent: {
        clusterProperties: clusterParams,
        arch: this.runtimeSettings.arch,
        os: this.runtimeSettings.platform,
        osVersion: this.runtimeSettings.osVersion,
        connectVersion: this.runtimeSettings.connectVersion,
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
    return this.reportUsageEvent({
      protocolRunEvent: {
        clusterProperties,
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
    return this.reportUsageEvent({
      accessRequestCreateEvent: {
        clusterProperties,
        kind,
      },
    });
  }

  captureAccessRequestReview(uri: ClusterOrResourceUri): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportUsageEvent({
      accessRequestReviewEvent: {
        clusterProperties,
      },
    });
  }

  captureAccessRequestAssumeRole(uri: ClusterOrResourceUri): Promise<void> {
    const clusterProperties = this.getClusterProperties(uri);
    if (!clusterProperties) {
      return;
    }
    return this.reportUsageEvent({
      accessRequestAssumeRoleEvent: {
        clusterProperties,
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
    return this.reportUsageEvent({
      fileTransferRunEvent: {
        clusterProperties,
        direction,
      },
    });
  }

  captureUserJobRoleUpdate(jobRole: string): Promise<void> {
    return this.reportUsageEvent({
      userJobRoleUpdateEvent: {
        jobRole,
      },
    });
  }

  private reportUsageEvent(event: ReportEventRequest['event']): Promise<void> {
    const isCollectingUsageMetricsEnabled = this.configService.get(
      'usageMetrics.enabled'
    ).value;

    if (!isCollectingUsageMetricsEnabled) {
      return;
    }
    if (this.runtimeSettings.dev) {
      return;
    }

    return this.tshClient.reportUsageEvent({
      distinctId: `connect.${this.runtimeSettings.installationId}`,
      timestamp: new Date(),
      event,
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
