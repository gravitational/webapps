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

import React from 'react';

import { MemoryRouter } from 'react-router';

import { render } from 'design/utils/testing';

import { SelectResource } from 'teleport/Discover/SelectResource/SelectResource';
import { Access, Acl, makeUserContext } from 'teleport/services/user';

const fullAccess: Access = {
  list: true,
  read: true,
  edit: true,
  create: true,
  remove: true,
};

const fullAcl: Acl = {
  windowsLogins: ['Administrator'],
  tokens: fullAccess,
  appServers: fullAccess,
  kubeServers: fullAccess,
  recordedSessions: fullAccess,
  activeSessions: fullAccess,
  authConnectors: fullAccess,
  roles: fullAccess,
  users: fullAccess,
  trustedClusters: fullAccess,
  events: fullAccess,
  accessRequests: fullAccess,
  billing: fullAccess,
  dbServers: fullAccess,
  desktops: fullAccess,
  nodes: fullAccess,
  clipboardSharingEnabled: true,
  desktopSessionRecordingEnabled: true,
  directorySharingEnabled: true,
};

const userContextJson = {
  authType: 'sso',
  userName: 'Sam',
  accessCapabilities: {
    suggestedReviewers: ['george_washington@gmail.com', 'chad'],
    requestableRoles: ['dev-a', 'dev-b', 'dev-c', 'dev-d'],
  },
  cluster: {
    name: 'aws',
    lastConnected: '2020-09-26T17:30:23.512876876Z',
    status: 'online',
    nodeCount: 1,
    publicURL: 'localhost',
    authVersion: '4.4.0-dev',
    proxyVersion: '4.4.0-dev',
  },
};

describe('select resource', () => {
  function create(resource: string, userAcl: Acl) {
    const userContext = makeUserContext({
      ...userContextJson,
      userAcl,
    });

    return render(
      <MemoryRouter initialEntries={[{ state: { entity: resource } }]}>
        <SelectResource
          userContext={userContext}
          isEnterprise={false}
          nextStep={() => null}
        />
      </MemoryRouter>
    );
  }

  describe('server', () => {
    test('shows permissions error when lacking tokens.create', () => {
      const result = create('server', {
        ...fullAcl,
        tokens: {
          ...fullAccess,
          create: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('shows permissions error when lacking nodes.read', () => {
      const result = create('server', {
        ...fullAcl,
        nodes: {
          ...fullAccess,
          read: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('shows the teleport versions when having correct permissions', () => {
      const result = create('server', fullAcl);

      const teleportVersions = result.getByTestId('server-teleport-versions');
      expect(teleportVersions).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('database', () => {
    test('shows permissions error when lacking tokens.create', () => {
      const result = create('database', {
        ...fullAcl,
        tokens: {
          ...fullAccess,
          create: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('shows permissions error when lacking dbServers.read', () => {
      const result = create('database', {
        ...fullAcl,
        dbServers: {
          ...fullAccess,
          read: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('has the proceed button enabled when having correct permissions', () => {
      const result = create('database', fullAcl);

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('kubernetes', () => {
    test('shows permissions error when lacking tokens.create', () => {
      const result = create('kubernetes', {
        ...fullAcl,
        tokens: {
          ...fullAccess,
          create: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('shows permissions error when lacking kubeServers.read', () => {
      const result = create('kubernetes', {
        ...fullAcl,
        kubeServers: {
          ...fullAccess,
          read: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('has the proceed button enabled when having correct permissions', () => {
      const result = create('kubernetes', fullAcl);

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('application', () => {
    test('shows permissions error when lacking tokens.create', () => {
      const result = create('application', {
        ...fullAcl,
        tokens: {
          ...fullAccess,
          create: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('shows permissions error when lacking appServers.read', () => {
      const result = create('application', {
        ...fullAcl,
        appServers: {
          ...fullAccess,
          read: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(true);
    });

    test('has the proceed button enabled when having correct permissions', () => {
      const result = create('application', fullAcl);

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('proceed-button');

      expect(proceedButton.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('desktop', () => {
    test('shows permissions error when lacking tokens.create', () => {
      const result = create('desktop', {
        ...fullAcl,
        tokens: {
          ...fullAccess,
          create: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();
    });

    test('shows permissions error when lacking desktops.read', () => {
      const result = create('desktop', {
        ...fullAcl,
        desktops: {
          ...fullAccess,
          read: false,
        },
      });

      const permissionsError = result.getByTestId('permissions-error');
      expect(permissionsError).toBeInTheDocument();

      expect(result.container.firstChild).toMatchSnapshot();
    });

    test('has the view documentation button visible', () => {
      const result = create('desktop', fullAcl);

      expect(result.container.firstChild).toMatchSnapshot();

      const proceedButton = result.getByTestId('documentation-button');

      expect(proceedButton).toBeInTheDocument();
    });
  });
});
