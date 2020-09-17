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

import * as Icons from 'design/Icon';
import Ctx from 'teleport/teleportContext';
import cfg from 'teleport/config';
import Audit from './Audit';
import Nodes from './Nodes';
import Sessions from './Sessions';
import Account from './Account';
import Applications from './Apps';
import Support from './Support';
import Clusters from './Clusters';
import Users from './Users';
import Roles from './Roles';

export class FeatureClusters {
  route = {
    title: 'Clusters',
    path: cfg.routes.clusters,
    exact: false,
    component: Clusters,
  };

  register(ctx: Ctx) {
    ctx.storeNav.addSideItem({
      title: 'Clusters',
      Icon: Icons.CardViewSmall,
      exact: false,
      getLink() {
        return cfg.routes.clusters;
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureHelpAndSupport {
  route = {
    title: 'Help & Support',
    path: cfg.routes.support,
    exact: true,
    component: Support,
  };

  register(ctx: Ctx) {
    ctx.storeNav.addTopMenuItem({
      title: 'Help & Support',
      Icon: Icons.Question,
      exact: true,
      getLink() {
        return cfg.routes.support;
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureAudit {
  route = {
    title: 'Audit Log',
    path: cfg.routes.clusterAudit,
    component: Audit,
  };

  register(ctx: Ctx) {
    if (!ctx.isAuditEnabled()) {
      return;
    }

    ctx.storeNav.addSideItem({
      title: 'Audit Log',
      Icon: Icons.ListBullet,
      getLink(clusterId: string) {
        return cfg.getAuditRoute(clusterId);
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureAccount {
  route = {
    title: 'Account Settings',
    path: cfg.routes.account,
    component: Account,
  };

  register(ctx: Ctx) {
    if (!ctx.isAccountEnabled()) {
      return;
    }

    ctx.storeNav.addTopMenuItem({
      title: 'Account Settings',
      Icon: Icons.User,
      getLink() {
        return cfg.routes.account;
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureNodes {
  route = {
    title: 'Nodes',
    path: cfg.routes.clusterNodes,
    exact: true,
    component: Nodes,
  };

  register(ctx: Ctx) {
    ctx.storeNav.addSideItem({
      title: 'Nodes',
      Icon: Icons.Layers,
      exact: true,
      getLink(clusterId: string) {
        return cfg.getNodesRoute(clusterId);
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureSessions {
  route = {
    title: 'Sessions',
    path: cfg.routes.clusterSessions,
    exact: true,
    component: Sessions,
  };

  register(ctx: Ctx) {
    ctx.storeNav.addSideItem({
      title: 'Active Sessions',
      Icon: Icons.Cli,
      exact: true,
      getLink(clusterId: string) {
        return cfg.getSessionsRoute(clusterId);
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureRoles {
  route = {
    title: 'Roles',
    path: cfg.routes.roles,
    exact: true,
    component: Roles,
  };

  register(ctx: Ctx) {
    if (!ctx.isRolesEnabled()) {
      return;
    }

    ctx.storeNav.addSideItem({
      title: 'Roles',
      Icon: Icons.ClipboardUser,
      exact: true,
      getLink() {
        return cfg.routes.roles;
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureUsers {
  route = {
    title: 'Users',
    path: cfg.routes.users,
    exact: true,
    component: Users,
  };

  register(ctx: Ctx) {
    ctx.storeNav.addSideItem({
      title: 'Users',
      Icon: Icons.Users,
      exact: true,
      getLink() {
        return cfg.routes.users;
      },
    });

    ctx.features.push(this);
  }
}

export class FeatureApps {
  route = {
    title: 'Applications',
    path: cfg.routes.applications,
    exact: true,
    component: Applications,
  };

  register(ctx: Ctx) {
    //if (!ctx.isApplicationsEnabled()) {
    //  return;
    //}

    ctx.storeNav.addSideItem({
      title: 'Applications',
      Icon: Icons.NewTab,
      exact: true,
      getLink() {
        return cfg.routes.applications;
      },
    });

    ctx.features.push(this);
  }
}

export default function getFeatures() {
  return [
    new FeatureNodes(),
    new FeatureAudit(),
    new FeatureSessions(),
    new FeatureAccount(),
    new FeatureHelpAndSupport(),
    new FeatureClusters(),
  ];
}
